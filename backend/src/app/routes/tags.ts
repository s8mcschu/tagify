import express from 'express';
import { addUserTags, getUserTagsAll, getUserTagsCurrentStep } from '../db/data';
import { incrementTaggingProgress } from '../db/progress';

const router = express.Router();
const routeBase = '/tags';

router.get(routeBase, async(req, res, next) => {
  try {
    const uuid = req.cookies["tp-uuid"];
    const tags = await getUserTagsAll(uuid);
    res.status(200).send(tags);
  }
  catch (err) { res.status(500).end(); }
});

router.get(routeBase + '/step', async(req, res, next) => {
  try {
    const uuid = req.cookies["tp-uuid"];
    const tags = await getUserTagsCurrentStep(uuid);
    res.status(200).send(tags);
  }
  catch (err) { res.status(500).end(); }
});

router.post(routeBase, async (req, res, next) => {
  try {
    const uuid = req.cookies["tp-uuid"];
    const tags = req.body.tags;
    await addUserTags(uuid, tags);
    await incrementTaggingProgress(uuid);
    res.status(201).end();
  }
  catch (err) { res.status(500).end(); }
});

export default router;