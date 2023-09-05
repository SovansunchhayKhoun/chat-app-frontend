import { useAuthContext } from "../context/AuthContext"

export const LoginSuccessToast = () => {
  const { loginSuccess } = useAuthContext()
  return (
    <div className="relative flex justify-end w-full">
      <div>
        {loginSuccess && (
          <div className='lg:text-base md:text-sm  font-bold bg-green-200 text-green-500 w-fit px-4 py-2 rounded-md'>
            Login Successful
          </div>
        )}
      </div>
    </div>
  )
}

export const RegisterSuccessToast = () => {
  const { registerSuccess } = useAuthContext()
  return (
    <div className="flex w-full justify-end relative z-50">
      <div>
        {registerSuccess && (
          <div className='lg:text-base md:text-sm font-bold bg-green-200 text-green-500 w-fit px-4 py-2 rounded-md'>
            Successfully created your account, you can login
          </div>
        )}
      </div>
    </div>
  )
}
