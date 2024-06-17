"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Nav_1 = require("./Nav/Nav");
var Main_1 = require("./Main/Main");
var Tasks_1 = require("./Tasks/Tasks");
var Refer_1 = require("./Refer/Refer");
var Cart_1 = require("./Cart/Cart");
function Home() {
    var _a = react_1.useState(1), level = _a[0], setLevel = _a[1];
    var _b = react_1.useState("Home"), currentPage = _b[0], setCurrentPage = _b[1];
    var _c = react_1.useState(""), counterMarginTop = _c[0], setCounterMarginTop = _c[1];
    react_1.useEffect(function () {
        switch (level) {
            case 1:
                setCounterMarginTop("188px");
                break;
            case 2:
                setCounterMarginTop("148px");
                break;
            case 3:
                setCounterMarginTop("200px");
                break;
            case 4:
                setCounterMarginTop("170px");
                break;
            case 5:
                setCounterMarginTop("135px");
                break;
            case 6:
                setCounterMarginTop("165px");
                break;
            case 7:
                setCounterMarginTop("165px");
                break;
            case 8:
                setCounterMarginTop("120px");
                break;
            case 9:
                setCounterMarginTop("150px");
                break;
            case 10:
                setCounterMarginTop("200px");
                break;
            default:
                setCounterMarginTop("");
        }
    }, [level]);
    // console.log(counterMarginTop);
    return (React.createElement("main", { className: "relative flex min-h-screen flex-col items-center justify-start" },
        currentPage == "Home" && (React.createElement(Main_1["default"], { counterMarginTop: counterMarginTop, level: level })),
        currentPage == "Tasks" && React.createElement(Tasks_1["default"], null),
        currentPage == "Refer" && React.createElement(Refer_1["default"], null),
        currentPage == "Cart" && React.createElement(Cart_1["default"], null),
        React.createElement(Nav_1.Nav, { currentPage: currentPage, setCurrentPage: setCurrentPage })));
}
exports["default"] = Home;
