import React, { useEffect, useState } from 'react';
import ApiClient from '../../services/ApiClient';
import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import GameCard from '../layouts/GameCard'

function User() {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);

  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nextPage, setNextPage] = useState(null);

  const loadGames = (pageUrl) => {
      if (pageUrl) {
          setIsLoading(true);
          ApiClient().get(pageUrl)
              .then((res) => {
                  setGames((prevGames) => [...prevGames, ...res.data.data.games]);
                  setNextPage(res.data.data.next_page_url);
                  setIsLoading(false);
              })
              .catch((err) => {
                  setIsLoading(false);
                  console.log('Failed to get the data', err);
              });
      }
  };

  useEffect(() => {

    loadGames(`/user/${username}`);

    ApiClient()
      .get(`/user/${username}`)
      .then((res) =>
      {
       setUserData(res.data.data)
       setGames(res.data.data.games)
      })
      .catch((err) => console.log(err));
  }, [username]); // Make sure to add username as a dependency


  const scrollListener = React.useRef(null);

  useEffect(() => {
      scrollListener.current = () => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrollPosition = window.scrollY;
          if (scrollPosition >= totalHeight && !isLoading && nextPage) {
              loadGames(nextPage);
          }
      };

      window.addEventListener('scroll', scrollListener.current);

      return () => {
          // Clean up the event listener when the component unmounts
          window.removeEventListener('scroll', scrollListener.current);
      };
  }, [nextPage, isLoading]);

  const showGames = games?.map((game, index) => (
      <GameCard animate={true} info={game} key={index} />
  ));

  const placeholders = [];
  for (let i = 0; i < 6; i++) {
      placeholders.push(<GameCard key={i}/>);
  }

  return (
    <>
      <div className='flex justify-between w-full bg-black/50 h-[22rem]'>
        <div className='flex flex-col justify-center items-center w-full'>
        { userData ? <img
            className={`col-span-2 border border-2 border-gray-600 rounded-full sm:col-auto w-[100px] h-[100px] object-cover`}
            src={userData ? userData.avatar : ''}
            alt=''
          /> : <Skeleton width={100} height={100} baseColor={'#27282e99'} circle={true} highlightColor={'#424349'}/>}
          <h1 className='mt-3 text-xl'>{userData ? userData.username : <Skeleton width={150} height={20} baseColor={'#27282e99'} highlightColor={'#424349'} borderRadius={20}/>}</h1>
        </div>
        <div className='text-center border-t md:border-0 border-gray-300 w-[80%] pt-3 md:col-span-1 col-span-2 m-auto'>
          <div className='text-xl'>{userData ? "GAMES" : <Skeleton width={'25%'} height={'20px'} baseColor={'#27282e99'} highlightColor={'#424349'} borderRadius={20}/>}</div>
          <div className='my-2 text-2xl'>
            {userData ? userData.games_count : <Skeleton width={'15%'} height={'20px'} baseColor={'#27282e99'} highlightColor={'#424349'} borderRadius={20}/>}
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-between  my-6'>
        <div className="border-b border-gray-500/50 pb-2 text-xl">{userData && `Games (${userData.games_count})`}</div>
            <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 w-full gap-6">
                {games.length > 0 || placeholders}
                {showGames}
            </div>
            <div className="p-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    viewBox="0 0 24 24"
                    className={`spinner_P7sC mx-auto ${isLoading ? '' : 'opacity-0'}`}
                    fill="#ddd"
                >
                    <path
                        d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
                        className="spinner_P7sC"
                    />
                </svg>
            </div>
      </div>
    </>
  );
}

export default User;
