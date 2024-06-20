import {formatNumberWithCommas} from "fomautils";
import Image from "next/image";
import React from "react";

const Main = ({
  counterMarginTop,
  level,
  user
}: {
  counterMarginTop: string;
  level: Number | null;
  user:any
}) => {
  const {mineBalance} = user
  return (
    <section className="flex flex-col justify-start items-center">
      {/* Logo */}
      <figure className="relative w-[170px] h-[50px] mt-[50px]">
        <Image src={`/assets/images/logo-2.png`} alt="Logo image" fill />
      </figure>

      {/*  Phone image*/}
      {counterMarginTop !== "" && (
        <>
          <figure className="relative w-[280px] h-[450px] mt-[-30px] flex justify-center">
            <section
              className={`h-fit flex items-center w-full justify-center
           `}
              style={{ marginTop: counterMarginTop }}
            >
              <figure className="w-[22px] h-[22px] relative mr-[5px]">
                <Image src={`/assets/images/logo.png`} alt="Logo image" fill />
              </figure>
              <span className="text-white font-bold text-[14px]">{formatNumberWithCommas(mineBalance)}</span>
            </section>
            <Image
              src={`/assets/images/level-${level}.png`}
              alt="Phone image"
              fill
              className="z-[-1]"
            />
          </figure>

          {/* Counter wrapper */}

          <section className="relative py-[10px] px-[20px] rounded-[40px] flex justify-center items-center bg-theme_green text-white min-w-[200px]">
            <span className="font-bold text-[20px]">0.000</span>

            {/* timer */}
            <span className="text-[10px] font-medium absolute right-[8px]">
              22h 12m
            </span>
          </section>
        </>
      )}
    </section>
  );
};

export default Main;
