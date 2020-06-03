const axios = require('axios').default

/**
 * Creates a new Axios instance.
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

module.exports = { newAxios }
