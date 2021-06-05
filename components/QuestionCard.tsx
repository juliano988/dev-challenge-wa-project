import React, { useContext, useEffect, useState } from "react";
import { Card, CardContent, FormControlLabel, Radio, RadioGroup, Typography } from "@material-ui/core";
import styles from "../styles/components/QuestionCard-styles.module.scss";
import DOMPurify from 'dompurify';
import { QuestionsContext } from "../pages/_app";
import { Question } from "../customTypes";

export default function QuestionCard(props: {
  questionNum: number,
  totalQuestions: number,
  questionCategory: string,
  question: string,
  answers: Array<string>
}) {

  function shuffledAnswers(_answers: Array<string>): Array<string> {
    const answers = _answers.slice(0);
    const shuffledAnswers: Array<string> = [];
    while (answers.length) { shuffledAnswers.push(answers.splice(Math.floor(Math.random() * answers.length), 1)[0]) };
    return shuffledAnswers;
  }

  const questions = useContext(QuestionsContext);

  function handleRadioChange(e:React.ChangeEvent<HTMLInputElement>){
    const question = (questions.questions as Array<Question>)[props.questionNum - 1];
    question.selected_answer = e.target.value;
    (questions.questions as Array<Question>)[props.questionNum - 1] = question;
    questions.setquestions(questions.questions);
  }
  
  return (
      <Card className={styles.card_div} variant="outlined">
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            <div className={styles.card_header}>
              <span>Question {props.questionNum}</span>
              <span>{props.questionNum}/{props.totalQuestions}</span>
            </div>
            <span>{props.questionCategory}</span>
          </Typography>
          <Typography component="p" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.question) }} />
          <RadioGroup onChange={(e)=>handleRadioChange(e)} name={"question" + props.questionNum}>
            {shuffledAnswers(props.answers).map(function (answer, i) {
              return <FormControlLabel
                key={i}
                value={answer}
                control={<Radio />}
                label={<span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(answer) }}></span>} />
            })}
          </RadioGroup>
        </CardContent>
      </Card>
  )
}