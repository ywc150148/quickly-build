// if(process.env.NODE_ENV=="development"){
//     global.API_BASE_PATH = '/app/'; // 开发环境
//   }else{
//     global.API_BASE_PATH = 'https://cnodejs.org/'; // 发布环境
//   }

global.API_BASE_PATH = process.env.NODE_ENV == "development" ? '/app/' : 'https://cnodejs.org/';

global.API = {
  Open: {
    // 开放访问
    topics: API_BASE_PATH + 'api/v1/topics', // 主题首页
    topic: API_BASE_PATH + 'api/v1/topic/', // 主题详情
  },
  Permission: {
    // 需要权限访问

  }
}


//参数转义
String.prototype.format = function (args) {
  if (arguments.length > 0) {
    var result = this;
    if (arguments.length == 1 && typeof (args) == "object") {
      for (var key in args) {
        var reg = new RegExp("({" + key + "})", "g");
        result = result.replace(reg, args[key]);
      }
    } else {
      for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] == undefined) {
          return "";
        } else {
          var reg = new RegExp("({[" + i + "]})", "g");
          result = result.replace(reg, arguments[i]);
        }
      }
    }
    return result;
  } else {
    return this;
  }
}

//时间截转日期
Date.prototype.format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    'S': this.getMilliseconds()
  }

  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));

  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))

      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));

  return fmt;
}
