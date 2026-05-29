const Article = require('../models/Article');

exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find().select('-__v');
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch articles.', error: error.message });
  }
};

exports.createArticle = async (req, res) => {
  try {
    const { slug, title, paragraphs = [], status } = req.body;
    if (!slug || !title) {
      return res.status(400).json({ message: 'Slug and title are required.' });
    }

    const article = await Article.create({
      slug,
      title,
      paragraphs,
      status: status || 'active',
      isActive: status === 'inactive' ? false : true,
    });

    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ message: 'Unable to create article.', error: error.message });
  }
};

exports.updateArticle = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (updates.status) {
      updates.isActive = updates.status === 'active';
    }

    const article = await Article.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    }).select('-__v');

    if (!article) {
      return res.status(404).json({ message: 'Article not found.' });
    }

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: 'Unable to update article.', error: error.message });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found.' });
    }
    article.isActive = !article.isActive;
    article.status = article.isActive ? 'active' : 'inactive';
    await article.save();
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: 'Unable to update article status.', error: error.message });
  }
};