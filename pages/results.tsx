import { Accordion, AccordionDetails, AccordionSummary, Button, Container, Typography } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useContext, useEffect, useState } from "react";
import styles from '../styles/results-styles.module.scss'
import { QuestionsContext } from "./_app";
import QuestionResultCard from "../components/QuestionResultCard";
import { useRouter } from "next/router";
import CircularProgressWithLabel from "../components/CircularProgressWithLabel";

export default function Results() {

  const questions = useContext(QuestionsContext);
  const router = useRouter();

  const [hasQuestions, sethasQuestions] = useState<boolean>(false);
  const [correctAnswersCount, setcorrectAnswersCount] = useState<number>();
  const [questionsResultArr, setquestionsResultArr] = useState<Array<typeof QuestionResultCard>>();

  useEffect(function () {
    if (questions.questions) {
      localStorage.setItem('questions', JSON.stringify(questions.questions));
      sethasQuestions(true);
    } else {
      router.push('/');
    }
  }, [])

  useEffect(function () {
    function popStateFunction(e: PopStateEvent) {
      e.stopImmediatePropagation();
      if (window.location.pathname === '/quiz') {
        router.push('/');
      }
    }
    window.addEventListener('popstate', (e) => popStateFunction(e));
    return (function () {
      window.removeEventListener('popstate', (e) => popStateFunction(e));
    })
  }, [])

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
          key={i}
          questionNum={i + 1}
          question={question.question}
          correct_answer={question.correct_answer}
          selected_answer={question.selected_answer as string}
        /> as unknown as typeof QuestionResultCard);
    })
    setquestionsResultArr(tempArr)
  }, [])

  if (hasQuestions) {
    return (
      <Container className={styles.results_container} maxWidth="sm">
        <h2>Your quiz score was: </h2>
        <CircularProgressWithLabel  value={correctAnswersCount as number / (questions.questions?.length as number)*100} />
        <p>You got {correctAnswersCount} {correctAnswersCount as number > 1 ? 'questions' : 'question'} right of {questions.questions?.length}.</p>
        <div>
          <Button type="button" onClick={() => router.replace('/')} variant="contained" color="primary">GO Back</Button>

          <div className={styles.accordion_div}>
            <Accordion variant="outlined">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography >Show correct answers</Typography>
              </AccordionSummary>
              <AccordionDetails className={styles.accordion_content}>
                <div>
                  {questionsResultArr}
                </div>
              </AccordionDetails>
            </Accordion>
          </div>

        </div>
      </Container>
    )
  }else{
    return (<></>)
  }

}