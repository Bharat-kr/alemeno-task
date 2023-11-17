const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  enrollmentStatus: {
    type: String,
    enum: ["Open", "Closed", "In Progress"],
  },
  thumbnail: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  schedule: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  prerequisites: {
    type: [String],
  },
  syllabus: [
    {
      week: {
        type: Number,
        required: true,
      },
      topic: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    },
  ],
  students: [
    {
      id: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
  ],
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const course = mongoose.model("Course", CourseSchema);

module.exports = course;
