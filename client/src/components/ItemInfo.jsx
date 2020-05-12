import React from 'react'

const ItemInfo = ({info}) => {
  return (
    <div>
      <h2>Item info</h2>
      <p>{info.name}</p>
      <p>{info.description}</p>
      <p>{info.category}</p>
    </div>
  )
}

export default ItemInfo
