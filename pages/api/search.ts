import { NextApiRequest, NextApiResponse } from 'next'

import { searchAirports } from '../../models/airport'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const searchText = req.query.text as string
  const searchPage = Number(req.query.page)
  const filteredAirports = await searchAirports(searchText, searchPage)

  res.status(200).json(filteredAirports)
}
