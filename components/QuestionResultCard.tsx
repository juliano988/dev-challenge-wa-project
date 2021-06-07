import { Card, CardContent, Typography } from "@material-ui/core";
import DOMPurify from "dompurify";
import React from "react";
import styles from '../styles/components/QuestionResultCard-styles.module.scss'


export default function QuestionResultCard(props:{questionNum:number, question:string, correct_answer:string, selected_answer:string}) {
  return (
    <Card style={{borderColor: props.selected_answer === props.correct_answer ? 'green' : 'red'}} className={styles.card_div} variant="outlined">
      <CardContent>
        <Typography variant="body1" component="p">
          Question {props.questionNum}
        </Typography>
        <Typography component="p" variant="body2" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.question) }} />
        <Typography variant="body2" component="p">
          Your answer: {props.selected_answer}
        </Typography>
        <Typography variant="body2" component="p">
          <span className={styles.correct_answer_text}>Correct answer: {props.correct_answer}</span>
        </Typography>
      </CardContent>
    </Card>
  )
}