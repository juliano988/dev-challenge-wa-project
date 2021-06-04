import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import "@fontsource/roboto";
import { createContext, Dispatch, SetStateAction, useState } from 'react';
import { Answer, Question } from '../customTypes';

export const QuestionsContext = createContext({} as { questions: Question[] | undefined, setquestions: Dispatch<SetStateAction<Question[] | undefined>> });
export const AnswerContext = createContext({} as { answers: Answer[] | undefined, setanswers: Dispatch<SetStateAction<Answer[] | undefined>> });

function MyApp({ Component, pageProps }: AppProps) {

  const [questions, setquestions] = useState<Array<Question>>();
  const [answers, setanswers] = useState<Array<Answer>>();

  return (
    <QuestionsContext.Provider value={{ questions: questions, setquestions: setquestions }}>
      <AnswerContext.Provider value={{ answers: answers, setanswers: setanswers }}>
        <Component {...pageProps} />
      </AnswerContext.Provider>
    </QuestionsContext.Provider>
  )
}
export default MyApp
