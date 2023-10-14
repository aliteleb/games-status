import React from 'react'
import {Link} from "react-router-dom";

export default function Terms() {
    return (
        <div className="py-8 lg:py-16 lg:px-6">
            <div className="mx-auto text-center">
                <h1 className="mb-4 text-5xl font-extrabold lg:text-7xl">Terms & Conditions</h1>
                <p className="mb-4 text-3xl tracking-tight font-bold text-gray-200 md:text-4xl">This page has not been created yet.</p>
                <p className="mb-4 text-lg font-light text-gray-300">You'll find lots to explore on the home page. </p>
                <Link to="/" className="inline-flex text-white bg-gray-600 hover:bg-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4">Back to Homepage</Link>
            </div>
        </div>
    )
}
