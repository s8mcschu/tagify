import express from 'express';
import { addCalibration } from '../db/user';

const router = express.Router();
const routeBase = '/calibration';


router.patch(routeBase, async (req, res, next) => {
  const uuid = req.cookies["tp-uuid"];
  const calibrationNumer = req.body.value as number;

  try {
    await addCalibration(uuid, calibrationNumer);
    res.status(204).end();  
  }
  catch(err) { res.status(500).end(); }
});

export default router;