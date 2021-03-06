const mongoose = require('mongoose')
/**
 * @swagger
 * definitions:
 *   Question:
 *     type: object
 *     properties:
 *       title:
 *         type: string
 *       description:
 *         type: string
 *       upvotes:
 *         type: array
 *       downvotes:
 *         type: string
 *       totalVote:
 *         type: integer
 *       user:
 *         type: integer
 *       required:
 *         - title
 *         - description
 */
let questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, `Title required.`],
  },
  description: {
    type: String,
    required: [true, `Description required.`],
  },
  upvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: []
  }],
  downvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: []
  }],
  totalVote: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date
  }
})

questionSchema.pre('save', function (next) {
  this.totalVote = this.upvotes.length - this.downvotes.length
  next()
})

let Question = mongoose.model('Question', questionSchema);

module.exports = Question;