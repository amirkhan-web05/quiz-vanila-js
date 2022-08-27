const questions = [
  {
    question: 'Какой язык работает в браузере?',
    answers: ['Java', 'C', 'Python', 'JavaScript'],
    correct: 4,
  },
  {
    question: 'Что означает CSS?',
    answers: [
      'Central Style Sheets',
      'Cascading Style Sheets',
      'Cascading Simple Sheets',
      'Cars SUVs Sailboats',
    ],
    correct: 2,
  },
  {
    question: 'Что означает HTML?',
    answers: [
      'Hypertext Markup Language',
      'Hypertext Markdown Language',
      'Hyperloop Machine Language',
      'Helicopters Terminals Motorboats Lamborginis',
    ],
    correct: 1,
  },
  {
    question: 'В каком году был создан JavaScript?',
    answers: ['1996', '1995', '1994', 'все ответы неверные'],
    correct: 2,
  },
];

let questionIndex = 0;
let score = 0;

const questionsElems = document.querySelector('.questions');
const questionText = document.querySelector('.questions__text');
const button = document.querySelector('.question__btn');

const methods = {
  renderQuestion() {
    questionText.textContent = questions[questionIndex].question;
    questions[questionIndex].answers.forEach((answer, index) => {
      const item = document.createElement('button');
      item.classList.add('question__item');
      item.id = index + 1;

      item.innerHTML = answer;

      questionsElems.insertAdjacentElement('beforeend', item);
    });
  },
  answerCheck(event) {
    const userAnswer = parseInt(event.target.id);
    const allButtons = questionsElems.querySelectorAll('.question__item');

    allButtons.forEach((btn) => {
      btn.disabled = true;
    });

    const answer = event.target;

    if (userAnswer === questions[questionIndex].correct) {
      score++;

      answer.classList.add('correct');
      answer.classList.add('disabled-item');
    } else {
      answer.classList.add('disabled-item');
      answer.classList.add('wrong');
    }

    return answer;
  },
  clearPage() {
    questionsElems.innerHTML = '';
    questionText.innerHTML = '';
  },
  nextQuestion(event) {
    if (event.target.dataset.button === 'Button') {
      const listItem = questionsElems.querySelectorAll('.question__item');

      listItem.forEach((list) => {
        if (!list.classList.contains('disabled-item')) {
          return;
        }

        if (questionIndex !== questions.length - 1) {
          questionIndex++;
          methods.clearPage();
          methods.renderQuestion();
        } else {
          methods.clearPage();
          methods.showResult();
          methods.restartQuestion();
        }
      });
    }
  },
  showResult() {
    const h3 = document.createElement('h3');
    h3.classList.add('show__result');
    h3.textContent = `${questions.length} / ${score}`;
    questionsElems.insertAdjacentElement('beforeend', h3);
  },
  restartQuestion() {
    button.remove();
    const restart = document.createElement('button');
    restart.textContent = 'Restart';

    restart.onclick = () => history.go();

    document.body.insertAdjacentElement('beforeend', restart);
  },
};

const createQuestionQuiz = () => {
  methods.renderQuestion();

  button.addEventListener('click', methods.nextQuestion);
  questionsElems.addEventListener('click', methods.answerCheck);
};

createQuestionQuiz();
