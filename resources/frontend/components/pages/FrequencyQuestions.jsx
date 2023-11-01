import React from 'react'
import {Link} from "react-router-dom";

export default function FrequencyQuestions() {
    return (
        <div className="py-8 lg:px-6 lg:py-16">
            <div className="mx-auto text-center">
                <h1 className="mb-4 text-5xl font-extrabold lg:text-7xl">Frequency Questions</h1>
                <p className="mb-4 text-3xl font-bold tracking-tight text-gray-200 md:text-4xl">This page has not been created yet.</p>
                <p className="mb-4 text-lg font-light text-gray-300">You'll find lots to explore on the home page. </p>
                <Link to="/" className="my-4 inline-flex rounded-lg bg-gray-600 px-5 text-center text-sm font-medium text-white py-2.5 hover:bg-gray-500">Back to Homepage</Link>
            </div>
        </div>
    )
}
