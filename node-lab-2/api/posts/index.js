import express from 'express';
import stubAPI from './stubAPI';

const router = express.Router(); // eslint-disable-line

// get all posts
router.get('/', (req, res) => {
  const posts = stubAPI.getAll();
  res.send({posts: posts});
});


// Add a post
router.post('/', (req, res) => {
    const newPost = req.body;

    if (newPost && stubAPI.add(newPost.title, newPost.link)) {
         return res.status(201).send({message: 'Posts Created'});
    }
    return res.status(400).send({message: 'Unable to find Post in request.'});
});

// get a post
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const post = stubAPI.getPost(id);

       if (post) {
               return res.status(200).send(post);
              }
              return res.status(404).send({message: `Unable to find Post ${id}`});
});

// upvote a post
router.post('/:id/upvote', (req, res) => {
     const id = req.params.id;
            if (stubAPI.upvote(id)) {
                 return res.status(200).send({message: `Post ${id} Upvoted`});
            }
            return res.status(404).send({message: `Unable to find Post ${id}`});
});

// upvote a post
router.post('/:id/upvote', (req, res) => {
    const id = req.params.id;
           if (stubAPI.upvote(id)) {
                return res.status(200).send({message: `Post ${id} Upvoted`});
           }
           return res.status(404).send({message: `Unable to find Post ${id}`});
});

router.post('/:id/comments', (req, res) => {
    const id = req.params.id;
    const newComment = req.body;
        if (newComment && stubAPI.addComment(id, newComment.comment, newComment.name)) {
            return res.status(201).send({message: `New Comment Added for post ${id}`});
        }
        return res.status(400).send({message: `Unable to add new comment for ${name}`});
});

router.post('/:id/comments/:commentId/upvote', (req, res) => {
    const id = req.params.id;
    const commentId = req.params.commentId;
            if (stubAPI.upvoteComment(id, commentId)) {
                return res.status(200).send({message: `Post ${id} and Comment ${commentId} Upvoted`});
            }
            return res.status(404).send({message: `Unable to find Comment ${commentId}`});
});

export default router;

// router.post('/:id/upvote', (req, res) => {
//     const id = req.params.id;
//            if (stubAPI.upvote(id)) {
//                 return res.status(200).send({message: `Post ${id} Upvoted`});
//            }
//            return res.status(404).send({message: `Unable to find Post ${id}`});
// });

// upvoteComment: (postId, commentId) => {
//     let result = false;
//     const post = stubAPI.getPost(postId);
//     if (post) {
//     const index = _.findIndex(post.comments, (c) => {
//               return c.id == commentId;
//             });
//      if (index !== -1) {
//          post.comments[index].upvotes += 1;
//          result = true;
//         }
//       }
//     return result;
//   },
// };
