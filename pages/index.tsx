import React from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import TextField from '@material-ui/core/TextField';
import { Form, Formik, useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';

export default function Home() {

  const formik = useFormik({
    initialValues: {
      number: '',
    },
    validationSchema: yup.object({
      number: yup.number().required('Value is required')
    }),
    onSubmit: (values) => {
      console.log(values)
    },
  });

  return (
    <div>
      <Head>
        <title>Wa Project - Front-end dev challenge</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.input_div}>
        <div>
          <h1>General knowledge quiz</h1>
          <form autoComplete="off" onSubmit={formik.handleSubmit}>
            <TextField
              type="number"
              name="number"
              label="Number of questions"
              variant="outlined"
              fullWidth
              value={formik.values.number}
              onChange={formik.handleChange}
              error={formik.touched.number && Boolean(formik.errors.number)}
              helperText={formik.errors.number ? formik.errors.number : 'Enter the number of questions.'}
              placeholder="Ex. 5"
              size="small" />
            <Button type="submit" variant="contained" color="primary" size="small" fullWidth >SEND</Button>
          </form>
        </div>
      </div>

    </div>
  )
}
