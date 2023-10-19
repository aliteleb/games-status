import React from 'react'
import ApiClient from '../../services/ApiClient'
import ProtectionCard from "../layouts/ProtectionCard.jsx";

export default function Protections() {

    let [protections, setProtections] = React.useState({data: []})

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
    showprotections = protections.data.map(drm =>
        <ProtectionCard animate={true} info={drm}/>
    )

    const placeholder = [];
    for (let i = 0; i < 12; i++) {
        placeholder.push(<ProtectionCard />);
    }
    console.log(placeholder);

    return (
        <div className='mt-12 grid sm:grid-cols-2 lg:grid-cols-3 w-full gap-6 '>
            {showprotections || placeholder}
        </div>
    )
}
