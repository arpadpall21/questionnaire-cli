import * as readline from 'node:readline';
import color from './color.mjs';

let currentQuestionIdx = 0;
let totalCorrectAnsers = 0;
let totalFailedAnswers = 0;

const currentQuestionState = {
  questionIdx: -1,
  nrOfAnswers: 0,
  selectedAnswer: 0,
};

export default function questionHandler(readlineInterface, questionPool, key) {
  const currentQuestion = questionPool[currentQuestionIdx];

  if (currentQuestionIdx !== currentQuestionState.questionIdx) {
    readlineInterface.write(`${currentQuestion.question}\n`);

    Object.entries(currentQuestion.answers).forEach(([key, { answer }], i) => {
      currentQuestionState.nrOfAnswers++;
      if (i === 0) {
        readlineInterface.write(`${color.green}  ${answer} ◄\n${color.reset}`);
        return;
      }
      readlineInterface.write(`  ${answer}\n`);
    });

    currentQuestionState.questionIdx = currentQuestionIdx;
    currentQuestionState.selectedAnswer = 0;
  } else {
    currentQuestionState.selectedAnswer++           // todo

    readline.cursorTo(readlineInterface.output, 0);
    readline.moveCursor(readlineInterface.output, 0, -currentQuestionState.nrOfAnswers);
    readline.clearScreenDown(readlineInterface.output);

    Object.entries(currentQuestion.answers).forEach(([key, { answer }], i) => {
      if (i === currentQuestionState.selectedAnswer) {
        readlineInterface.write(`${color.green}  ${answer} ◄\n${color.reset}`);
        return;
      }
      readlineInterface.write(`  ${answer}\n`);
    });
  }

  return false;
}
