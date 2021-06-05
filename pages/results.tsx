import { useContext } from "react";
import { QuestionsContext } from "./_app";

export default function Results() {

  const questions = useContext(QuestionsContext);

  console.log(questions.questions)

  return (
    <>
      Opa! 2
    </>
  )
}