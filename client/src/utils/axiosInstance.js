import config from './config';
var axios = require('axios');
var axiosInstance = axios.create({
	baseURL: config.endPoint,
	//baseURL:''
	/* other custom settings */
	'content-type': 'multipart/form-data'
});
export default axiosInstance;
