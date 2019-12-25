import axios from 'axios';

const Ajax = {
  headers: false,
  init(serverRoot = '/', headers) {
    if (this.axios) {
      return;
    }
    let _axios = axios.create({
      headers,
      withCredentials: true, //携带cookie
      timeout: 50000,
      baseURL: serverRoot
    });
    this.headers = headers;
    _axios.interceptors.request.use(config => {
      return config;
    }, error => {
      return Promise.reject(error);
    });
    _axios.interceptors.response.use(response => {
      return response.data;
    }, error => {
      return Promise.reject(error);
    });
    _axios.all = axios.all;
    _axios.spread = axios.spread;
    this.axios = _axios;
  },
  async send (config, headers) {
    if (headers) {
      if (this.headers) {
        headers = {...this.headers, ...headers};
      }
      config.headers = headers;
    }
    let promise = this.axios(config);
    let rs = await promise;
    return rs;
  },
  get(url, params, headers) {
    return this.send({method: 'get', url, params}, headers);
  },
  post(url, data, headers) {
    return this.send({method: 'post', url, data}, headers);
  }
};
export default Ajax;
