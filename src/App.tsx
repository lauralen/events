import { useState, useEffect } from 'react'

import Input from './components/Input'
import EventCard from './components/EventCard'
import { Event } from './types'
import EventPage from './Event'
import ArtistPage from './Artist'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const { REACT_APP_API_KEY, REACT_APP_BASE_URL } = process.env

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
          `${REACT_APP_BASE_URL}/events/search/?api_key=${REACT_APP_API_KEY}&keyword=${searchValue}`
        )
        const data = await result.json()
        const formattedEvents = data.results.map(
          // @ts-ignore
          ({ id, description, eventname, startdate, venue, largeimageurl }) => {
            return {
              id,
              description,
              eventname,
              startdate,
              venuename: venue.name,
              imageurl: largeimageurl,
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
    <BrowserRouter>
      <div className="min-h-screen bg-slate-200">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <header className="p-5 flex items-center flex-col bg-cyan-400">
                  <img
                    className="w-52"
                    alt="Skiddle logo"
                    src={require('./assets/skiddle.png')}
                  />
                  <Input
                    type="search"
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
                        <ul className="grid grid-cols-3 gap-5 py-5 px-52">
                          {events?.map((event) => {
                            return <EventCard key={event.id} data={event} />
                          })}
                        </ul>
                      ),
                    }[getUiStatus()]
                  }
                </main>
              </div>
            }
          />
          <Route path="/event/:id" element={<EventPage />} />
          <Route path="/artist/:id" element={<ArtistPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
