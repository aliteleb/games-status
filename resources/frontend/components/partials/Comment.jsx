import React from 'react'
import {IoIosArrowUp, IoIosArrowDown} from 'react-icons/io'

function Comment({count, increaseCount, decreaseCount}) {
  return (
    <div className='border-b-2 border-gray-500'>
        <article className="p-6 text-base rounded-lg">
            <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-200 font-semibold">
                        <img
                            className="mr-2 w-6 h-6 rounded-full"
                            src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                            alt="Michael Gough"
                        />
                        Michael Gough
                    </p>
                    <p className="text-sm text-gray-400">
                        <time pubdate="" dateTime="2022-02-08" title="February 8th, 2022">
                            Feb. 8, 2022
                        </time>
                    </p>
                </div>
                <button
                    id="dropdownComment1Button"
                    data-dropdown-toggle="dropdownComment1"
                    className="inline-flex items-center p-2 text-md font-medium text-center text-gray-300 hover:text-gray-400 y-400 rounded"
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
                    className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow"
                >
                    <ul
                        className="py-1 text-sm text-gray-700 y-200"
                        aria-labelledby="dropdownMenuIconHorizontalButton"
                    >
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-4 hover:bg-gray-100"
                            >
                                Edit
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-4 hover:bg-gray-100"
                            >
                                Remove
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-4 hover:bg-gray-100"
                            >
                                Report
                            </a>
                        </li>
                    </ul>
                </div>
            </footer>
            <div className='flex items-center'>
                <div className='flex flex-col items-center'>
                    <IoIosArrowUp onClick={increaseCount} className='cursor-pointer hover:text-gray-500 text-2xl text-gray-300'/>
                    <div className={`min-w-[2.7rem] font-bold flex justify-center my-2 ${count > 0 ? 'text-green-600' : count === 0 ? 'text-gray-300' : 'text-red-700'}`}>{count}</div>
                    <IoIosArrowDown onClick={decreaseCount} className='cursor-pointer hover:text-gray-500 transition text-2xl text-gray-300'/>
                </div>
                <div>
                    <p className="mx-6 text-gray-400 max-w-[65rem]">
                        Very straight-to-point article. Really worth time reading. Thank you!
                        But tools are just the instruments for the UX designers. The knowledge
                        of the design tools are as important as the creation of the design
                        strategy.
                    </p>
                    <div className="mx-6 flex items-center mt-4 space-x-4">
                        <button
                            type="button"
                            className="flex items-center text-sm text-gray-500 hover:underline y-400 font-medium"
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
                </div>
            </div>

        </article>
        <article className="p-6 mb-3 ml-6 lg:ml-12 text-base rounded-lg">
            <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-200 font-semibold">
                        <img
                            className="mr-2 w-6 h-6 rounded-full"
                            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                            alt="Jese Leos"
                        />
                        Jese Leos
                    </p>
                    <p className="text-sm text-gray-400">
                        <time pubdate="" dateTime="2022-02-12" title="February 12th, 2022">
                            Feb. 12, 2022
                        </time>
                    </p>
                </div>
                <button
                    id="dropdownComment2Button"
                    data-dropdown-toggle="dropdownComment2"
                    className="inline-flex items-center hover:text-gray-400 p-2 text-sm font-medium text-center text-gray-300 rounded"
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
                    className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow"
                >
                    <ul
                        className="py-1 text-sm text-gray-700 y-200"
                        aria-labelledby="dropdownMenuIconHorizontalButton"
                    >
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-4 hover:bg-gray-100"
                            >
                                Edit
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-4 hover:bg-gray-100"
                            >
                                Remove
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-4 hover:bg-gray-100"
                            >
                                Report
                            </a>
                        </li>
                    </ul>
                </div>
            </footer>
            <div className='flex items-center'>
                <div className='flex flex-col items-center'>
                    <IoIosArrowUp onClick={increaseCount} className='cursor-pointer text-2xl text-gray-300 hover:text-gray-500 transition'/>
                        <div className={`font-bold min-w-[2.7rem] flex justify-center my-2 ${count > 0 ? 'text-green-600' : count === 0 ? 'text-gray-300' : 'text-red-700'}`}>{count}</div>
                    <IoIosArrowDown onClick={decreaseCount} className='cursor-pointer text-2xl text-gray-300 hover:text-gray-500 transition'/>
                </div>
                <div>
                    <p className="mx-6 text-gray-400 max-w-[65rem]">
                        Very straight-to-point article. Really worth time reading. Thank you!
                        But tools are just the instruments for the UX designers. The knowledge
                        of the design tools are as important as the creation of the design
                        strategy.
                    </p>
                    <div className="mx-6 flex items-center mt-4 space-x-4">
                        <button
                            type="button"
                            className="flex items-center text-sm text-gray-500 hover:underline y-400 font-medium"
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
                </div>
            </div>

        </article>
    </div>
  )
}

export default Comment