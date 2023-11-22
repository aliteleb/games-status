import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Comment from "../partials/Comment";
import ApiClient from "../../services/ApiClient";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-hot-toast";
import { RiSendPlane2Fill } from "react-icons/ri";
import CommentPlaceholder from "../layouts/CommentPlaceholder.jsx";
import BlurredBackground, {
    refreshPageSize,
} from "../core/BlurredBackground.jsx";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { MdOutlineStarRate } from "react-icons/md";
import { LiaCommentSolid } from "react-icons/lia";

function Game() {
    const { slug } = useParams();

    let [createComment, setCreateComment] = React.useState({
        comment_value: "",
    });
    let [comments, setComments] = React.useState([]);
    let [loading, setLoading] = React.useState(false);
    let [commentLoading, setCommentLoading] = React.useState(false);

    let [game, setGame] = React.useState({});

    let [follow, setFollow] = React.useState(false);

    useEffect(() => {
        const fetchGame = () => {
            ApiClient()
                .get(`/game/${slug}`)
                .then((res) => {
                    setGame(res.data.data);
                    setComments(res.data.data.comments);
                    setFollow(res.data.data.is_following);
                })
                .catch((err) => console.log("Failed to get data", err));
        };

        fetchGame();
        setInterval(fetchGame, 10000);
    }, []);

    let handleChange = (e) => {
        setCreateComment((prevComment) => ({
            ...prevComment,
            [e.target.name]: e.target.value,
        }));
    };

    game.status_color = game?.status_text
        ? game?.status_text.toLowerCase()
        : "gray-600";
    const statusText = game?.status_text || "";

    switch (statusText) {
        case "CRACKED":
            game.status_long = `AFTER ${game.days_diff} DAYS`;
            break;
        case "UNCRACKED":
            game.status_long = `${game.days_diff} DAYS AND COUNTING`;
            break;
        default:
            break;
    }

    let handleSubmit = (e) => {
        if (commentLoading) 
            return;
        
        e.preventDefault();
        
        setCommentLoading(true)
        ApiClient()
            .post(`/comments/create`, {
                slug: slug,
                body: createComment.comment_value,
            })
            .then((res) => {
                setComments(res.data.data);
                setCreateComment({ comment_value: "" });
                refreshPageSize("games");
            })
            .catch((err) => {
                let message = err.response.data.message;
                if (
                    Array.isArray(err.response.data.data.body) &&
                    err.response.data.data.body.length > 0
                ) {
                    message = err.response.data.data.body[0];
                }
                toast.error(message);
                console.log(err);
            }).finally(res => {
                setCommentLoading(false)
            })
    };

    const handleFollowChange = async () => {
        const newFollowState = !follow;
        setFollow(newFollowState);

        const action = newFollowState ? "follow" : "unfollow";

        ApiClient()
            .post(`/games/${game.id}/${action}`)
            .then((response) => {
                if (response.data.status === "success") {
                    action === "follow"
                        ? toast.success(response.data.message)
                        : toast(response.data.message);
                    setGame((prevGame) => ({
                        ...prevGame,
                        followers_count: response.data.data.followers_count,
                    }));
                } else {
                    setFollow((prevFollow) => !prevFollow);
                    toast.error(response.data.message);
                }
            })
            .catch((error) => {
                setFollow((prevFollow) => !prevFollow);
                toast.error(error.response.data.message);
            });
    };

    refreshPageSize("games");

    return (
        <>
            <BlurredBackground image={game.cover} id="games" />

            <div>
                <div
                    className={`flex relative z-20 text-gray-300 border-t-[5px] border-${game.status_color} shadow-lg overflow-hidden`}
                    style={{ boxShadow: "rgb(0, 0, 0) 0px 0px 10px" }}
                >
                    <img
                        className={`absolute w-full h-full z-[-1] object-cover`}
                        src={game.cover && game.cover}
                        style={{ aspectRatio: "1920/620" }}
                        alt=""
                    />

                    <div className="grid w-full grid-cols-1 justify-items-center bg-black/80 sm:grid-cols-[1fr_1fr] md:grid-cols-[250px_2fr_1fr]">
                        <img
                            className={`col-span-2 sm:col-auto w-full object-cover h-[22rem] ${
                                game.poster && "animate-fade-in"
                            }`}
                            src={
                                game.poster
                                    ? game.poster
                                    : "/assets/images/game-placeholder-vertical.jpg"
                            }
                            alt=""
                        />
                        <div className="w-full px-4 py-2 text-center h-[22rem] sm:text-left">
                            <div className="mx-auto mt-2 grid w-max grid-rows-[1fr_1fr] sm:mx-0 sm:mt-0">
                                <div className="flex justify-between">
                                    <div className="font-extralight text-white/40">
                                        {game.status_text && "STATUS"}
                                    </div>
                                    <div
                                        className={`text-lg text-${game.status_color}`}
                                    >
                                        {game.status_long || (
                                            <Skeleton
                                                height={"20px"}
                                                baseColor={"#27282e"}
                                                highlightColor={"#424349"}
                                                borderRadius={0}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div
                                    className={`text-${game.status_color} w-full text-[3rem] rounded font-bold -mt-[2rem]`}
                                >
                                    {game.status_text || (
                                        <Skeleton
                                            width={"20rem"}
                                            height={"30px"}
                                            baseColor={"#27282e99"}
                                            highlightColor={"#424349"}
                                            borderRadius={"30px"}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="my-5 w-full">
                                <div className="text-[#dddddd99] font-extralight">
                                    GAME
                                </div>
                                <div className="text-xl">
                                    {game.name || (
                                        <Skeleton
                                            width={"90%"}
                                            height={"20px"}
                                            baseColor={"#27282e99"}
                                            highlightColor={"#424349"}
                                            borderRadius={20}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 justify-between gap-y-4">
                                <div>
                                    <div className="text-[#dddddd99] font-extralight">
                                        RELEASE DATE
                                    </div>
                                    <div className="text-xl">
                                        {game.release_date || (
                                            <Skeleton
                                                width={"80%"}
                                                height={"20px"}
                                                baseColor={"#27282e99"}
                                                highlightColor={"#424349"}
                                                borderRadius={20}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[#dddddd99] font-extralight">
                                        DRM PROTECTIONS
                                    </div>
                                    <div className="text-xl">
                                        {game.protections?.map((drm, index) => (
                                            <Link
                                                key={index}
                                                className="mx-1 inline-block transition hover:opacity-70"
                                                to={`/protection/${drm.slug}`}
                                            >
                                                {drm.name}
                                            </Link>
                                        ))}
                                        {game.protections?.length === 0 && (
                                            <Skeleton
                                                width={"80%"}
                                                height={"20px"}
                                                baseColor={"#27282e99"}
                                                highlightColor={"#424349"}
                                                borderRadius={20}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[#dddddd99] font-extralight">
                                        CRACK DATE
                                    </div>
                                    <div className="text-xl">
                                        {game.crack_date || (
                                            <Skeleton
                                                width={"80%"}
                                                height={"20px"}
                                                baseColor={"#27282e99"}
                                                highlightColor={"#424349"}
                                                borderRadius={20}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[#dddddd99] font-extralight">
                                        SCENE GROUPS
                                    </div>
                                    <div className="text-xl">
                                        {game.groups?.map((group, index) => (
                                            <Link
                                                key={index}
                                                className="mx-1 inline-block transition hover:opacity-70"
                                                to={`/group/${group.slug}`}
                                            >
                                                {group.name}
                                            </Link>
                                        ))}
                                        {game.groups?.length === 0 && (
                                            <Skeleton
                                                width={"80%"}
                                                height={"20px"}
                                                baseColor={"#27282e99"}
                                                highlightColor={"#424349"}
                                                borderRadius={20}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2 m-auto border-t border-gray-300 pt-3 text-center w-[80%] md:col-span-1 md:border-0">
                            <div className="text-xl">FOLLOWERS</div>
                            <div className="my-2 text-2xl">
                                {game.name ? (
                                    game.followers_count
                                ) : (
                                    <Skeleton
                                        width={"30%"}
                                        height={"20px"}
                                        baseColor={"#27282e99"}
                                        highlightColor={"#424349"}
                                        borderRadius={20}
                                    />
                                )}
                            </div>
                            <div className="flex flex-wrap justify-center rounded py-2">
                                <input
                                    checked={follow}
                                    onChange={handleFollowChange}
                                    type="checkbox"
                                    className={`mx-4 w-32 h-9 appearance-none border border-red-700 cursor-pointer transition rounded-full after:font-extrabold before:h-full pt-1 pl-2 hover:bg-red-700 relative after:absolute after:top-[20%] after:left-2 checked:after:content-['✓'] checked:bg-red-700 checked:border-red-700 before:block before:text-center checked:before:content-['Following'] before:content-['Follow'] ${
                                        game.is_following ?? "hidden"
                                    }`}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex w-full flex-col gap-x-4 gap-y-2 md:flex-row">
                    <div className="flex h-14 w-full flex-wrap items-center justify-between rounded bg-black/30 px-3 text-gray-300 transition hover:bg-black/40 md:w-1/3">
                        <AiOutlineDollarCircle className="h-8 w-16 text-gray-300" />
                        PRICE
                        <span className="font-bold">${game.price}</span>
                    </div>
                    <div className="flex h-14 w-full items-center justify-between rounded bg-black/30 px-3 text-gray-300 transition hover:bg-black/40 md:w-1/3">
                        <MdOutlineStarRate className="h-8 w-16 text-gray-300" />
                        METACRITIC
                        <span className="font-bold">{game.meta_score}</span>
                    </div>
                    <div
                        className="flex h-14 w-full cursor-pointer items-center justify-between rounded bg-black/30 px-3 text-gray-300 transition hover:bg-black/40 md:w-1/3">
                        <LiaCommentSolid className="h-8 w-16 text-gray-300"/>
                        COMMENTS
                        <span className="font-bold">{comments.length}</span>
                    </div>
                </div>

                <section
                    id="co"
                    className="relative z-20 mt-4 bg-black/50 py-8 antialiased lg:py-16"
                >
                    <div className="px-4 pb-36">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-300 lg:text-2xl">
                                Comments ({comments.length})
                            </h2>
                        </div>
                        <div className="mb-6">
                            <form
                                onSubmit={handleSubmit}
                                className="relative block"
                            >
                                <input
                                    disabled={`${commentLoading ? "disabled" : ""}`}
                                    type="text"
                                    autoComplete="one-time-code"
                                    name="comment_value"
                                    value={createComment.comment_value}
                                    id="comment"
                                    className={`mb-4 h-16 w-full ${commentLoading ? "caret-transparent pointer-events-none cursor-not-allowed ring-gray-400/20 text-gray-500" : ""} ring-gray-400/50 rounded-md bg-transparent pr-12 pl-4 text-gray-200 ring-1  transition text-md focus:outline-none focus:ring-gray-400`}
                                    placeholder="Your comment ..."
                                    required=""
                                    onChange={handleChange}
                                />
                                <RiSendPlane2Fill
                                    onClick={handleSubmit}
                                    className={`absolute mb-4 cursor-pointer ${commentLoading ? "text-gray-600" : ""} text-gray-400 transition top-[1.2rem] right-[1rem] hover:text-gray-300`}
                                    style={{ fontSize: "25px" }}
                                />
                            </form>
                        </div>
                        <div>
                            {comments.map((comment) => {
                                return (
                                    <Comment
                                        setComments={setComments}
                                        key={comment.id}
                                        info={comment}
                                        replies={comment.replies}
                                        className="border-b border-[#494a4f] animate-slide-down-slow"
                                    />
                                );
                            })}

                            {!game.name && (
                                <>
                                    <CommentPlaceholder />
                                    <CommentPlaceholder />
                                </>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default Game;
