import React, {useEffect, useState} from "react";

export const refreshPageSize = () => {

    const root = document.getElementById("root");
    const height = Math.max(
        root.scrollHeight,
        root.offsetHeight,
    );
    let blurredBg = document.getElementById('blurred-bg');
    if(blurredBg)
        blurredBg.style.height = height + 'px';
}

function BlurredBackground(props) {

    const [background, setBackground] = useState(null)

    useEffect(() => {
        if(props.image)
            setBackground(props.image)
    });

    return (
        <div id="blurred-bg" className={`blurred-bg w-full h-screen absolute top-0 left-0 overflow-hidden z-[-1]`}>
            <img className={`opacity-30 top-0 w-full h-screen ${background && 'fade30'}`} src={background || '/assets/images/game-placeholder-horizontal.jpg'} alt="bg"/>
            <img className={`opacity-30 top-[100%] w-full h-screen -scale-y-100 ${background && 'fade30'}`} src={background || '/assets/images/game-placeholder-horizontal.jpg'} alt="bg"/>
            <img className={`opacity-30 top-0 w-full h-screen ${background && 'fade30'}`} src={background || '/assets/images/game-placeholder-horizontal.jpg'} alt="bg"/>
            <img className={`opacity-30 top-[100%] w-full h-screen -scale-y-100 ${background && 'fade30'}`} src={background || '/assets/images/game-placeholder-horizontal.jpg'} alt="bg"/>
            <img className={`opacity-30 top-0 w-full h-screen ${background && 'fade30'}`} src={background || '/assets/images/game-placeholder-horizontal.jpg'} alt="bg"/>
            <img className={`opacity-30 top-[100%] w-full h-screen -scale-y-100 ${background && 'fade30'}`} src={background || '/assets/images/game-placeholder-horizontal.jpg'} alt="bg"/>
            <img className={`opacity-30 top-0 w-full h-screen ${background && 'fade30'}`} src={background || '/assets/images/game-placeholder-horizontal.jpg'} alt="bg"/>
            <img className={`opacity-30 top-[100%] w-full h-screen -scale-y-100 ${background && 'fade30'}`} src={background || '/assets/images/game-placeholder-horizontal.jpg'} alt="bg"/>
            <img className={`opacity-30 top-0 w-full h-screen ${background && 'fade30'}`} src={background || '/assets/images/game-placeholder-horizontal.jpg'} alt="bg"/>
            <img className={`opacity-30 top-[100%] w-full h-screen -scale-y-100 ${background && 'fade30'}`} src={background || '/assets/images/game-placeholder-horizontal.jpg'} alt="bg"/>
            <div className="absolute top-[4rem] w-full h-[200%] -translate-x-1/2 left-1/2 backdrop-blur-xl z-0"/>
        </div>
    )
}

export default BlurredBackground
