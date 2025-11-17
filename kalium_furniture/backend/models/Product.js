const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  src: { type: String, required: true },
  thumb: { type: String },
  alt: { type: String }
}, { _id: false });

const reviewSchema = new mongoose.Schema({
  author: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now }
}, { _id: false });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  originalPrice: { type: String, default: null },
  currencySymbol: { type: String, default: '$' },
  features: { type: String, required: true },
  description: { type: String, required: true },
  dimensions: { type: String },
  materials: { type: String },
  finish: { type: String },
  designer: { type: String },
  countryOfOrigin: { type: String },
  importerPackerMarketer: { type: String },
  articleNumber: { type: String },
  images: [imageSchema],
  reviews: [reviewSchema],
  category: { type: String, default: 'default' },
  slug: { type: String, unique: true, sparse: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt field before saving
productSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Generate slug from name if not provided
productSchema.pre('save', function(next) {
  if (!this.slug && this.name) {
    this.slug = this.name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);

