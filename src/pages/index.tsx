import type { NextPage } from "next";
import Image from "next/image";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const {data, isLoading} = trpc.tasks.getTasks.useQuery()
  return (
    <div id="container" className="flex flex-col justify-center items-center">
      <main className='w-[600px] h-screen bg-[#565670] flex flex-col items-center p-6'>
        <h1 className="text-4xl font-bold text-white mb-6">Tarefas</h1>
        <div id="tasks-container" className="w-full">
          {
            data ? (
              data.tasks.map(task => (
              <div key={task} className="border p-4 mb-2 rounded-md bg-blue-900">
                <input type="checkbox" name="" id="" className="mr-4 w-4 h-4 text-blue-900 bg-gray-100 rounded border-none focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <span className="text-xl text-white font-semibold font-sans">{task}</span>
              </div>

              ))
            ) : (
              <div>
                <Image alt="loading" src="/loader.svg" className="animate-spin" width={24} height={24}/>
              </div>
            )
          }
        </div>
      </main>    
    </div>
  );
};

export default Home;

