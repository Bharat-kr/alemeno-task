const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: mongoose.Types.ObjectId(),
    },
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
      required: true,
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
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const course = mongoose.model("Course", CourseSchema);

module.exports = course;
