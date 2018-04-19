<template>
  <div id="app">
    <router-view/>
    <!--<el-input-->
    <!--v-model="input"-->
    <!--placeholder="请输入搜索内容"-->
    <!--style="width:500px;"-->
    <!--@keyup.enter.native="getlist">-->
    <!--<el-button slot="append" icon="el-icon-search" @click="getlist"></el-button>-->
    <!--</el-input>-->
    <!--&lt;!&ndash;<h1><el-button type="primary" @click="getlist()">点击请求</el-button></h1>&ndash;&gt;-->
    <!--<h1>这里是返回的信息：{{ msg }}</h1>-->
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {}
  },
  methods: {
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}

::-webkit-scrollbar {
  width: 10px;
}/* 滚动条整体宽度 */
::-webkit-scrollbar-track{
  background-color: #F3F3F4;
}/* 滚动条的滑轨背景颜色 */
::-webkit-scrollbar-thumb{
  background-color: #DAE4E5;
  border-radius: 3px;
}/* 滚动条的滑块背景颜色 */
::-webkit-scrollbar-corner {
  background-color: #B0AFB0;
} /* 横向滚动条和纵向滚动条相交处尖角的颜色 */
</style>
