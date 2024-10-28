
export default function LazyLoader() {
    return (
        <div className="animated-gradient flex flex-col gap-1 justify-center items-center size-full fixed top-0 z-50 ">
            <div className={`relative size-28 rounded-full drop-shadow-lg)]`}>
                <div className={`absolute size-2/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  z-[-1] rounded-full`}>
                    <div className={`absolute size-full top-0 left-0 animate-ping animate-ease-in-out animate-duration-[1500ms] bg-red-500/[0.5] z-[-1] rounded-full`}></div>
                </div>
                <div className={`absolute top-0 left-0 bg-red-500/[0.1] rounded-full size-full  flex justify-center items-center`}>
                    <img
                        src={`/public/assets/images/logo.png`}
                        className="size-24 drop-shadow-[1px_1px_2px_rgba(0,0,0,0.7)] rounded-full"
                        alt="icon"
                    />
                </div>
            </div>

        </div>
    );
}
