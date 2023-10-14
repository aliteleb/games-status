import React from 'react'

function SearchGames() {
  return (
    <div className='p-6 bg-custom-black/50 rounded'>
        <header>
            <input type="text" placeholder='Search Game Title...' className='w-full h-10 rounded-sm px-3 bg-gray-600 focus:outline-none'/>
            <div className='flex mt-4'>
                <select name="" id="" className='w-72 h-10 rounded-sm px-3 bg-gray-600 focus:outline-none'>
                    <option value="All Crack Status">All Crack Status</option>
                    <option value="Cracked">Cracked</option>
                    <option value="Not Cracked">Not Cracked</option>
                </select>
                <select name="" id="" className='ml-4 w-72 h-10 rounded-sm px-3 bg-gray-600 focus:outline-none'>
                    <option value="All Release Date">All Release Date</option>
                    <option value="Released">Released</option>
                    <option value="Released">Unreleased</option>
                </select>
                <select name="" id="" className='ml-4 w-72 h-10 rounded-sm px-3 bg-gray-600 focus:outline-none'>
                    <option value="AAA & Indie">AAA & Indie</option>
                    <option value="AAA only">AAA only</option>
                    <option value="Indie only">Indie only</option>
                </select>
            </div>
        </header>

        <table className='mt-8 w-full'>
            <thead>
                <tr>
                    <th className='border-b py-4 cursor-pointer'>Game Title</th>
                    <th className='border-b py-4 cursor-pointer'>Release Date</th>
                    <th className='border-b py-4 cursor-pointer'>Crack Date</th>
                    <th className='border-b py-4 cursor-pointer'>DRM</th>
                    <th className='border-b py-4 cursor-pointer'>Scene Group</th>
                    <th className='border-b py-4 cursor-pointer'>Genre</th>
                    <th className='border-b py-4 cursor-pointer'>Platform</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className='border-b p-4 '>Cyberpunk 2077</td>
                    <td className='border-b p-4 '>10/12/2020</td>
                    <td className='border-b p-4 '>10/12/2020</td>
                    <td className='border-b p-4 '>Steam DRM</td>
                    <td className='border-b p-4 '>CD Project Red</td>
                    <td className='border-b p-4 '>Action & Adventure</td>
                    <td className='border-b p-4 '>PC & PS5</td>
                </tr>
                <tr>
                    <td className='border-b p-4 '>Cyberpunk 2077</td>
                    <td className='border-b p-4 '>10/12/2020</td>
                    <td className='border-b p-4 '>10/12/2020</td>
                    <td className='border-b p-4 '>Steam DRM</td>
                    <td className='border-b p-4 '>CD Project Red</td>
                    <td className='border-b p-4 '>Action & Adventure</td>
                    <td className='border-b p-4 '>PC & PS5</td>
                </tr>
                <tr>
                    <td className='border-b p-4 '>Cyberpunk 2077</td>
                    <td className='border-b p-4 '>10/12/2020</td>
                    <td className='border-b p-4 '>10/12/2020</td>
                    <td className='border-b p-4 '>Steam DRM</td>
                    <td className='border-b p-4 '>CD Project Red</td>
                    <td className='border-b p-4 '>Action & Adventure</td>
                    <td className='border-b p-4 '>PC & PS5</td>
                </tr>
                <tr>
                    <td className='p-4 '>Cyberpunk 2077</td>
                    <td className='p-4 '>10/12/2020</td>
                    <td className='p-4 '>10/12/2020</td>
                    <td className='p-4 '>Steam DRM</td>
                    <td className='p-4 '>CD Project Red</td>
                    <td className='p-4 '>Action & Adventure</td>
                    <td className='p-4 '>PC & PS5</td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default SearchGames