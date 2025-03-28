import * as readline from 'node:readline';
import color from './color.mjs';
import { appConfig, appMessages } from '../jsonReader.mjs';

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
        processCorrectAnswers(questionPool[currentQuestionIdx].answers);
        if (
          (appConfig.failFast && totalIncorrectAnswers > appConfig.numberOfQuestions - appConfig.minCorrectAnswers) ||
          questionPool.length <= currentQuestionIdx + 1
        ) {
          renderEndResult(readlineInterface, totalCorrectAnsers >= appConfig.minCorrectAnswers);
          return true;
        }
        currentQuestionIdx += 1;
      } else {
        questionPool[currentQuestionIdx].answers[questionState.selectedAnswer].checked =
          !questionPool[currentQuestionIdx].answers[questionState.selectedAnswer].checked;
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
    const check = checked ? '✅' : '  ';
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

function processCorrectAnswers(answers) {
  if (answers.every(({ correct, checked }) => correct === !!checked)) {
    totalCorrectAnsers += 1;
  } else {
    totalIncorrectAnswers += 1;
  }
}

function renderEndResult(readlineInterface, testPassed) {
  const resultMessage = testPassed ? appMessages.pass : appMessages.fail;
  const messageColor = testPassed ? color.green : color.red;

  readlineInterface.write(`\n\n${messageColor}${resultMessage}\n`);
  readlineInterface.write(`Correct answer: ${totalCorrectAnsers}\n`);
  readlineInterface.write(`Incorrect answers: ${totalIncorrectAnswers}${color.reset}\n`);
}
