import express from 'express';
import { revokeUserConsent, saveUserConsent } from '../db/user';

const router = express.Router();
const routeBase = '/consent';


router.patch(routeBase, async (req, res, next) => {
  try {
    const uuid = req.cookies["tp-uuid"];
    const consent = req.body.consent as boolean;
  
    if(consent) await saveUserConsent(uuid);
    else await revokeUserConsent(uuid);
  
    res.status(204).end();  
  }
  catch (err) { res.status(500).end(); }
});

export default router;