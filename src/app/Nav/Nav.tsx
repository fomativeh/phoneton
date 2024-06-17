"use client";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

export const Nav = ({
  currentPage,
  setCurrentPage,
}: {
  currentPage: string;
  setCurrentPage: Dispatch<SetStateAction<string>>;
}) => {
  const icons = ["Home", "Tasks", "Refer", "Cart"];

  return (
    <nav className="bg-nav_bg h-[70px] fixed bottom-0 left-0 w-full flex justify-evenly items-center">
      {icons.map((each) => {
        return (
          <section
          onClick={()=>setCurrentPage(each)}
            className={` p-[10px]
            ${currentPage == each && `bg-theme_green  rounded-[50px]`}`}
          >
            <figure className={`relative w-[30px] h-[30px] `}>
              <Image src={`/assets/icons/${each}.svg`} alt="Nav icon" fill />
            </figure>
          </section>
        );
      })}
    </nav>
  );
};
