import fs from 'node:fs';

export const appConfig = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
export const appMessages = JSON.parse(fs.readFileSync('./appContent/messages.json', 'utf-8'));
