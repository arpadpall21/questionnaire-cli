import fs from 'node:fs';
import * as readline from 'node:readline';
import randomQuestionPicker from './misc/randomQestionPicker.mjs';
import config from './config.mjs';
import color from './misc/color.mjs';

const { welcome, roules, passMessage, failMessage } = JSON.parse(fs.readFileSync('./content/misc.json', 'utf-8'));

const readLineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

readLineInterface.output.write('\x1B[?25l');

process.stdout.on('data', (data) => {
  const key = data.toString()
  console.log(data)
  
  if (data.toString() === 'q') {
    // readLineInterface.close();
    process.exit()
  }
})



// readline.cursorTo(readLineInterface.output, 0);
//     // Clear the current line
//     readline.clearLine(readLineInterface.output, 0);

// console.log(config.minCorrectAnswers)


const startTestYes = `  ${color.green}yes ◄${color.reset}\n  no`;
const startTestNo = '  yes\n  no◄';

readLineInterface.write(`${welcome}\n`);
readLineInterface.write(`${roules}\n\nPress 'q' to exit the program\n\n`);



const requiredCorrectAnswers = config.displayCurrentSuccessRate
  ? `Required correct answers: ${config.minCorrectAnswers}\n`
  : '\n';
readLineInterface.write(`Total questions: ${config.numberOfQuestions}\n${requiredCorrectAnswers}`);




readLineInterface.write(`Are you ready to start?\n${startTestYes}`);


readline.cursorTo(readLineInterface.output, 0);
readline.moveCursor(readLineInterface.output, 0, -1);

readline.clearScreenDown(readLineInterface.output);
