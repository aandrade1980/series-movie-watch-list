import dbConnect from '@/utils/mongodb';
import Media from '@/models/media';

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const moviesAndSeries = await Media.find({});

        res.status(200).json({ success: true, data: moviesAndSeries });
      } catch (error) {
        console.error(`Error getting media ${error}`);
        res.status(400).json({ success: false });
      }
      break;
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

        res.status(201).json({ success: true, data: media });
      } catch (error) {
        console.error(`Error POST media: ${error}`);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
