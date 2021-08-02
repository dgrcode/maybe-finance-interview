import { NextPage } from 'next'
import { useRef, useState } from 'react'
import axios, { CancelTokenSource } from "axios"
import { debounce } from 'lodash.debounce'

import Layout from '../components/layout'
import Airport from '../types/airport'

const Page: NextPage = () => {
  const [airports, setAirports] = useState<Airport[]>([])
  const cancelTokenSourceRef = useRef<CancelTokenSource | null>(null)

  const handleSearchChanged = async evt => {
    const inputValue = evt.target.value

    if (inputValue.length < 3) {
      setAirports([])
      return
    }

    if (cancelTokenSourceRef.current !== null) {
      cancelTokenSourceRef.current.cancel()
    }
    cancelTokenSourceRef.current = axios.CancelToken.source()

    try {
      const response = await axios.get<Airport[]>(`/api/search?text=${inputValue}`, {
        cancelToken: cancelTokenSourceRef.current.token
      })

      console.log(response)
      setAirports(response.data)
    } catch (error) {
      console.error(error.response)
    }
  }

  return <Layout>
    <h1 className='text-2xl'>Code Challenge: Airports</h1>

    <h2 className="mt-10 text-xl">All Airports</h2>

    <div>
      <label>
        Search:
        <input 
          type='text'
          onChange={handleSearchChanged}
        />
      </label>
    </div>

    <div>
      {airports.map(airport => (
        <a href={`/airports/${airport.iata.toLowerCase()}`} key={airport.iata} className='mt-5 flex items-center shadow p-5 border'>
          <div>
            {airport.name}, {airport.city}
          </div>
          <div className='ml-auto text-mono'>
            {airport.country}
          </div>
        </a>
      ))}
    </div>
  </Layout>
}

export default Page
