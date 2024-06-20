"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Nav } from "./Nav/Nav";
import Main from "./Main/Main";
import Tasks from "./Tasks/Tasks";
import Refer from "./Refer/Refer";
import Cart from "./Cart/Cart";
// import { useExpand, useInitData } from "@vkruglikov/react-telegram-web-app";

import { useViewport, useInitData } from "@tma.js/sdk-react";
import { fetchUser } from "@/api/user/user";

export default function Home() {
  const [level, setLevel] = useState<Number | null>(1);
  const [currentPage, setCurrentPage] = useState<string>("Tasks");
  const [counterMarginTop, setCounterMarginTop] = useState<string>("");
  const [user, setUser] = useState<any>(null)

  const vp = useViewport();
  const data = useInitData(); // Destructuring initData
  const userDetails = data?.user
   

  // const 
  vp?.expand();

  const loadUser = async ()=>{
    const res = await fetchUser(userDetails?.id as number)
    if(res?.success){
      setUser(res?.data)
    }
  }


  useEffect(() => {
    switch (level) {
      case 1:
        setCounterMarginTop("188px");
        break;

      case 2:
        setCounterMarginTop("148px");
        break;

      case 3:
        setCounterMarginTop("200px");
        break;

      case 4:
        setCounterMarginTop("170px");
        break;

      case 5:
        setCounterMarginTop("135px");
        break;

      case 6:
        setCounterMarginTop("165px");
        break;

      case 7:
        setCounterMarginTop("165px");
        break;

      case 8:
        setCounterMarginTop("120px");
        break;

      case 9:
        setCounterMarginTop("150px");
        break;

      case 10:
        setCounterMarginTop("200px");
        break;

      default:
        setCounterMarginTop("");
    }
  }, [level]);

  useEffect(() => {
    loadUser()
  }, []);

  // const [initDataUnsafe, initData] = useInitData();

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-start">
      {/* <p className="max-w-[80vw] text-white">{JSON.stringify(userDetails)}</p> */}
      {/* <p className="text-white">{JSON.stringify(viewport)}</p>
      <p className="text-white">Is expanded = {isExpanded}</p> */}
      {currentPage == "Home" && (
        <Main counterMarginTop={counterMarginTop} level={level} />
      )}

      {currentPage == "Tasks" && <Tasks user={user}/>}

      {currentPage == "Refer" && <Refer user={user}/>}

      {currentPage == "Cart" && <Cart />}

      <Nav currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </main>
  );
}
