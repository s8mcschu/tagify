import express from 'express';
import { addUserQuestionnaires } from '../db/data';

const router = express.Router();
const routeBase = '/questionnaire';


router.post(routeBase, async (req, res, next) => {
  try {
    const uuid = req.cookies["tp-uuid"];
    const questionnaires = req.body.questionnaires;
    await addUserQuestionnaires(uuid, questionnaires);
    res.status(201).end();
  }
  catch (err) { res.status(500).end(); }
});

export default router;