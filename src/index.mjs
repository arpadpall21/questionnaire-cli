import fs from 'node:fs';
import readline from 'node:readline';
import randomQuestionPicker from './misc/randomQestionPicker.mjs';
import config from './config.mjs';
import color from './misc/color.mjs';

const { welcome, roules, passMessage, failMessage } = JSON.parse(fs.readFileSync('./content/misc.json', 'utf-8'));

const readLineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
});

// process.stdin.setRawMode(true);
// process.stdin.resume();

// process.stdin.on('data', (key) => {
//   console.log('stdin key pressed')
//   console.log(key)
// })

process.stdin.on('keypress', (key) => {
  console.log('stout key pressed')
  console.log(key)
})

process.stdin.on('data', (data) => {
  console.log('stout data')
  console.log(data.toString())
})


console.log(config.minCorrectAnswers)


const startTestYes = `  ${color.green}yes ◄${color.reset}\n  no`;
const startTestNo = '  yes\n  no◄';

readLineInterface.write(`${welcome}\n`);
readLineInterface.write(`${roules}\n\n`);

const requiredCorrectAnswers = config.displayCurrentSuccessRate
  ? `(Required correct answers: ${config.minCorrectAnswers})\n`
  : '\n';
readLineInterface.write(`Total questions: ${config.numberOfQuestions} ${requiredCorrectAnswers}`);

readLineInterface.write(`Are you ready to start?\n${startTestYes}`);
