import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import { antiHeroFind, antiHeroSave } from "src/services/api/antiHeroService";

const handler = nc()
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const antiHeroes = await antiHeroFind();
      res.statusCode = 200;
      res.json(antiHeroes);
    } catch (e) {
      res.statusCode = 500;
      res.json(e);
    }
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const antiHero = await antiHeroSave(req.body);
      res.statusCode = 201;
      res.json({ ...antiHero });
    } catch (e) {
      res.statusCode = 500;
      res.json(e);
    }
  });

export default handler;
