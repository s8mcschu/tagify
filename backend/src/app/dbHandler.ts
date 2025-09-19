import fs from 'fs';
import path from 'path';
import { logError, logInfo } from './logger';
import { PrismaClient } from '@prisma/client';

const scripts = fs.readdirSync(path.resolve(__dirname, '..', 'assets', 'scripts'))
  .filter(fileName => fileName.split(".")[1] === "json")
  .map(fileName => fileName.split(".")[0]);

const prisma = new PrismaClient({
    log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event',
      level: 'error',
    },
    {
      emit: 'event',
      level: 'info',
    },
    {
      emit: 'event',
      level: 'warn',
    },
  ]
});

prisma.$on('query', (e) => {
  logInfo('DB', 'Query: ' + e.query)
  logInfo('DB', 'Params: ' + e.params)
  logInfo('DB', 'Duration: ' + e.duration + 'ms')
})

prisma.$on('error', (e) => {
  logError('DB', 'Query: ' + e.message)
})

prisma.$on('info', (e) => {
  logError('DB', 'Query: ' + e.message)
})

prisma.$on('warn', (e) => {
  logError('DB', 'Query: ' + e.message)
})


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