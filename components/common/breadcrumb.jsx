import React from 'react'

const Breadcrumb = ({facilityName}) => {
  return (
    <nav aria-label="breadcrumb container">
        <ol 
          className="breadcrumb d-flex d-inline px-5 align-items-center" 
          style={{background: 'rgba(152, 181, 255, 0.06)'
          }}
        >
            <li className="breadcrumb-item active"><a href="/" style={{color: 'black'}}>Home</a></li>
            <li className="breadcrumb-item" aria-current="page"><a href="#" style={{color: 'rgba(216, 28, 103, 0.8)', marginTop: 5}}>{facilityName}</a></li>
        </ol>
    </nav>
  )
}

export default Breadcrumb