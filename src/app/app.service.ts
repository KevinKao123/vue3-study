import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

// 请求拦截器
axios.interceptors.request.use(
	// 正常请求
	config => {
		console.log('axios 请求拦截器', config);

		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

// 响应拦截器
axios.interceptors.response.use(
	response => {
		console.log('axios 响应拦截器', response);

		return response;
	},
	error => {
		return Promise.reject(error);
	}
);

//创建axios实例(可以单独配置)
const apiHttpClient = axios.create({
	baseURL: 'http://localhost:3000'
});

export { axios, apiHttpClient };
