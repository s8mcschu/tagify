import fs from 'fs';
import path from 'path';
import { logError, logInfo } from './logger';
import { PrismaClient } from '@prisma/client';

const scripts = fs.readdirSync(path.resolve(__dirname, '..', 'assets', 'scripts'))
  .filter(fileName => fileName.split(".")[1] === "json")
  .map(fileName => fileName.split(".")[0]);

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  logInfo('DB', `Query ${params.model}.${params.action}: ${JSON.stringify(params.args)}`);
  try {
    const result = await next(params);
    logInfo('DB', `Result: ${JSON.stringify(result)}`);
    return result;
  }
  catch(err: any) {
    logError('DB', err);
    throw err;
  }
});

init();

async function init() {
  // Insert groups if not exists
  await prisma.$transaction(
    scripts.map((script) => {
      const sequence = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'assets', 'scripts', script + ".json")).toString());
      return prisma.group.upsert({
        where: {
          name: script
        },
        update: {},
        create: {
          name: script,
          sequenceScript: JSON.stringify(sequence),
          maxStep: sequence.length
        }
      });
    })
  );
}

export async function closeDB() {
  logInfo('DB', 'Closing DB connection');
  await prisma.$disconnect();
}

export default prisma;