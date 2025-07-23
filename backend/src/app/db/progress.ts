import seedrandom from "seedrandom";
import { GamificationDescriptor, Step } from "../../types/Step";
import prisma from "../dbHandler";


export async function incrementUserProgress(uuid: string): Promise<void> {
  try {
    const user = await prisma.user.findUnique({
      where: { uuid },
      select: {
        step: true,
        groups: {
          select: {
            maxStep: true
          }
        }
      }
    });

    if(user && user.step < user.groups.maxStep) {
      await prisma.user.update({
        where: { uuid },
        data: {
          step: user.step + 1,
          taggingProgress: 0,
          finished: user.step + 1 === user.groups.maxStep ? new Date() : undefined,
          userTimings: {
            create: {
              step: user.step
            }
          }
        }
      });
    }
  }
  catch(err) { throw err; }
}

export async function incrementTaggingProgress(uuid: string): Promise<void> {
  try {
    const step = await getCurrentUserStep(uuid);
    if(step.page.toLowerCase() === "tagging") {
      const content = step.content as GamificationDescriptor;
      content.resourceIdx = Math.min(content.resourceIdx + 1, content.resources.length - 1);
      
      await prisma.user.update({
        where: { uuid },
        data: {
          taggingProgress: content.resourceIdx
        }
      });
    }
  }
  catch(err) { throw err; }
}

export async function getCurrentUserStep(uuid: string): Promise<Step & { number: number }> {
  try {
    if(uuid) {
      const user = await prisma.user.findUnique({
        where: { uuid },
        select: {
          step: true,
          aborted: true,
          taggingProgress: true,
          groups: {
            select: {
              sequenceScript: true
            }
          }
        }
      });
      
      if(!user || user.step === 0) {
        return { page: "welcome", number: 0 };
      }
      else if (user.aborted) {
        return { page: "aborted", number: -1 };
      }
      else {
        const step = JSON.parse(user.groups.sequenceScript)[user.step - 1] as Step;
        if(step.page.toLowerCase() === "tagging") {
          const content = step.content as GamificationDescriptor;
          content.resourceIdx = user.taggingProgress;
      
          if(content.shuffleResources) { // Shuffle Array based on seed
            const rng = seedrandom(uuid);
            for(let from = 0; from < content.resources.length; from++) {
              const to = Math.round(rng() * (content.resources.length - 1));
              const temp = content.resources[from];
              content.resources[from] = content.resources[to];
              content.resources[to] = temp;
            }  
          }
        }
        return { ...step, number: user.step };
      }
    }
    else return { page: "welcome", number: 0 };
  }
  catch(err) { throw err; }
}