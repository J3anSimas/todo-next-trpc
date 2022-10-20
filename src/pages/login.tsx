import { NextPage } from "next";
import { redirect } from "next/dist/server/api-utils";
import { useState } from "react";
import { trpc } from "../utils/trpc";

const Login: NextPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {data, refetch, status} = trpc.session.login.useQuery({ username, password }, {enabled: false, refetchOnWindowFocus: false} )

  function handleLogin(): void{
    
    refetch()

    if(data) {
      if(status == "success") {
        console.log('firstestt')
      }
    }
  }
    return (
        <div id="container" className="flex flex-col justify-center items-center ">
            <main className="w-[600px] h-screen flex flex-col justify-center items-center p-6 bg-[#565670]">
                <h1 className="text-4xl font-bold text-white mb-6">Faça seu Login</h1>
                <div className="w-full pl-9 pr-9 flex flex-col items-center">
                    <div className="flex flex-col mb-2">
                        <label htmlFor="username" className="text-white">Nome de usuário</label>
                        <input type="text" name="username" className="w-[300px] rounded-md pl-3" onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className="flex flex-col mb-2">
                        <label htmlFor="password" className="text-white">Senha</label>
                        <input type="text" name="password" className="w-[300px] rounded-md pl-3" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <button className="bg-blue-900 h-[50px] w-[150px] mt-4 rounded-md text-white font-bold" onClick={handleLogin}>Entrar</button>
          {data ? (
            <div>{data?.user}</div>
          ): (<div>teste</div>)}
                </div>
            </main>
        </div>
    )
}

export default Login