import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import "@fontsource/roboto";
import { createContext, Dispatch, SetStateAction, useState } from 'react';
import { Question } from '../customTypes';

export const QuestionsContext = createContext({} as { questions: Question[] | undefined, setquestions: Dispatch<SetStateAction<Question[] | undefined>> });

function MyApp({ Component, pageProps }: AppProps) {

  const [questions, setquestions] = useState<Array<Question>>();

  return (
    <QuestionsContext.Provider value={{ questions: questions, setquestions: setquestions }}>
        <Component {...pageProps} />
    </QuestionsContext.Provider>
  )
}
export default MyApp
