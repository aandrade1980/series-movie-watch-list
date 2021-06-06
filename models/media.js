import mongoose from 'mongoose';

const MediaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
    },
    type: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    imdbID: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'series-movies-watched',
  }
);

export default mongoose.models.Media || mongoose.model('Media', MediaSchema);
