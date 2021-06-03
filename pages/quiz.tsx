import { useContext, useEffect } from "react";
import { QuestionsContext } from "./_app";


export default function Quiz(){

  const questions = useContext(QuestionsContext);

  console.log(questions.questions)
  
  return(
    <>
    Opa!
    </>
  )
}