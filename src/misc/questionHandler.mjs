import * as readline from 'node:readline';
import color from './color.mjs';

let currentQuestionIdx = 0;
let totalCorrectAnsers = 0;
let totalFailedAnswers = 0;

const questionState = {
  questionIdx: -1,
  nrOfAnswers: 0,
  selectedAnswer: 0,
};

export default function questionHandler(readlineInterface, questionPool, key) {
  const currentQuestion = questionPool[currentQuestionIdx];

  if (currentQuestionIdx !== questionState.questionIdx) {
    readlineInterface.write(`${currentQuestion.question}\n`);

    Object.entries(currentQuestion.answers).forEach(([key, { answer }], i) => {
      questionState.nrOfAnswers++;
      if (i === 0) {
        readlineInterface.write(`${color.green}  ${answer} ◄\n${color.reset}`);
        return;
      }
      readlineInterface.write(`  ${answer}\n`);
    });

    questionState.questionIdx = currentQuestionIdx;
    questionState.selectedAnswer = 0;
  } else {
    if (key === 'up') {
      if (questionState.selectedAnswer <= 0) {
        questionState.selectedAnswer = questionState.nrOfAnswers - 1;
      } else {
        questionState.selectedAnswer -= 1;
      }
    } else {
      if (questionState.selectedAnswer >= questionState.nrOfAnswers - 1) {
        questionState.selectedAnswer = 0;
      } else {
        questionState.selectedAnswer += 1;
      }
    }

    readline.cursorTo(readlineInterface.output, 0);
    readline.moveCursor(readlineInterface.output, 0, -questionState.nrOfAnswers);
    readline.clearScreenDown(readlineInterface.output);

    Object.entries(currentQuestion.answers).forEach(([key, { answer }], i) => {
      if (i === questionState.selectedAnswer) {
        readlineInterface.write(`${color.green}  ${answer} ◄\n${color.reset}`);
        return;
      }
      readlineInterface.write(`  ${answer}\n`);
    });
  }

  return false;
}
