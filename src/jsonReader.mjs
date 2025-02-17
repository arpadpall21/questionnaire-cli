import fs from 'node:fs';

export const appConfig = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
export const appMessages = JSON.parse(fs.readFileSync('./appContent/message.json', 'utf-8'));
export const questionPool = JSON.parse(fs.readFileSync('./appContent/questionPool.json', 'utf-8'));
