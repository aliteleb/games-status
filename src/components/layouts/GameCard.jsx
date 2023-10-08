import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function GameCard() {
    return (
        <div className={'p-2 h-full'}>

            <div className={'flex flex-col h-full shadow-md shadow-black bg-black'}>
                <img className={'pointer-events-none'} src={'/src/assets/game-placeholder.jpg'}  alt={'game'}/>
                <div className={'h-1 bg-red-600'}></div>
                <div className={'px-2 py-1'}>
                    <h1>
                        <Skeleton width={'90%'} height={'14px'} baseColor={'#27282e'} highlightColor={'#424349'} borderRadius={0} />
                    </h1>
                    <h2>
                        <Skeleton width={'70%'} height={'12px'} baseColor={'#27282e'} highlightColor={'#424349'} borderRadius={0} />
                    </h2>
                </div>
            </div>

        </div>
    );
}

export default GameCard;
