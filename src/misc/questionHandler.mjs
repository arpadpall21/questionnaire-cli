import color from './color.mjs';

const currentQuestionIdx = 0;
const totalCorrectAnsers = 0;
const totalFailedAnswers = 0;

const currentQuestionState = {
  nrOfAnswers: 0,
  selectedAnswer: 0,
};

export default function questionHandler(readLineInterface, questionPool, key) {
  const currentQuestion = questionPool[currentQuestionIdx];

  readLineInterface.write(`${currentQuestion.question}\n`);
  Object.entries(currentQuestion.answers).forEach(([key, { answer }], i) => {
    if (i === currentQuestionState.selectedAnswer) {
      readLineInterface.write(`${color.green}  ${answer} ◄\n${color.reset}`);
      return;
    }
    readLineInterface.write(`  ${answer}\n`);
  });

  
  // for (let key in currentQuestion.answers) {                  // Process new question
  //   readLineInterface.write(`${color.green}  ${currentQuestion.answers[key].answer} ◄\n${color.reset}`);      // selected answer
    
    
  //   readLineInterface.write(`  ${currentQuestion.answers[key].answer}\n`);      // not selected answer
    
    
    
  //   currentQuestionState.nrOfAnswers++;
  // }
  
  return false;
}




// const startTestYes = `  ${color.green}yes ◄${color.reset}\n  no\n`;
// const startTestNo = '  yes\n  no◄\n';



// readLineInterface.write(`Are you ready to start?\n${startTestYes}`);





// readline.cursorTo(readLineInterface.output, 0);
// readline.moveCursor(readLineInterface.output, 0, -1);

// readline.clearScreenDown(readLineInterface.output);

