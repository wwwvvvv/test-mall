import axios from 'axios';

function doAwait(time, config) {
  console.warn('fixedCost delay', config.url, time);
  return new Promise(resolve => {
    setTimeout(resolve, time);
  })
}

const fixedCost = 888; //固定的请求时间，如果请求的时间小于888ms,则一直等到时间>=fixedCost再返回响应
const Ajax = {
  _mock: false, // ?
  _aspect: {//?
    start: false,
    finish: false,
    error: false
  },
  headers: false, //?
  init(serverRoot = '/', headers) {
    if (this.axios) {
      return;
    }
    //如果没有创建过，创建一个axios实例
    const _axios = axios.create({
      baseURL: serverRoot,
      headers,
      timeout: 50000,
      withCredentials: true //跨域请求是否需要使用凭证
    });
    this.headers = headers;
    _axios.interceptors.request.use(cofing => {
      //请求的拦截器
      return config;
    }, err => {
      console.warn('error request interceptors', err);
      this._aspect.error && this._aspect.error(err);
      return Promise.reject(err);
    });
    _axios.interceptors.response.use(response => {
      return response.data;
    }, err => {
      console.warn('error response interceptors', err);
      this._aspect.error && this._aspect.error(err);
      return Promise.reject(err);
    });
    _axios.all = axios.all;
    _axios.spread = axios.spread;
    this.axios = _axios;
  },
  mock({method, url, data, params}) {
    if (this._mock) { // ？？？？？？
      let jk = this._mock[url]
      if (jk) {
        let handler = jk[method]
        if (handler) {
          this._aspect.start && this._aspect.start()
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              let rs = handler(data)
              resolve(rs)
              this._aspect.finish && this._aspect.finish(rs)
            }, 1000)
          })
        }
      }
    }
    return false;
  },
  async send(config, headers) {
    if (headers) {
      if (this.headers) {
        headers = {...this.headers, ...headers}; //合并headers,并且覆盖this.headers
      }
      if (!headers.readOnly) {
        config.headers = headers;
      }
    } else {
      headers = this.headers;
    }
    this._aspect.start && this._aspect.start(headers); //? 发送请求之前调用这个函数？
    let promise = this.mock(config);
    if (!promise) {
      promise = this.axios(config);
    }
    let rs;
    if (headers && headers.noCost) { // headers.noCost??
      rs = await promise;
    } else {
      let timeStart = Date.now();
      rs = await promise;
      let timeStop = Date.now();
      let diff = timeStop - timeStart; //发送请求，响应的时间
      if (diff < fixedCost) {
        await doAwait(fixedCost - diff, config);
      }
      this._aspect.finish && this._aspect.finish(rs, headers);
      return rs;
    }
  },
  get(url, params, headers){
    this.send({method: 'get', url, params}, headers);
  },
  post(url, data, headers) {
    this.send({method: 'post', url, data}, headers);
  }
};
export default Ajax;
