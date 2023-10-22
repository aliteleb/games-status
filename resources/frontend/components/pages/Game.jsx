import React from 'react'

function Game() {
    return (
        <>
            <div className="">
                <img className="opacity-30 absolute top-0 left-0 w-full h-full"
                     src="https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_600x900.jpg" alt="bg"/>
                <div className=" absolute top-[4rem] w-full h-full -translate-x-1/2 left-1/2 backdrop-blur-xl z-0"/>
            </div>

            <div className='flex relative z-20 text-gray-300 border-t-[5px] border-uncracked h-[22rem] shadow-lg overflow-hidden rounded-br-md rounded-bl-md'>
                <img className='absolute w-full h-full z-[-1] object-cover opacity-70' src="https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_hero.jpg"
                     style={{aspectRatio: '1920/620'}}
                     alt=""/>
                <img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_600x900.jpg" alt=""/>
                <div className='flex w-full items-center justify-between bg-black/80 py-3 px-5 ئ'>
                    <div>
                        <div>
                            <div className='flex justify-between'>
                                <div className='text-lg text-white/40 font-extralight mr-2'>STATUS</div>
                                <div className='text-lg text-uncracked'>316 DAYS AND COUNTING</div>
                            </div>
                            <div className='text-[3.5rem] rounded text-uncracked font-bold text-center -mt-5'>UNCRACKED</div>
                        </div>
                        <div className='w-full my-5'>
                            <div className='text-[#dddddd99] font-extralight'>GAME</div>
                            <div className='text-gray-100 text-xl'>RED DEAD REDEMPTION 2</div>
                        </div>
                        <div className='grid grid-cols-2 gap-y-4 justify-between'>
                            <div>
                                <div className='text-[#dddddd99] font-extralight'>RELEASE DATE</div>
                                <div className='text-xl text-gray-100'>NOV 05, 2019</div>
                            </div>
                            <div>
                                <div className='text-[#dddddd99] font-extralight'>DRM PROTECTION</div>
                                <div className='text-xl text-gray-100'>ROCKSTAR</div>
                            </div>
                            <div>
                                <div className='text-[#dddddd99] font-extralight'>CRACK DATE</div>
                                <div className='text-xl'>TBD</div>
                            </div>
                            <div>
                                <div className='text-[#dddddd99] font-extralight'>SCENE GROUP</div>
                                <div className='text-xl'>TBD</div>
                            </div>
                        </div>
                    </div>

                    <div className='text-center'>AD1</div>
                    <div className='text-center'>AD2</div>
                    <div className='text-center'>AD3</div>
                    <div className='text-center'>
                        <div className='text-3xl'>FOLLOWERS</div>
                        <div className='my-2 text-2xl'>105,297</div>
                        <div className="flex flex-wrap justify-center py-2 rounded ">
                            <input
                                type='checkbox'
                                className="mx-4 before:ring-4 before:ring-gray-700 before:hover:ring-4 before:hover:bg-gray-700/70 before:checked:bg-gray-700 before:hover:checked:bg-gray-700 relative"/>
                            <span className="text-xl">Follow</span>
                        </div>

                    </div>
                </div>
            </div>

            <section className="bg-black/50 py-8 lg:py-16 antialiased relative z-20">
                <div className="max-w-2xl px-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                            Discussion (20)
                        </h2>
                    </div>
                    <form className="mb-6">
                        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                            <label htmlFor="comment" className="sr-only">
                                Your comment
                            </label>
                            <textarea
                                id="comment"
                                rows={6}
                                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                placeholder="Write a comment..."
                                required=""
                                defaultValue={""}
                            />
                        </div>
                        <button
                            type="submit"
                            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                        >
                            Post comment
                        </button>
                    </form>
                    <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
                        <footer className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                                    <img
                                        className="mr-2 w-6 h-6 rounded-full"
                                        src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                        alt="Michael Gough"
                                    />
                                    Michael Gough
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    <time pubdate="" dateTime="2022-02-08" title="February 8th, 2022">
                                        Feb. 8, 2022
                                    </time>
                                </p>
                            </div>
                            <button
                                id="dropdownComment1Button"
                                data-dropdown-toggle="dropdownComment1"
                                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                type="button"
                            >
                                <svg
                                    className="w-4 h-4"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 16 3"
                                >
                                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                </svg>
                                <span className="sr-only">Comment settings</span>
                            </button>
                            {/* Dropdown menu */}
                            <div
                                id="dropdownComment1"
                                className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                            >
                                <ul
                                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                    aria-labelledby="dropdownMenuIconHorizontalButton"
                                >
                                    <li>
                                        <a
                                            href="#"
                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Edit
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Remove
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Report
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </footer>
                        <p className="text-gray-500 dark:text-gray-400">
                            Very straight-to-point article. Really worth time reading. Thank you!
                            But tools are just the instruments for the UX designers. The knowledge
                            of the design tools are as important as the creation of the design
                            strategy.
                        </p>
                        <div className="flex items-center mt-4 space-x-4">
                            <button
                                type="button"
                                className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                            >
                                <svg
                                    className="mr-1.5 w-3.5 h-3.5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 18"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                                    />
                                </svg>
                                Reply
                            </button>
                        </div>
                    </article>
                    <article className="p-6 mb-3 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900">
                        <footer className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                                    <img
                                        className="mr-2 w-6 h-6 rounded-full"
                                        src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                        alt="Jese Leos"
                                    />
                                    Jese Leos
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    <time pubdate="" dateTime="2022-02-12" title="February 12th, 2022">
                                        Feb. 12, 2022
                                    </time>
                                </p>
                            </div>
                            <button
                                id="dropdownComment2Button"
                                data-dropdown-toggle="dropdownComment2"
                                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-40 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                type="button"
                            >
                                <svg
                                    className="w-4 h-4"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 16 3"
                                >
                                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                </svg>
                                <span className="sr-only">Comment settings</span>
                            </button>
                            {/* Dropdown menu */}
                            <div
                                id="dropdownComment2"
                                className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                            >
                                <ul
                                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                    aria-labelledby="dropdownMenuIconHorizontalButton"
                                >
                                    <li>
                                        <a
                                            href="#"
                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Edit
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Remove
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Report
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </footer>
                        <p className="text-gray-500 dark:text-gray-400">
                            Much appreciated! Glad you liked it ☺️
                        </p>
                        <div className="flex items-center mt-4 space-x-4">
                            <button
                                type="button"
                                className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                            >
                                <svg
                                    className="mr-1.5 w-3.5 h-3.5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 18"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                                    />
                                </svg>
                                Reply
                            </button>
                        </div>
                    </article>
                    <article className="p-6 mb-3 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                        <footer className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                                    <img
                                        className="mr-2 w-6 h-6 rounded-full"
                                        src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                                        alt="Bonnie Green"
                                    />
                                    Bonnie Green
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    <time pubdate="" dateTime="2022-03-12" title="March 12th, 2022">
                                        Mar. 12, 2022
                                    </time>
                                </p>
                            </div>
                            <button
                                id="dropdownComment3Button"
                                data-dropdown-toggle="dropdownComment3"
                                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-40 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                type="button"
                            >
                                <svg
                                    className="w-4 h-4"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 16 3"
                                >
                                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                </svg>
                                <span className="sr-only">Comment settings</span>
                            </button>
                            {/* Dropdown menu */}
                            <div
                                id="dropdownComment3"
                                className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                            >
                                <ul
                                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                    aria-labelledby="dropdownMenuIconHorizontalButton"
                                >
                                    <li>
                                        <a
                                            href="#"
                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Edit
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Remove
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Report
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </footer>
                        <p className="text-gray-500 dark:text-gray-400">
                            The article covers the essentials, challenges, myths and stages the UX
                            designer should consider while creating the design strategy.
                        </p>
                        <div className="flex items-center mt-4 space-x-4">
                            <button
                                type="button"
                                className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                            >
                                <svg
                                    className="mr-1.5 w-3.5 h-3.5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 18"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                                    />
                                </svg>
                                Reply
                            </button>
                        </div>
                    </article>
                    <article className="p-6 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                        <footer className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                                    <img
                                        className="mr-2 w-6 h-6 rounded-full"
                                        src="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
                                        alt="Helene Engels"
                                    />
                                    Helene Engels
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    <time pubdate="" dateTime="2022-06-23" title="June 23rd, 2022">
                                        Jun. 23, 2022
                                    </time>
                                </p>
                            </div>
                            <button
                                id="dropdownComment4Button"
                                data-dropdown-toggle="dropdownComment4"
                                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-40 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                type="button"
                            >
                                <svg
                                    className="w-4 h-4"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 16 3"
                                >
                                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                </svg>
                            </button>
                            {/* Dropdown menu */}
                            <div
                                id="dropdownComment4"
                                className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                            >
                                <ul
                                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                    aria-labelledby="dropdownMenuIconHorizontalButton"
                                >
                                    <li>
                                        <a
                                            href="#"
                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Edit
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Remove
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Report
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </footer>
                        <p className="text-gray-500 dark:text-gray-400">
                            Thanks for sharing this. I do came from the Backend development and
                            explored some of the tools to design my Side Projects.
                        </p>
                        <div className="flex items-center mt-4 space-x-4">
                            <button
                                type="button"
                                className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                            >
                                <svg
                                    className="mr-1.5 w-3.5 h-3.5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 18"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                                    />
                                </svg>
                                Reply
                            </button>
                        </div>
                    </article>
                </div>
            </section>


            <div className="h-[20rem]"/>
        </>
    )
}

export default Game
