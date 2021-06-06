import React, { createContext, useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import { Button, CircularProgress, TextField } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import { Question } from '../customTypes';
import { QuestionsContext } from './_app';
import { useRouter } from 'next/router';

export default function Home() {

  const questions = useContext(QuestionsContext);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [questionsLocalStorage, setquestionsLocalStorage] = useState<string | null>();

  useEffect(function () {
    setquestionsLocalStorage(localStorage.getItem('questions'))
  }, [])

  const formik = useFormik({
    initialValues: {
      number: ''
    },
    validationSchema: yup.object({
      number: yup.number().typeError('Value is required').min(1, 'Value must be 1 or higher.').required('Value is required')
    }),
    onSubmit: (values: { number: number | string }, actions) => {
      const MySwal = withReactContent(Swal)
      MySwal.fire({
        title: 'Are you ready?',
        html: <span>The number of questions in the quiz will be:<br />
          <span style={{ fontSize: '40px', margin: '5px', fontWeight: 'bold' }}>{values.number}</span></span>,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#d33',
        confirmButtonText: 'START!',
        cancelButtonText: 'CANCEL'
      }).then((result) => {
        if (result.isConfirmed) {
          setLoading(true);
          axios.get('https://opentdb.com/api.php?amount=' + values.number)
            .then(function (response: { data: { results: Array<Question> } }) {
              questions.setquestions(response.data.results);
              router.push('/quiz');
            })
        } else {
          actions.resetForm({ values: { number: '' } })
        }
      })
    },
  });

  function handlePrevBtnClick(){
    questions.setquestions(JSON.parse(localStorage.getItem('questions') as string));
    router.replace('/results');
  }

  return (
    <>
      <Head>
        <title>Wa Project - Front-end dev challenge</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.input_div}>

        <Button
          className={styles.previous_btn}
          style={{ display: questionsLocalStorage ? 'initial' : 'none' }}
          type="button"
          onClick={handlePrevBtnClick}
          variant="contained"
          color="primary">SEE PREVIOUS RESULT</Button>

        <div>
          <h1>General knowledge quiz</h1>
          <form autoComplete="off" onSubmit={formik.handleSubmit}>
            <TextField
              type="number"
              name="number"
              label="Number of questions"
              variant="outlined"
              placeholder="Ex. 5"
              size="small"
              fullWidth
              value={formik.values.number}
              onChange={formik.handleChange}
              error={formik.touched.number && Boolean(formik.errors.number)}
              helperText={formik.errors.number ? formik.errors.number : 'Enter the number of questions.'} />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
              disabled={loading}
              endIcon={loading ? null : <Send />}
              fullWidth >{loading ? <CircularProgress size={24} /> : 'SEND'}
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
