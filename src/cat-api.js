import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_hOt1ttQpvHwVaWswFdZR0lrgwXICzxvOK0SzVMrZaU3lRzDsbKUO3FVV3S9DknI4";

const BASE_URL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
    return axios.get(`${BASE_URL}/breeds`)
        .then(response => {
            if (response.status !== 200) {
                throw new Error(response.status);
            }
            return response.data;
        })
        .catch(error => {
            return error;
        });
};

export function fetchCatByBreed(breedId) {
    const params = { breed_ids: breedId}
    return axios.get(`${BASE_URL}/images/search`, { params })
        .then(response => {
            if (response.status !== 200) {
                throw new Error(response.status);
            }
            // console.log(response.data[0]);
            return response.data[0];
        })
        .catch(error => {
            return error;
        });
}


