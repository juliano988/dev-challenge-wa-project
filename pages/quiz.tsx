import React, { useContext, useEffect, useState } from "react";
import QuestionCard from "../components/QuestionCard";
import { QuestionsContext } from "./_app";
import { useRouter } from 'next/router';
import { Button } from "@material-ui/core";

export default function Quiz() {

  const questions = useContext(QuestionsContext);
  const router = useRouter();

  const [questionsArr, setquestionsArr] = useState<Array<typeof QuestionCard>>();
  const [hasQuestions, sethasQuestions] = useState<boolean>(false);

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

  if (hasQuestions) {
    return (
      <>
        {questionsArr}
        <Button type="button" onClick={() => router.push('/results')} variant="contained" color="primary">SEND</Button>
      </>
    )
  } else {
    return (<></>);
  }

}

