import ajax from '@/util/ajax.js'
export default {
  getSearchList (input, selCon, curpage) {
    let msg = {
      input: input || '',
      curpage: curpage,
      searchCondition: JSON.stringify(selCon || {})
    }
    return new Promise((resolve, reject) => {
      ajax.post('/content', msg, backData => {
        resolve(backData)
      }, error => {
        reject(error)
      })
    })
  },
  getConditionList () {
    return new Promise((resolve, reject) => {
      ajax.post('/getLists', '', backData => {
        resolve(backData)
      }, error => {
        reject(error)
      })
    })
  },
  getDetail (id) {
    return new Promise((resolve, reject) => {
      ajax.post('/getDetail', {wjbh: id}, backData => {
        resolve(backData)
      }, error => {
        reject(error)
      })
    })
  }
}
