import React from 'react'
import { ClipLoader } from "react-spinners";

const SpinnerLoader = () => {
    return (
        <div style={{ textAlign: "center" }}>
            <ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
        </div>
    )
}

export default SpinnerLoader
