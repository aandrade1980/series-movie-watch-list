import dbConnect from "@/utils/mongodb";
import Media from "@/models/media";

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case "GET":
      try {
        const user = req.query?.user;

        if (!user) {
          return res
            .status(500)
            .json({ success: false, error: "Missing User!" });
        }

        const moviesAndSeries = await Media.find({ user }).sort({
          createdAt: -1,
        });

        res.status(200).json({ success: true, data: moviesAndSeries });
      } catch (error) {
        console.error(`Error getting media ${error}`);
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const { imdbID, user } = req.body;

        const result = await Media.find({ imdbID, user });

        if (result.length > 0) {
          return res
            .status(422)
            .json({ success: false, message: "Item already exists" });
        }

        const media = await Media.create(req.body);

        res.status(201).json({ success: true, data: media });
      } catch (error) {
        console.error(`Error POST media: ${error}`);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case "DELETE":
      try {
        const result = await Media.deleteOne({ imdbID: req.body.imdbID });

        if (result.deletedCount === 0) {
          return res
            .status(404)
            .json({ success: false, message: "Item not found!" });
        }
        res
          .status(200)
          .json({ success: true, message: "Media successfully removed!" });
      } catch (error) {
        console.error(`Error DELETE media: ${error}`);
        res.status(500).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
