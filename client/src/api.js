const BASE_URL = '/api'

export async function getStationInfo() {
  const res = await fetch(`${BASE_URL}/info`)
  return res.json()
}

export async function getPrices() {
  const res = await fetch(`${BASE_URL}/prices`)
  return res.json()
}
