import React, { useContext, useEffect, useState } from "react";
import QuestionCard from "../components/QuestionCard";
import { QuestionsContext } from "./_app";
import { useRouter } from 'next/router';
import { Button } from "@material-ui/core";
import { SnackbarProvider, useSnackbar } from "notistack";

export default function Quiz() {

  const questions = useContext(QuestionsContext);
  const router = useRouter();

  const [questionsArr, setquestionsArr] = useState<Array<typeof QuestionCard>>();
  const [hasQuestions, sethasQuestions] = useState<boolean>(false);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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
          answers={question.incorrect_answers.concat(question.correct_answer)}
        /> as unknown as typeof QuestionCard)
    })
    setquestionsArr(tempArr);
  }, [])

  function handleSendBtnClick() {
    if (questions.questions?.find(function (question) { return question.selected_answer === undefined })) {
      enqueueSnackbar('Ainda faltam questões a serem respondidas!', {
        variant: 'warning',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        }
      });
    } else {
      router.push('/results');
    }
  }

  if (hasQuestions) {
    return (
      <>
        {questionsArr}
        <Button type="button" onClick={handleSendBtnClick} variant="contained" color="primary">SEND</Button>
      </>
    )
  } else {
    return (<></>);
  }

}

