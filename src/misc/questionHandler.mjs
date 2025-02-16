import color from './misc/color.mjs';

const questionPoolState = {
  currentQuestion: 0,
  correctAnsers: 0,
  failedAnswers: 0,
};
const currentQuestionState = {};


export default function questionHandler(key) {
  readLineInterface.write(`${questionPool[questionPoolState.currentQuestion]}\n`);
}




// const startTestYes = `  ${color.green}yes ◄${color.reset}\n  no\n`;
// const startTestNo = '  yes\n  no◄\n';



// readLineInterface.write(`Are you ready to start?\n${startTestYes}`);





// readline.cursorTo(readLineInterface.output, 0);
// readline.moveCursor(readLineInterface.output, 0, -1);

// readline.clearScreenDown(readLineInterface.output);

