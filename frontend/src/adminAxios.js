import axios from 'axios';
const baseURL = 'https://cafe-backend.azurewebsites.net/'

export const getApi = (url, data) => {
    return axios.get(baseURL + url);
}
export const postApi = (url, data) => {
    return axios.post(baseURL + url, data);
}
export const putApi = (url, data, config) => {
    return axios.put(baseURL + url, data, config);
}
export const patchApi = (url, data, config) => {
    return axios.patch(baseURL + url, data, config);
}
export const deleteApi = (url) => {
    return axios.delete(baseURL + url);
}