import { Formik } from "formik";
import * as Yup from "yup";
import { useAuthContext } from "../context/AuthContext";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is Required"),
  password: Yup.string().required("Password is required"),
});

interface Login {
  username: string,
  password: string
}

export default function Login() {
  const { login, loginSuccess, isLogin, authError, setAuthError } = useAuthContext()
  return (
    <div>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={async (values: Login, { resetForm }) => {
          await login(values.username, values.password, resetForm)
        }}
      >
        {({ errors, touched, handleBlur, handleChange, handleSubmit, values }) => {
          return (
            <form onBlur={() => { setAuthError([]) }} className="flex flex-col w-fit gap-2" onSubmit={handleSubmit}>
              {loginSuccess && (
                <div className={`bg-green-200 text-green-500 font-bold text-sm rounded-md p-2`}>
                  Successfully Login
                </div>
              )}
              {authError.length > 0 && (
                <div className={`bg-red-300 text-red-700 font-bold text-sm rounded-md p-2`}>
                  {authError?.map((err, i) => (<span key={i}>{err?.message}</span>))}
                </div>
              )}
              <div className="grid grid-cols-[1fr_2fr] gap-2 items-center">
                <label htmlFor="username">Username</label>
                <div className="flex flex-col gap-1">
                  <input
                    name="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    className="border px-4 py-1"
                    placeholder="username"
                    type="text"
                  />
                  {errors.username && touched.username && (<div className="text-xs text-red-500">{errors.username}</div>)}
                </div>
              </div>
              <div className="grid grid-cols-[1fr_2fr] gap-2 items-center">
                <label htmlFor="username">Password</label>
                <div className="flex flex-col gap-1">
                  <input
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className="border px-4 py-1"
                    placeholder="password"
                    type="password"
                  />
                  {errors.password && touched.password && (<div className="text-xs text-red-500">{errors.password}</div>)}
                </div>
              </div>
              <button type="submit" disabled={isLogin} className={`${isLogin && 'bg-gray-500'} self-end border-2 border-black rounded-md px-4 py-1`}>{isLogin ? 'Submit...' : 'Submit'}</button>
            </form>
          )
        }}
      </Formik>

    </div>
  );
}
