import fs from 'node:fs';
import { appConfig, questionPool } from '../jsonReader.mjs';

export default function questionPoolProvider(mixQuestions) {
  const nrOfPickedQuestions =
    appConfig.numberOfQuestions > questionPool.length ? questionPool.length : appConfig.numberOfQuestions;
  const mixedQuestionPool = questionPool.sort(() => Math.random() * 2 - 1);

  return mixedQuestionPool.slice(0, nrOfPickedQuestions);
}
