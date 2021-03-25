import React from 'react'

export default function Modal(props) {

  return (
    <div style={props.showModal ? { display: 'block' } : { display: 'none' }}>
      <button>X</button>
      <h1>NAME HERE</h1>
      <p>DESCRIPTION</p>
    </div>
  )
}