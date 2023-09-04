import { useAuthContext } from "../context/AuthContext"

export const LoginSuccessToast = () => {
  const { loginSuccess } = useAuthContext()
  return (
    <div className="self-end relative z-50">
      {loginSuccess && (
        <div className='font-bold bg-green-200 text-green-500 w-fit px-4 py-2 rounded-md'>
          Login Successful
        </div>
      )}
    </div>
  )
}

export const RegisterSuccessToast = () => {
  const { registerSuccess } = useAuthContext()
  return (
    <div className="self-end relative z-50">
      {registerSuccess && (
        <div className='font-bold bg-green-200 text-green-500 w-fit px-4 py-2 rounded-md'>
          Successfully created your account, you can login
        </div>
      )}
    </div>
  )
}
