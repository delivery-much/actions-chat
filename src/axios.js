const axios = require('axios').default

/**
 * Creates new Axios instance.
 *
 * @param {string} baseURL - Endpoint base URL
 * @returns {AxiosInstance} Axios instance
 */
const newAxios = (baseURL) => {
  return axios.create({
    baseURL: baseURL,
    headers: { Accept: 'application/json' },
    timeout: 20000
  })
}

/**
 * Does HTTP POST with Axios.
 *
 * @param {string} url - POST URL
 * @param {object} body - POST body
 */
const post = async (url, body) => {
  const axiosInstance = newAxios(url)
  try {
    await axiosInstance.post(url, body)
  } catch (error) {
    throw new Error(`Google Chat notification failed. ${error}}`)
  }
}

module.exports = { post }
