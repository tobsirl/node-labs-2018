import dotenv from 'dotenv';
import express from 'express';
import contactsRouter from './api/contacts';
import postsRouter from './api/posts'; // Hacker News
import bodyParser from 'body-parser';

import mongoose from 'mongoose';
import {loadContacts} from './contactsData';
import {loadPosts} from './postsData';
import {Mockgoose} from 'mockgoose';

dotenv.config();

// const app = express();
export const app = express(); // replaces the previous const app = express();

const port = process.env.PORT;

// Connect to database
if (process.env.nodeEnv == 'test') {
  // use mockgoose for testing
  const mockgoose=new Mockgoose(mongoose);
  mockgoose.prepareStorage().then(()=>{
    mongoose.connect(process.env.mongoDB);
  });
} else {
  // use real deal for everything else
  mongoose.connect(process.env.mongoDB);
}

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error: '+ err);
    process.exit(-1);
});

// Populate DB with sample data
if (process.env.seedDb) {
  loadContacts();
  loadPosts();
}

// configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.use('/api/contacts', contactsRouter);
app.use('/api/posts', postsRouter); // Hacker News

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
