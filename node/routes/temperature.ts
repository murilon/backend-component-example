/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios'

interface productIdInput {
  productId: string | number
}

export async function getTemperature(
  _: unknown,
  { productId }: productIdInput,
  __: unknown
) {
  const url = `https://g0t4azcja3.execute-api.sa-east-1.amazonaws.com/items/${productId}`

  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      apiKey: 'apikey',
    },
  }

  try {
    const response = await axios.get(url, headers)

    console.log(response.data)
    const item = response.data.Item

    console.log(item)

    return item
  } catch (error) {
    console.log(error)
  }
}
