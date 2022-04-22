import { useState, useEffect } from 'react'
import Input from './components/Input'
const { REACT_APP_API_KEY } = process.env

const BASE_URL = 'https://www.skiddle.com/api/v1/events/'

type Status = 'idle' | 'loading' | 'failed'
type UiStatus = Status | 'noResults'

function App() {
  const [events, setEvents] = useState<any>()
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
          ({ id, description, eventname, startdate, venue }) => {
            return {
              id,
              description,
              eventname,
              startdate,
              venuename: venue.name,
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
    if (status === 'idle' && !events.length) {
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
            idle: <div>events</div>,
          }[getUiStatus()]
        }
      </main>
    </div>
  )
}

export default App
