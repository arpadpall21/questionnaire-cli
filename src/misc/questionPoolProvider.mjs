import fs from 'node:fs';
import { appConfig, questionPool } from '../jsonReader.mjs';

export default function questionPoolProvider(mixQuestions) {
  const nrOfPickedQuestions =
    appConfig.numberOfQuestions > questionPool.length ? questionPool.length : appConfig.numberOfQuestions;
  const result = mixQuestions ? questionPool.sort(() => Math.random() * 2 - 1) : questionPool;

  return result.slice(0, nrOfPickedQuestions);
}
