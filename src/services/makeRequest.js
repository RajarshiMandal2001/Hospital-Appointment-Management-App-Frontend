import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;


export const makeRequest = async (endPoint, method, payload = null, accessToken = null, queryParam = null) => {
    try {
        let url = `${BASE_URL}${endPoint}`;
        const headers = {};
        console.log("base url:", url)

        if (accessToken) {
            headers['Authorization'] = `Bearer ${accessToken}`;
        }

        if (queryParam && typeof queryParam === 'object') {
            const queryString = new URLSearchParams(queryParam).toString();
            url += `?${queryString}`;
        }

        const options = {
            method: method.toUpperCase(),
            url: url,
            headers: headers,
            data: payload
        };

        const response = await axios(options);
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : error.message;
    }
}