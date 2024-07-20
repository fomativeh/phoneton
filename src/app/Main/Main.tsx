import { formatNumberWithCommas } from "fomautils";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "../Refer/Refer.css";
import { claimMine } from "@/api/user/user";
import { getClaimAmountForLevel } from "@/helpers/getClaimAmount";
import "./Main.scss";

const ClaimLoader = ({
  showClaimConfirmed,
  claimAmount,
}: {
  showClaimConfirmed: Boolean;
  claimAmount: number | null;
}) => {
  return (
    <section className="absolute w-[100vw] h-[100vh] bg-[#000000f1] flex justify-center items-center z-[9] font-3 ">
      <section className="gradient-vertical-2 flex flex-col justify-center items-center rounded-[12px] p-[20px]">
        {!showClaimConfirmed && (
          <>
            <div className="lds-dual-ring"></div>
            <span className="text-white text-[20px] mt-[10px]">
              Claiming. Please wait...
            </span>
          </>
        )}

        {showClaimConfirmed && (
          <>
            <span className="text-[18px] font-medium text-white">
              {formatNumberWithCommas(claimAmount as number)} PHN Claimed!
            </span>
          </>
        )}
      </section>
    </section>
  );
};

const Main = ({
  counterMarginTop,
  user,
  formatTime,
  timeRemaining,
  countUpValue,
  mineTimePassed,
  loadUser,
  hideClaimBtn,
  setHideClaimBtn,
}: {
  counterMarginTop: string;
  user: any;
  formatTime: (time: any) => string;
  timeRemaining: any;
  countUpValue: any;
  mineTimePassed: Boolean;
  loadUser: (data: any) => Promise<void>;
  hideClaimBtn: Boolean;
  setHideClaimBtn: Dispatch<SetStateAction<Boolean>>;
}) => {
  const [showClaimLoader, setShowClaimLoader] = useState<Boolean>(false);
  const [showClaimConfirmed, setShowClaimConfirmed] = useState<Boolean>(false);
  let amountToClaim = getClaimAmountForLevel(user?.level);

  let COUNT_UP_END_VALUE = amountToClaim;
  const completionPercentage =
    (parseFloat(countUpValue) / COUNT_UP_END_VALUE) * 100;

  const handleClaim = async () => {
    setHideClaimBtn(true);
    setShowClaimLoader(true);
    const res = await claimMine(user?.chatId, COUNT_UP_END_VALUE);
    if (res?.success) {
      setShowClaimConfirmed(true);
      setTimeout(() => {
        setShowClaimConfirmed(false);
        setShowClaimLoader(false);
        loadUser(user?.id);
      }, 1800);
    } else {
      setShowClaimLoader(false);
    }
  };

  return (
    <section className="w-full flex flex-col justify-start items-center relative">
      {showClaimLoader && (
        <ClaimLoader
          claimAmount={amountToClaim}
          showClaimConfirmed={showClaimConfirmed}
        />
      )}
      {/* Logo */}
      <figure className="relative w-[170px] h-[50px] mt-[50px]">
        <Image src={`/assets/images/logo.svg`} alt="Logo image" fill />
      </figure>

      <section
        className={`h-fit flex items-center w-full justify-center my-[20px]
           `}
      >
        <figure className="w-[35px] h-[35px] relative mr-[5px]">
          <Image src={`/assets/images/logo.png`} alt="Logo image" fill />
        </figure>
        <span className="text-white font-bold text-[24px] minecraft">
          {formatNumberWithCommas(user?.mineBalance)}
        </span>
      </section>

      {/*  Phone image*/}
      <>
        <section className="w-full relative flex justify-center items-center h-[400px] blur-bg">
          <figure className="relative w-[280px] h-full flex justify-center z-[1]">
            <Image
              src={`/assets/images/level-${user?.level}.svg`}
              alt="Phone image"
              fill
              className="z-[-1]"
            />
          </figure>
        </section>

        {/* Counter wrapper */}

        <>
          {!mineTimePassed && hideClaimBtn && (
            <>
              {/* Only show this during mining process */}
              {!mineTimePassed && timeRemaining && (
                <section className="w-[95vw] fixed bottom-[100px] flex justify-center items-center countup-outer-wrap py-[2px] px-[3px] rounded-[10px]">
                  <section className="z-[1] countup-wrap relative py-[10px] px-[20px] rounded-[inherit] flex justify-center items-center text-white w-full">
                    <section
                      className={`absolute left-0 h-full countup-filler`}
                      style={{ width: `${completionPercentage}%` }}
                    ></section>
                    <span className="z-[1] font-bold text-[20px] minecraft">
                      {countUpValue}
                    </span>

                    {/* timer */}
                    <span className="z-[1] text-[14px] font-medium absolute right-[8px] font-3">
                      {formatTime(timeRemaining)}
                    </span>
                  </section>
                </section>
              )}
            </>
          )}
        </>

        {mineTimePassed && !timeRemaining && hideClaimBtn && (
          <div className="lds-dual-ring"></div>
        )}

        {!mineTimePassed && !timeRemaining && (
          <div className="lds-dual-ring"></div>
        )}

        {/* Show this after mining cycle is completed */}
        {mineTimePassed && !hideClaimBtn && (
          <section className="absolute w-full claim-btn-wrap flex justify-center items-end top-0 bg-[#00000000]">
            <button className="gradient-bg py-[6px] w-[97%] rounded-[10px] mb-[20px] text-white text-[25px] font-3" onClick={handleClaim}>
              Claim
            </button>
          </section>
        )}
      </>
    </section>
  );
};

export default Main;
