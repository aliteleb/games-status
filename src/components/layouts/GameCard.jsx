import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function GameCard() {
    return (
        <div className={'p-2  h-full'}>

            <div className={'border flex flex-col  h-full'}>
                <img src={'/src/assets/game-placeholder.jpg'}  alt={'game'}/>
                <div className={'px-2 py-1 my-auto'}>
                    <h1>
                        <Skeleton height={'16px'} />
                    </h1>
                    <h2><Skeleton  width={'80%'} height={'12px'}/></h2>
                </div>

            </div>

        </div>
    );
}

export default GameCard;
