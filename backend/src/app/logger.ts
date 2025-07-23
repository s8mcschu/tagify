import logger from "npmlog";
import fs from "fs";
import path from "path";

// Create log directory
if(!fs.readdirSync(path.join(__dirname, '..', '..')).includes('logs')) {
  fs.mkdirSync(path.join(__dirname, '..', '..', 'logs'), { recursive: true });
}

const existingLogs = fs.readdirSync(path.join(__dirname, '..', '..', 'logs'));

const date = new Date();
let logStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
let logNr = 1;
for(let existingLog of existingLogs) {
  if(existingLog.startsWith(logStr)) logNr++;
}
logStr += `-${logNr}`;

const fileStream = fs.createWriteStream(path.join(__dirname, '..', '..', 'logs', logStr + ".txt"));

logger.addListener('log', (logLine: any) => {
  const now = new Date();
  fileStream.write(`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ${logLine.prefix} [${logLine.level}]: ${logLine.message}\n`);
});

export function logInfo(from: string, message: string, ...args: any[]) {
  args = args.map((arg) => { return arg && typeof arg === 'object' ? JSON.stringify(arg) : arg });
  logger.info(from, message, ...args);
}

export function logWarn(from: string, message: string, ...args: any[]) {
  args = args.map((arg) => { return arg && typeof arg === 'object' ? JSON.stringify(arg) : arg });
  logger.warn(from, message, ...args);
}

export function logError(from: string, message: string, ...args: any[]) {
  args = args.map((arg) => { return arg && typeof arg === 'object' ? JSON.stringify(arg) : arg });
  logger.error(from, message, ...args);
}

export function logHttp(type: string, message: string, ...args: any[]) {
  args = args.map((arg) => { return arg && typeof arg === 'object' ? JSON.stringify(arg) : arg });
  logger.http(type, message, ...args);
}

export function closeLogger() {
  logInfo('Log', 'Closing Filestream');
  fileStream.close(); 
}

export function loggerMiddlewareExpress(req: any, res: any, next: any) {
  let uuid = req.cookies["tp-uuid"];
  logHttp(req.method, `'${req.url}' FROM '${uuid ? uuid : 'unknown'}', BODY:`, req.body);

  const oldWrite = res.write
  const oldEnd = res.end;

  const chunks: any[] = [];

  res.write = (chunk: any, ...args: any) => {
    chunks.push(chunk);
    return oldWrite.apply(res, [chunk, ...args]);
  };

  
  res.end = (chunk: any, ...args: any) => {
    if (chunk) {
      chunks.push(chunk);
    }
    const body = Buffer.concat(chunks).toString('utf8');
    logHttp('RES', `To '${uuid}', BODY`, body);
    return oldEnd.apply(res, [chunk, ...args]);
  };

  next();
}