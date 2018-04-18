import express from 'express';
import Post from './postsModel';
import asyncHandler from 'express-async-handler';

const router = express.Router();// eslint-disable-line

router.get('/', asyncHandler(async (req, res) => {
  const posts = await Post
                      .find()
                      .sort({'date': -1})
                      .limit(5); // https://stackoverflow.com/questions/5830513/how-do-i-limit-the-number-of-returned-items
  return res.send(posts);
}));

// Add a post
router.post('/', asyncHandler(async (req, res) => {
    const newPost = req.body;
    if (newPost) {
          const post = await Post.create(newPost);
          return res.status(201).send({post});
      } else {
         return handleError(res, err);
      }
}));

// upvote a post
router.post('/:id/upvotes', asyncHandler(async (req, res) => {
  const id = req.params.id;
  const post = await Post.findById(id);
  post.upvotes++;
  await post.save();
  return res.status(201).send({post});
}));

// get post
router.get('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const post = await Post.findById(id);
    return res.send({post});
}));

// Add a Comment
router.post('/:id/comments', asyncHandler( async (req, res) => {
    const id = req.params.id;
    const comment = req.body;
    const post = await Post.findById(id);
    post.comments.push(comment);
    await post.save();
    return res.status(201).send({post});
 }));

// Upvoting a Comment
router.post('/:postId/comments/:commentId/upvotes', asyncHandler( async (req, res) => {
    const commentId = req.params.commentId;
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    post.comments.id(commentId).upvotes++;
    await post.save();
    return res.status(201).send({post});
}));

// Delete a Comment
router.delete('/:postId/comments/:commentId', asyncHandler( async (req, res) => {
  const commentId = req.params.commentId;
  const postId = req.params.postId;
  const post = await Post.findById(postId);
  post.comments.id(commentId).remove();
  await post.save();
  return res.status(201).send({post});
}));

/**
 * Handle general errors.
 * @param {object} res The response object
 * @param {object} err The error object.
 * @return {object} The response object
 */
function handleError(res, err) {
  return res.status(500).send(err);
};

export default router;