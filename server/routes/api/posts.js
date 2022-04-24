const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Posts
router.get('/', async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

// Add Post
router.post('/', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date()
  });
  res.status(201).send();
});

// Update Post
// router.patch('/:id', getPost, async (req, res) => {
router.patch('/:id', async (req, res) => {
  const posts = await loadPostsCollection();
  console.log('posts, res.status(200)', res.status);
  await posts.updateOne({
    _id: new mongodb.ObjectId(req.params.id),
    $set: {text: req.body.newText},
    // updatedAt: new Date()
  });
  res.status(201 || 200).send();
});

// Delete Post
router.delete('/:id', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
  res.status(200).send();
});

async function getPost(req, res, next) {
  try {
    posts = await Post.findById(req.params.id)
    if (post == null ) {
      return res.status(404).json({ message: 'Cannot find post' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.post = post
  next()
}

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect('mongodb+srv://root:toor@vuemongo.guvtq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
  {useNewUrlParser: true
  });

  return client.db('vueMongo').collection('posts');
}


module.exports = router;
