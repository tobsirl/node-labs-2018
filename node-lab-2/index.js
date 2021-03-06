import dotenv from 'dotenv';
import express from 'express';
import contactsRouter from './api/contacts';
import postsRouter from './api/posts'; // Hacker News
import bodyParser from 'body-parser';

dotenv.config();

const app = express();

const port = process.env.PORT;

// configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.use('/api/contacts', contactsRouter);
app.use('/api/posts', postsRouter); // Hacker News

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
