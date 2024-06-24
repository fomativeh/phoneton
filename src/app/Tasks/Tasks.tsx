import Image from "next/image";
import React from "react";
import "./Task.scss";
import { initUtils } from "@tma.js/sdk";

const Tasks = ({ user }: { user: any }) => {

  const utils = initUtils();

  const joinTelegram = () => {
    // utils.openLink("https://t.me/PhoneTonEcosystem");
    utils.openTelegramLink("https://t.me/PhoneTonEcosystem");
  };

  const joinTelegram2 = () => {
    // utils.openLink("https://t.me/PhoneTonEcosystemRU");
    utils.openTelegramLink("https://t.me/PhoneTonEcosystemRU");
  };

  const inviteFriends = ()=>{
    utils.openTelegramLink(`https://t.me/share/url?url=https://t.me/phonetonbot?start=${user.chatId}&text=Play with me, get a coins!\n💸 +28 Coins as a first-time gift.\n🔥 +64 Coins if you have Telegram Premium`)
  }

  return (
    <section className="flex flex-col justify-start items-center">
      {/* Logo */}
      <figure className="relative w-[170px] h-[50px] mt-[50px]">
        <Image src={`/assets/images/logo-2.png`} alt="Logo image" fill />
      </figure>

      <span className="text-theme_text_silver font-bold text-[45px] mb-[5px] mt-[30px]">
        Quests
      </span>
      <span className="text-theme_text_silver text-[12px] font-bold">
        Get rewards for completing quests
      </span>

      {user && (
        <section className="w-[90vw] flex flex-col justify-start items-start mt-[35px]">
          <span className="font-bold text-theme_text_silver text-[20px]">
            All tasks
          </span>

          <section className="w-full flex flex-col justify-start items-center mt-[15px]">
            <section className="w-full justify-between items-center flex rounded-[12px] task pr-[15px] py-[10px] pl-[30px] mb-[13px]">
              <section className="flex flex-col justify-center items-start">
                <span className="font-bold text-white mb-[5px]">
                  Join our Telegram
                </span>
                <span className="font-bold text-white text-[10px]">
                  +20 PHN
                </span>
              </section>
              {!user?.task1Done && (
                <div
                  onClick={joinTelegram}
                  className="bg-theme_green text-white rounded-[12px] flex justify-center items-center font-bold w-[62px] h-[35px]"
                >
                  Start
                </div>
              )}
              {user?.task1Done && (
                <section className="flex justify-center items-center bg-theme_green rounded-[20px] w-[62px] h-[35px]">
                  <figure className="relative w-[40%] h-[60%]">
                    <Image
                      src={`/assets/icons/check.png`}
                      alt="Logo image"
                      fill
                    />
                  </figure>
                </section>
              )}
            </section>

            <section className="w-full justify-between items-center flex rounded-[12px] task pr-[15px] py-[10px] pl-[30px] mb-[13px]">
              <section className="flex flex-col justify-center items-start">
                <span className="font-bold text-white mb-[5px]">
                  Join our Channel (RU)
                </span>
                <span className="font-bold text-white text-[10px]">
                  +20 PHN
                </span>
              </section>
              {!user?.task2Done && (
                <div
                  onClick={joinTelegram2}
                  className="bg-theme_green text-white rounded-[12px] flex justify-center items-center font-bold w-[62px] h-[35px]"
                >
                  Start
                </div>
              )}
              {user?.task2Done && (
                <section className="flex justify-center items-center bg-theme_green rounded-[20px] w-[62px] h-[35px]">
                  <figure className="relative w-[40%] h-[60%]">
                    <Image
                      src={`/assets/icons/check.png`}
                      alt="Logo image"
                      fill
                    />
                  </figure>
                </section>
              )}
            </section>

            <section className="w-full justify-between items-center flex rounded-[12px] task pr-[15px] py-[10px] pl-[30px]">
              <section className="flex flex-col justify-center items-start">
                <span className="font-bold text-white mb-[5px]">
                  Invite 3 new friends
                </span>
                <span className="font-bold text-white text-[10px]">
                  +150 PHN
                </span>
              </section>
              {!user?.task3Done && (
                <div 
                onClick={inviteFriends}
                 className="bg-theme_green text-white rounded-[12px] flex justify-center items-center font-bold w-[62px] h-[35px]">
                  Start
                </div>
              )}
              {user?.task3Done && (
                <section className="flex justify-center items-center bg-theme_green rounded-[20px] w-[62px] h-[35px]">
                  <figure className="relative w-[40%] h-[60%]">
                    <Image
                      src={`/assets/icons/check.png`}
                      alt="Logo image"
                      fill
                    />
                  </figure>
                </section>
              )}
            </section>
          </section>
        </section>
      )}
    </section>
  );
};

export default Tasks;
