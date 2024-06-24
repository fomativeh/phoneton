"use client";
import Image from "next/image";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Nav } from "./Nav/Nav";
import Main from "./Main/Main";
import Tasks from "./Tasks/Tasks";
import Refer from "./Refer/Refer";
import Cart from "./Cart/Cart";
// import { useExpand, useInitData } from "@vkruglikov/react-telegram-web-app";

import { useViewport, useInitData } from "@tma.js/sdk-react";
import {
  claimDailyReward,
  claimMine,
  fetchUser,
  startMine,
} from "@/api/user/user";
import { getClaimAmountForLevel } from "@/helpers/getClaimAmount";
import { phonesData } from "@/utils/phonesData";
import { getDaysElapsed } from "@/helpers/getDaysElapsed";
import "./Refer/Refer.css"
import { formatNumberWithCommas } from "fomautils";

const ClaimLoader = () => {
  return (
    <section className="absolute w-[100vw] h-[100vh] bg-[#000000f3] flex justify-center items-center z-[3]">
      <section className="bg-theme_green flex flex-col justify-center items-center rounded-[25px] p-[20px]">
        
            <div className="lds-dual-ring"></div>
            <span className="text-[#91ff91] text-[15px] font-bold mt-[14px]">
              Claiming. Please wait...
            </span>
      </section>
    </section>
  );
};

const DailyRewardModal = ({
  rewardAmount,

  user,
  loadUser,
  setShowDailyRewardModal,
  setShowClaimLoader
}: {
  rewardAmount: number | null;
  
  user: any;
  setShowDailyRewardModal: Dispatch<SetStateAction<Boolean>>;
  loadUser: () => Promise<void>;
  setShowClaimLoader:Dispatch<SetStateAction<Boolean>>;
}) => {

  const lastClaimTime = user?.lastDailyRewardClaimTime;
  const daysElapsed = getDaysElapsed(lastClaimTime);

  const handleRewardClaim = async () => {
    setShowDailyRewardModal(false);
    setShowClaimLoader(true)
    const res = await claimDailyReward(user?.chatId, rewardAmount as number);
    if (res?.success) {
      setShowClaimLoader(false)
      loadUser();
    } else {
      setShowDailyRewardModal(true);
    }
  };

  console.log(daysElapsed)
  return (
    <section className="absolute w-[102vw] h-[100vh] bg-black z-[4] flex items-end">
      <figure className="w-full h-[80%] max-h-[600px] relative">
        {/* Glow image */}
        <Image
          src="/assets/images/purchase-modal.png"
          alt={"Purchase modal image"}
          fill
        />
      </figure>

      <section className="absolute w-full h-full flex flex-col justify-center items-center">
        <span className="font-bold text-[20px] text-light_green">
          Daily Rewards
        </span>
        <section className="flex items-center mt-[30px]">
          <figure className="w-[30px] h-[30px] relative mr-[12px]">
            <Image src="/assets/images/logo.png" alt={"Logo image"} fill />
          </figure>

          <span className="font-bold text-[#4dc94d]">
            {formatNumberWithCommas(rewardAmount as number)} PHN{" "}
            {(daysElapsed as number) > 1 && `(${formatNumberWithCommas(daysElapsed as number)} days)`}
          </span>
        </section>
        <div
          onClick={handleRewardClaim}
          className="mt-[15px] px-[20px] py-[12px] rounded-[12px] bg-theme_green text-light_green"
        >
          Claim
        </div>
      </section>
    </section>
  );
};

export default function Home() {
  // const [level, setLevel] = useState<Number | null>();
  const [currentPage, setCurrentPage] = useState<string>("Home");
  const [counterMarginTop, setCounterMarginTop] = useState<string>("");
  const [user, setUser] = useState<any>(null);
  const [timeRemaining, setTimeRemaining] = useState<any>(null);
  const [countUpValue, setCountUpValue] = useState<any>(null);
  const [isMineTimePassed, setIsMineTimePassed] = useState<Boolean>(false);
  const [hideClaimBtn, setHideClaimBtn] = useState<Boolean>(false);
  const [currentMineIntervalId, setCurrentMineIntervalId] = useState<any>(null);
  const [showDailyRewardModal, setShowDailyRewardModal] =
    useState<Boolean>(false);
  const [rewardAmount, setRewardAmount] = useState<number | null>(null); //This variable is needed in case the user accumulates more than a day's worth of daily rewards
  const [daysElapsed, setDaysElapsed] = useState<number | null>(null);
  const [showClaimLoader, setShowClaimLoader] = useState<Boolean>(false)
  // const vp = useViewport();
  // const data = useInitData(); // Destructuring initData
  // const chatId = data?.user?.id;

  // const
  // vp?.expand();

  const startCountdown = (
    endTime: any,
    startTime: any,
    COUNT_UP_END_VALUE: any
  ) => {
    //Count up value is the amount of phn per claim for a level
    const duration = (endTime - startTime) / 1000; // Total duration in seconds
    const countUpRate = COUNT_UP_END_VALUE / duration; // Rate at which the count-up value increments

    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const timeLeft = endTime - currentTime;
      const elapsedTime = (currentTime - startTime) / 1000; // Elapsed time in seconds

      if (timeLeft <= 0) {
        clearInterval(interval);
        setTimeRemaining(0);
        setCountUpValue(trimTrailingZeros(COUNT_UP_END_VALUE.toFixed(3))); // Ensure count-up value reaches end value
        setIsMineTimePassed(true); // Set endTime passed to true
        setHideClaimBtn(false);
      } else {
        setTimeRemaining(timeLeft);
        setCountUpValue(
          trimTrailingZeros((elapsedTime * countUpRate).toFixed(3))
        );
        setIsMineTimePassed(false); // Set endTime passed to false
        setHideClaimBtn(true);
      }
    }, 1000); // Update every second

    setCurrentMineIntervalId(interval);
  };

  const trimTrailingZeros = (value: any) => {
    return parseFloat(value).toString();
  };

  const formatTime = (time: any) => {
    if (time === null || time <= 0) return "00h 00m";

    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours.toString().padStart(2, "0")}h ${minutes
      .toString()
      .padStart(2, "0")}m`;
  };

  const loadUser = async () => {
    const res = await fetchUser(chatId as number);
    // const res = await fetchUser(1645873626);
    // const res = await fetchUser(1632962204);
    // const res2 = await claimMine(1632962204)
    // console.log(res2)
    if (res?.success) {
      let userInfo = res?.data;
      setUser(userInfo);
      //Clear mine timer if it is already counting (useful for programmatic page reloads)
      if (currentMineIntervalId) {
        clearInterval(currentMineIntervalId);
      }
      startCountdown(
        new Date(userInfo?.mineTimerEnd).getTime(),
        new Date(userInfo?.mineTimerStart).getTime(),
        getClaimAmountForLevel(userInfo?.level)
      );

      // startMine(res?.data?.chatId)
    }
  };

  useEffect(() => {
    switch (user?.level) {
      case 1:
        setCounterMarginTop("188px");
        break;

      case 2:
        setCounterMarginTop("148px");
        break;

      case 3:
        setCounterMarginTop("195px");
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
  }, [user?.level]);


  useEffect(() => {
    if (user) {
      //For new users
      if (!user?.lastDailyRewardClaimTime) {
        const dailyRewardAmountForThisLevel = phonesData.filter(
          (each) => each.level == user?.level
        )[0].reward;
        setRewardAmount(dailyRewardAmountForThisLevel);
        setShowDailyRewardModal(true);
      } else {
        //Calculate reward amount based on last claim time
        const lastClaimTime = user?.lastDailyRewardClaimTime;
        const daysElapsed = getDaysElapsed(lastClaimTime);
        console.log(daysElapsed)
        // console.log(daysElapsed)
        if (daysElapsed >= 1) {
          const dailyRewardAmountForThisLevel = phonesData.filter(
            (each) => each.level == user?.level
          )[0].reward;
          setRewardAmount(dailyRewardAmountForThisLevel);
          return setShowDailyRewardModal(true);
        }
      }
    }
  }, [user]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-start bg-[#000]">
      {showClaimLoader && (
        <ClaimLoader/>
      )}
      {showDailyRewardModal && (
        <DailyRewardModal
        setShowClaimLoader={setShowClaimLoader}
        setShowDailyRewardModal={setShowDailyRewardModal}
        loadUser={loadUser}
          user={user}
          rewardAmount={rewardAmount}
        />
      )}
      {user && (
        <>
          {currentPage == "Home" && (
            <Main
              hideClaimBtn={hideClaimBtn}
              setHideClaimBtn={setHideClaimBtn}
              counterMarginTop={counterMarginTop}
              user={user}
              formatTime={formatTime}
              timeRemaining={timeRemaining}
              countUpValue={countUpValue}
              mineTimePassed={isMineTimePassed}
              loadUser={loadUser}
            />
          )}

          {currentPage == "Tasks" && <Tasks user={user} loadUser={loadUser}/>}

          {currentPage == "Refer" && (
            <Refer
              user={user}
              setCurrentPage={setCurrentPage}
              loadUser={loadUser}
            />
          )}

          {currentPage == "Cart" && (
            <Cart
              user={user}
              setCurrentPage={setCurrentPage}
              loadUser={loadUser}
              currentMineIntervalId={currentMineIntervalId}
            />
          )}

          <Nav currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </>
      )}
    </main>
  );
}
