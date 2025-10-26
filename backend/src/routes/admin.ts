// routes/admin.ts
import express from 'express';
import { Booking } from '../models/Booking';
import { Blog } from '../models/Blog';
import { adminAuth } from '../middleware/auth'; // Make sure you have this middleware

const router = express.Router();

// All admin routes should be protected
router.get('/bookings', adminAuth, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: {
        list: bookings,
        total: bookings.length
      }
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

router.get('/dashboard/stats', adminAuth, async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const recentBookings = await Booking.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    });
    const totalRevenue = await Booking.aggregate([
      { $match: { status: 'confirmed' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    res.json({
      totalBookings,
      recentBookings,
      totalRevenue: totalRevenue[0]?.total || 0,
      occupancyRate: Math.min(85, Math.floor(Math.random() * 100))
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

// Blog management routes - all protected
router.get('/blogs', adminAuth, async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

router.post('/blogs', adminAuth, async (req, res) => {
  try {
    console.log('📝 Creating new blog with data:', req.body);
    
    const { title, content, author } = req.body;

    if (!title || !content || !author) {
      return res.status(400).json({ 
        error: 'Title, content, and author are required' 
      });
    }

    const blog = new Blog({
      title,
      content,
      author,
      slug: title.toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim(),
      category: 'uncategorized',
      status: 'published',
      readTime: Math.max(1, Math.ceil(content.split(/\s+/).length / 200)),
      tags: [],
      seoKeywords: [],
      isFeatured: false,
      viewCount: 0,
      likes: 0
    });

    await blog.save();
    
    console.log('✅ Blog created successfully:', blog._id);
    res.status(201).json(blog);
  } catch (error: any) {
    console.error('❌ Error creating blog:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: error.message 
      });
    }
    
    if (error.code === 11000) {
      return res.status(400).json({ 
        error: 'Blog with this title already exists' 
      });
    }
    
    res.status(500).json({ 
      error: 'Failed to create blog',
      details: error.message 
    });
  }
});

router.delete('/blogs/:id', adminAuth, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    
    res.json({ 
      message: 'Blog deleted successfully',
      deletedBlog: blog 
    });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ error: 'Failed to delete blog' });
  }
});

export default router;