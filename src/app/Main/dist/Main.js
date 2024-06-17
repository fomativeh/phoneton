"use strict";
exports.__esModule = true;
var image_1 = require("next/image");
var react_1 = require("react");
var Main = function (_a) {
    var counterMarginTop = _a.counterMarginTop, level = _a.level;
    return (react_1["default"].createElement("section", { className: "flex flex-col justify-start items-center" },
        react_1["default"].createElement("figure", { className: "relative w-[170px] h-[50px] mt-[50px]" },
            react_1["default"].createElement(image_1["default"], { src: "/assets/images/logo-2.png", alt: "Logo image", fill: true })),
        counterMarginTop !== "" && (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement("figure", { className: "relative w-[280px] h-[450px] mt-[-30px] flex justify-center" },
                react_1["default"].createElement("section", { className: "h-fit flex items-center w-full justify-center\n           ", style: { marginTop: counterMarginTop } },
                    react_1["default"].createElement("figure", { className: "w-[22px] h-[22px] relative mr-[5px]" },
                        react_1["default"].createElement(image_1["default"], { src: "/assets/images/logo.png", alt: "Logo image", fill: true })),
                    react_1["default"].createElement("span", { className: "text-white font-bold text-[14px]" }, "1,324")),
                react_1["default"].createElement(image_1["default"], { src: "/assets/images/level-" + level + ".png", alt: "Phone image", fill: true, className: "z-[-1]" })),
            react_1["default"].createElement("section", { className: "relative py-[10px] px-[20px] rounded-[40px] flex justify-center items-center bg-theme_green text-white min-w-[200px]" },
                react_1["default"].createElement("span", { className: "font-bold text-[20px]" }, "0.000"),
                react_1["default"].createElement("span", { className: "text-[10px] font-medium absolute right-[8px]" }, "22h 12m"))))));
};
exports["default"] = Main;
