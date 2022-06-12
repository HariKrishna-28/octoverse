import React from 'react'

interface Props {
  name: string,
  age?: number,
}

const HiScrees: React.FC<Props> = ({ name, age }) => {

  return (
    <div>{name}{age}</div>
  )
}

export default HiScrees