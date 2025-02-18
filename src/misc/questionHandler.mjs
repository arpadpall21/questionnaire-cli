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
  if (key === 'enter') {
    if (questionState.selectedAnswer === 1 && currentQuestionIdx === 0) {
      readlineInterface.write(`${color.yellow}\nGoodbye!\n${color.reset}`);
      return true;
    } else {
      currentQuestionIdx += 1;
    }
  }

  const currentQuestion = questionPool[currentQuestionIdx];

  if (currentQuestionIdx !== questionState.questionIdx) {
    questionState.questionIdx = currentQuestionIdx;
    questionState.selectedAnswer = 0;
    questionState.nrOfAnswers = 0;

    readlineInterface.write(`${color.cyan}\n${currentQuestion.question}\n${color.reset}`);
    renderAnswers(readlineInterface, currentQuestion.answers, questionState.selectedAnswer, true);
  } else {
    if (key === 'up') {
      if (questionState.selectedAnswer <= 0) {
        questionState.selectedAnswer = questionState.nrOfAnswers - 1;
      } else {
        questionState.selectedAnswer -= 1;
      }
    }
    if (key === 'down') {
      if (questionState.selectedAnswer >= questionState.nrOfAnswers - 1) {
        questionState.selectedAnswer = 0;
      } else {
        questionState.selectedAnswer += 1;
      }
    }

    readline.cursorTo(readlineInterface.output, 0);
    readline.moveCursor(readlineInterface.output, 0, -questionState.nrOfAnswers);
    readline.clearScreenDown(readlineInterface.output);

    renderAnswers(readlineInterface, currentQuestion.answers, questionState.selectedAnswer);
  }

  return false;
}

function renderAnswers(readlineInterface, answers, selectedAnswerIdx, countAnswers) {
  Object.entries(answers).forEach(([key, { answer }], i) => {
    if (countAnswers) {
      questionState.nrOfAnswers++;
    }
    if (i === selectedAnswerIdx) {
      readlineInterface.write(`${color.green}  ${answer} ◄\n${color.reset}`);
      return;
    }
    readlineInterface.write(`  ${answer}\n`);
  });
}





// ✅
// ☑
// ☐