import axios from 'axios'
import qs from 'qs'

export default {
  post (url, msg, backFn, failFn) {
    console.log(msg)
    axios({
      method: 'post',
      url: 'http://localhost:80' + url,
      data: qs.stringify(msg)
    }).then(function (response) {
      console.log(response)
      if (typeof backFn === 'function') { backFn(response) }
    }).catch(function (error) {
      console.log(error)
      if (typeof failFn === 'function') { failFn(error) }
    })
  }
}
