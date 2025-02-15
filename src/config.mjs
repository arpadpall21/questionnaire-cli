import fs from 'node:fs';

export default JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
