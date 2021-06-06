import mongoose from 'mongoose';

const MediaSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    Poster: {
      type: String,
    },
    Type: {
      type: String,
      required: true,
    },
    Year: {
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
