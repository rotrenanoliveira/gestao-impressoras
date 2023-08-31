/**
 * Fetch data from API
 * @param { String } path
 * @returns parsed data.
 */

export async function getData<T>(path: string) {
  const apiURL = new URL(`http://127.0.0.1:3333/${path}`)

  const res = await fetch(apiURL, {
    cache: 'no-cache',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = res.json()

  return data as T
}
