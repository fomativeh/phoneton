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
    <section className="absolute w-[100vw] h-[100vh] bg-[#000000ce] flex justify-center items-center z-[3]">
      <section className="bg-theme_green flex flex-col justify-center items-center rounded-[25px] p-[20px] w-[300px]">
        <span className="font-bold text-[18px] text-[#ffffff]">
          Insufficient Balance!
        </span>
        <p className="max-w-[220px] mt-[20px] text-[#6fe86f]">
          You need {formatNumberWithCommas(amountNeeded as number)} more PHN to
          unlock level {levelToUnlock}.
        </p>
        <div
          onClick={() => setCurrentPage("Home")}
          className="bg-[#6fe86f] px-[10px] py-[12px] text-bold rounded-[8px] text-theme_green mt-[20px]"
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
      <section className="bg-theme_green flex flex-col justify-center items-center rounded-[25px] p-[20px]">
        {!unlockSuccessful && (
          <>
            <div className="lds-dual-ring"></div>
            <span className="text-[#91ff91] text-[15px] font-bold mt-[14px]">
              Unlocking level {levelToUnlock}. Please wait...
            </span>
          </>
        )}

        {unlockSuccessful && (
          <>
            <span className="text-[20px] font-bold text-[#99ff99]">
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
  price, balance, setModalOpen
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
  price:number
  balance:number
  setModalOpen:Dispatch<SetStateAction<Boolean>>;
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
    <section className="absolute w-[102vw] h-[100vh] bg-black z-[4] flex items-end">
      <figure className="w-full h-[80%] max-h-[600px] relative">
        {/* Glow image */}
        <Image
          src="/assets/images/purchase-modal.png"
          alt={"Purchase modal image"}
          fill
        />
        <section className="absolute w-full h-full flex flex-col justify-start items-center mt-[100px]">
          {/* Phone image */}
          <figure className=" max-w-[200px] w-[30%] h-[40%] relative mb-[20px]">
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

          <span className="font-bold text-[20px]">Level {levelToUnlock}</span>
          <section className="flex items-center mt-[6px] mb-[10px]">
            <figure className="w-[20px] h-[20px] relative mr-[6px]">
              <Image src={`/assets/images/logo.png`} alt="Logo image" fill />
            </figure>

            <span className="font-bold">
              {formatNumberWithCommas(phoneDetails.price)}
            </span>
          </section>

          <span className="font-bold my-[5px]">
            {phoneDetails.claim} PHN/claim
          </span>
          <span className="font-bold my-[5px]">
            {phoneDetails.reward} daily rewards
          </span>

          <div
            onClick={buyPhone}
            className="mt-[13px] px-[14px] py-[10px] rounded-[18px] bg-theme_green text-white flex items-center font-bold text-[20px]"
          >
            <span>
              {currentLevel > levelToUnlock || currentLevel == levelToUnlock
                ? "Completed"
                : "Buy"}
            </span>
            <figure className="ml-[10px] w-[18px] h-[18px] relative">
              <Image
                src={`/assets/icons/${
                  currentLevel > levelToUnlock || currentLevel == levelToUnlock
                    ? "Check"
                    : "cart"
                }.svg`}
                alt={"Check icon"}
                fill
              />
            </figure>
          </div>
        </section>
      </figure>
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
  const balance = user?.mineBalance - user?.mineBalance;
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
      <span className="text-theme_text_silver font-bold text-[45px] mb-[15px] mt-[30px]">
        Phone Shop
      </span>
      <> {console.log(phonesToRender)}</>

      <section className="w-full flex justify-between items-center flex-wrap mb-[80px] px-[10px]">
        {phonesToRender.map((each, i) => {
          let levelIsHigher = i + 1 > level;
          // if (i + 1 > level) return;
          return (
            <section
              onClick={() => handleBuy(each.level, each.price)}
              className="w-[43%] mx-[5px] my-[20px] bg-[#161616] h-[220px] max-h-[220px] flex flex-col justify-between items-center pt-[5px]"
              key={i}
            >
              <section className="w-full flex flex-col justify-center items-center">
                <figure
                  className={`${
                    !levelIsHigher || i + 1 == level + 1
                      ? "w-[55px] h-[120px]"
                      : "w-full h-[160px]"
                  }  relative`}
                >
                  <Image
                    src={`/assets/images/${
                      !levelIsHigher || i + 1 == level + 1 ? each.image : "lock"
                    }.svg`}
                    alt={!levelIsHigher ? "Phone image" : "Lock image"}
                    fill
                  />
                </figure>

                <span className="font-bold my-[5px]">{each.name}</span>
              </section>

              <section
                className={`bg-[#212121] w-full flex items-center py-[7px] px-[10px] justify-between `}
              >
                <>
                  <section className="flex flex-col justify-center items-start">
                    <span className="font-bold">Level {each.level}</span>
                    <section className="flex items-center mt-[6px]">
                      <figure className="w-[20px] h-[20px] relative mr-[6px]">
                        <Image
                          src={`/assets/images/logo.png`}
                          alt="Phone image"
                          fill
                        />
                      </figure>

                      <span className="font-bold">
                        {formatNumberWithCommas(each.price)}
                      </span>
                    </section>
                  </section>

                  <div
                    className={`bg-theme_green rounded-[10px] cursor-pointer ${
                      level >= i + 1 ? `p-[8px]` : `p-[10px]`
                    }`}
                  >
                    <figure
                      className={`${
                        level >= i + 1
                          ? `h-[22px] w-[22px]`
                          : `h-[18px] w-[18px]`
                      } relative`}
                    >
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
          );
        })}

        {level < 9 && (
          <section className="w-[43%] mx-[5px] my-[20px] bg-[#161616] h-[220px] max-h-[220px] flex flex-col justify-between items-center pt-[5px]">
            <section className="w-full flex flex-col justify-center items-center">
              <figure className={`${"w-full h-[160px]"}  relative`}>
                <Image
                  src={`/assets/images/${"lock"}.png`}
                  alt={"Lock image"}
                  fill
                />
              </figure>
            </section>

            <section
              className={`bg-[#212121] w-full flex items-center py-[20px] px-[10px] justify-center `}
            >
              <>
                <section className="flex flex-col justify-center items-start">
                  <span className="font-bold">Level {level + 2}</span>
                </section>
              </>
            </section>
          </section>
        )}
      </section>
    </section>
  );
};

export default Cart;
