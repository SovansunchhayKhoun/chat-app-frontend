import { Formik } from 'formik'
import * as Yup from 'yup'
import { useAuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

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
    .required('Password is required'),
  confirmPassword: Yup.string()
    .required('Please confirm your password')
});

export default function Register() {
  const { register, authError, isRegister, setAuthError } = useAuthContext()
  const navigate = useNavigate()
  const navigateFn = () => navigate('/login')
  return (
    <div className='m-auto flex justify-center w-full h-full items-center'>
      <Formik
        validationSchema={UserSchema}
        initialValues={{ _id: '', firstname: '', lastname: '', username: '', password: '', confirmPassword: '' }}
        onSubmit={async (value, { resetForm }) => {
          await register(value, resetForm, navigateFn)
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onBlur={() => setAuthError([])} autoComplete='off' className="text-custWhite flex flex-col items-center bg-custTeal w-[50%] py-20 gap-10 rounded-lg" onSubmit={handleSubmit}>
            <p className="text-[96px] font-bold">Register</p>
            <div className='flex flex-col items-center w-full'>
              <div className="w-[70%] flex flex-col gap-4">
                {authError?.length > 0 && (
                  <div className='bg-red-300 px-4 py-2 rounded-md'>
                    <p className='text-red-700 font-bold text-xs'>
                      {authError?.map((err, i) => (<span key={i}>{err.message}</span>))}
                    </p>
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <input onBlur={handleBlur} value={values.firstname} onChange={handleChange} type="text" name='firstname' className="bg-custLightNavy px-4 py-2.5 rounded-md" placeholder='firstname...' />
                  {errors.firstname && touched.firstname && (
                    <div className="bg-red-200 w-fit text-xs text-red-700 font-bold rounded-lg px-4 self-start">{errors.firstname}</div>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <input value={values.lastname} onBlur={handleBlur} onChange={handleChange} type="text" name='lastname' className="bg-custLightNavy px-4 py-2.5 rounded-md" placeholder='lastname...' />
                  {errors.lastname && touched.lastname && (
                    <div className="bg-red-200 w-fit text-xs text-red-700 font-bold rounded-lg px-4 self-start">{errors.lastname}</div>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <input onChange={handleChange} value={values.username} onBlur={handleBlur} type="text" name='username' className="bg-custLightNavy px-4 py-2.5 rounded-md" placeholder='username...' />
                  {errors.username && touched.username && (
                    <div className="bg-red-200 w-fit text-xs text-red-700 font-bold rounded-lg px-4 self-start">{errors.username}</div>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <input onChange={handleChange} value={values.password} onBlur={handleBlur} type="password" name='password' className="bg-custLightNavy px-4 py-2.5 rounded-md" placeholder='password...' />
                  {errors.password && touched.password && (
                    <div className="bg-red-200 w-fit text-xs text-red-700 font-bold rounded-lg px-4 self-start">{errors.password}</div>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <input onChange={handleChange} value={values.confirmPassword} onBlur={handleBlur} type="password" name='confirmPassword' className="bg-custLightNavy px-4 py-2.5 rounded-md" placeholder='confirm password...' />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <div className="bg-red-200 w-fit text-xs text-red-700 font-bold rounded-lg px-4 self-start">{errors.confirmPassword}</div>
                  )}
                </div>
                <div className="self-end flex gap-6">
                  <p className="leading-[20px] text-end">
                    <span>Already have an account?</span> <br />
                    <Link to={"/login"} className="font-bold underline underline-offset-2 text-custNavy">Login</Link>
                  </p>
                  <button type='submit' disabled={isRegister}
                    className={`${isRegister && 'bg-custWhite text-custTeal font-bold shadow-xl'} transition duration-300 shadow-md bg-custLightNavy hover:bg-custDarkNavy rounded-md px-4 py-1`}>
                    {isRegister ? 'Submit...' : 'Submit'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}
