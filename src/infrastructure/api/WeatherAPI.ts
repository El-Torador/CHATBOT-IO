type Coordinates = {
  message: string;
  data: {
    lat: number;
    lng: number;
    address: {
      label: string;
      countryCode: string;
      contryName: string;
      stateCode: string;
      state: string;
      city: string;
      postalCode: string;
    }
  }[]
}

type Weather = {
  message: string;
  data: {
    lat: number;
    lng: number;
    summary: string;
    temperature: number;
    countryCode: string;
    icon: string
  }
}

type Translation = {
  translations: {
    detected_source_language: string;
    text: string
  }[]
}

const headers = {
  'Content-Type': 'application/json',
  'x-api-key': import.meta.env.VITE_WEATHER_API_KEY as string,
  'Accept-Language': 'FR'
}
const HOST_DEEPL = import.meta.env.MODE === 'development' ? `/deepl` : 'https://api-free.deepl.com'
const HOST_WEATHER = import.meta.env.MODE === 'development' ? `/api` : 'https://api.ambeedata.com'
export async function getCoordinatesByCity(city: string): Promise<Coordinates['data'][0]> {
  const response = await fetch(`${HOST_WEATHER}/geocode/by-place?place=${encodeURIComponent(city)}`, {
    headers
  })

  if (!response.ok) throw new Error('Could not get coordinates')

  const result = await response.json() as Coordinates

  return result.data[0]
}

export async function getWeatherByCoordinates(lat: number, lng: number): Promise<Weather['data']> {
  const response = await fetch(`${HOST_WEATHER}/weather/latest/by-lat-lng?lat=${lat}&lng=${lng}`, {
    headers
  })

  if (!response.ok) throw new Error('Could not get coordinates')

  const result = await response.json() as Weather
  result.data.temperature = +(((result.data.temperature - 32) * 5)/9).toFixed(2)
  return result.data
}

export async function translateTo(text: string, target_lang: string = "FR") {
  if (!target_lang) throw new Error('missing target lang param')
  const response = await fetch(`${HOST_DEEPL}/v2/translate`, {
    method: 'POST',
    body: JSON.stringify({
      text: [text],
      target_lang
    }),
    headers: {
      Authorization: `DeepL-Auth-Key ${import.meta.env.VITE_DEEPL_API_KEY as string}`,
      'Content-Type': 'application/json',
    }
  })

  if (!response.ok) throw new Error('Could not translate text')

  const result = await response.json() as Translation
  return result.translations[0].text
}