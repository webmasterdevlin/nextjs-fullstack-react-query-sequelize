import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import {
  heroFindByIdAndRemove,
  heroFindByIdAndUpdate,
} from "src/services/api/heroService";

const handler = nc()
  .delete(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const id = req.query.id as string;
      await heroFindByIdAndRemove(id);
      res.statusCode = 204;
    } catch (e) {
      res.statusCode = 500;
      res.json(e);
    }
  })
  .put(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const id = req.query.id as string;
      await heroFindByIdAndUpdate(id, req.body);
      res.statusCode = 200;
    } catch (e) {
      res.statusCode = 500;
      res.json(e);
    }
  });

export default handler;
