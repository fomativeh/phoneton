import { formatNumberWithCommas } from "fomautils";
import Image from "next/image";
import "../Refer/Refer.css";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { buy } from "@/api/user/user";
import { phonesData } from "@/utils/phonesData";
const InsufficientBalanceModal = ({
  amountNeeded,
  setCurrentPage,
  levelToUnlock,
  setModalOpen,
}: {
  amountNeeded: number | null;
  setCurrentPage: Dispatch<SetStateAction<string>>;
  levelToUnlock: number | null;
  setModalOpen: Dispatch<SetStateAction<Boolean>>;
}) => {
  return (
    <section className="absolute w-[100vw] h-[100vh] bg-[#000000ce] flex justify-center items-center z-[9]">
      <section className="gradient-vertical-3 flex flex-col justify-center items-center rounded-[25px] p-[20px] w-[300px]">
        <span className="font-bold text-[18px] text-[#ffffff]">
          Insufficient Balance!
        </span>
        <p className="max-w-[220px] mt-[20px] text-white">
          You need {formatNumberWithCommas(amountNeeded as number)} more PHN to
          unlock level {levelToUnlock}.
        </p>
        <div
          onClick={() => setCurrentPage("Home")}
          className="bg-theme_green text-[#6fe86f] px-[10px] py-[12px] text-bold rounded-[8px] text- mt-[20px]"
        >
          Mine more PHN
        </div>
      </section>
    </section>
  );
};

const StartedBuyingModal = ({
  levelToUnlock,
  unlockSuccessful,
}: {
  levelToUnlock: number | null;
  unlockSuccessful: Boolean;
}) => {
  return (
    <section className="absolute w-[100vw] h-[100vh] bg-[#000000ce] flex justify-center items-center z-[3]">
      <section className="text-white  gradient-vertical-2 flex flex-col justify-center items-center rounded-[10px] p-[20px]">
        {!unlockSuccessful && (
          <>
            <div className="lds-dual-ring"></div>
            <span className="text-[20px] font-bold mt-[14px]">
              Unlocking level {levelToUnlock}. Please wait...
            </span>
          </>
        )}

        {unlockSuccessful && (
          <>
            <span className="text-[20px] font-bold">
              Welcome to level {levelToUnlock}!
            </span>
          </>
        )}
      </section>
    </section>
  );
};

const PurchaseModal = ({
  setPurchaseModalOpen,
  levelToUnlock,
  currentLevel,
  setStartedBuyingModalOpen,
  setUnlockSuccessful,
  chatId,
  loadUser,
  setCurrentPage,
  currentMineIntervalId,
  price,
  balance,
  setModalOpen,
}: {
  setCurrentPage: Dispatch<SetStateAction<string>>;
  chatId: number;
  loadUser: (data: number | null) => Promise<void>;
  setPurchaseModalOpen: Dispatch<SetStateAction<Boolean>>;
  levelToUnlock: number;
  currentLevel: number;
  setStartedBuyingModalOpen: Dispatch<SetStateAction<Boolean>>;
  setUnlockSuccessful: Dispatch<SetStateAction<Boolean>>;
  currentMineIntervalId: any;
  price: number;
  balance: number;
  setModalOpen: Dispatch<SetStateAction<Boolean>>;
}) => {
  //Go back to main page after purchase
  const handleContinue = () => {
    loadUser(chatId);
    setCurrentPage("Home");
  };

  const buyPhone = async () => {
    if (balance < price) {
      setPurchaseModalOpen(false);
      return setModalOpen(true);
    }
    // if (currentLevel > levelToUnlock || currentLevel == levelToUnlock) return; //Leave this here, it isn't a mere duplicate. Read the code thoroughly to understand its purpose
    setPurchaseModalOpen(false);
    setStartedBuyingModalOpen(true);

    const res = await buy(chatId, levelToUnlock);
    if (res?.success) {
      //Show success message for 3 secs before switching to main page
      setUnlockSuccessful(true);
      setTimeout(() => {
        clearInterval(currentMineIntervalId);
        setStartedBuyingModalOpen(false);
        handleContinue();
      }, 3000);
    } else {
      setStartedBuyingModalOpen(false);
    }
  };

  const phoneDetails = phonesData.filter(
    (eachPhone) => eachPhone.level == levelToUnlock
  )[0];
  return (
    <section className="absolute w-[102vw] h-[100vh] bg-black z-[4] flex flex-col justify-start items-center overflow-y-hidden">
      <figure className="relative w-[170px] h-[50px] my-[20px]">
        <Image src={`/assets/images/logo.svg`} alt="Logo image" fill />
      </figure>

      <section className="w-full flex flex-col justify-start items-center purchase-modal gradient-bg pt-[2px] rounded-t-[30px]">
        <section className="w-full h-full flex flex-col justify-start items-center bg-black rounded-t-[35px]">
          <section className="absolute w-full h-full flex flex-col justify-start items-center pt-[30px]">
            {/* Phone image */}
            <figure className=" max-w-[200px] w-[30%] h-[40%] relative my-[20px]">
              <Image
                src={`/assets/images/store-${levelToUnlock}.svg`}
                alt={"Phone image"}
                fill
              />
            </figure>

            {/* Close icon */}
            <section
              className="absolute right-[40px]"
              onClick={() => setPurchaseModalOpen(false)}
            >
              <figure className="w-[20px] h-[20px] relative">
                <Image
                  src="/assets/icons/close-2.svg"
                  alt={"Close modal icon"}
                  fill
                />
              </figure>
            </section>

            <span className="font-bold text-[20px] text-white">
              Level {levelToUnlock}
            </span>
            <section className="flex items-center mt-[6px] mb-[10px]">
              <figure className="w-[20px] h-[20px] relative mr-[6px]">
                <Image src={`/assets/images/logo.png`} alt="Logo image" fill />
              </figure>

              <span className="font-bold text-white">
                {formatNumberWithCommas(phoneDetails.price)}
              </span>
            </section>

            <span className="font-bold my-[5px] text-white">
              {phoneDetails.claim} PHN/claim
            </span>
            <span className="font-bold my-[5px] text-white">
              {phoneDetails.reward} daily rewards
            </span>

            <button
              onClick={buyPhone}
              className={`
                  ${
                    (currentLevel > levelToUnlock ||
                      currentLevel == levelToUnlock) &&
                    `opacity-[0.5]`
                  }
                  mt-[13px] px-[25px] py-[10px] rounded-[8px] gradient-bg text-white flex items-center font-bold text-[20px]`}
            >
              {currentLevel > levelToUnlock || currentLevel == levelToUnlock
                ? "Completed"
                : "Buy"}
            </button>
          </section>
        </section>
      </section>
    </section>
  );
};

const Cart = ({
  user,
  setCurrentPage,
  loadUser,
  currentMineIntervalId,
}: {
  user: any;
  loadUser: (data: number | null) => Promise<void>;
  setCurrentPage: Dispatch<SetStateAction<string>>;
  currentMineIntervalId: any;
}) => {
  const level = user?.level;
  const balance = user?.mineBalance;
  const [modalOpen, setModalOpen] = useState<Boolean>(false);
  const [amountNeeded, setAmountNeeded] = useState<number | null>(null);
  const [levelToUnlock, setLevelToUnlock] = useState<number | null>(null);
  const [purchaseModalOpen, setPurchaseModalOpen] = useState<Boolean>(false);
  const [startedBuyingModalOpen, setStartedBuyingModalOpen] =
    useState<Boolean>(false);
  const [unlockSuccessful, setUnlockSuccessful] = useState<Boolean>(false);
  const [priceOfPhoneToBuy, setPriceOfPhoneToBuy] = useState<number | null>(
    null
  );

  const handleScroll = () => {
    if (modalOpen || purchaseModalOpen || startedBuyingModalOpen) {
      window.scrollTo(0, 0);
      return (document.body.style.overflowY = "hidden");
    }
    return (document.body.style.overflowY = "scroll");
  };

  useEffect(() => {
    handleScroll();
  }, [modalOpen, purchaseModalOpen, startedBuyingModalOpen]);

  const handleBuy = async (levelToBuy: number, price: number) => {
    setPriceOfPhoneToBuy(price);
    setAmountNeeded(price - balance);
    setLevelToUnlock(levelToBuy);
    return setPurchaseModalOpen(true);
  };

  let phonesToRender: any[] = [];

  //Show previous level cards, current level, and one level above current level only
  phonesData.forEach((eachPhone) => {
    if (eachPhone.level < level) {
      phonesToRender.push(eachPhone);
    }
    if (eachPhone.level == level) {
      phonesToRender.push(eachPhone);
    }
    if (eachPhone.level - level == 1) {
      console.log(eachPhone);
      phonesToRender.push(eachPhone);
    }
  });

  return (
    <section className="w-full flex flex-col justify-start items-center relative">
      {startedBuyingModalOpen && (
        <StartedBuyingModal
          unlockSuccessful={unlockSuccessful}
          levelToUnlock={levelToUnlock}
        />
      )}
      {purchaseModalOpen && (
        <PurchaseModal
          balance={balance}
          price={priceOfPhoneToBuy as number}
          setModalOpen={setModalOpen}
          currentMineIntervalId={currentMineIntervalId}
          chatId={user?.chatId}
          loadUser={loadUser}
          setCurrentPage={setCurrentPage}
          setUnlockSuccessful={setUnlockSuccessful}
          currentLevel={level}
          setPurchaseModalOpen={setPurchaseModalOpen}
          levelToUnlock={levelToUnlock as number}
          setStartedBuyingModalOpen={setStartedBuyingModalOpen}
        />
      )}
      {modalOpen && (
        <InsufficientBalanceModal
          amountNeeded={amountNeeded}
          setModalOpen={setModalOpen}
          levelToUnlock={levelToUnlock}
          setCurrentPage={setCurrentPage}
        />
      )}
      <figure className="relative w-[170px] h-[50px] mt-[20px]">
        <Image src={`/assets/images/logo.svg`} alt="Logo image" fill />
      </figure>

      <span className="text-theme_text_silver text-[30px] mb-[15px] mt-[10px]">
        Phone Shop
      </span>
      <> {console.log(phonesToRender)}</>

      <section className="w-full flex justify-between items-center flex-wrap mb-[80px] px-[10px]">
        {phonesToRender.map((each, i) => {
          let levelIsHigher = i + 1 > level;
          // if (i + 1 > level) return;
          return (
            <section
              key={i}
              className="w-[45%] flex justify-center items-center h-fit p-[2px] gradient-bg rounded-[8px] mx-[5px] my-[20px]"
            >
              <section
                onClick={() => handleBuy(each.level, each.price)}
                className="w-full bg-[#161616] rounded-[inherit] max-h-[220px] flex flex-col justify-between items-center pt-[5px]"
              >
                <section className="relative w-full flex flex-col justify-center items-center">
                  {/* Phone image */}
                  <figure
                    className={`${
                      !levelIsHigher || i + 1 == level + 1
                        ? "w-[55px] h-[120px]"
                        : "w-full h-[160px]"
                    }  relative z-[2]`}
                  >
                    <Image
                      src={`/assets/images/${
                        !levelIsHigher || i + 1 == level + 1
                          ? each.image
                          : "lock"
                      }.svg`}
                      alt={!levelIsHigher ? "Phone image" : "Lock image"}
                      fill
                    />
                  </figure>

                  {/* Blue image */}
                  <section className=" flex justify-center items-center absolute w-full h-full top-0 left-0 r-0">
                    <figure className="relative w-[250px] h-[200px]">
                      <Image
                        src={`/assets/images/shop-blur.svg`}
                        alt={"Blur image"}
                        fill
                      />
                    </figure>
                  </section>
                </section>

                <section
                  className={`w-full flex items-center py-[7px] px-[10px] justify-between `}
                >
                  <>
                    <section className="flex flex-col justify-center items-start">
                      <span className="font-bold text-white">
                        Level {each.level}
                      </span>
                      <section className="flex items-center mt-[6px]">
                        <figure className="w-[20px] h-[20px] relative mr-[6px]">
                          <Image
                            src={`/assets/images/logo.png`}
                            alt="Phone image"
                            fill
                          />
                        </figure>

                        <span className="font-bold text-white">
                          {formatNumberWithCommas(each.price)}
                        </span>
                      </section>
                    </section>

                    <div
                      className={`gradient-bg rounded-[8px] cursor-pointer w-[35px] h-[35px] flex justify-center items-center`}
                    >
                      <figure className={`h-[70%] w-[70%] relative`}>
                        <Image
                          src={`/assets/icons/${
                            level >= i + 1 ? "Check" : "Cart"
                          }.svg`}
                          alt="Cart image"
                          fill
                        />
                      </figure>
                    </div>
                  </>
                </section>
              </section>
            </section>
          );
        })}

        {level < 9 && (
          <section className="w-[43%] flex justify-center items-center gradient-bg rounded-[8px] mx-[5px] my-[20px] h-fit p-[2px]">
            <section className="bg-[black] w-full rounded-[inherit] min-h-[100px] h-fit flex flex-col justify-center items-center">
              <figure
                className={`${"w-[60px] h-[60px]"}  relative mb-[20px] mt-[40px]`}
              >
                <Image src={`/assets/icons/lock.svg`} alt={"Lock image"} fill />
              </figure>

              <section
                className={`w-full flex justify-between items-center px-[10px] mb-[15px]`}
              >
                <span className="font-bold text-white text-[21px]">
                  Level {level + 2}
                </span>

                <div
                  className={`gradient-bg rounded-[8px] cursor-pointer w-[35px] h-[35px] flex justify-center items-center`}
                >
                  <figure className={`h-[70%] w-[70%] relative`}>
                    <Image
                      src={`/assets/icons/Cart.svg`}
                      alt="Cart image"
                      fill
                    />
                  </figure>
                </div>
              </section>
            </section>
          </section>
        )}
      </section>
    </section>
  );
};

export default Cart;
