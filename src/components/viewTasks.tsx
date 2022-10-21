import { NextPage } from "next";
import Image from "next/image";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { trpc } from "../utils/trpc";

const ViewTasks : NextPage = () =>{
  const [cookie, setCookie, deleteCookie] = useCookies(['user'])
  const [user, setUser] = useState('')
  const {data, isLoading} = trpc.tasks.getTasks.useQuery({id: user})
  function handleLogout() {
    deleteCookie('user')
  }
  return (
    <div id="container" className="flex flex-col justify-center items-center">
      <main className='w-[600px] h-screen  relative bg-[#565670] flex flex-col items-center p-6'>
        <h1 className="text-4xl font-bold text-white mb-6">Tarefas</h1>
        <button className="absolute right-6 rounded-md p-4 top-5 bg-red-800 text-white font-bold" onClick={handleLogout}>Logout</button>
        <div id="tasks-container" className="w-full h-[99%] overflow-auto mb-2 rounded-sm pr-1">
          {
            data ? (
              data.tasks.map(task => (
              <div key={task.id} className="border p-4 mb-2 rounded-md bg-blue-900">
                <input type="checkbox" name="" id="" className="mr-4 w-4 h-4 text-blue-900 bg-gray-100 rounded border-none focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <span className="text-xl text-white font-semibold font-sans">{task.title}</span>
              </div>

              ))
            ) : (
              <div>
                <Image alt="loading" src="/loader.svg" className="animate-spin" width={24} height={24}/>
              </div>
            )
          }
        </div>
        <div className="flex w-full gap-2">
          <input type="text" className="h-[40px] flex-1 rounded-md"/>
          <button className="h-[40px] w-[40px] bg-blue-400 rounded-md font-bold text-white">Add</button>
        </div>
      </main>    
    </div>

  )
}

export default ViewTasks