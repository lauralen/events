import { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'

const { REACT_APP_API_KEY, REACT_APP_BASE_URL } = process.env

type Status = 'idle' | 'loading' | 'failed'

interface Data {
  name: string
  description: string
  spotifyPopularity: string
}

function Artist() {
  const { id } = useParams()

  const [data, setData] = useState<Data>()
  const [status, setStatus] = useState<Status>('idle')

  useEffect(() => {
    async function fetchData(): Promise<any> {
      setStatus('loading')
      try {
        const result = await fetch(
          `${REACT_APP_BASE_URL}/artist/${id}/?api_key=${REACT_APP_API_KEY}`
        )
        const { results: data } = await result.json()
        const { description, spotifyPopularity, name } = data

        setData({
          //@ts-ignore
          description,
          spotifyPopularity,
          name,
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
            failed: <p>Failed to load artist data</p>,
            idle: (
              <>
                <h2 className="text-2xl text-center">{data?.name}</h2>
                <p>{data?.description}</p>
                <p>Spotify popularity: {data?.spotifyPopularity}</p>
              </>
            ),
          }[status]
        }
      </main>
    </div>
  )
}

export default Artist
