import express from 'express';
import { abortUser } from '../db/user';

const router = express.Router();
const routeBase = '/abort';


router.patch(routeBase, async (req, res, next) => {
  const uuid = req.cookies["tp-uuid"];
  try {
    await abortUser(uuid);
    res.status(204).end();  
  }
  catch(err) { res.status(500).end(); }
});

export default router;