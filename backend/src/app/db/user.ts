import { v4 as uuidv4 } from 'uuid';
import prisma from '../dbHandler';
import { Groups } from '../../types/Groups'


export async function createAndAssignUser(givenUuid?: string): Promise<string> {
  try {
    const uuid = givenUuid ? givenUuid : uuidv4();
    const group = await getGroupWithLowestCount();
    await prisma.user.create({
      data: {
        uuid: uuid,
        group: group
      }
    });

    return uuid;
  }
  catch(err) { throw err; }
}

export async function getUser(uuid: string) {
  try {
    return await prisma.user.findUnique({
      where: { uuid }
    })
  }
  catch(err) { throw err; }
}

export async function saveUserConsent(uuid: string): Promise<void> {
  try {
    await prisma.user.update({
      where: { uuid },
      data: {
        consent: true
      }
    });
  }
  catch(err) { throw err; }
}

export async function revokeUserConsent(uuid: string): Promise<void> {
  try {
    await prisma.user.update({
      where: { uuid },
      data: {
        consent: false
      }
    });
  }
  catch(err) { throw err; }
}

export async function abortUser(uuid: string): Promise<void> {
  try {
    await prisma.user.update({
      where: { uuid },
      data: {
        consent: false,
        aborted: true,
        finished: new Date()
      }
    });
  }
  catch(err) { throw err; }
}


export async function addCalibration(uuid: string, num: number): Promise<void> {
  try {
    await prisma.user.update({
      where: { uuid },
      data: {
        soundCalibration: num
      }
    });
  }
  catch(err) { throw err; }
}

async function getGroupWithLowestCount() {
  try {
    const groups = await prisma.group.findMany({
      select: {
        name: true
      }
    });

    const validUsers = await prisma.user.findMany({
      where: {
        aborted: false
      },
      select: {
        group: true
      }
    });

    const counts: Groups = {};
    for(let group of groups) {
      counts[group.name] = 0;
    }

    for(let user of validUsers) {
      counts[user.group]++;
    }

    let lowestGroup: string | undefined;
    let count = Infinity;
    for(let [name, value] of Object.entries(counts)) {
      if(value < count) {
        count = value;
        lowestGroup = name;
      }
    }

    if(!lowestGroup) throw "GroupCountError";
    return lowestGroup;
  }
  catch(err) { throw err; }
}
