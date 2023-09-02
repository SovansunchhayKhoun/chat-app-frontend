import axios from "axios";
import { createContext, useContext, useState } from "react";

axios.defaults.baseURL = import.meta.env.VITE_API_URL

const StateContext = createContext();
export const UserAxiosContext = ({ children }) => {
  const [token, setToken] = useState<string>('')
  const [user, setUser] = useState({
    _id: '',
    firstname: '',
    lastname: '',
    password: '',
    username: '',
  })
  const [userAxiosError, setUserAxiosError] = useState({})
  const userAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
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
    await axios.get("/api/refresh", {
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

  const getUser = async () => {
    await axios.get("/api/user", {
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
export const useUserAxiosContext = () => useContext(StateContext);
