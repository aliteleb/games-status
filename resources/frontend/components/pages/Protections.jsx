import React from 'react'
import ApiClient from '../../services/ApiClient'

export default function Protections() {

    let [protections, setProtections] = React.useState({data: []})

    React.useEffect(()=> {
        ApiClient().get('/protections')
        .then(res => {setProtections(res.data.data)})
        .catch(err => {console.log('Failed to get the data', err)})
    },[]) 


    let protectionCard = protections.data.map(drm => 
        <div className='mt-12 bg-[#161515] rounded maxHeight shadow-md card'>
            <h1 className='text-center bg-slate-600 py-3 rounded-t'>{drm.name}</h1>
            <h2 className='my-5 px-5'>Games: {drm.games_count}</h2>
            <h3 className='my-5 px-5'>Last Game: {drm.last_game?.name || "N/A"}</h3>
        </div>
    )
    console.log(protections);

    return (
        <div className='grid grid-cols-3 w-full gap-x-12'>
            {protectionCard}
        </div>
    )
}
