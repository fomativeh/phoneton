"use client";
import Image from "next/image";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Nav } from "./Nav/Nav";
import Main from "./Main/Main";
import Tasks from "./Tasks/Tasks";
import Refer from "./Refer/Refer";
import Cart from "./Cart/Cart";
import "./Refer/Refer.css";
import { serializeLaunchParams } from '@telegram-apps/sdk';

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
import "./Refer/Refer.css";
import { formatNumberWithCommas } from "fomautils";
import { trimTrailingZeros } from "@/helpers/trimTrailingZeros";
import { formatTime } from "@/helpers/formatTime";

const ClaimLoader = () => {
  return (
    <section className="absolute w-[100vw] h-[100vh] bg-[#000000f3] flex justify-center items-center z-[3]">
      <section className="gradient-vertical-2 flex flex-col justify-center items-center rounded-[12px] p-[20px]">
        <div className="lds-dual-ring"></div>
        <span className="text-white font-3 text-[20px] mt-[10px]">
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
  setShowClaimLoader,
}: {
  rewardAmount: number | null;

  user: any;
  setShowDailyRewardModal: Dispatch<SetStateAction<Boolean>>;
  loadUser: () => Promise<void>;
  setShowClaimLoader: Dispatch<SetStateAction<Boolean>>;
}) => {
  const lastClaimTime = user?.lastDailyRewardClaimTime;
  const daysElapsed = getDaysElapsed(lastClaimTime);

  const handleRewardClaim = async () => {
    setShowDailyRewardModal(false);
    setShowClaimLoader(true);
    const res = await claimDailyReward(user?.chatId, rewardAmount as number);
    if (res?.success) {
      setShowClaimLoader(false);
      loadUser();
    } else {
      setShowDailyRewardModal(true);
    }
  };

  // console.log(daysElapsed);
  return (
    <section className="absolute w-[102vw] h-[100vh] bg-black z-[4] flex items-end">
      <section className="w-full h-[65vh] gradient-bg p-[2px] rounded-[17px]">
        <section className="absolute w-full h-full flex flex-col justify-start items-center rounded-[20px] bg-black pt-[60px] font-3">
          <h1 className="m-0 text-white font-[300]">Daily Rewards</h1>
          <section className="flex items-center mt-[20px]">
            <figure className="w-[35px] h-[35px] relative mr-[12px]">
              <Image src="/assets/images/logo.png" alt={"Logo image"} fill />
            </figure>

            <span className="text-white  font-[300] text-[22px]">
              {formatNumberWithCommas(rewardAmount as number)} PHN
            </span>
          </section>
          <div
            onClick={handleRewardClaim}
            className="mt-[25px] text-[20px] px-[30px] py-[10px] rounded-[7px] gradient-bg text-white"
          >
            Claim
          </div>
        </section>
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
  const [showClaimLoader, setShowClaimLoader] = useState<Boolean>(false);
  const vp = useViewport();
  const data = useInitData(); // Destructuring initData
  const chatId = data?.user?.id;

  vp?.expand();

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

  const loadUser = async () => {
    const res = await fetchUser(chatId as number);
    // const res = await fetchUser(1645873626);

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

  useEffect(() => {
    loadUser();
  }, []);


const info = serializeLaunchParams({
    version: '6.7',
    platform: 'tdesktop',
    themeParams: {
      bgColor: '#17212b',
      buttonColor: '#5288c1',
      buttonTextColor: '#ffffff',
      hintColor: '#708499',
      linkColor: '#6ab3f3',
      secondaryBgColor: '#232e3c',
      textColor: '#f5f5f5',
    },
  });


  return (
    <main className="relative flex min-h-screen flex-col items-center justify-start bg-[#000]">
      {showClaimLoader && <ClaimLoader />}
      {showDailyRewardModal && (
        <DailyRewardModal
          setShowClaimLoader={setShowClaimLoader}
          setShowDailyRewardModal={setShowDailyRewardModal}
          loadUser={loadUser}
          user={user}
          rewardAmount={rewardAmount}
        />
      )}
      {/* {user && (
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

          {currentPage == "Tasks" && <Tasks user={user} loadUser={loadUser} />}

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
      )} */}


      <p>{info}</p>

      {/* Initial loader */}
      {!user && (
        <section className="absolute w-full h-full flex flex-col justify-center items-center">
          <figure className="relative w-[170px] h-[50px] mb-[20px]">
            <Image src={`/assets/images/logo.svg`} alt="Logo image" fill />
          </figure>

          <div className="lds-dual-ring"></div>
        </section>
      )}
    </main>
  );
}
