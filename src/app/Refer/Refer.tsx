"use client";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { initUtils } from "@tma.js/sdk";
import { claimReferralIncome, fetchFriends } from "@/api/user/user";
import "./Refer.css";

const ClaimLoader = ({
  setShowClaimLoader,
  showClaimConfirmed,
  setCurrentPage,
  loadUser,
  chatId,
}: {
  setShowClaimLoader: Dispatch<SetStateAction<Boolean>>;
  showClaimConfirmed: Boolean;
  setCurrentPage: Dispatch<SetStateAction<string>>;
  loadUser:(data:number|null) => Promise<void>
  chatId: number | null;
}) => {
  const handleContinue = () => {
    loadUser(chatId);
    setShowClaimLoader(false);
    setCurrentPage("Home");
  };
  return (
    <section className="absolute w-[100vw] h-[100vh] bg-[#000000ce] flex justify-center items-center z-[3]">
      <section className="bg-theme_green flex flex-col justify-center items-center rounded-[25px] p-[20px]">
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
            <span className="text-[20px] font-bold text-[#99ff99]">
              Claim Successful!
            </span>
            <div
              onClick={handleContinue}
              className="px-[15px] py-[10px] rounded-[8px] bg-[#61fa68] text-theme_green mt-[20px]"
            >
              Continue mining
            </div>
          </>
        )}
      </section>
    </section>
  );
};

const Refer = ({
  user,
  setCurrentPage,
  loadUser,
}: {
  user: any;
  setCurrentPage: Dispatch<SetStateAction<string>>;
  loadUser: (data:number|null) => Promise<void>
}) => {
  const [friends, setFriends] = useState<any>(user.allFriendsDetails);
  const [referralEarnings, setReferralEarnings] = useState<number>(
    user.totalReferralIncome
  );
  const [showClaimLoader, setShowClaimLoader] = useState<Boolean>(false);
  const [showClaimConfirmed, setShowClaimConfirmed] = useState<Boolean>(false);

  const handleScroll = () => {
    if (showClaimLoader) {
      window.scrollTo(0,0)
      return (document.body.style.overflowY = "hidden");
    }
    return (document.body.style.overflowY = "scroll");
  };
  
  useEffect(() => {handleScroll()}, [showClaimLoader]);

  // const utils = initUtils();
  const inviteFriends = () => {
    // utils.openTelegramLink(`https://t.me/share/url?url=https://t.me/phonetonbot?start=${user?.chatId}&text=Play with me, get a coins!\n💸 +28 Coins as a first-time gift.\n🔥 +64 Coins if you have Telegram Premium`);
  };

  const handleClaim = async () => {
    setShowClaimLoader(true);
    const res = await claimReferralIncome(user?.chatId);
    if (res?.success) {
      setShowClaimConfirmed(true);
    } else {
      setShowClaimLoader(false);
    }
  };

  return (
    <section className="flex flex-col justify-start items-center relative">
      {showClaimLoader && (
        <ClaimLoader
          setShowClaimLoader={setShowClaimLoader}
          showClaimConfirmed={showClaimConfirmed}
          setCurrentPage={setCurrentPage}
          loadUser={loadUser}
          chatId={user?.chatId}
        />
      )}
      {/* Logo */}
      <figure className="relative w-[170px] h-[50px] mt-[50px]">
        <Image src={`/assets/images/logo-2.png`} alt="Logo image" fill />
      </figure>

      <span className="text-theme_text_silver font-bold text-[45px] mb-[5px] mt-[30px]">
        Friends
      </span>

      <section className="w-[90vw] flex flex-col justify-start items-start mt-[15px]">
        <section className="w-full task rounded-[26px] py-[15px] flex flex-col justify-center items-center">
          <span className="text-[20px] font-bold mb-[10px] text-white">
            Referral income
          </span>

          <section
            className={`h-fit flex items-center w-full justify-center
            `}
          >
            <span className="text-white font-bold text-[20px]">
              {referralEarnings}
            </span>
          </section>

          {referralEarnings > 0 && (
            <section
              onClick={handleClaim}
              className="py-[10px] px-[35px] rounded-[8px] font-bold bg-theme_green text-white mt-[10px]"
            >
              Claim
            </section>
          )}
        </section>

        <section className="w-full task rounded-[26px] py-[10px] mt-[10px] flex flex-col justify-start items-start pl-[40px]">
          <span className="text-[18px] font-bold mb-[14px] text-white">Invite friend</span>

          <section className="w-full flex flex-col justify-start items-start">
            <span className="text-[12px] font-bold mb-[5px] text-white">
              Score <span className="text-light_green">10%</span> of your
              {" friends' earnings."}
            </span>

            {/* <span className="text-[12px] font-bold">
              + an extra <span className="text-light_green">10%</span> from
              their referrals
            </span> */}
          </section>
        </section>

        <span className="font-bold text-white text-[14px] mt-[22px]">
          {friends?.length > 0
            ? `Friend's list (${friends?.length})`
            : `No friend yet.`}
        </span>

        {friends.length > 0 && (
          <>
            <section className="w-full flex flex-col justify-start items-center mt-[15px] mb-[150px]">
              {friends?.length > 0 &&
                friends?.map((eachFriend: any, i: number) => {
                  return (
                    <section
                      key={i}
                      className="w-full justify-between items-center flex rounded-[12px] task pr-[15px] py-[10px] pl-[10px] mb-[13px]"
                    >
                      <section className="flex items-center">
                        <figure className="w-[36px] h-[36px] relative ml-[7px] mr-[12px]">
                          <Image
                            src={eachFriend?.photo}
                            alt="Logo image"
                            fill
                            className="rounded-[50px]"
                          />
                        </figure>

                        <section className="flex flex-col justify-center items-start">
                          <span className="font-bold text-white mb-[5px] text-[12px]">
                            {eachFriend?.username}
                          </span>
                          <span className="font-bold text-white text-[10px]">
                            lvl {eachFriend?.level}
                          </span>
                        </section>
                      </section>

                      <section className="flex items-center">
                        <span className="text-white font-bold text-[14px]">
                          +{eachFriend?.commission}
                        </span>

                        <figure className="w-[18px] h-[18px] relative ml-[7px]">
                          <Image
                            src={`/assets/images/logo.png`}
                            alt="Logo image"
                            fill
                          />
                        </figure>
                      </section>
                    </section>
                  );
                })}
            </section>
          </>
        )}
      </section>

      <section className="left-0 bg-black w-full fixed bottom-[70px] h-[60px] flex justify-center items-center">
        <section
          onClick={inviteFriends}
          className="py-[10px] px-[55px] rounded-[8px] font-bold bg-theme_green text-white"
        >
          Invite Friends
        </section>
      </section>
    </section>
  );
};

export default Refer;
