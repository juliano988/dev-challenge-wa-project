import '../styles/globals.scss'
import '../styles/overrideMui.scss'
import type { AppProps } from 'next/app'
import "@fontsource/roboto";
import React, { createContext, Dispatch, SetStateAction, useState } from 'react';
import { Question } from '../customTypes';
import { SnackbarProvider } from 'notistack';

export const QuestionsContext = createContext({} as { questions: Question[] | undefined, setquestions: Dispatch<SetStateAction<Question[] | undefined>> });

function MyApp({ Component, pageProps }: AppProps) {

  const [questions, setquestions] = useState<Array<Question>>();

  return (
    <QuestionsContext.Provider value={{ questions: questions, setquestions: setquestions }}>
      <SnackbarProvider maxSnack={1}>
        <Component {...pageProps} />
      </SnackbarProvider>
    </QuestionsContext.Provider>
  )
}
export default MyApp
