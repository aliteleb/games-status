import React from 'react'
import {Link} from "react-router-dom";

export default function About() {
    return (
        <div className="bg-app-black/60 py-7 px-8 rounded">
            <h1 className='text-4xl border-b w-fit pb-3 text-gray-200 font-bold'>About us</h1>
            <div className='mt-5 text-lg text-gray-300 leading-loose'>Welcome to GamesStatus. We are committed to promoting ethical and legal gaming practices. Our platform is dedicated to providing information about games and their status, while strictly adhering to copyright laws.
                <p className='mt-7'>
                    No Links to Cracked Games:
                    We do not endorse, support, or provide any links to cracked games, torrents, or any form of illegal game distribution. Our focus is on promoting a positive gaming community that respects the intellectual property rights of game developers and publishers.
                </p>

                <p className='mt-7'>
                    Zero Tolerance for Illegal Content:
                    Any content violating copyright laws or promoting illegal activities will be promptly removed from our website. We have a zero-tolerance policy for such materials.
                </p>

                <p className='mt-7'>
                    Legal and Ethical Gaming:
                    Our mission is to contribute to the gaming community in a legal and ethical manner. We encourage users to purchase games through legitimate channels and support the hard work of game developers.
                </p>
                Thank you for being a part of our community and helping us maintain a positive and lawful gaming environment.
            </div>
        </div>
    )
}
