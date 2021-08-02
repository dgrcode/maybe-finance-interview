import { NextApiRequest, NextApiResponse } from 'next'

import { searchAirports } from '../../models/airport'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const searchText = req.query.text as string
  const filteredAirports = await searchAirports(searchText)

  res.status(200).json(filteredAirports)
}
