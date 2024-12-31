import { Component, OnInit } from '@angular/core';
import questions from '../../../assets/data/questions.json';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.scss'
})

export class QuizzComponent implements OnInit {
  title:string = "";

  question:any;
  questionSelected:any;

  answers:string[] = [];
  answerSelected:string="";

  questionIndex:number = 0;
  questionMaxIndex:number = 0;

  finished:boolean = false;

  constructor() {}

  ngOnInit(): void {
    if(questions) {
      this.finished = false;
      this.title = questions.title;

      this.question = questions.questions;
      this.questionSelected = this.question[this.questionIndex];

      this.questionIndex = 0;
      this.questionMaxIndex = this.question.length;
    }
  }

  playerChoose(value:string):void {
    this.answers.push(value);
    console.log(this.answers)
    this.nextStep();
  }

  async nextStep() {
    this.questionIndex+=1;
    if(this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.question[this.questionIndex];
    } else {
      const finalAnswer:string = await this.checkResult(this.answers);
      this.finished = true;
      this.answerSelected = questions.results[finalAnswer as keyof typeof questions.results];
    }



  }

  async checkResult(answers:string[]) {
    const result = answers.reduce((prev, curr, index, array) => {
      if(
        array.filter(item => item === prev).length >
        array.filter(item => item === curr).length
      ){
        return prev;
      } else {
        return curr;
      }
    });

    return result;
  }
}
