import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import { villainFind, villainSave } from "src/services/api/villainService";

const handler = nc()
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const villains = await villainFind();
      res.statusCode = 200;
      res.json(villains);
    } catch (e) {
      res.statusCode = 500;
      res.json(e);
    }
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const villain = await villainSave(req.body);
      res.statusCode = 201;
      res.json({ ...villain });
    } catch (e) {
      res.statusCode = 500;
      res.json(e);
    }
  });

export default handler;
