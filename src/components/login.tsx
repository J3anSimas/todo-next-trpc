import { NextPage, GetStaticProps } from "next";
import React, { useEffect, useState } from "react";
import { trpc } from "../utils/trpc";
import Router from "next/router";
const Login: NextPage = ({user}: any) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [wrongP, setWrongP] = useState(false)
  const {data, mutateAsync, isLoading, } = trpc.session.login.useMutation({onSuccess: (data) => {
    console.log(data)
    if(data?.user) {
      // setUser(data.user)
    }
    else {
      setWrongP(true)
    }
  }})


  async function handleLogin(e: React.MouseEvent): Promise<void>{
    e.preventDefault()
    console.log(user)
    await mutateAsync({username, password})
  }
    return (
        <div id="container" className="flex flex-col justify-center items-center ">
            <main className="w-[600px] h-screen flex flex-col justify-center items-center p-6 bg-[#565670]">
                <h1 className="text-4xl font-bold text-white mb-6">Faça seu Login</h1>
                <div className="w-full pl-9 pr-9 flex flex-col items-center">
                    <div className="flex flex-col mb-2">
                        <label htmlFor="username" className="text-white">Nome de usuário</label>
                        <input type="text" name="username" className="w-[300px] h-[30px] rounded-md pl-3" onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className="flex flex-col mb-2">
                        <label htmlFor="password" className="text-white">Senha</label>
                        <input type="password" name="password" className="w-[300px] h-[30px] rounded-md pl-3" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <button className="bg-blue-900 h-[50px] w-[150px] mt-4 rounded-md text-white font-bold" disabled={isLoading} onClick={(e) => handleLogin(e)}>Entrar</button>
                    {
                      wrongP ? (<div>{data?.error}</div>) : null
                    }
          
                </div>
            </main>
        </div>
    )
}

export default Login

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      user: 'jean'
    }
  }
}