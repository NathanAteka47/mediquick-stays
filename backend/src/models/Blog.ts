// models/Blog.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface BlogDocument extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  author: string;
  featuredImage?: string;
  images?: string[];
  tags: string[];
  category: string;
  status: 'draft' | 'published' | 'archived';
  publishedAt?: Date;
  metaTitle?: string;
  metaDescription?: string;
  readTime: number;
  isFeatured: boolean;
  viewCount: number;
  likes: number;
  seoKeywords: string[];
}

const blogSchema = new Schema<BlogDocument>({
  title: {
    type: String,
    required: [true, 'Blog title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Blog content is required'],
    minlength: [100, 'Content should be at least 100 characters long']
  },
  excerpt: {
    type: String,
    maxlength: [300, 'Excerpt cannot exceed 300 characters'],
    trim: true
  },
  author: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true
  },
  featuredImage: {
    type: String,
    trim: true
  },
  images: [{
    type: String,
    trim: true
  }],
  tags: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'wellness',
      'accommodation',
      'travel-tips',
      'health-retreats',
      'medical-tourism',
      'lifestyle',
      'nutrition',
      'fitness',
      'mental-health',
      'uncategorized'
    ],
    default: 'uncategorized'
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  publishedAt: {
    type: Date
  },
  metaTitle: {
    type: String,
    maxlength: [200, 'Meta title cannot exceed 200 characters'],
    trim: true
  },
  metaDescription: {
    type: String,
    maxlength: [300, 'Meta description cannot exceed 300 characters'],
    trim: true
  },
  readTime: {
    type: Number,
    required: true,
    min: 1,
    default: 5
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  viewCount: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  seoKeywords: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

// Auto-generate slug from title before saving
blogSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  // Auto-generate excerpt if not provided
  if (!this.excerpt && this.content) {
    this.excerpt = this.content.substring(0, 150).trim() + '...';
  }

  // Auto-calculate read time (assuming average reading speed of 200 words per minute)
  if (this.isModified('content')) {
    const wordCount = this.content.split(/\s+/).length;
    this.readTime = Math.max(1, Math.ceil(wordCount / 200));
  }

  // Set publishedAt when status changes to published
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }

  next();
});

// Auto-generate meta fields if not provided
blogSchema.pre('save', function(next) {
  if (!this.metaTitle) {
    this.metaTitle = this.title;
  }

  if (!this.metaDescription && this.excerpt) {
    this.metaDescription = this.excerpt;
  }

  next();
});

// Indexes for better query performance
blogSchema.index({ status: 1, publishedAt: -1 });
blogSchema.index({ category: 1, publishedAt: -1 });
blogSchema.index({ tags: 1 });
blogSchema.index({ isFeatured: 1, publishedAt: -1 });
blogSchema.index({ slug: 1 }, { unique: true });
blogSchema.index({ author: 1 });
blogSchema.index({ viewCount: -1 });
blogSchema.index({ likes: -1 });

// Virtual for formatted published date
blogSchema.virtual('formattedPublishedDate').get(function() {
  return this.publishedAt ? this.publishedAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : null;
});

// Static method to get featured blogs
blogSchema.statics.getFeaturedBlogs = function(limit = 5) {
  return this.find({ 
    status: 'published', 
    isFeatured: true,
    publishedAt: { $lte: new Date() }
  })
  .sort({ publishedAt: -1 })
  .limit(limit)
  .select('title slug excerpt featuredImage author publishedAt readTime');
};

// Static method to get blogs by category
blogSchema.statics.getBlogsByCategory = function(category: string, limit = 10) {
  return this.find({ 
    status: 'published', 
    category,
    publishedAt: { $lte: new Date() }
  })
  .sort({ publishedAt: -1 })
  .limit(limit)
  .select('title slug excerpt featuredImage author publishedAt readTime category');
};

// Instance method to increment view count
blogSchema.methods.incrementViewCount = function() {
  this.viewCount += 1;
  return this.save();
};

// Instance method to like a blog
blogSchema.methods.likeBlog = function() {
  this.likes += 1;
  return this.save();
};

export const Blog = mongoose.model<BlogDocument>('Blog', blogSchema);
export default Blog;