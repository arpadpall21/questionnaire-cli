import color from './color.mjs';

const currentQuestion = 0;
const correctAnsers = 0;
const failedAnswers = 0;

const currentQuestionState = {
  nrOfAnswers: 0,
};

export default function questionHandler(readLineInterface, questionPool, key) {
  readLineInterface.write(`${questionPool[currentQuestion].question}\n`);
}




// const startTestYes = `  ${color.green}yes ◄${color.reset}\n  no\n`;
// const startTestNo = '  yes\n  no◄\n';



// readLineInterface.write(`Are you ready to start?\n${startTestYes}`);





// readline.cursorTo(readLineInterface.output, 0);
// readline.moveCursor(readLineInterface.output, 0, -1);

// readline.clearScreenDown(readLineInterface.output);

