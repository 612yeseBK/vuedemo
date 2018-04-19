let common = {}

export default (common.install = function (Vue) {
  Vue.prototype.cookie = (function () {
    // 传入cookie名，值，时间(传入时间单位为小时)
    function setCookie (name, value, time) {
      let exp = new Date()
      exp.setTime(exp.getTime() + time * 60 * 60 * 1000)
      document.cookie = name + '=' + encodeURIComponent(value) + ((time === null) ? '' : ';expires=' + exp.toGMTString())
    }
    function getCookie (name) {
      let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
      let arr = document.cookie.match(reg)
      console.log(arr)
      return arr ? decodeURIComponent(arr[2]) : null
    }
    function delCookie (name) {
      let exp = new Date()
      exp.setTime(exp.getTime() - 1)
      let cval = getCookie(name)
      if (cval !== null) document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
    }
    return {
      set: function (opt) {
        if (opt instanceof Array) {
          opt.forEach(function (val) {
            setCookie(val.name, val.value, val.time)
          })
        } else {
          setCookie(opt.name, opt.value, opt.time)
        }
      },
      get: function (opt) {
        let backValue = {}
        if (opt instanceof Array) {
          opt.forEach(function (val) {
            backValue[val] = getCookie(val)
          })
        } else {
          backValue = getCookie(opt)
        }
        return backValue
      },
      del: delCookie
    }
  })()
})
