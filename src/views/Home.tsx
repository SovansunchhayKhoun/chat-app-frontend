import React from "react"
import { useUserContext } from "../context/UserContext"
import NewUserForm from "../components/NewUserForm";
import UsersList from "../components/UsersList";
export default function Home() {  
  return (
    <div className="flex gap-4 justify-center items-center w-screen h-screen">
      <NewUserForm />

      <UsersList />
      
    </div>
  )
}
