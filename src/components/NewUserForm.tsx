import { Formik, ErrorMessage } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { useUserContext } from '../context/UserContext';

const UserSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(2, 'Firstname Too Short!')
    .max(64, 'Firstname Too Long!')
    .required('Firstname is Required'),
  lastname: Yup.string()
    .min(2, 'Lastname Too short!')
    .max(64, 'Lastname Too long!')
    .required('Lastname is Required'),
  username: Yup.string()
    .min(4, 'Username Too short')
    .max(64, 'Username Too long!')
    .required('Username is Required'),
  password: Yup.string()
    .min(8, 'Password Too short')
    .max(64, 'PasswordToo long!')
    .required('Password is required')
});


export default function NewUserForm () {
  const { createUser } = useUserContext()
  return (
    <div className='flex flex-col w-fit gap-2'>
      <Formik
        validationSchema={UserSchema}
        initialValues={{ firstname: '', lastname:'', username: '', password: '' }}
        onSubmit={(value) => createUser(value)}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
          /* and other goodies */
        }) => (
          <form autoComplete='off' className='flex flex-col gap-2 border-2 p-4 border-black' onSubmit={handleSubmit}>
            <div className='grid grid-cols-2 gap-2'>
              <label htmlFor="firstname">Firstname</label>
              <div>
                <input onBlur={handleBlur} value={values.firstname} onChange={handleChange} type="text" name='firstname' className='py-2 px-4 border border-black rounded-sm' placeholder='firstname...'/>
                {errors.firstname  && touched.firstname && (<div className='text-red-500 text-sm'>{errors.firstname}</div>)}
              </div>
              <label htmlFor="lastname">Lastname</label>
              <div>
                <input value={values.lastname} onBlur={handleBlur} onChange={handleChange} type="text" name='lastname' className='py-2 px-4 border border-black rounded-sm' placeholder='lastname...'/>
                {errors.lastname  && touched.lastname && (<div className='text-red-500 text-sm'>{errors.lastname}</div>)}
              </div>
              <label htmlFor="username">Username</label>
              <div>
                <input onChange={handleChange} value={values.username} onBlur={handleBlur} type="text" name='username' className='py-2 px-4 border border-black rounded-sm' placeholder='username...'/>
                {errors.username && touched.username && (<div className='text-red-500 text-sm'>{errors.username}</div>)}
              </div>
              <label htmlFor="password">Password</label>
              <div>
                <input onChange={handleChange} value={values.password} onBlur={handleBlur} type="password" name='password' className='py-2 px-4 border border-black rounded-sm' placeholder='password...'/>
                {errors.password && touched.password && (<div className='text-red-500 text-sm'>{errors.password}</div>)}
              </div>
            </div>
            <button type='submit' className='border border-black px-4 py-2 self-end rounded-md' disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  )
}
