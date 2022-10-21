import type { NextPage } from "next";
import Image from "next/image";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { trpc } from "../utils/trpc";
import Router from "next/router";
import Login from "../components/login";
import ViewTasks from "../components/viewTasks";

const Home: NextPage = () => {
  const [cookie, setCookie ] = useCookies(['user'])

  return (
    <>
    {!cookie.user ? (<Login  />) : (<ViewTasks />)}
    </>
  );
};

export default Home;

