import { PrismaClient } from '@prisma/client';
import fs, { write } from "fs";
import path from 'path';

const prisma = new PrismaClient();

async function userData() {
  const data: any[][] = [];

  const users = await prisma.user.findMany({
    where: {
      consent: true,
      aborted: false,
      finished: { not: null }
    },
    select: {
      uuid: true,
      group: true,
      consent: true,
      soundCalibration: true,
      aborted: true,
      created: true,
      finished: true,
      tags: true,
      userQuestionnaires: {
        where: {
          number: 1
        }
      }
    }
  });

  const _user = users[0];
  const row: any[] = []
  let prolificId = "";
  let demographics = {};
  let SAM = {};
  let IMI = {};
  let AFSS = {};

  for(let questionnaire of _user.userQuestionnaires) {
    const name = questionnaire.questionnaire;
    const answers = JSON.parse(questionnaire.answers);
    if(name === "Prolific ID") prolificId = answers["prolific-id"];
    else if(name === "Demographics") demographics = answers;
    else if(name === "Self-Assessment Manikin") SAM = answers;
    else {
      const short = Object.keys(answers)[0];
      if(short === "IMI") IMI = answers[short];
      else if(short === "AFSS") AFSS = answers[short];
    }
  }

  row.push("uuid");
  row.push("prolificId");
  row.push("group");
  row.push("consent");
  row.push("aborted");
  row.push("created");
  row.push("finished");
  row.push("duration");
  row.push("soundCalibration");
  row.push("tags");
  row.push("images");
  
  let keys = Object.keys(demographics).sort();
  for(const key of keys) {
    row.push(key);
  }

  keys = Object.keys(SAM).sort();
  for(const key of keys) {
    row.push(key);
  }

  keys = Object.keys(IMI).sort();
  for(const key of keys) {
    row.push(key);
  }

  keys = Object.keys(AFSS).sort();
  for(const key of keys) {
    row.push(key);
  }

  data.push(row);
 

  for(let user of users) {
    const row: any[] = []
    let prolificId = "";
    let demographics: any = {};
    let SAM: any = {};
    let IMI: any = {};
    let AFSS: any = {};

    for(let questionnaire of user.userQuestionnaires) {
      const name = questionnaire.questionnaire;
      const answers = JSON.parse(questionnaire.answers);
      if(name === "Prolific ID") prolificId = answers["prolific-id"];
      else if(name === "Demographics") demographics = answers;
      else if(name === "Self-Assessment Manikin") SAM = answers;
      else {
        const short = Object.keys(answers)[0];
        if(short === "IMI") IMI = answers[short];
        else if(short === "AFSS") AFSS = answers[short];
      }
    }

    row.push(user.uuid);
    row.push(prolificId);
    row.push(user.group);
    row.push(user.consent);
    row.push(user.aborted);
    row.push(user.created);
    row.push(user.finished);
    row.push((((user.finished as any) - (user.created as any)) / (1000)).toFixed(2));
    row.push(user.soundCalibration);

    const tutorialImg = ["im1443.jpg", "im748.jpg", "im21636.jpg"];
    const filteredTags = user.tags.filter(tag => !tutorialImg.includes(tag.resource))
    row.push(filteredTags.length);

    const uniqueImages: string[] = [];
    for(let tag of filteredTags) {
      if(!uniqueImages.includes(tag.resource)) uniqueImages.push(tag.resource);
    }

    row.push(uniqueImages.length);

    keys = Object.keys(demographics).sort();
    for(let key of keys) {
      row.push(demographics[key]);
    }

    keys = Object.keys(SAM).sort();
    for(let key of keys) {
      row.push(SAM[key]);
    }

    keys = Object.keys(IMI).sort();
    for(let key of keys) {
      row.push(IMI[key]);
    }

    keys = Object.keys(AFSS).sort();
    for(let key of keys) {
      row.push(AFSS[key]);
    }

    data.push(row);
  }

  writeCSV("participants.csv", data);
}

async function imageData() {
  const data: any[][] = [["Resource", "UniqueTags", "AvgTagsPerUser"]];
  const imageData: {[key: string]: {uniqueTags: number, avgTagsPerUser: number}} = {};

  const uniqueNumTagsPerImage = await prisma.tag.groupBy({
    by: ['resource'],
    where: {
      users: {
        every: {
          consent: true,
          aborted: false,
          finished: { not: null }
        }
      }
    },
    _count: {
      resource: true
    }
  });

  for(let resource of uniqueNumTagsPerImage) {
    imageData[resource.resource] = {
      uniqueTags: resource._count.resource,
      avgTagsPerUser: 0
    }
  }

  const users = await prisma.user.findMany({
    where: {
      consent: true,
      aborted: false,
      finished: { not: null }
    },
    select: {
      tags: true
    },
  })

  const images: {[key: string]: {numTags: number, numUsers: number}} = {};
  for(let user of users) {
    const userImages: {[key: string]: number} = {};

    for(let tag of user.tags) {
      if(!userImages[tag.resource]) userImages[tag.resource] = 0;
      userImages[tag.resource]++;
    }

    for(const [key, value] of Object.entries(userImages)) {
      if(!images[key]) images[key] = {numTags: 0, numUsers: 0};
      images[key].numTags += value;
      images[key].numUsers++;
    }
  }

  for(const [key, value] of Object.entries(images)) {
    imageData[key].avgTagsPerUser = value.numTags / value.numUsers;
  }
  
  for(const [key, value] of Object.entries(imageData)) {
    data.push([
      key,
      value.uniqueTags,
      value.avgTagsPerUser.toFixed(2).replace(".", ",")
    ])
  }

  writeCSV('images.csv', data);
}


async function writeCSV(name: string, data: any[][]) {
  const folderExists = fs.readdirSync(path.join(__dirname, '..')).find(folder => folder === 'output') ? true : false;
  if(!folderExists) {
    fs.mkdirSync(path.join(__dirname, '..', 'output'), { recursive: true });
  }

  let fileString = "";
  for(let row of data) {
    fileString += row.join(";");
    fileString += "\n";
  }

  fs.writeFileSync(path.join(__dirname, '..', 'output', name), fileString);
}

userData();
imageData();