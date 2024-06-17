import Image from "next/image";
import React from "react";

const Cart = () => {
    const phonesData = [
        {
            image:"store-1",
            name:"Novia 1011",
            level:1,
            price:0,
            completed:true
        },

        {
            image:"store-2",
            name:"Mokorola StarTAC",
            level:2,
            price:500,
            completed:false
        },
        {
            image:"store-3",
            name:"Novia 6110",
            level:3,
            price:1000,
            completed:false
        },

        {
            image:"store-4",
            name:"Novia 3310",
            level:4,
            price:3000,
            completed:false
        },
        {
            image:"store-5",
            name:"Semens ME45",
            level:5,
            price:6000,
            completed:false
        },
        {
            image:"store-6",
            name:"Novia 7650",
            level:6,
            price:12000,
            completed:false
        },
        {
            image:"store-7",
            name:"BlackJerry 6210",
            level:7,
            price:24000,
            completed:false
        },
        {
            image:"store-8",
            name:"Mokorola Razr V3",
            level:8,
            price:48000,
            completed:false
        },
        {
            image:"store-9",
            name:"Novia N95",
            level:9,
            price:96000,
            completed:false
        },
        {
            image:"store-10",
            name:"Apple Phone",
            level:10,
            price:192000,
            completed:false
        }
    ]
  return (
    <section className="w-full flex flex-col justify-start items-center">
      <span className="text-theme_text_silver font-bold text-[45px] mb-[15px] mt-[30px]">
        Phone Shop
      </span>

      <section className="w-full flex justify-center items-center flex-wrap mb-[80px]">
        {phonesData.map((each, i)=>{
            return (
                <section className="w-[45%] h-fit mx-[5px] my-[10px]" key={i}>
          <section className="w-full bg-[#161616] flex flex-col justify-center items-center py-[5px]">
            <figure className="w-[55px] h-[140px] relative">
              <Image
                src={`/assets/images/${each.image}.png`}
                alt="Phone image"
                fill
              />
            </figure>

            <span className="font-bold mt-[10px]">{each.name}</span>
          </section>

          <section className="bg-[#212121] w-full flex justify-between items-center py-[7px] px-[10px]">
            <section className="flex flex-col justify-center items-start">
              <span>Level {each.level}</span>
              <section className="flex items-center mt-[6px]">
                <figure className="w-[20px] h-[20px] relative mr-[6px]">
                  <Image
                    src={`/assets/images/logo.png`}
                    alt="Phone image"
                    fill
                  />
                </figure>

                <span className="font-bold">{each.price}</span>
              </section>
            </section>

            <div className={`bg-theme_green rounded-[10px] cursor-pointer ${each.completed? `p-[8px]`:`p-[10px]`}`}>
              <figure className={`${each.completed? `h-[22px] w-[22px]`:`h-[18px] w-[18px]`} relative`}>
                <Image src={`/assets/icons/${each.completed? "Check":"Cart"}.svg`} alt="Cart image" fill />
              </figure>
            </div>
          </section>
        </section>
            )
        })}
   
      </section>
    </section>
  );
};

export default Cart;
