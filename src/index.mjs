import fs from 'node:fs';
import * as readline from 'node:readline';
import randomQuestionPicker from './misc/randomQestionPicker.mjs';
import config from './config.mjs';
import color from './misc/color.mjs';
import { keyFromStdoutData } from './misc/helpers.mjs';

const { welcomeMessage, roulesMessage, passMessage, failMessage } = JSON.parse(
  fs.readFileSync('./content/misc.json', 'utf-8'),
);

const readLineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

readLineInterface.output.write('\x1B[?25l'); // hide cursor

process.stdout.on('data', (data) => {
  const key = keyFromStdoutData(data);

  if (key === 'exit') {
    process.exit();
  }
})



// readline.cursorTo(readLineInterface.output, 0);
//     // Clear the current line
//     readline.clearLine(readLineInterface.output, 0);

// console.log(config.minCorrectAnswers)


const startTestYes = `  ${color.green}yes ◄${color.reset}\n  no\n`;
const startTestNo = '  yes\n  no◄\n';

readLineInterface.write(`${welcomeMessage}\n`);
readLineInterface.write(`${roulesMessage}\n\nPress 'q' to exit the program\n\n`);



const requiredCorrectAnswers = config.displayCurrentSuccessRate
  ? `Required correct answers: ${config.minCorrectAnswers}\n`
  : '\n';
readLineInterface.write(`Total questions: ${config.numberOfQuestions}\n${requiredCorrectAnswers}`);




readLineInterface.write(`Are you ready to start?\n${startTestYes}`);


// readline.cursorTo(readLineInterface.output, 0);
// readline.moveCursor(readLineInterface.output, 0, -1);

// readline.clearScreenDown(readLineInterface.output);
