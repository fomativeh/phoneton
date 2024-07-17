import Image from "next/image";
import React from "react";
import "./Task.scss";
import { initUtils } from "@tma.js/sdk";

const Tasks = ({
  user,
  loadUser,
}: {
  user: any;
  loadUser: (data: number | null) => Promise<void>;
}) => {
  const utils = initUtils();

  const joinTelegram = () => {
    setTimeout(() => loadUser(user?.chatId), 5000);
    setTimeout(() => loadUser(user?.chatId), 10000);
    utils.openTelegramLink("https://t.me/PhoneTonEcosystem");
  };

  const joinTelegram2 = () => {
    setTimeout(() => loadUser(user?.chatId), 5000);
    setTimeout(() => loadUser(user?.chatId), 10000);
    utils.openTelegramLink("https://t.me/PhoneTonEcosystemRU");
  };

  const inviteFriends = () => {
    utils.openTelegramLink(`https://t.me/share/url?url=https://t.me/phonetonbot?start=${user.chatId}&text=Play with me, get a coins!\n💸 +28 Coins as a first-time gift.\n🔥 +64 Coins if you have Telegram Premium`)
  };

  return (
    <section className="flex flex-col justify-start items-center">
      {/* Logo */}
      <figure className="relative w-[170px] h-[50px] mt-[15px]">
        <Image src={`/assets/images/logo.svg`} alt="Logo image" fill />
      </figure>

      <span className="text-theme_text_silver font-bold text-[35px] mb-[5px] mt-[15px]">
        Quests
      </span>
      <span className="text-theme_text_silver text-[12px] font-bold">
        Get rewards for completing quests
      </span>

      {user && (
        <section className="w-[90vw] flex flex-col justify-start items-start mt-[20px]">
          <span className="font-bold text-theme_text_silver text-[20px]">
            All tasks
          </span>

          <section className="w-full flex flex-col justify-start items-center mt-[15px]">
            <section className="w-full h-fit p-[2px] rounded-[6px] gradient-bg mb-[13px]">
              <section className="w-full justify-between bg-[black] items-center flex rounded-[inherit] pr-[15px] py-[10px] pl-[17px]">
                <section className="flex flex-col justify-center items-start">
                  <span className="font-bold text-white mb-[5px]">
                    Join our Telegram
                  </span>
                  <span className="font-bold text-white text-[10px]">
                    +20 PHN
                  </span>
                </section>
                {!user?.task1Done && (
                  <section
                    onClick={joinTelegram}
                    className="w-[80px] h-[35px] rounded-[8px] p-[2px] gradient-bg"
                  >
                    <div className="bg-[black] text-white rounded-[inherit] flex justify-center items-center font-bold  w-full h-full">
                      Start
                    </div>
                  </section>
                )}
                {user?.task1Done && (
                  <section className="flex justify-center items-center gradient-bg rounded-[20px] w-[80px] h-[35px]">
                    <figure className="relative w-[30px] h-[30px]">
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

            <section className="w-full h-fit p-[2px] rounded-[6px] gradient-bg mb-[13px]">
              <section className="w-full justify-between bg-[black] items-center flex rounded-[inherit] pr-[15px] py-[10px] pl-[17px]">
                <section className="flex flex-col justify-center items-start">
                  <span className="font-bold text-white mb-[5px]">
                    Join our Channel (RU)
                  </span>
                  <span className="font-bold text-white text-[10px]">
                    +20 PHN
                  </span>
                </section>
                {!user?.task2Done && (
                  <section
                    onClick={joinTelegram2}
                    className="w-[80px] h-[35px] rounded-[8px] p-[2px] gradient-bg"
                  >
                    <div className="bg-[black] text-white rounded-[inherit] flex justify-center items-center font-bold  w-full h-full">
                      Start
                    </div>
                  </section>
                )}
                {user?.task2Done && (
                  <section className="flex justify-center items-center gradient-bg rounded-[20px] w-[80px] h-[35px]">
                    <figure className="relative w-[30px] h-[30px]">
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

            <section className="w-full h-fit p-[2px] rounded-[6px] gradient-bg mb-[13px]">
              <section className="w-full justify-between bg-[black] items-center flex rounded-[inherit] pr-[15px] py-[10px] pl-[17px]">
                <section className="flex flex-col justify-center items-start">
                  <span className="font-bold text-white mb-[5px]">
                    Invite 3 new friends
                  </span>
                  <span className="font-bold text-white text-[10px]">
                    +150 PHN
                  </span>
                </section>
                {!user?.task3Done && (
                  <section
                    onClick={inviteFriends}
                    className="w-[80px] h-[35px] rounded-[8px] p-[2px] gradient-bg"
                  >
                    <div className="bg-[black] text-white rounded-[inherit] flex justify-center items-center font-bold  w-full h-full">
                      Start
                    </div>
                  </section>
                )}
                {user?.task3Done && (
                  <section className="flex justify-center items-center gradient-bg rounded-[20px] w-[80px] h-[35px]">
                    <figure className="relative w-[30px] h-[30px]">
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
        </section>
      )}
    </section>
  );
};

export default Tasks;
