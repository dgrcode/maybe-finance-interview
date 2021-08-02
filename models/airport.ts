import airports from '../data/airports.json'
import Airport from '../types/airport'

export const findAirportByIata = async (iata: string): Promise<Airport | undefined> => {
  return airports.find(airport => airport.iata === iata.toUpperCase())
}

export const allAirports = async (): Promise<Airport[]> => {
  return airports
}

export const searchAirports = async (searchText: string, page: number): Promise<Airport[]> => {
  const pageSize = 5

  return airports
    .filter(airport =>
      airport.name.toLowerCase().includes(searchText.toLowerCase()) ||
      airport.iata.toLowerCase().includes(searchText.toLowerCase()) ||
      airport.city.toLowerCase().includes(searchText.toLowerCase()) ||
      airport.country.toLowerCase().includes(searchText.toLowerCase())
    ).slice(page*pageSize, page*pageSize + pageSize)
}
