import React, { useContext, useEffect, useState } from "react";
import styles from '../styles/quiz-styles.module.scss';
import QuestionCard from "../components/QuestionCard";
import { QuestionsContext } from "./_app";
import { useRouter } from 'next/router';
import { Button, Container } from "@material-ui/core";
import { SnackbarProvider, useSnackbar } from "notistack";

export default function Quiz() {

  const questions = useContext(QuestionsContext);
  const router = useRouter();

  const [questionsArr, setquestionsArr] = useState<Array<typeof QuestionCard>>();
  const [hasQuestions, sethasQuestions] = useState<boolean>(false);
  const [needToAnswer, setneedToAnswer] = useState<boolean>(false);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  function shuffledAnswers(_answers: Array<string>): Array<string> {
    const answers = _answers.slice(0);
    const shuffledAnswers: Array<string> = [];
    while (answers.length) { shuffledAnswers.push(answers.splice(Math.floor(Math.random() * answers.length), 1)[0]) };
    return shuffledAnswers;
  }

  useEffect(function () {
    if (!questions.questions) {
      router.push('/');
    } else {
      sethasQuestions(true);
    }
  }, []);

  useEffect(function () {
    function popStateFunction(e: PopStateEvent) {
      e.stopImmediatePropagation();
      if (window.location.pathname === '/quiz') {
        router.push('/');
      } else {
        if (confirm('If you leave this page you will lose all your progress.')) {
          router.push('/');
        } else {
          router.push('/quiz');
        }
      }
    }
    window.addEventListener('popstate', (e) => popStateFunction(e));
    return (function () {
      window.removeEventListener('popstate', (e) => popStateFunction(e));
    })
  }, [])

  useEffect(function () {
    const tempArr: Array<typeof QuestionCard> = [];
    questions.questions?.forEach(function (question, i, arr) {
      tempArr.push(
        <QuestionCard
          key={i}
          questionNum={i + 1}
          totalQuestions={arr.length}
          questionCategory={question.category}
          question={question.question}
          answers={shuffledAnswers(question.incorrect_answers.concat(question.correct_answer))}
          needToAnswer={needToAnswer}
        /> as unknown as typeof QuestionCard)
    })
    setquestionsArr(tempArr);
  }, [needToAnswer])

  function handleSendBtnClick() {
    if (questions.questions?.find(function (question) { return question.selected_answer === undefined })) {
      enqueueSnackbar('Ainda faltam questões a serem respondidas!', {
        variant: 'warning',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        }
      });
      setneedToAnswer(true);
    } else {
      closeSnackbar();
      router.push('/results');
    }
  }

  if (hasQuestions) {
    return (
      <Container maxWidth="sm" className={styles.questions_div}>
        {questionsArr}
        <Button type="button" onClick={handleSendBtnClick} variant="contained" color="primary">SEND</Button>
      </Container>
    )
  } else {
    return (<></>);
  }

}

