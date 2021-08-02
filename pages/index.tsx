import { NextPage } from 'next'
import { useCallback, useEffect, useRef, useState } from 'react'
import axios, { CancelTokenSource } from "axios"
import debounce from 'lodash.debounce'

import Layout from '../components/layout'
import Airport from '../types/airport'

const Page: NextPage = () => {
  const [airports, setAirports] = useState<Airport[]>([])
  const [searchText, setSearchText] = useState<string>('')
  const [searchPage, setSearchPage] = useState<number>(0)
  const cancelTokenSourceRef = useRef<CancelTokenSource | null>(null)


  useEffect(() => {
    // debounce when typing
    debouncedTriggerSearch(searchText, searchPage)
  }, [searchText])

  useEffect(() => {
    // don't debounce when loading more
    triggerSearch(searchText, searchPage)
  }, [searchPage])

  const triggerSearch = async (searchText, searchPage) => {
    if (searchText.length < 3) {
      return
    }

    if (cancelTokenSourceRef.current !== null) {
      cancelTokenSourceRef.current.cancel()
    }
    cancelTokenSourceRef.current = axios.CancelToken.source()

    try {
      const response = await axios.get<Airport[]>(
        `/api/search?text=${searchText}&page=${searchPage}`,
        {
          cancelToken: cancelTokenSourceRef.current.token
        }
      )

      console.log(response)
      setAirports(prevAirports => [...prevAirports, ...response.data])
    } catch (error) {
      console.error(error.response)
    }
  }

  const debouncedTriggerSearch = useCallback(debounce(
    triggerSearch
  , 500), [])

  const handleSearchChanged = evt => {
    setAirports([])
    setSearchPage(0)
    setSearchText(evt.target.value)
  }

  const handleLoadMore = () => {
    setSearchPage(prevPage => prevPage + 1)
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
          value={searchText}
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
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4'
        onClick={handleLoadMore}
      >
        Load more
      </button>
    </div>
  </Layout>
}

export default Page
