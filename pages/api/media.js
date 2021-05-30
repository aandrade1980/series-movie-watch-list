import { connectToDatabase } from '@/utils/mongodb';

const COLLECTION_NAME = 'series-movies-watched';

export default async (req, res) => {
  const { db } = await connectToDatabase();

  switch (req.method) {
    case 'GET':
      try {
        const moviesAndSeries = await db
          .collection(COLLECTION_NAME)
          .find({})
          .toArray();

        return res.status(200).json(moviesAndSeries);
      } catch (error) {
        console.error(`Error getting media ${error}`);
      }
    case 'POST':
      try {
        const { title, poster, type, year, imdbID } = req.body;
        const result = await db.collection(COLLECTION_NAME).insertOne({
          title,
          poster,
          type,
          year,
          imdbID,
        });

        return res
          .status(201)
          .json({ status: 'ok', mediaId: result.insertedId });
      } catch (error) {
        console.error(`Error POST media ${error}`);
      }
    default:
      return res.status(404).json({ message: "Didn't find operation" });
  }
};
