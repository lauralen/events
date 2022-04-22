import { useState, useEffect } from 'react'

import Input from './components/Input'
import EventCard from './components/EventCard'
import { Event } from './types'

const { REACT_APP_API_KEY } = process.env

const BASE_URL = 'https://www.skiddle.com/api/v1/events/'

type Status = 'idle' | 'loading' | 'failed'
type UiStatus = Status | 'noResults'

function App() {
  const [events, setEvents] = useState<Event[]>()
  const [searchValue, setSearchValue] = useState<string>('')
  const [status, setStatus] = useState<Status>('idle')

  useEffect(() => {
    async function fetchEvents(): Promise<any> {
      setStatus('loading')
      try {
        const result = await fetch(
          `${BASE_URL}search/?api_key=${REACT_APP_API_KEY}&keyword=${searchValue}`
        )
        const data = await result.json()
        const formattedEvents = data.results.map(
          // @ts-ignore
          ({ id, description, eventname, startdate, venue, imageurl }) => {
            return {
              id,
              description,
              eventname,
              startdate,
              venuename: venue.name,
              imageurl,
            }
          }
        )
        setEvents(formattedEvents)
        setStatus('idle')
      } catch (error) {
        setStatus('failed')
      }
    }

    fetchEvents()
  }, [searchValue])

  const getUiStatus = (): UiStatus => {
    if (status === 'idle' && !events?.length) {
      return 'noResults'
    } else {
      return status
    }
  }

  return (
    <div className="App">
      <header>
        <div>skiddle</div>
        <Input
          value={searchValue}
          placeholder="search for events"
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </header>
      <main>
        {
          {
            loading: <p>Loading...</p>,
            failed: <p>Failed to load events</p>,
            noResults: <p>No events found</p>,
            idle: (
              <ul>
                {events?.map((event) => {
                  return <EventCard key={event.id} data={event} />
                })}
              </ul>
            ),
          }[getUiStatus()]
        }
      </main>
    </div>
  )
}

export default App
