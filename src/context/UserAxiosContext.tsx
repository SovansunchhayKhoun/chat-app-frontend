import axios, { AxiosHeaderValue, AxiosInstance } from "axios";
import { createContext, useContext, useState } from "react";

axios.defaults.baseURL = import.meta.env.VITE_API_URL+'/api'

export type User = {
  _id?: string,
  firstname: string,
  lastname: string,
  password: string,
  username: string,
  confirmPassword?: string
}

type UserAxiosContextProvider = {
  children: React.ReactNode,
}

type UserAxiosContext = {
  userAxios: AxiosInstance,
  token: AxiosHeaderValue | undefined,
  setToken: React.Dispatch<React.SetStateAction<string>> | React.Dispatch<React.SetStateAction<AxiosHeaderValue>>,
  getUser: () => Promise<void>,
  userAxiosError: [] | never[],
  setUserAxiosError: React.Dispatch<React.SetStateAction<[]>> | React.Dispatch<React.SetStateAction<never[]>>,
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>,
  user: User | undefined,
}

const StateContext = createContext<UserAxiosContext | null>(null);

export const UserAxiosContext = ({ children }: UserAxiosContextProvider) => {
  const [token, setToken] = useState('')
  const [user, setUser] = useState<User>()
  const [userAxiosError, setUserAxiosError] = useState([])

  const userAxios: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL+'/api',
    withCredentials: true,
  });

  userAxios.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const refreshToken = async () => {
    await axios.get("/refresh", {
      headers: {
        Authorization: token
      }
    }).then((res) => {
      const { data } = res;
      setToken(data.accessToken)
    }).catch(err => {
      if (err.response.status === 403) {
        setToken('')
      }
    });
  };

  const getUser: () => Promise<void> = async () => {
    await axios.get("/user", {
      headers: {
        Authorization: token
      }
    }).then(({ data }) => {
      const { user } = data;
      setUser({
        _id: user?._id,
        firstname: user?.firstname,
        lastname: user?.lastname,
        password: user?.password,
        username: user?.username
      })
    }).catch(err => {
      const { response } = err
      setUserAxiosError(response.data)
    })
  }

  userAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const { response } = error;
      setUserAxiosError(response?.data)
      if (response.status === 403) {
        refreshToken();
        getUser();
      }
      if (response.status === 401) {
        setToken('')
        setUser({
          _id: '',
          firstname: '',
          lastname: '',
          password: '',
          username: '',
        })
      }
    }
  );

  return (
    <StateContext.Provider value={{ userAxios, setToken, getUser, token, userAxiosError, setUserAxiosError, setUser, user }}>
      {children}
    </StateContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUserAxiosContext = () => {
  const context = useContext(StateContext)
  if (!context) {
    throw new Error(
      "useUserAxiosContext must be used within a UserAxiosContextProvider"
    )
  }
  return context
};
