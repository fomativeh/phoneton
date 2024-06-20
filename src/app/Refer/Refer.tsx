import Image from "next/image";
import React from "react";

const Refer = () => {
  return (
    <section className="flex flex-col justify-start items-center">
      {/* Logo */}
      <figure className="relative w-[170px] h-[50px] mt-[50px]">
        <Image src={`/assets/images/logo-2.png`} alt="Logo image" fill />
      </figure>

      <span className="text-theme_text_silver font-bold text-[45px] mb-[5px] mt-[30px]">
        Friends
      </span>

      <section className="w-[90vw] flex flex-col justify-start items-start mt-[15px]">
        <section className="w-full task rounded-[26px] py-[15px] flex flex-col justify-center items-center">
          <span className="text-[20px] font-bold mb-[10px]">
            Referral income
          </span>

          <section
            className={`h-fit flex items-center w-full justify-center
            `}
          >
            <figure className="w-[22px] h-[22px] relative mr-[5px]">
              <Image src={`/assets/images/logo.png`} alt="Logo image" fill />
            </figure>
            <span className="text-white font-bold text-[20pxpx]">1,324</span>
          </section>

          <section className="py-[10px] px-[35px] rounded-[8px] font-bold bg-theme_green text-white mt-[10px]">
            Claim
          </section>
        </section>

        <section className="w-full task rounded-[26px] py-[10px] mt-[10px] flex flex-col justify-start items-start pl-[40px]">
          <span className="text-[18px] font-bold mb-[14px]">Invite friend</span>

          <section className="w-full flex flex-col justify-start items-start">
            <span className="text-[12px] font-bold mb-[5px]">
              Score <span className="text-light_green">10%</span> of your
              friends' earnings.
            </span>

            {/* <span className="text-[12px] font-bold">
              + an extra <span className="text-light_green">10%</span> from
              their referrals
            </span> */}
          </section>
        </section>

        <span className="font-bold text-white text-[14px] mt-[22px]">
          {"Friend's list (1)"}
        </span>

        <section className="w-full flex flex-col justify-start items-center mt-[15px] mb-[150px]">
          <section className="w-full justify-between items-center flex rounded-[12px] task pr-[15px] py-[10px] pl-[10px] mb-[13px]">
            <section className="flex items-center">
              <figure className="w-[36px] h-[36px] relative ml-[7px] mr-[12px]">
                <Image src={`/assets/images/logo.png`} alt="Logo image" fill />
              </figure>

              <section className="flex flex-col justify-center items-start">
                <span className="font-bold text-white mb-[5px] text-[12px]">
                  Join our Telegram
                </span>
                <span className="font-bold text-white text-[10px]">
                  +20 PHN
                </span>
              </section>
            </section>

            <section className="flex items-center">
              <span className="text-white font-bold text-[14px]">+100</span>

              <figure className="w-[18px] h-[18px] relative ml-[7px]">
                <Image src={`/assets/images/logo.png`} alt="Logo image" fill />
              </figure>
            </section>
          </section>

          <section className="w-full justify-between items-center flex rounded-[12px] task pr-[15px] py-[10px] pl-[10px] mb-[13px]">
            <section className="flex items-center">
              <figure className="w-[36px] h-[36px] relative ml-[7px] mr-[12px]">
                <Image src={`/assets/images/logo.png`} alt="Logo image" fill />
              </figure>

              <section className="flex flex-col justify-center items-start">
                <span className="font-bold text-white mb-[5px] text-[12px]">
                  Join our Telegram
                </span>
                <span className="font-bold text-white text-[10px]">
                  +20 PHN
                </span>
              </section>
            </section>

            <section className="flex items-center">
              <span className="text-white font-bold text-[14px]">+100</span>

              <figure className="w-[18px] h-[18px] relative ml-[7px]">
                <Image src={`/assets/images/logo.png`} alt="Logo image" fill />
              </figure>
            </section>
          </section>

          <section className="w-full justify-between items-center flex rounded-[12px] task pr-[15px] py-[10px] pl-[10px] mb-[13px]">
            <section className="flex items-center">
              <figure className="w-[36px] h-[36px] relative ml-[7px] mr-[12px]">
                <Image src={`/assets/images/logo.png`} alt="Logo image" fill />
              </figure>

              <section className="flex flex-col justify-center items-start">
                <span className="font-bold text-white mb-[5px] text-[12px]">
                  Join our Telegram
                </span>
                <span className="font-bold text-white text-[10px]">
                  +20 PHN
                </span>
              </section>
            </section>

            <section className="flex items-center">
              <span className="text-white font-bold text-[14px]">+100</span>

              <figure className="w-[18px] h-[18px] relative ml-[7px]">
                <Image src={`/assets/images/logo.png`} alt="Logo image" fill />
              </figure>
            </section>
          </section>

          <section className="w-full justify-between items-center flex rounded-[12px] task pr-[15px] py-[10px] pl-[10px] mb-[13px]">
            <section className="flex items-center">
              <figure className="w-[36px] h-[36px] relative ml-[7px] mr-[12px]">
                <Image src={`/assets/images/logo.png`} alt="Logo image" fill />
              </figure>

              <section className="flex flex-col justify-center items-start">
                <span className="font-bold text-white mb-[5px] text-[12px]">
                  Join our Telegram
                </span>
                <span className="font-bold text-white text-[10px]">
                  +20 PHN
                </span>
              </section>
            </section>

            <section className="flex items-center">
              <span className="text-white font-bold text-[14px]">+100</span>

              <figure className="w-[18px] h-[18px] relative ml-[7px]">
                <Image src={`/assets/images/logo.png`} alt="Logo image" fill />
              </figure>
            </section>
          </section>
        </section>
      </section>

      <section className="left-0 bg-black w-full fixed bottom-[70px] h-[60px] flex justify-center items-center">
        <section className="py-[10px] px-[55px] rounded-[8px] font-bold bg-theme_green text-white">
          Claim
        </section>
      </section>
    </section>
  );
};

export default Refer;
