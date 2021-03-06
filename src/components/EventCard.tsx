import { FC } from 'react'
import { Link, generatePath } from 'react-router-dom'
import { format, parseISO } from 'date-fns'

import { Event } from '../types'

interface Props {
  data: Event
}

const Input: FC<Props> = ({ data }) => {
  const { id, description, eventname, startdate, venuename, imageurl } = data

  return (
    <div className="bg-white flex flex-col">
      <img alt="" src={imageurl} />

      <div className="h-full p-5 flex flex-col items-center justify-between">
        <div>
          <h2 className="text-center text-lg">{eventname}</h2>
          <p>{description}</p>
          <p>{venuename}</p>
          <p>{format(parseISO(startdate), 'do LLLL')}</p>
        </div>

        <Link
          to={generatePath('event/:id', { id })}
          className="w-full text-center mt-4 p-2 rounded-sm bg-cyan-400 text-white"
        >
          view details
        </Link>
      </div>
    </div>
  )
}

export default Input
