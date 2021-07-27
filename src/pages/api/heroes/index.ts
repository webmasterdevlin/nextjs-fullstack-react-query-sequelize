import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import { heroFind, heroSave } from "src/services/api/heroService";

const handler = nc()
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const heroes = await heroFind();
      res.statusCode = 200;
      res.json(heroes);
    } catch (e) {
      res.statusCode = 500;
      res.json(e);
    }
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const hero = await heroSave(req.body);
      res.statusCode = 201;
      res.json({ ...hero });
    } catch (e) {
      res.statusCode = 500;
      res.json(e);
    }
  });

export default handler;
