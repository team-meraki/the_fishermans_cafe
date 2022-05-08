import axios from 'axios';

export const getApi = (url, data) => {
    return axios.get(url);
}
export const postApi = (url, data) => {
    return axios.post(url, data);
}
export const putApi = (url, data, config) => {
    return axios.put(url, data, config);
}
export const deleteApi = (url) => {
    return axios.delete(url);
}