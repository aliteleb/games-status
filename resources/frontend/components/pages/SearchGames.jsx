import React from 'react'
import Select from 'react-select';

function SearchGames() {

    const [searchGame, setSearchGame] = React.useState({
        search_text: ""
    })

    const crackStatus = [
        {value: "ALL", label: "ALL"},
        {value: "CRACKED", label: "CRACKED"},
        {value: "UNCRACKED", label: "UNCRACKED"},
    ]

    const releaseStatus = [
        {value: "ALL", label: "ALL"},
        {value: "RELEASED", label: "RELEASED"},
        {value: "UNRELEASED", label: "UNRELEASED"},
    ]

    const genres = [
        {value: "ACTION", label: "ACTION"},
        {value: "FANCY", label: "FANCY"},
        {value: "ADVENTURE", label: "ADVENTURE"},
    ]

    // Define your styles as a string
    const styles = `
    .react-select-container .react-select__input-container,
    .react-select-container .react-select__placeholder,
    .react-select-container .react-select__single-value {
        padding: 14px 0; 
    }`;

    let handleSearchChange = (e) => {
        setSearchGame(prevSearchGame => (
            {
                ...prevSearchGame,
                [e.target.name]: e.target.value
            }
        ))
    }

    console.log(searchGame.search_text);

    return (

        <>
            <div className='bg-app-black/50 rounded'>

                <style dangerouslySetInnerHTML={{ __html: styles }} />

                <header className='p-5'>
                    <input
                    type="text"
                    placeholder='Search...'
                    className='w-full h-16 text-xl uppercase rounded-sm px-3 bg-body focus:outline-none'
                    name='search_text'
                    value={searchGame.search_text}
                    onChange={handleSearchChange}
                    />
                    <div className='flex mt-4 justify-between gap-x-24'>
                        <Select 
                            options={crackStatus}
                            placeholder="Select Status..."
                            className='react-select-container mt-2 w-1/3 uppercase'
                            classNamePrefix="react-select"
                        />
                        <Select 
                            options={releaseStatus}
                            placeholder="Release Status..."
                            className='react-select-container mt-2 w-1/3 uppercase'
                            classNamePrefix="react-select"
                        />
                        <Select 
                            options={genres}
                            placeholder="Select Genres..."
                            className='react-select-container mt-2 w-1/3 uppercase'
                            classNamePrefix="react-select"
                            isMulti
                        />
                    </div>
                </header>
            </div>

            <div className='mt-6 flex w-full h-52 bg-app-black/50'>
                <div className='w-1/3 overflow-hidden'>
                    <img src="https://ocdn.eu/sport-images-transforms/1/aBGk9lBaHR0cHM6Ly9vY2RuLmV1L3B1bHNjbXMvTURBXy81MDIwMDQ4NTRhMGUwNjcyYWY4YWYyNTUwYTQ3YjIzZi5wbmeTlQMAAM0FAM0C0JUCzQSwAMLDkwmmMDJiODM4Bt4AAqEwAaExAQ/cyberpunk-2077.png" alt="" />
                </div>
                <div className='w-2/3 p-6 mx-6 flex gap-x-8'>
                    <div className='flex flex-col'>
                        <div>Game Title</div>
                        <div className='mt-12'>Game Status</div>
                    </div>
                    <div>Release Data</div>
                    <div>Crack Date</div>
                    <div>DRM Protection</div>
                    <div>Scene Group</div>
                </div>
            </div>

        </>

    )
}

export default SearchGames
