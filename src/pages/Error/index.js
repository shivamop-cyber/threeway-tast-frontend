import React from 'react'
import classs from './Error.module.css'
const Error = () => {
  return (
    <>
    <div className={classs.container}>
        <div id="main">
            <div className={classs.fof}>
                    <h1>Error 404 <br/> Something went Wrong !</h1>
            </div>
        </div>
    </div>
    </>

  )
}

export default Error