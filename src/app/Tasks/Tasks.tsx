import Image from "next/image";
import React from "react";
import "./Task.scss";

const Tasks = () => {
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

      <section className="w-[90vw] flex flex-col justify-start items-start mt-[35px]">
        <span className="font-bold text-theme_text_silver text-[20px]">
          All tasks
        </span>

        <section className="w-full flex flex-col justify-start items-center mt-[15px]">
          <section className="w-full justify-between items-center flex rounded-[12px] task pr-[15px] py-[10px] pl-[30px] mb-[13px]">
            <section className="flex flex-col justify-center items-start">
              <span className="font-bold text-white mb-[5px]">Join our Telegram</span>
              <span className="font-bold text-white text-[10px]">+20 PHN</span>
            </section>
            <div className="bg-theme_green text-white rounded-[12px] flex justify-center items-center font-bold text-[14px] py-[10px] px-[14px]">
              Start
            </div>
          </section>

          <section className="w-full justify-between items-center flex rounded-[12px] task pr-[15px] py-[10px] pl-[30px] mb-[13px]">
            <section className="flex flex-col justify-center items-start">
            <span className="font-bold text-white mb-[5px]">Join our Channel (RU)</span>
            <span className="font-bold text-white text-[10px]">+20 PHN</span>
            </section>
            <div className="bg-theme_green text-white rounded-[12px] flex justify-center items-center font-bold text-[14px] py-[10px] px-[14px]">
              Start
            </div>
          </section>

          <section className="w-full justify-between items-center flex rounded-[12px] task pr-[15px] py-[10px] pl-[30px]">
            <section className="flex flex-col justify-center items-start">
            <span className="font-bold text-white mb-[5px]">Invite 3 new friends</span>
            <span className="font-bold text-white text-[10px]">+150 PHN</span>
            </section>
            <div className="bg-theme_green text-white rounded-[12px] flex justify-center items-center font-bold text-[14px] py-[10px] px-[14px]">
              Start
            </div>
          </section>
        </section>
      </section>
    </section>
  );
};

export default Tasks;
