import axios from "axios";

export const makeRequest = async (url, method, payload = null, accessToken = null, queryParam = null) => {
    try {
        const headers = {};

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