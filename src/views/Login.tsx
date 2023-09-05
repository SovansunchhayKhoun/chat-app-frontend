import { Formik } from "formik";
import * as Yup from "yup";
import { useAuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is Required"),
  password: Yup.string().required("Password is required"),
});

interface Login {
  username: string,
  password: string
}

export default function Login() {
  const { login, isLogin, authError, setAuthError } = useAuthContext()
  const navigate = useNavigate()
  const navigateFn = () => navigate('/chat')

  return (
    <div className="m-auto w-full h-full flex flex-col justify-center items-center">
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={async (values: Login, { resetForm }) => {
          await login(values.username, values.password, resetForm, navigateFn)
        }}
      >
        {({ errors, touched, handleBlur, handleChange, handleSubmit, values }) => {
          return (
            <form onBlur={() => { setAuthError([]) }}
              className="mt-20 text-custWhite flex flex-col items-center bg-custTeal 
              xl:w-[50%]
              lg:w-[70%] lg:pt-24 lg:pb-28 lg:gap-10
              md:w-[80%] md:pt-16 md:pb-24 md:gap-6
              w-full gap-6 pb-6
              rounded-lg"
              onSubmit={handleSubmit}>
              <p className="md:text-[96px] text-[64px] font-bold">Login</p>
              <div className="flex flex-col items-center w-full">
                <div className="md:w-[70%] w-[90%] flex flex-col gap-4">
                  {authError.length > 0 && (
                    <div className={`bg-red-300 text-red-700 font-bold text-sm rounded-md p-2`}>
                      {authError?.map((err, i) => (<span key={i}>{err?.message}</span>))}
                    </div>
                  )}
                  <div className="flex flex-col gap-2">
                    <input
                      name="username"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                      className="bg-custLightNavy px-4 py-2.5 rounded-md"
                      placeholder="username"
                      type="text"
                    />
                    {errors.username && touched.username && (<div className="bg-red-200 w-fit text-xs text-red-700 font-bold rounded-lg px-4">{errors.username}</div>)}
                  </div>

                  <div className="flex flex-col gap-2">
                    <input
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      className="bg-custLightNavy px-4 py-2.5 rounded-md"
                      placeholder="password"
                      type="password"
                    />
                    {errors.password && touched.password && (<div className="bg-red-200 w-fit text-xs text-red-700 font-bold rounded-lg px-4">{errors.password}</div>)}
                  </div>
                  <div className="md:self-end justify-between flex gap-6">
                    <p className="whitespace-nowrap leading-[20px] text-end md:text-base text-sm">
                      <span>Don't have an account?</span> <br />
                      <Link to={"/register"} className="font-bold underline underline-offset-2 text-custNavy">Register here</Link>
                    </p>
                    <button type="submit" disabled={isLogin}
                      className={`${isLogin && 'bg-custWhite text-custTeal font-bold shadow-xl'} transition duration-300
                        shadow-md bg-custLightNavy hover:bg-custDarkNavy rounded-md px-4 py-1 md:text-base text-sm`}>
                      {isLogin ? 'Submit...' : 'Submit'}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )
        }}
      </Formik>
    </div>
  );
}
