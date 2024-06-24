import { formatNumberWithCommas } from "fomautils";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "../Refer/Refer.css";
import { claimMine } from "@/api/user/user";
import { getClaimAmountForLevel } from "@/helpers/getClaimAmount";

const ClaimLoader = ({
  showClaimConfirmed,
  claimAmount,
}: {
  showClaimConfirmed: Boolean;
  claimAmount: number | null;
}) => {
  return (
    <section className="absolute w-[100vw] h-[100vh] bg-[#000000f1] flex justify-center items-center z-[9]">
      <section className="bg-theme_green flex flex-col justify-center items-center rounded-[12px] p-[20px]">
        {!showClaimConfirmed && (
          <>
            <div className="lds-dual-ring"></div>
            <span className="text-[#91ff91] text-[15px] font-bold mt-[14px]">
              Claiming. Please wait...
            </span>
          </>
        )}

        {showClaimConfirmed && (
          <>
            <span className="text-[18px] font-medium text-[#99ff99]">
              {claimAmount} PHN Claimed!
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
  // const handleScroll = () => {
  //   if (modalOpen || purchaseModalOpen || startedBuyingModalOpen) {
  //     window.scrollTo(0, 0);
  //     return (document.body.style.overflowY = "hidden");
  //   }
  //   return (document.body.style.overflowY = "scroll");
  // };

  // useEffect(() => {
  //   handleScroll();
  // }, [modalOpen, purchaseModalOpen, startedBuyingModalOpen]);

  const [showClaimLoader, setShowClaimLoader] = useState<Boolean>(false);
  const [showClaimConfirmed, setShowClaimConfirmed] = useState<Boolean>(false);
  let amountToClaim = getClaimAmountForLevel(user?.level)

  let COUNT_UP_END_VALUE = amountToClaim
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
    <section className="flex flex-col justify-start items-center relative">
      {showClaimLoader && (
        <ClaimLoader
          claimAmount={amountToClaim}
          showClaimConfirmed={showClaimConfirmed}
        />
      )}
      {/* Logo */}
      <figure className="relative w-[170px] h-[50px] mt-[50px]">
        <Image src={`/assets/images/logo-2.png`} alt="Logo image" fill />
      </figure>

      {/*  Phone image*/}
      {counterMarginTop !== "" && (
        <>
          <figure className="relative w-[280px] h-[450px] mt-[-30px] flex justify-center z-[1]">
            <section
              className={`h-fit flex items-center w-full justify-center
           `}
              style={{ marginTop: counterMarginTop }}
            >
              <figure className="w-[22px] h-[22px] relative mr-[5px]">
                <Image src={`/assets/images/logo.png`} alt="Logo image" fill />
              </figure>
              <span className="text-white font-bold text-[14px]">
                {formatNumberWithCommas(user?.mineBalance)}
              </span>
            </section>
            <Image
              src={`/assets/images/level-${user?.level}.png`}
              alt="Phone image"
              fill
              className="z-[-1]"
            />
          </figure>

          {/* Counter wrapper */}

          {/* Only show this during mining process */}
          {!mineTimePassed && timeRemaining && (
            <section className="overflow-hidden relative py-[10px] px-[20px] rounded-[40px] flex justify-center items-center bg-theme_green text-white min-w-[200px]">
              <section
                className={`absolute left-0 h-full bg-[#0c240c]`}
                style={{ width: `${completionPercentage}%` }}
              ></section>
              <span className="z-[1] font-bold text-[20px]">
                {countUpValue}
              </span>

              {/* timer */}
              <span className="z-[1] text-[10px] font-medium absolute right-[8px]">
                {formatTime(timeRemaining)}
              </span>
            </section>
          )}

          {mineTimePassed && !timeRemaining && hideClaimBtn && (
            <div className="lds-dual-ring"></div>
          )}

          {!mineTimePassed && !timeRemaining && (
            <div className="lds-dual-ring"></div>
          )}

          {/* Show this after mining cycle is completed */}
          {mineTimePassed && !hideClaimBtn && (
            <section className="bg-[#3be63b] py-[12px] px-[35px] rounded-[15px] flex flex-col justify-center mt-[-20px] items-center">
              <span className="text-theme_green text-[14px] mb-[10px] font-bold">
                {countUpValue} PHN mined!
              </span>
              <div
                className="bg-theme_green text-[#3be63b] px-[30px] py-[8px] rounded-[8px]"
                onClick={handleClaim}
              >
                Claim
              </div>
            </section>
          )}
        </>
      )}
    </section>
  );
};

export default Main;
