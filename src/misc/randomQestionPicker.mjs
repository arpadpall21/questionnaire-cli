import config from '../config.mjs';

export default function randomQuestionPicker() {
  const questionPool = JSON.parse(fs.readFileSync('./content/questionPool.json', 'utf-8'));
  const nrOfPickedQuestions =
    config.numberOfQuestions > questionPool.length ? questionPool.length : config.numberOfQuestions;
  const shuffledQuestionPool = questionPool.sort(() => Math.random() * 2 - 1);

  return shuffledQuestionPool.slice(nrOfPickedQuestions);
}
