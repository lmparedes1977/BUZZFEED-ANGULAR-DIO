import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css'],
})
export class QuizzComponent implements OnInit {
  title: string = '';

  questions: any;
  selectedQuestion: any;

  answers: string[] = [];
  selecetdAnswer: string = '';

  questionIndex: number = 0;
  numberOfQuestions: number = 0;

  finished: boolean = false;

  result: string = '';

  constructor() {}

  ngOnInit(): void {
    if (quizz_questions) {
      this.finished = false;
      this.title = quizz_questions.title;
      this.questions = quizz_questions.questions;
      this.selectedQuestion = this.questions[this.questionIndex];
      this.numberOfQuestions = this.questions.length;
    }
  }

  playerChoise(choise: string) {
    this.answers.push(choise);
    this.nextQuestion();
  }

  nextQuestion() {
    this.questionIndex += 1;
    if (this.questionIndex < this.numberOfQuestions) {
      this.selectedQuestion = this.questions[this.questionIndex];
    } else {
      setTimeout(() => {
        this.finished = true;
        this.checkResult(this.answers);
      }, 750);
    }
  }

  checkResult(answers: string[]) {
    const answerA = answers.filter((answer) => answer === 'A');
    if (answerA.length > answers.length / 2) {
      this.selecetdAnswer = quizz_questions.results.A;
    } else {
      this.selecetdAnswer = quizz_questions.results.B;
    }
  }
}
