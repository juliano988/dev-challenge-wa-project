import React, { useContext, useEffect, useState } from "react";
import QuestionCard from "../components/QuestionCard";
import { QuestionsContext } from "./_app";
import { useRouter } from 'next/router';

export default function Quiz() {

  const questions = useContext(QuestionsContext);
  const router = useRouter();

  const [questionsArr, setquestionsArr] = useState<Array<typeof QuestionCard>>();

  useEffect(function () {
    if (!questions.questions) {
      router.push('/');
    }
  }, []);

  useEffect(function () {
    const tempArr: Array<typeof QuestionCard> = []
    questions.questions?.forEach(function (question, i, arr) {
      tempArr.push(
      <QuestionCard
        key={i}
        questionNum={i+1}
        totalQuestions={arr.length}
        questionCategory={question.category}
        question={question.question}
        answers={question.incorrect_answers.concat(question.correct_answer)}
        /> as unknown as typeof QuestionCard)
    })
    setquestionsArr(tempArr);
  }, [])

  return (
    <>
      {questionsArr}
    </>
  )
}

