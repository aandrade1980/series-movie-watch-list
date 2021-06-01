import dbConnect from '@/utils/mongodb';
import Media from '@/models/media';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const media = await Media.find({ imdbID: id });

        if (media.length === 0) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: media });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
