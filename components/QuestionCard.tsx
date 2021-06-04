import React from "react";
import { Card, CardContent, FormControlLabel, Radio, RadioGroup, Typography } from "@material-ui/core";
import styles from "../styles/components/QuestionCard-styles.module.scss";
import DOMPurify from 'dompurify';

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
    while (answers.length) { shuffledAnswers.push(answers.splice(Math.floor(Math.random() * answers.length), 1)[0]) }
    return shuffledAnswers;
  }

  return (
    <div className={styles.card_div}>
      <Card variant="outlined">
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            <div className={styles.card_header}>
              <span>Question {props.questionNum}</span>
              <span>{props.questionNum}/{props.totalQuestions}</span>
            </div>
            <span>{props.questionCategory}</span>
          </Typography>
          <Typography component="p" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.question) }} />
          <RadioGroup name="gender1">
            {shuffledAnswers(props.answers).map(function(answer,i){return <FormControlLabel key={i} value={answer} control={<Radio />} label={answer} />})}
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  )
}