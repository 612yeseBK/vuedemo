<template>
  <el-container>
    <el-header>
      <div>
        <span class="title">标准化文件全文检索系统</span>
        <el-input
          v-model="input"
          placeholder="请输入搜索内容"
          style="float:right;margin-right:100px;width:360px;"
          @keyup.enter.native="search">
          <el-button slot="append" @click="search">搜索</el-button>
        </el-input>
      </div>
    </el-header>
    <el-main>
      <el-collapse style="">
        <el-collapse-item style="background-color: #f5f5dc">
          <template slot="title">
            <div style="margin-left: 3%;">
            <span>所筛选的条件：</span>
            <!--<span v-if="this.selCon.length==0">点击可选择额外条件</span>-->
            <el-tag
            v-for="tag in selCon"
            :key="tag.index"
            closable
            style="margin-left: 20px;margin-bottom: 5px"
            @close="closeCon(tag)">
            {{calc(tag)}}
          </el-tag>
            <a class="fy" v-if="this.selCon.length!==0" @click="cleanAll">
              清除所有条件
            </a>
            </div>
          </template>
          <div style="margin-left: 4%">
          <div>时间：
            <el-date-picker
            v-model="dateCon"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyyMMdd"
          >
          </el-date-picker></div>
          <div>法院：
            <a v-for="(court,index) in courts"  class="fy" :key="index" @click="addCourtCondition(court)">
            {{court}}
          </a></div>
          <div>案件类型：
            <a v-for="(typ,index) in types"  class="fy" :key="index" @click="addTypeCondition(typ)">
              {{typ}}
            </a></div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <p v-if="this.list.length ===0" style="margin-left: 3%">没有找到相关检索结果</p>
      <el-row>
        <el-col :span="24" style="width: 94%;margin-left: 3%">
      <div v-for="(item,index) in list" :key="index" style="border-bottom:1px dashed #000;">
        <p class="bt" @click="getDetail(item.wjbh)">{{item.bt}}</p>
        <p class="info">{{item.info}}</p>
        <p v-html="item.hlcontent" class="hlcontent">{{item.hlcontent}}</p>
      </div>
        </el-col>
      </el-row>
      <div class="page">
        <el-pagination
          layout="prev, pager, next"
          :page-size = "pagesize"
          :current-page.sync="currentPage"
          @current-change="handlePageChange"
          :total=allnum>
        </el-pagination>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import request from '@/js/home.js'
export default {
  name: 'first',
  data () {
    return {
      pagesize: 10,
      allnum: 0,
      currentPage: 1,
      input: '',
      selCon: [],
      selConbk: [{id: 'date', value: '1900-3-4 至 2018-2-3'}],
      dateCon: '',
      courts: ['从后台取1', '从后台取2', '从后台取3'],
      types: ['类型1', '类型2', '类型3'],
      list: [],
      listbk: [{id: '', bt: '南京玄武区盗窃案', info: '2013年4月12日 南京二院', hlcontent: '玄武区盗窃案发生了盗窃了一辆车经查明惯犯，判处有期徒刑xxxx年'},
        {id: '', bt: '南京玄武区盗窃案', info: '2013年4月12日 南京二院', hlcontent: '玄武区盗窃案发原告生了盗窃了一辆车经查明惯犯，判处有期徒刑xxxx年'},
        {id: '', bt: '南京玄武区盗窃案', info: '2013年4月12日 南京二院', hlcontent: '玄武区盗窃案发生了盗窃了一辆车经查明惯犯，判处有期徒刑xxxx年'},
        {id: '', bt: '南京玄武区盗窃案', info: '2013年4月12日 南京二院', hlcontent: '玄武区盗窃案发生了盗窃了一辆车经查明惯犯，判处有期徒刑xxxx年'},
        {id: '', bt: '南京玄武区盗窃案', info: '2013年4月12日 南京二院', hlcontent: '玄武区盗窃案发生了盗窃了一辆车经查明惯犯，判处有期徒刑xxxx年'},
        {id: '', bt: '南京玄武区盗窃案', info: '2013年4月12日 南京二院', hlcontent: '玄武区盗窃案发生了盗窃了一辆车经查明惯犯，判处有期徒刑xxxx年'},
        {id: '', bt: '南京玄武区盗窃案', info: '2013年4月12日 南京二院', hlcontent: '玄武区盗窃案发生了盗窃了一辆车经查明惯犯，判处有期徒刑xxxx年'},
        {id: '', bt: '南京玄武区盗窃案', info: '2013年4月12日 南京二院', hlcontent: '玄武区盗窃案发生了盗窃了一辆车经查明惯犯，判处有期徒刑xxxx年'}
      ]
    }
  },
  mounted () {
    this.getConditionList()
  },
  methods: {
    closeCon (tag) {
      this.selCon.splice(this.selCon.indexOf(tag), 1)
      if (tag.id === 'date') {
        this.dateCon = ''
      }
    },
    // 根据对象的id值key返回对象在数组里的位置，没有则返回-1
    containKey (key) {
      for (let i = 0; i < this.selCon.length; i++) {
        if (key === this.selCon[i].id) {
          return i
        }
      }
      return -1
    },
    addCourtCondition (court) {
      var index = this.containKey('courtCon')
      if (index === -1) {
        this.selCon.push({id: 'courtCon', value: [court]})
      } else {
        if (this.selCon[index].value.indexOf(court) === -1) {
          this.selCon[index].value.push(court)
        }
      }
    },
    addTypeCondition (type) {
      var index = this.containKey('type')
      if (index === -1) {
        this.selCon.push({id: 'type', value: [type]})
      } else {
        if (this.selCon[index].value.indexOf(type) === -1) {
          this.selCon[index].value.push(type)
        }
      }
    },
    calc (tag) {
      if (tag.id === 'date') {
        return tag.value[0].substr(0, 4) + '-' + tag.value[0].substr(4, 2) + '-' + tag.value[0].substr(6, 2) +
          ' 至 ' + tag.value[1].substr(0, 4) + '-' + tag.value[1].substr(4, 2) + '-' + tag.value[1].substr(6, 2)
      } else {
        let temp = ''
        for (let i = 0; i < tag.value.length; i++) {
          temp = temp + ';' + tag.value[i]
        }
        return temp.substr(1, temp.length - 1)
      }
    },
    cleanAll () {
      this.selCon = []
      this.dateCon = ''
    },
    getConditionList () {
      request.getConditionList().then(
        data => {
          this.courts = data.data.courts
          this.types = data.data.types
        },
        error => {
          console.log(error.toString())
          this.$message.error('服务器出错了')
        }
      )
    },
    search () {
      if (this.input !== '') {
        this.back2one()
      } else {
        this.$message('请输入查询的内容')
      }
    },
    getSearchList (input, selCon, currentPage) {
      request.getSearchList(input, selCon, currentPage).then(
        data => {
          this.list = data.data.list
          this.allnum = data.data.num
          this.pagesize = data.data.pagesize
        },
        error => {
          console.log(error.toString())
          this.$message.error('服务器出错了')
        }
      )
    },
    getDetail (id) {
    //      this.$router.push({ name: 'detail', params: { docid: id } })
      // 这里选择打开新窗口而不是用router做当前页面跳转
      window.open(window.location.origin + '/detail/' + id)
    },
    handlePageChange (index) {
      this.getSearchList(this.input, this.selCon, this.currentPage)
    },
    back2one () {
      if (this.currentPage === 1) {
        this.getSearchList(this.input, this.selCon, this.currentPage)
      } else {
        this.currentPage = 1
      }
    }
  },
  watch: {
    dateCon () {
      if (this.dateCon !== null && this.dateCon !== '') {
        var index = this.containKey('date')
        if (index === -1) {
          this.selCon.push({id: 'date', value: [this.dateCon[0], this.dateCon[1]]})
        } else {
          this.selCon[index].value = [this.dateCon[0], this.dateCon[1]]
        }
      }
    }
  }
}
</script>

<style scoped>
  .title{
    font-family:"微软雅黑";
    font-size: 30px;
    margin-left: 300px;
  }
  .fy{
    margin-left:10px;
    cursor: pointer;
  }
  .fy:hover{
    text-decoration:underline;
    color: #C20C0C;
  }
  .bt:hover{
    text-decoration:underline;
    color: #C20C0C;
  }
  .bt{
    font-family:"微软雅黑";
    font-size: 20px;
    cursor: pointer;
  }
  .info{
    font-family:"微软雅黑";
    font-size: 13px;
  }
  .hlcontent{
    font-family:"微软雅黑";
    font-size: 15px;
  }
  .page{
    margin-left: 35%;
  }
</style>
