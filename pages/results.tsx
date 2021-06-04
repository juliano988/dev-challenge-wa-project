import { useContext } from "react";
import { AnswerContext } from "./_app";

export default function Results() {

  const answers = useContext(AnswerContext);

  console.log(answers.answers)

  return (
    <>
      Opa! 2
    </>
  )
}