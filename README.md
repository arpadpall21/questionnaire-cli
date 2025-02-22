# Questionnaire CLI

## Description
  - Configurable command-line interface (CLI) questionnaire that guides the user through a series of customizable questions. For instance, the example questions are relevant to a JavaScript interview.
  - Additionally, application messages, such as welcome messages and test explanations, can be configured to tailor the testing experience.
  - The interface is color-coded to enhance the user experience.

## Requirements
 - Node.js v22.9.0+

## Setup
  - Run `npm install`

## Usage
  - Start the app with `npm start`

### Content Configuration
  - The `appContent/questionPool.json` contains test questions
  - The `appContent/message.json` contains test messages (like welcomme and test rules)

### Test Configuration
  - The `config.json` configures the test flow
```
{
  "numberOfQuestions": 10,                  // number of test questions
  "minCorrectAnswers": 8,                   // minimum correct answers requred to pass the test
  "mixQuestions": true,                     // questions are presented randomly (false = sequencial)
  "displayCurrentSuccessRate": true,        // displays the current correct and incorrect answers during the test
  "failFast": false                         // terminates the test as soon as incorrect answer treshold reached
}
```