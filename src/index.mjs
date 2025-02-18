import fs from 'node:fs';
import * as readline from 'node:readline';
import mixQuestions from './misc/questionMixer.mjs';
import questionHandler from './misc/questionHandler.mjs';
import { appConfig, appMessages, questionPool as defaultQuestionPool } from './jsonReader.mjs';
import { keyFromStdoutData } from './misc/helpers.mjs';

const startQuestion = {
  question: 'Are you ready to start?',
  answers: { yes: { answer: 'yes' }, no: { answer: 'no' } },
};
// const questionPool = [startQuestion, ...mixQuestions(defaultQuestionPool)];        // TODO
const questionPool = [startQuestion, ...defaultQuestionPool];

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

readlineInterface.output.write('\x1B[?25l'); // hide cursor

process.stdout.on('data', (data) => {
  const key = keyFromStdoutData(data);
  const exit = questionHandler(readlineInterface, questionPool, key);

  if (key === 'exit' || exit) {
    readlineInterface.output.write('\x1B[?25h'); // show cursor
    readlineInterface.close();
    process.exit();
  }
});

readlineInterface.write(`${appMessages.welcome}\n`);
readlineInterface.write(`${appMessages.roules}\n\nPress 'q' to exit the program\n\n`);

const requiredCorrectAnswers = appConfig.displayCurrentSuccessRate
  ? `Required correct answers: ${appConfig.minCorrectAnswers}\n\n`
  : '\n';
readlineInterface.write(`Total questions: ${appConfig.numberOfQuestions}\n${requiredCorrectAnswers}`);

questionHandler(readlineInterface, questionPool);
