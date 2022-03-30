<template>
  <Layout>
    <Header class="layout-header-bar">
      <div style="width: 100%;height: 100%;vertical-align: middle;line-height: 8vh">
        <div style="float:left;margin-left: 2%;text-align: center;height: 8vh;display: inline-block;">
          <span>我的工作台</span>
        </div>
          <Button icon="ios-sync" type="text" @click="update" style="margin-left:1%"></Button>
      </div>
    </Header>
    <content :style="{padding: '20px',background: '#e5ecfc',height:'92vh'}">
      <card :bordered="false" style="height: 85vh">
        <p slot="title">我的任务</p>
        <Button type="primary"  slot="title" icon="ios-add" style="float: right;width: 35px;height: 35px;" @click="add"></Button>
        <workAdd v-if="flag" ref="workAdd"></workAdd>
        <Scroll height="535" :on-reach-edge="handleReachEdge">
          <Menu :theme="theme2" style="width: 100%">
            <Submenu name="1">
              <template slot="title">
                未完成
              </template>
              <MenuItem :name="item.value" v-for="(item, index) in task" :value="item.value" :key="index" @click.native="open">{{item.label}} <Tag color="red" style="float: right">{{item.taskEndTime}}</Tag></MenuItem>
            </Submenu>
            <Submenu name="2">
              <template slot="title">
                已完成
              </template>
              <MenuItem :name="item.value" v-for="(item, index) in successTask" :value="item.value" :key="index" @click.native="open">{{item.label}} <Tag color="red" style="float: right">{{item.taskEndTime}}</Tag></MenuItem>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                其他
              </template>
              <MenuItem :name="item.value" v-for="(item, index) in task1" :value="item.value" :key="index" @click.native="open">{{item.label}} <Tag color="red" style="float: right">{{item.taskEndTime}}</Tag></MenuItem>
            </Submenu>
        </Menu>
        </Scroll>
        <work-view v-if="flag2" ref="workView"></work-view>
      </card>
    </content>
  </Layout>
</template>

<script>
import workAdd from "@/components/workAdd"
import workView from "@/components/workView";
export default {
  name: "index",
  components:{workAdd,workView},
  data () {
    return{
      flag: false,
      flag2:false,
      task: [],
      successTask: [],
      task1: [],
      theme2: 'light'
    }
  },
  methods:{
    update (){

    },
    add () {
      this.flag = true;
      this.$nextTick(() => {
        this.$refs.workAdd.init();
      });
    },
    open(){
      // window.alert("1")
      this.flag2 = true;
      this.$nextTick(() => {
        this.$refs.workView.init();
      });
    },
    handleReachEdge (dir) {
      return new Promise(resolve => {
        setTimeout(() => {
          if (dir > 0) {
            const first = this.task[0];
            for (let i = 1; i < 5; i++) {
              this.first.unshift(first-i);
            }
          } else {
            const last = this.task[this.task.length - 1];
            for (let i = 1; i < 5; i++) {
              this.first.push(last + i);
            }
          }
          resolve();
        }, 2000);
      });
    },
    getTask(){
      const that = this;
      this.axios.get(this.api.baseUrl + "/task/getPersonalTask/"+ this.$cookies.get("userID") + "/" + this.$cookies.get("userCompany")).then((res) => {
        let code = res.data.code;
        let msg = res.data.msg;
        if (code === 200) {
            for (let i = 0; i < res.data.data.length;i++){
              if (res.data.data[i].taskStatus===1){
                this.successTask.push({
                  value:JSON.parse(JSON.stringify(res.data.data[i].taskID)),
                  label:JSON.parse(JSON.stringify(res.data.data[i].taskName)),
                  taskEndTime: JSON.parse(JSON.stringify(res.data.data[i].taskEndTime))
                 })
               }else if (res.data.data[i].taskStatus===0){
                 this.task.push({
                   value:JSON.parse(JSON.stringify(res.data.data[i].taskID)),
                   label:JSON.parse(JSON.stringify(res.data.data[i].taskName)),
                   taskEndTime: JSON.parse(JSON.stringify(res.data.data[i].taskEndTime))
                 })
               }else {
                 this.task1.push({
                   value:JSON.parse(JSON.stringify(res.data.data[i].taskID)),
                   label:JSON.parse(JSON.stringify(res.data.data[i].taskName)),
                  taskEndTime: JSON.parse(JSON.stringify(res.data.data[i].taskEndTime))
                 })
               }
             }
         } else {
             // todo 登录失败处理
             that.$Message.error(msg);
        }
       }).catch(function() {
           //todo 接口访问异常处理
         that.$Message.error("新建任务接口访问失败!");
       });
     }
  },
  created() {
    this.getTask();
  }
}
</script>

<style scoped>
.layout-header-bar{
  background: #fff;
  box-shadow: 0 1px 1px rgba(0,0,0,.1);
  padding: 0;
  height: 8vh;
}
.icon-change{
  height: 30px;
  width: 30px;
  float: right;
}
.icon-change:hover{
  background-color: #d7dde4;
}
.ivu-card-head p, .ivu-card-head-inner{
  width: 5%;
}
.ivu-scroll-container{
  height: 70vh;
}
</style>