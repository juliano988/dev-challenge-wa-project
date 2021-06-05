import { Card, CardContent, Typography } from "@material-ui/core";
import DOMPurify from "dompurify";
import React from "react";
import styles from '../styles/components/QuestionResultCard-styles.module.scss'


export default function QuestionResultCard(props:{questionNum:number, question:string, correct_answer:string, selected_answer:string}) {
  return (
    <Card className={styles.card_div} variant="outlined">
      <CardContent>
        <Typography variant="body1" component="p">
          Question {props.questionNum}
        </Typography>
        <Typography component="p" variant="body2" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.question) }} />
        <Typography variant="body2" component="p">
          Your answer: {props.selected_answer}
        </Typography>
        <Typography variant="body2" component="p">
          Correct answer: {props.correct_answer}
        </Typography>
      </CardContent>
    </Card>
  )
}