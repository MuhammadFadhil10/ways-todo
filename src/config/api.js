// import axios from "axios";

import axios from 'axios';

export const API = axios.create({
	baseURL:
		'https://api.kontenbase.com/query/api/v1/8dde74b0-7698-4344-9eca-76516944f6c1',
});

export const setTokenAuth = (token) => {
	if (token != '') {
		API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	} else {
		delete API.defaults.headers.common['Authorization'];
	}
};
