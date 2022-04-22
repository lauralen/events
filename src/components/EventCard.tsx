import { FC } from 'react'
import { Link, generatePath } from 'react-router-dom'
import { Event } from '../types'

interface Props {
  data: Event
}

const Input: FC<Props> = ({ data }) => {
  const { id, description, eventname, startdate, venuename, imageurl } = data

  return (
    <div className="event-card">
      <img className="event-card--img" alt="" src={imageurl} />
      <div className="event-card--text-wrapper">
        <h2 className="event-card--name">{eventname}</h2>
        <p>{description}</p>
        <p>{venuename}</p>
        <p>{startdate}</p>
      </div>
      <Link to={generatePath('event/:id', { id })}>view details</Link>
    </div>
  )
}

export default Input
