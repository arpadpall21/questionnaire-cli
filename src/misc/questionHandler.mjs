import * as readline from 'node:readline';
import color from './color.mjs';
import { appConfig } from '../jsonReader.mjs';

let currentQuestionIdx = 0;
let totalCorrectAnsers = 0;
let totalIncorrectAnswers = 0;

const questionState = {
  questionIdx: -1,
  selectedAnswer: 0,
  nrOfAnswers: 0,
};

export default function questionHandler(readlineInterface, questionPool, key) {
  if (key === 'enter') {
    if (currentQuestionIdx === 0) {
      if (questionState.selectedAnswer === 1) {
        readlineInterface.write(`${color.yellow}\nGoodbye!\n${color.reset}`);
        return true;
      }
      currentQuestionIdx += 1;
    } else {
      if (questionState.nrOfAnswers === questionState.selectedAnswer + 1) {
        currentQuestionIdx += 1;
      } else {
        const currentQuestion = questionPool[currentQuestionIdx];
        currentQuestion.answers[questionState.selectedAnswer].checked =
          !currentQuestion.answers[questionState.selectedAnswer].checked;
      }
    }
  }

  const currentQuestion = questionPool[currentQuestionIdx];

  if (currentQuestionIdx !== questionState.questionIdx) {
    questionState.questionIdx = currentQuestionIdx;
    questionState.selectedAnswer = 0;
    questionState.nrOfAnswers = currentQuestionIdx === 0 ? 0 : 1;

    if (currentQuestionIdx > 0) {
      readlineInterface.write(`\n----- Question: ${currentQuestionIdx}/${appConfig.numberOfQuestions} -----\n`);
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

  answers.forEach(({ answer, checked }, i) => {
    const check = checked ? '✅' : ' ';
    const prefix = currentQuestionIdx > 0 ? `  ${check} ${i + 1}) ` : `  ${check} `;

    if (countAnswers) {
      questionState.nrOfAnswers++;
    }
    if (i === questionState.selectedAnswer) {
      readlineInterface.write(`${color.green}${'► ' + prefix.substring(2)}${answer}\n${color.reset}`);
      return;
    }
    readlineInterface.write(`${prefix}${answer}\n`);
  });

  if (currentQuestionIdx > 0) {
    if (questionState.nrOfAnswers === questionState.selectedAnswer + 1) {
      readlineInterface.write(`${color.green}► next question >\n${color.reset}`);
      return;
    }

    readlineInterface.write(`${color.yellow}  next question >\n${color.reset}`);
  }
}
