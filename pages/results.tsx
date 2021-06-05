import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, Typography } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useContext, useEffect, useState } from "react";
import styles from '../styles/results-styles.module.scss'
import { Question } from "../customTypes";
import { QuestionsContext } from "./_app";
import QuestionResultCard from "../components/QuestionResultCard";

export default function Results() {

  const questions = useContext(QuestionsContext);

  const [correctAnswersCount, setcorrectAnswersCount] = useState<number>();
  const [questionsResultArr, setquestionsResultArr] = useState<Array<typeof QuestionResultCard>>();

  console.log(questions.questions);

  useEffect(function () {
    let tempCount = 0;
    questions.questions?.forEach(function (question) {
      if (question.selected_answer === question.correct_answer) { tempCount++ }
    })
    setcorrectAnswersCount(tempCount)
  }, [])

  useEffect(function () {
    const tempArr: Array<typeof QuestionResultCard> = [];
    questions.questions?.forEach(function (question, i, arr) {
      tempArr.push(
        <QuestionResultCard
          questionNum={i + 1}
          question={question.question}
          correct_answer={question.correct_answer}
          selected_answer={question.selected_answer as string}
        /> as unknown as typeof QuestionResultCard);
    })
    setquestionsResultArr(tempArr)
  }, [])

  return (
    <div>
      <p>Your quiz score was: </p>
      <span>{Math.round(correctAnswersCount as number / (questions.questions?.length as number) * 100) + '%'}</span>
      <p>You got {correctAnswersCount} {correctAnswersCount as number > 1 ? 'questions' : 'question'} right of {questions.questions?.length}.</p>
      <div>
        <Accordion className={styles.accordion} variant="outlined">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography >Show correct answers</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              {questionsResultArr}
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  )
}