import {Oval} from 'react-loader-spinner';
import React from 'react'

function Loader({color, secondaryColor, height, width, size}) {
  return (
    <div className={`${width} ${height} flex items-center justify-center`}>
        <Oval
            visible={true}
            height={size}
            width={size}
            color={color}
            secondaryColor={secondaryColor}
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    </div>
  )
}

export default Loader