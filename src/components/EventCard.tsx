import { FC } from 'react'
import { Event } from '../types'

interface Props {
  data: Event
}

const Input: FC<Props> = ({ data }) => {
  const { description, eventname, startdate, venuename } = data

  return (
    <div>
      <h2>{eventname}</h2>
      <p>{description}</p>
      <p>{venuename}</p>
      <p>{startdate}</p>
    </div>
  )
}

export default Input
