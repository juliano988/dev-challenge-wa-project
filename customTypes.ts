export type Question = {
  category: string;
  type: string,
  difficulty: string,
  question: string,
  correct_answer: string,
  incorrect_answers: Array<string>,
  selected_answer?: string
}

export type Answer = {
  question: number,
  selected_answer: string
}