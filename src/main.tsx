import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './route/router.tsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { UserContext } from './context/UserContext.tsx'
import AuthContext from './context/AuthContext.tsx'
import { UserAxiosContext } from './context/UserAxiosContext.tsx'
import ChatContext from './context/ChatContext.tsx'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserAxiosContext>
        <AuthContext>
          <UserContext>
            <ChatContext>
              <RouterProvider router={router} />
            </ChatContext>
          </UserContext>
        </AuthContext>
      </UserAxiosContext>
    </QueryClientProvider>
  </React.StrictMode>,
)
