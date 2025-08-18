import React from 'react'
import { RotatingLines } from 'react-loader-spinner'

const SpinnerLoader = () => {
    return (
        <div style={{ textAlign: "center" }}>
            <RotatingLines
                visible={true}
                height="16"
                width="26"
                color="white"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    )
}

export default SpinnerLoader
