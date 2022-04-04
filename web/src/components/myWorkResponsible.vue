<template>
  <Card :bordered="false" style="height: 86vh;margin: 20px;width: 97%">
    <p slot="title">我负责的</p>
    <Input search placeholder="搜索项目(按Enter搜索)" style="width: 50vh" v-model="searchTask" @keyup.enter.native="search" @input="search"/>
    <Table size="small" height="470" border  stripe :columns="columns1" :data="data1" v-model="data2" style="margin-top: 2%;width: 100%" @on-row-click="open"></Table>
    <work-view v-if="flag" ref="workView"></work-view>
  </Card>
</template>

<script>
import workView from "@/components/workView";
import {validationMixin} from "vuelidate";
import {getData} from "@/mixins/getData";
export default {
  name: "myWork",
  components:{workView},
  mixins: [validationMixin,getData],
  data() {
    return {
      columns1:[
        {
          type: 'index',
          width: 60,
          align: 'center',
          fixed: 'left'
        },
        {
          title: '状态',
          key: 'taskStatus',
          align: 'center',
          width: 120,
        },
        {
          title: '标题',
          key: 'taskName',
          align: 'center',
          width: 300,
        },
        {
          title: '负责人',
          key: 'taskLeader',
          align: 'center',
          width: 120,
        },
        {
          title: '开始时间',
          key: 'taskStartTime',
          align: 'center',
          width: 300,
        },
        {
          title: '截至时间',
          key: 'taskEndTime',
          align: 'center',
          width: 300,
        },
        {
          title: '所属项目',
          key: 'projectID',
          align: 'center',
          width: 200,
        },
        {
          title: '创建时间',
          key: 'taskCreateTime',
          align: 'center',
          width: 300,
        }
      ],
      data1: [],
      data2: [],
      searchTask:null,
      flag:false,
      workUsers:[],
      project:[],
    }
  },
  methods:{
    //搜索
    search(){
      let _search = this.searchTask.toString().toLowerCase();
      let newListData = []; //  用于存放搜索出来数据的新数组
      if (_search!==null) {
        this.data2.filter(item => {
          if (item.taskName.toLowerCase().indexOf(_search) !== -1) {
            newListData.push(item);
          }
        })
        this.data1 = newListData;
      }else {
        this.data1 = this.data2;
      }
    },
    open(data) {
      this.flag = true;
      this.$nextTick(() => {
        this.$refs.workView.init(data.taskID);
      });
    },
    getMyPesponsible(){
      let data = []
      this.axios.get(this.api.baseUrl + "/task/getMyTaskResponsible/"+ this.$cookies.get("userID")+"/"+this.$cookies.get("userCompany")).then((res) => {
        let code = res.data.code;
        if (code === 200) {
          for (let i = 0; i < res.data.data.length;i++){
            data.push({
              taskName: JSON.parse(JSON.stringify(res.data.data[i].taskName)),
              taskID: JSON.parse(JSON.stringify(res.data.data[i].taskID)),
              taskStartTime: JSON.parse(JSON.stringify(res.data.data[i].taskStartTime)),
              taskEndTime: JSON.parse(JSON.stringify(res.data.data[i].taskEndTime)),
              taskLeader: JSON.parse(JSON.stringify(res.data.data[i].taskLeader)),
              projectID: JSON.parse(JSON.stringify(res.data.data[i].projectID)),
              taskStatus: JSON.parse(JSON.stringify(res.data.data[i].taskStatus)),
              taskCreateTime: JSON.parse(JSON.stringify(res.data.data[i].taskCreateTime)),
              taskCompleteTime: JSON.parse(JSON.stringify(res.data.data[i].taskCompleteTime)),
              taskPriority: JSON.parse(JSON.stringify(res.data.data[i].taskPriority)),
              taskCreator: JSON.parse(JSON.stringify(res.data.data[i].taskCreator)),
            })
            for (let j=0;j<this.workUsers.length;j++){
              if (this.workUsers[j].value===parseInt(data[i].taskLeader)){
                data[i].taskLeader = this.workUsers[j].label;
              }
            }
            for (let j=0;j<this.project.length;j++){
              if (this.project[j].value===parseInt(data[i].projectID)){
                data[i].projectID = this.project[j].label;
              }
            }
            if (data[i].taskStatus===0){
              data[i].taskStatus="未开始"
            }else if (data[i].taskStatus===1){
              data[i].taskStatus="已完成"
            }else if (data[i].taskStatus===2) {
              data[i].taskStatus="进行中"
            }else {
              data[i].taskStatus=null
            }

          }
        }
      });
      return data;
    },
    getCookies(){
      if (this.$cookies.get("userID")===null){
        this.$router.push("/Login")
      }
    }
  },
  created() {
    this.getCookies();
    this.workUsers = this.getUsers();
    this.project = this.getProject();
    this.data2 = this.getMyPesponsible();
    this.data1 = this.getMyPesponsible();
  }
}
</script>

<style scoped>

</style>