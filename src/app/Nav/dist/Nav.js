"use client";
"use strict";
exports.__esModule = true;
exports.Nav = void 0;
var image_1 = require("next/image");
exports.Nav = function (_a) {
    var currentPage = _a.currentPage, setCurrentPage = _a.setCurrentPage;
    var icons = ["Home", "Tasks", "Refer", "Cart"];
    return (React.createElement("nav", { className: "bg-nav_bg h-[70px] fixed bottom-0 left-0 w-full flex justify-evenly items-center" }, icons.map(function (each) {
        return (React.createElement("section", { onClick: function () { return setCurrentPage(each); }, className: " p-[10px]\n            " + (currentPage == each && "bg-theme_green  rounded-[50px]") },
            React.createElement("figure", { className: "relative w-[30px] h-[30px] " },
                React.createElement(image_1["default"], { src: "/assets/icons/" + each + ".svg", alt: "Nav icon", fill: true }))));
    })));
};
