import dbConnect from '@/utils/mongodb';
import Media from '@/models/media';

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const moviesAndSeries = await Media.find({});

        return res.status(200).json({ success: true, data: moviesAndSeries });
      } catch (error) {
        console.error(`Error getting media ${error}`);
        return res.status(400).json({ success: false });
      }
    case 'POST':
      try {
        const { imdbID } = req.body;

        const result = await Media.find({ imdbID });

        if (result.length > 0) {
          return res
            .status(422)
            .json({ success: false, message: 'Item already exists' });
        }

        const media = await Media.create(req.body);

        return res.status(201).json({ success: true, data: media });
      } catch (error) {
        console.error(`Error POST media: ${error}`);
        return res.status(400).json({ success: false, error: error.message });
      }
    case 'DELETE':
      try {
        const result = await Media.deleteOne({ imdbID: req.body.imdbID });

        if (result.deletedCount === 0) {
          return res
            .status(404)
            .json({ success: false, message: 'Item not found!' });
        }
        return res
          .status(200)
          .json({ success: true, message: 'Media successfully removed!' });
      } catch (error) {
        console.error(`Error DELETE media: ${error}`);
        return res.status(500).json({ success: false });
      }
    default:
      return res.status(400).json({ success: false });
  }
}
