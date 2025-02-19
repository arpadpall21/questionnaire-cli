import fs from 'node:fs';
import { appConfig } from '../jsonReader.mjs';

export default function mixQuestions(questionPool) {
  const nrOfPickedQuestions =
    appConfig.numberOfQuestions > questionPool.length ? questionPool.length : appConfig.numberOfQuestions;
  const shuffledQuestionPool = questionPool.sort(() => Math.random() * 2 - 1);

  return shuffledQuestionPool.slice(0, nrOfPickedQuestions);
}
