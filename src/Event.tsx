import { useState, useEffect } from 'react'

import { Link, useParams, generatePath } from 'react-router-dom'

const { REACT_APP_API_KEY, REACT_APP_BASE_URL } = process.env

type Status = 'idle' | 'loading' | 'failed'

interface Artist {
  artistid: string
  image: string
  name: string
  spotifyartisturl: string
  spotifymp3url: string
}
interface Data {
  description: string
  MinAge: string
  dateEnd: string
  dateStart: string
  eventname: string
  entryprice: string
  artists: Artist[]
}

function Event() {
  const { id } = useParams()

  const [data, setData] = useState<Data>()
  const [status, setStatus] = useState<Status>('idle')

  useEffect(() => {
    async function fetchData(): Promise<any> {
      setStatus('loading')
      try {
        const result = await fetch(
          `${REACT_APP_BASE_URL}/events/${id}/?api_key=${REACT_APP_API_KEY}`
        )
        const { results: data } = await result.json()

        const {
          description,
          MinAge,
          dateEnd,
          dateStart,
          eventname,
          entryprice,
          artists,
        } = data

        setData({
          //@ts-ignore
          description,
          MinAge,
          dateEnd,
          dateStart,
          eventname,
          entryprice,
          artists,
        })
        setStatus('idle')
      } catch (error) {
        setStatus('failed')
      }
    }

    fetchData()
  }, [id])

  return (
    <div>
      <header>
        <img
          className="header--logo"
          alt="Skiddle logo"
          src={require('./assets/skiddle.png')}
        />
      </header>
      <main className="py-5 px-72">
        {
          {
            loading: <p>Loading...</p>,
            failed: <p>Failed to load event data</p>,
            idle: (
              <>
                <h2 className="text-2xl text-center">{data?.eventname}</h2>
                <h3 className="text-xl my-2">{data?.description}</h3>
                <ul>
                  <li>Start date: {data?.dateStart}</li>
                  <li>End date: {data?.dateEnd}</li>
                  <li>Entry price: {data?.entryprice}</li>
                  <li>Min age: {data?.MinAge}</li>
                </ul>
                {data?.artists.length ? (
                  <>
                    Artists:
                    <ul className="list-disc list-inside">
                      {data?.artists?.map(({ artistid, name }: Artist) => {
                        return (
                          <li key={artistid}>
                            <Link
                              to={generatePath('/artist/:id', { id: artistid })}
                            >
                              {name}
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </>
                ) : null}
              </>
            ),
          }[status]
        }
      </main>
    </div>
  )
}

export default Event
