import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import React, { useEffect, useState } from "react";
import { BiSolidTimeFive } from "react-icons/bi";
import { AiFillCheckCircle } from "react-icons/ai";
import { IoMdRemoveCircle } from "react-icons/io";
import ApiClient from "../../services/ApiClient.js";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const GameCard = (props) => {

    let game = {
        status_text: null,
        days_diff: null,
        image: null,
        is_following: null
    };
    if (props.info !== undefined) {
        game = props.info;
    }

    const [follow, setFollow] = useState(game.is_following || false);

    useEffect(() => {
        setFollow(game.is_following || false);
    }, [game.is_following]);

    let color = game.status_text ? game.status_text.toLowerCase() : "gray-600";
    let icon, days;
    const statusText = game.status_text || "";

    switch (statusText) {
        case "CRACKED":
            icon = <AiFillCheckCircle className={`inline-block mr-0.5 w-4 h-4 text-${color}`} />;
            break;
        case "UNCRACKED":
            icon = <IoMdRemoveCircle className={`inline-block mr-0.5 w-4 h-4 text-${color}`} />;
            break;
        default:
            icon = <BiSolidTimeFive className={`inline-block mr-0.5 w-4 h-4 text-${color}`} />;
    }

    days = `D${statusText === "CRACKED" || statusText === "UNCRACKED" ? "+" : "-"}${game.days_diff}`;

    let customStyles = props.animate === true ? "animate-fade-in " : "";

    const handleFollowChange = async () => {
        const newFollowState = !follow;
        setFollow(newFollowState);

        const action = newFollowState ? "follow" : "unfollow";

        ApiClient()
            .post(`/games/${game.id}/${action}`)
            .then((response) => {
                if (response.data.status === "success") {
                    action === "follow" ? toast.success(response.data.message) : toast(response.data.message);
                } else {
                    setFollow((prevFollow) => !prevFollow);
                    toast.error(response.data.message);
                }
            })
            .catch((err) => {
                toast.error(err.response.data.message);
                setFollow((prevFollow) => !prevFollow);
            });
    };


    const card = (<>
        <img className={customStyles + "pointer-events-none border-b-4 border-" + color} style={{ aspectRatio: "16/9" }} src={game.header || "/assets/images/game-placeholder.jpg"}
             alt={"game"} />
        <div className={"grid grid-cols-[1fr_30px] md:grid-cols-[1fr_40px] game-card"}>
            <div className={"px-2 py-1"}>
                <h1 className={"text-gray-200 text-sm sm:text-lg"}>
                    {game.name || <Skeleton width={"100%"} height={"14px"} baseColor={"#27282e"} highlightColor={"#424349"} borderRadius={0} />}
                </h1>
                <div className="flex flex-wrap">
                    <h2 className={"w-full text-sm text-" + color}>
                        {game.status_text && icon}
                        {game.status_text || <Skeleton width={"80%"} height={"12px"} baseColor={"#27282e"} highlightColor={"#424349"} borderRadius={0} />}
                        {game.status_text && <span className="text-sm font-light"> {days}</span>}
                    </h2>
                </div>

            </div>
            <div className={"text-white m-auto relative"}>
                {props.info &&
                    <input
                        type="checkbox"
                        checked={follow}
                        onChange={handleFollowChange}
                        onClick={(e) => e.stopPropagation()}
                        className="before:ring-2 before:ring-gray-700 before:checked:bg-gray-700 before:hover:checked:bg-gray-700 before:hover:bg-gray-700/70 before:hover:ring-2" />
                }
            </div>
        </div>
    </>);
    return (
        <div className={"h-full flex flex-col shadow-md shadow-black bg-black " + props.className || ""}>
            {game.slug ? <Link className="flex h-full w-full flex-col" to={`/game/${game.slug}`}>{card}</Link> : card}

            {props.size === "large" && <div className="flex h-full flex-wrap justify-around">
                <div className="w-full flex justify-center bg-white/10">
                    {/*<Skeleton width={"100%"} height={"100%"} baseColor={"#27282e"} highlightColor={"#424349"} borderRadius={0} />*/}
                    <main className="anim-container py-6 md:py-0">
                        <section className="name xl:space-x-4 lg:space-x-2 md:space-x-1 md:text-[4rem] text-[2rem] sm:text-[2.5rem]">
                            <span className="letter--0">A</span>
                            <span className="letter--1">d</span>
                            <span className="letter--2">s</span>
                            <span className="letter--2"></span>
                            <span className="letter--2"></span>
                            <span className="letter--3">A</span>
                            <span className="letter--4">r</span>
                            <span className="letter--5">e</span>
                            <span className="letter--6">a</span>

                        </section>
                        <section className="surname xl:space-x-10 mt-1 md:mt-4 lg:space-x-6 space-x-4 sm:space-x-5">
                            <span className="letter--0">C</span>
                            <span className="letter--1">R</span>
                            <span className="letter--2">A</span>
                            <span className="letter--3">C</span>
                            <span className="letter--4">K</span>
                            <span className="letter--5"> </span>
                            <span className="letter--6">W</span>
                            <span className="letter--7">A</span>
                            <span className="letter--8">T</span>
                            <span className="letter--9">C</span>
                            <span className="letter--10">H</span>
                        </section>
                    </main>


                </div>
            </div>}
        </div>
    );
};

export default GameCard;
