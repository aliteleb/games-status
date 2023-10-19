import React from 'react'
import ApiClient from '../../services/ApiClient'
import ProtectionCard from "../layouts/ProtectionCard.jsx";

export default function Protections() {

    let [protections, setProtections] = React.useState(null)

    React.useEffect(() => {
        ApiClient().get('/protections')
            .then(res => {
                setProtections(res.data.data)
            })
            .catch(err => {
                console.log('Failed to get the data', err)
            })
    }, [])


    let showprotections = null
    if(protections){
        showprotections = protections.data.map(drm =>
            <ProtectionCard animate={true} info={drm}/>
        )
    }


    const placeholder = [];
    for (let i = 0; i < 12; i++) {
        placeholder.push(<ProtectionCard />);
    }

    return (
        <>
            <div className='mt-12 border-b border-gray-500/50 pb-2 text-xl'>Protections</div>
            <div className='mt-3 grid sm:grid-cols-2 lg:grid-cols-3 w-full gap-6'>
                {showprotections || placeholder}
            </div>
            <div className="p-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" className="spinner_P7sC mx-auto" fill="#ddd">
                    <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z" className="spinner_P7sC"/>
                </svg>
            </div>
        </>
    )
}
