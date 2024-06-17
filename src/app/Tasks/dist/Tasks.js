"use strict";
exports.__esModule = true;
var image_1 = require("next/image");
var react_1 = require("react");
require("./Task.scss");
var Tasks = function () {
    return (react_1["default"].createElement("section", { className: "flex flex-col justify-start items-center" },
        react_1["default"].createElement("figure", { className: "relative w-[170px] h-[50px] mt-[50px]" },
            react_1["default"].createElement(image_1["default"], { src: "/assets/images/logo-2.png", alt: "Logo image", fill: true })),
        react_1["default"].createElement("span", { className: "text-theme_text_silver font-bold text-[45px] mb-[5px] mt-[30px]" }, "Quests"),
        react_1["default"].createElement("span", { className: "text-theme_text_silver text-[12px] font-bold" }, "Get rewards for completing quests"),
        react_1["default"].createElement("section", { className: "w-[90vw] flex flex-col justify-start items-start mt-[35px]" },
            react_1["default"].createElement("span", { className: "font-bold text-theme_text_silver text-[20px]" }, "All tasks"),
            react_1["default"].createElement("section", { className: "w-full flex flex-col justify-start items-center mt-[15px]" },
                react_1["default"].createElement("section", { className: "w-full justify-between items-center flex rounded-[12px] task pr-[15px] py-[10px] pl-[30px] mb-[13px]" },
                    react_1["default"].createElement("section", { className: "flex flex-col justify-center items-start" },
                        react_1["default"].createElement("span", { className: "font-bold text-white mb-[5px]" }, "Join our Telegram"),
                        react_1["default"].createElement("span", { className: "font-bold text-white text-[10px]" }, "+20 PHN")),
                    react_1["default"].createElement("div", { className: "bg-theme_green text-white rounded-[12px] flex justify-center items-center font-bold text-[14px] py-[10px] px-[14px]" }, "Start")),
                react_1["default"].createElement("section", { className: "w-full justify-between items-center flex rounded-[12px] task pr-[15px] py-[10px] pl-[30px] mb-[13px]" },
                    react_1["default"].createElement("section", { className: "flex flex-col justify-center items-start" },
                        react_1["default"].createElement("span", { className: "font-bold text-white mb-[5px]" }, "Join our Channel (RU)"),
                        react_1["default"].createElement("span", { className: "font-bold text-white text-[10px]" }, "+20 PHN")),
                    react_1["default"].createElement("div", { className: "bg-theme_green text-white rounded-[12px] flex justify-center items-center font-bold text-[14px] py-[10px] px-[14px]" }, "Start")),
                react_1["default"].createElement("section", { className: "w-full justify-between items-center flex rounded-[12px] task pr-[15px] py-[10px] pl-[30px]" },
                    react_1["default"].createElement("section", { className: "flex flex-col justify-center items-start" },
                        react_1["default"].createElement("span", { className: "font-bold text-white mb-[5px]" }, "Invite 3 new friends"),
                        react_1["default"].createElement("span", { className: "font-bold text-white text-[10px]" }, "+150 PHN")),
                    react_1["default"].createElement("div", { className: "bg-theme_green text-white rounded-[12px] flex justify-center items-center font-bold text-[14px] py-[10px] px-[14px]" }, "Start"))))));
};
exports["default"] = Tasks;
