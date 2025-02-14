import fs from 'node:fs';
const { numberOfQuestions } = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));

export default function randomQuestionPicker() {
  const questionPool = JSON.parse(fs.readFileSync('./content/questionPool.json', 'utf-8'));
  const nrOfPickedQuestions = numberOfQuestions > questionPool.length ? questionPool.length : numberOfQuestions;
  const shuffledQuestionPool = questionPool.sort(() => Math.random() * 2 - 1);

  return shuffledQuestionPool.slice(nrOfPickedQuestions);
}
