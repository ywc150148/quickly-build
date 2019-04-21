// 引用axios和qs
var axios = require('axios')
var qs = require('qs')

// 判断元素类型
function toType(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

// 参数过滤函数 删除空参数
function filterNull(o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}

// 将数组以‘,’分隔成字符类型
function separateArray(arr) {
  for (var key in arr) {
    if (toType(arr[key]) === 'array') {
      arr[key] = arr[key].join(",");
    }
  }
  return arr
}

//axios 请求拦截
axios.interceptors.request.use((config) => {
  if (config.params) {
    config.params = separateArray(config.params);
  }

  if (config.data) {
    config.data = filterNull(config.data)
  }

  if (config.method == "post") {
    config.data = qs.stringify(config.data);
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});


// axios 响应拦截器
axios.interceptors.response.use(
  response => {
    // ...
    return response;
  },
  error => {
    return Promise.reject(error.response)
  }
);

export default axios
