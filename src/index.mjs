import fs from 'node:fs';
import * as readline from 'node:readline';
import mixQuestions from './misc/questionMixer.mjs';
import questionHandler from './misc/questionHandler.mjs';
import config from './config.mjs';
import { keyFromStdoutData } from './misc/helpers.mjs';

const { welcomeMessage, roulesMessage, passMessage, failMessage } = JSON.parse(
  fs.readFileSync('./content/misc.json', 'utf-8'),
);

const startQuestion = {
  question: 'Are you ready to start?',
  answers: { yes: { answer: 'yes' }, no: { answer: 'no' } },
};
const questionPool = [startQuestion, ...mixQuestions()];

const readLineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

readLineInterface.output.write('\x1B[?25l'); // hide cursor

process.stdout.on('data', (data) => {
  const key = keyFromStdoutData(data);

  if (key === 'exit') {
    readLineInterface.output.write('\x1B[?25h'); // show cursor
    readLineInterface.close();
    process.exit();
  }

  questionHandler(questionPool, key);
});

readLineInterface.write(`${welcomeMessage}\n`);
readLineInterface.write(`${roulesMessage}\n\nPress 'q' to exit the program\n\n`);

const requiredCorrectAnswers = config.displayCurrentSuccessRate
  ? `Required correct answers: ${config.minCorrectAnswers}\n`
  : '\n';
readLineInterface.write(`Total questions: ${config.numberOfQuestions}\n${requiredCorrectAnswers}`);

questionHandler(questionPool);
