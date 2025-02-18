import * as readline from 'node:readline';
import color from './color.mjs';
import { appConfig } from '../jsonReader.mjs';

let currentQuestionIdx = 0;
let totalCorrectAnsers = 0;
let totalIncorrectAnswers = 0;

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

  console.log(currentQuestion)

  if (currentQuestionIdx !== questionState.questionIdx) {
    questionState.questionIdx = currentQuestionIdx;
    questionState.selectedAnswer = 0;
    questionState.nrOfAnswers = 0;

    if (currentQuestionIdx > 0) {
      readlineInterface.write(`\n--- Question: ${currentQuestionIdx}/${appConfig.numberOfQuestions} ---\n`);
      if (appConfig.displayCurrentSuccessRate) {
        readlineInterface.write(`Correct answers so far: ${totalCorrectAnsers}\n`);
        readlineInterface.write(`Incorrect answers so far: ${totalIncorrectAnswers}\n`);
      }
    }

    readlineInterface.write(`${color.cyan}${currentQuestion.question}\n${color.reset}`);
    renderAnswers(readlineInterface, currentQuestion.answers, true);
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

    renderAnswers(readlineInterface, currentQuestion.answers, false, true);
  }

  return false;
}

function renderAnswers(readlineInterface, answers, countAnswers, rerender) {
  if (rerender) {
    readline.cursorTo(readlineInterface.output, 0);
    readline.moveCursor(readlineInterface.output, 0, -questionState.nrOfAnswers);
    readline.clearScreenDown(readlineInterface.output);
  }

  Object.entries(answers).forEach(([key, { answer }], i) => {
    const prefix = currentQuestionIdx > 0 ? `${key}) ` : '';

    if (countAnswers) {
      questionState.nrOfAnswers++;
    }
    if (i === questionState.selectedAnswer) {
      readlineInterface.write(`${color.green}${prefix}${answer} ◄\n${color.reset}`);
      return;
    }
    readlineInterface.write(`${prefix}${answer}\n`);
  });
  
  console.log()
}





// ✅
// ☑
// ☐