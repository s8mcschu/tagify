import { QuestionnaireCollection } from "../../types/Questionnaires";
import { GamificationDescriptor } from "../../types/Step";
import { getCurrentUserStep } from "./progress";
import { Tag } from "@prisma/client";
import prisma from "../dbHandler";

export async function addUserQuestionnaires(uuid: string, obj: QuestionnaireCollection) {
  try {
    for(const [key, value] of Object.entries(obj)) {
      const questionnaireIdx = await prisma.userQuestionnaire.count({
        where: {
          user: uuid,
          questionnaire: key
        }
      });

      await prisma.user.update({
        where: { uuid },
        data: {
          userQuestionnaires: {
            create: {
              questionnaire: key,
              number: questionnaireIdx + 1,
              answers: JSON.stringify(value)
            }
          }
        }
      });
    }
  }
  catch (err) { throw err; }
}

export async function addUserTags(uuid: string, tags: Tag[]) {
  try {
    const user = await prisma.user.findUnique({
      where: { uuid },
      include: {
        tags: true
      }
    });


    if(tags.length > 0 && user?.tags.filter(tag => tag.resource === tags[0].resource).length === 0) {
      await prisma.$transaction(
        tags.map((tag) => {
          return prisma.user.update({
            where: { uuid },
            data: {
              tags: {
                connectOrCreate: {
                  where: {
                    resource_value: {
                      resource: tag.resource,
                      value: tag.value
                    }
                  },
                  create: {
                    resource: tag.resource,
                    value: tag.value
                  }
                }
              }
            }
          });
        })
      );
    }
    else throw "Already Tagged";
  }
  catch (err) { throw err; }
}

export async function getUserTagsAll(uuid: string) {
  try {
    const tags = await prisma.tag.findMany({
      where: {
        users: {
          some: { uuid }
        }
      },
      select: {
        resource: true,
        value: true,
        quality: true
      }
    });
    
    return tags;  
  }
  catch (err) { throw err; }
}

export async function getUserTagsCurrentStep(uuid: string) {
  try {
    const step = await getCurrentUserStep(uuid);
    if(step.page === "tagging") {
      const stepContent = step.content as GamificationDescriptor;
      const resources = stepContent.resources;
      const tags = await prisma.tag.findMany({
        where: {
          users: {
            some: { uuid }
          },
          resource: {
            in: resources
          }
        }
      })
      
      return tags;
    }
  
    return [];  
  }
  catch (err) { throw err; }
}
