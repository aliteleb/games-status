import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function GameCard() {
    return (
        <div className={'p-2 h-full'}>

            <div className={'flex flex-col h-full shadow-md shadow-black bg-black'}>
                <img className={'pointer-events-none'} src={'/src/assets/game-placeholder.jpg'}  alt={'game'}/>
                <div className={'h-1 bg-red-600'}></div>
                <div className={'grid grid-cols-[1fr_40px]'}>
                    <div className={'px-2 py-1'}>
                        <h1>
                            <Skeleton width={'100%'} height={'14px'} baseColor={'#27282e'} highlightColor={'#424349'} borderRadius={0} />
                        </h1>
                        <h2>
                            <Skeleton width={'80%'} height={'12px'} baseColor={'#27282e'} highlightColor={'#424349'} borderRadius={0} />
                        </h2>
                    </div>
                    <div className={'text-white m-auto'}>
                        <input type='checkbox' className='appearance-none block border-2 border-gray-300 w-5 h-5 rounded-full cursor-pointer checked:after:block after:hidden after:mx-auto after:mt-1 after:rounded-full after:w-2 after:h-2 after:bg-cyan-400'/>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default GameCard;
