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
    <nav className="w-full h-fit fixed bottom-0 left-0 pt-[3px] gradient-bg rounded-[20px]">
      <section className="bg-[black] h-[90px] w-full flex justify-evenly items-end z-[2] rounded-[inherit]">
      {icons.map((each, i) => {
        return (
          <section
          key={i}
          onClick={()=>setCurrentPage(each)}
            className={` w-[22%] h-[90%] flex justify-center items-center p-[2px]
            ${currentPage == each && `gradient-vertical `}`}
          >
            <section className="bg-[black] w-full h-full flex justify-center items-center p-[10px]">
            <figure className={`relative w-[40px] h-[40px] `}>
              <Image src={`/assets/icons/${each}.svg`} alt="Nav icon" fill />
            </figure>
            </section>
          </section>
        );
      })}
    </section>
    </nav>
  );
};
