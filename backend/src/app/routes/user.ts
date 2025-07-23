import express from 'express';
import { getCurrentUserStep, incrementUserProgress } from '../db/progress';
import { getUser, createAndAssignUser } from '../db/user';

const router = express.Router();
const routeBase = '/user';

router.put(routeBase, async (req, res, next) => {
  try {
    // Get cookie
    let uuid = req.cookies["tp-uuid"];
    
    if(uuid) {
      const dbUser = await getUser(uuid);
      if(!dbUser) {
        uuid = await createAndAssignUser(uuid);
      }
    }
    else {
      uuid = await createAndAssignUser();
    }

    res.cookie('tp-uuid', uuid, { path: '/' });
    res.status(201).end();
  } 
  catch (err) { res.status(500).end(); } 
})


router.get(routeBase + '/state', async (req, res, next) => {
  try {
    const uuid = req.cookies["tp-uuid"];
    const state = await getCurrentUserStep(uuid);
    
    res.status(200).send(state);
  }
  catch (err) { res.status(500).end(); }
});

router.patch(routeBase + '/nextState', async (req, res, next) => {
  try {
    const uuid = req.cookies["tp-uuid"];
    const currentStep = await getCurrentUserStep(uuid);
    const currentStepCheck = req.body.currentStep;
    
    // Check if currentStep is valid
    if(currentStep.number === currentStepCheck) {
      await incrementUserProgress(uuid);
      const newState = await getCurrentUserStep(uuid);
      res.status(200).send(newState);  
    }
    else {
      res.status(409).end();
    }
  }
  catch (err) { res.status(500).end(); }
});


export default router;