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
  answers: Array<string>,
  needToAnswer: boolean,
}) {

  const questions = useContext(QuestionsContext);

  const [answerdSelected, setanswerdSelected] = useState<boolean>(false);

  useEffect(function () {
    setanswerdSelected(Boolean((questions.questions as Array<Question>)[props.questionNum - 1]?.selected_answer));
  }, [])

  function handleRadioChange(e: React.ChangeEvent<HTMLInputElement>) {
    const question = (questions.questions as Array<Question>)[props.questionNum - 1];
    question.selected_answer = e.target.value;
    (questions.questions as Array<Question>)[props.questionNum - 1] = question;
    questions.setquestions(questions.questions);
    setanswerdSelected(Boolean((questions.questions as Array<Question>)[props.questionNum - 1]?.selected_answer));
  }

  console.log(props.needToAnswer, !answerdSelected)

  return (
    <Card style={{ borderColor: props.needToAnswer && !answerdSelected ? '#FF9800' : '' }} className={styles.card_div} variant="outlined">
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          <div className={styles.card_header}>
            <span>Question {props.questionNum}</span>
            <span>{props.questionNum}/{props.totalQuestions}</span>
          </div>
          <span>{props.questionCategory}</span>
        </Typography>
        <Typography component="p" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.question) }} />
        <RadioGroup
          onChange={(e) => handleRadioChange(e)}
          name={"question" + props.questionNum}
          defaultValue={(questions.questions as Array<Question>)[props.questionNum - 1]?.selected_answer ? (questions.questions as Array<Question>)[props.questionNum - 1].selected_answer : ''}>
          {props.answers.map(function (answer, i) {
            return <FormControlLabel
              key={i}
              value={answer}
              control={<Radio color="primary" />}
              label={<span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(answer) }}></span>} />
          })}
        </RadioGroup>
      </CardContent>
    </Card>
  )
}