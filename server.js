const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

let users = require("./users.json");
let posts = require("./posts.json");

// Register
app.post("/register", (req, res) => {
  users.push(req.body);

  fs.writeFileSync(
    "./users.json",
    JSON.stringify(users, null, 2)
  );

  res.json({ message: "Registered" });
});

// Login
app.post("/login", (req, res) => {
  const user = users.find(
    u =>
      u.email === req.body.email &&
      u.password === req.body.password
  );

  if (user) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// Get Posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

// Create Post
app.post("/posts", (req, res) => {
  const post = {
    id: Date.now(),
    title: req.body.title,
    content: req.body.content,
    comments: []
  };

  posts.push(post);

  fs.writeFileSync(
    "./posts.json",
    JSON.stringify(posts, null, 2)
  );

  res.json(post);
});

// Delete Post
app.delete("/posts/:id", (req, res) => {
  posts = posts.filter(
    p => p.id != req.params.id
  );

  fs.writeFileSync(
    "./posts.json",
    JSON.stringify(posts, null, 2)
  );

  res.json({ message: "Deleted" });
});

// Comment
app.post("/posts/:id/comment", (req, res) => {
  const post = posts.find(
    p => p.id == req.params.id
  );

  if (post) {
    post.comments.push(req.body.comment);

    fs.writeFileSync(
      "./posts.json",
      JSON.stringify(posts, null, 2)
    );
  }

  res.json({ message: "Comment Added" });
});

app.listen(3000, () => {
  console.log("Server Running");
});
