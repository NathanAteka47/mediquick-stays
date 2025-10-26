// In your routes folder, create blogs.ts or add to existing routes
import express from 'express';
import { Blog } from '../models/Blog';

const router = express.Router();

// Public route to get all published blogs
router.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find({ status: 'published' })
      .sort({ createdAt: -1 })
      .select('title content excerpt author createdAt featuredImage readTime');
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

export default router;