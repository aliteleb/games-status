import React, { useEffect, useState } from "react";

const refreshPageSizeProcess = (id = "") => {
    const root = document.getElementById("root");
    const height = Math.max(root.scrollHeight, root.offsetHeight);
    let blurredBg = document.getElementById("blurred-bg" + id);
    if (blurredBg)
        blurredBg.style.height = height + "px";

    let blurredBgDef = document.getElementById("blurred-bg");
    if (blurredBgDef)
        blurredBgDef.style.height = height + "px";

};
export const refreshPageSize = (id = "") => {
    refreshPageSizeProcess(id);
    setTimeout(() => {
        refreshPageSizeProcess(id);
    }, 0);
    setTimeout(() => {
        refreshPageSizeProcess(id);
    }, 50);
    setTimeout(() => {
        refreshPageSizeProcess(id);
    }, 100);
    setTimeout(() => {
        refreshPageSizeProcess(id);
    }, 1000);
};

function BlurredBackground(props) {
    const [background, setBackground] = useState(null);

    useEffect(() => {
        if (props.image) setBackground(props.image);
    });

    return (
        <div
            id={`blurred-bg${props.id ?? ""}`}
            className={`blurred-bg w-full h-screen absolute top-0 left-0 overflow-hidden z-[-1]`}
        >
            <img
                className={`opacity-30 top-0 w-full h-screen ${
                    background && "fade30"
                }`}
                src={
                    background ||
                    "/assets/images/game-placeholder-horizontal.jpg"
                }
                alt="bg"
            />
            <img
                className={`opacity-30 top-[100%] w-full h-screen -scale-y-100 ${
                    background && "fade30"
                }`}
                src={
                    background ||
                    "/assets/images/game-placeholder-horizontal.jpg"
                }
                alt="bg"
            />
            <img
                className={`opacity-30 top-0 w-full h-screen ${
                    background && "fade30"
                }`}
                src={
                    background ||
                    "/assets/images/game-placeholder-horizontal.jpg"
                }
                alt="bg"
            />
            <img
                className={`opacity-30 top-[100%] w-full h-screen -scale-y-100 ${
                    background && "fade30"
                }`}
                src={
                    background ||
                    "/assets/images/game-placeholder-horizontal.jpg"
                }
                alt="bg"
            />
            <img
                className={`opacity-30 top-0 w-full h-screen ${
                    background && "fade30"
                }`}
                src={
                    background ||
                    "/assets/images/game-placeholder-horizontal.jpg"
                }
                alt="bg"
            />
            <img
                className={`opacity-30 top-[100%] w-full h-screen -scale-y-100 ${
                    background && "fade30"
                }`}
                src={
                    background ||
                    "/assets/images/game-placeholder-horizontal.jpg"
                }
                alt="bg"
            />
            <img
                className={`opacity-30 top-0 w-full h-screen ${
                    background && "fade30"
                }`}
                src={
                    background ||
                    "/assets/images/game-placeholder-horizontal.jpg"
                }
                alt="bg"
            />
            <img
                className={`opacity-30 top-[100%] w-full h-screen -scale-y-100 ${
                    background && "fade30"
                }`}
                src={
                    background ||
                    "/assets/images/game-placeholder-horizontal.jpg"
                }
                alt="bg"
            />
            <img
                className={`opacity-30 top-0 w-full h-screen ${
                    background && "fade30"
                }`}
                src={
                    background ||
                    "/assets/images/game-placeholder-horizontal.jpg"
                }
                alt="bg"
            />
            <img
                className={`opacity-30 top-[100%] w-full h-screen -scale-y-100 ${
                    background && "fade30"
                }`}
                src={
                    background ||
                    "/assets/images/game-placeholder-horizontal.jpg"
                }
                alt="bg"
            />
            <div className="absolute left-1/2 z-0 w-full -translate-x-1/2 backdrop-blur-xl top-[4rem] h-[200%]" />
        </div>
    );
}

export default BlurredBackground;
