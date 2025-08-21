const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'articles.json');

app.use(express.json());
app.use(express.static(__dirname));

function readArticles() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function writeArticles(articles) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(articles, null, 2));
}

app.get('/api/articles', (req, res) => {
  res.json(readArticles());
});

app.post('/api/articles', (req, res) => {
  const { title, content, image } = req.body;
  if (!title || !content || !image) {
    return res.status(400).json({ message: 'Title, content and image are required.' });
  }
  const articles = readArticles();
  const newArticle = { id: Date.now(), title, content, image };
  articles.unshift(newArticle);
  writeArticles(articles);
  res.status(201).json(newArticle);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
