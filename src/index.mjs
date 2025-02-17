import fs from 'node:fs';
import * as readline from 'node:readline';
import mixQuestions from './misc/questionMixer.mjs';
import questionHandler from './misc/questionHandler.mjs';
import { appConfig, appMessages } from './configAndMessages.mjs';
import { keyFromStdoutData } from './misc/helpers.mjs';


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

  questionHandler(readLineInterface, questionPool, key);
});

readLineInterface.write(`${appMessages.welcomeMessage}\n`);
readLineInterface.write(`${appMessages.roulesMessage}\n\nPress 'q' to exit the program\n\n`);

const requiredCorrectAnswers = config.displayCurrentSuccessRate
  ? `Required correct answers: ${config.minCorrectAnswers}\n`
  : '\n';
readLineInterface.write(`Total questions: ${config.numberOfQuestions}\n${requiredCorrectAnswers}`);

questionHandler(readLineInterface, questionPool);
