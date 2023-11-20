'use client'
import React from 'react'
import { Hourglass } from 'react-loader-spinner'
function Loader() {
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <Hourglass
                visible={true}
                height="80"
                width="80"
                ariaLabel="hourglass-loading"
                wrapperStyle={{}}
                wrapperClass=""
                colors={['#306cce', '#72a1ed']}
            />
        </div>
    )
}

export default Loader
