<template>
  <div class="content">
    <div v-for="(item,index) in content" :key="index">
      <div class="title">{{Object.keys(item)[0]}}</div>
      <div v-html="change(item[Object.keys(item)[0]])" class="paragraph"></div>
    </div>
  </div>
</template>

<script>
import request from '@/js/home.js'
export default {
  created () {
  },
  components: {},
  name: '',
  props: [''],
  data () {
    return {
      content: []
    }
  },
  mounted () {
    console.log('deviceid: ' + this.$route.params.docid)
    this.getDetail()
  },
  computed: {},
  methods: {
    getDetail () {
      request.getDetail(this.$route.params.docid).then(
        data => {
          this.content = data.data
        },
        error => {
          console.log(error.toString())
          this.$message.error('服务器出错了')
        }
      )
    },
    change (content) {
      try {
        var ate = content.replace(/\r\n/g, '<br>')
      } catch (e) {
        console.log('存储的信息不满足正常解析格式')
        return content
      }
      return ate
    }
  }
}
</script>

<style scoped>
  .content{
    margin-left: 50px;
  }
.title{
  font-family:"微软雅黑";
  font-size: 20px;
  margin-top: 15px;
}
  .paragraph{
    margin-left: 25px;
    margin-top: 10px;
    line-height:1.7
  }
</style>
