<template>
  <Card :bordered="false" style="height: 86vh;margin: 20px;width: 97%">
    <p slot="title">全部项目</p>
    <Input search placeholder="搜索项目(按Enter搜索)" style="width: 50vh" v-model="searchProject" @keyup.enter.native="search" @input="search"/>
    <Button v-if="isProject||isOwnerFlag" type="primary" icon="md-add" @click="add" style="float: right">新建项目</Button>
    <project-add v-if="flag" ref="projectAdd"></project-add>
    <Table stripe :columns="columns1" :data="data2" v-model="data1" style="margin-top: 2%;width: 100%" height="400" @on-row-click="open"></Table>
  </Card>
</template>

<script>
import projectAdd from "@/components/projectAdd";
export default {
  name: "allProjects",
  components: {projectAdd},
  data() {
    return {
      columns1: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '项目名称',
          key: 'projectName',
          render: (h, params) => {
            return h('div', params.row.projectName);
          }
        },
        {
          title: '所属分组',
          key: 'departmentID',
          render: (h, params) => {
            return h('div', params.row.departmentID);
          }
        },
        {
          title: '项目负责人',
          key: 'projectLeader',
          render: (h, params) => {
            return h('div', params.row.projectLeader);
          }
        },
        {
          title: '项目状态',
          key: 'projectStatus',
          render: (h, params) => {
            return h('div', params.row.projectStatus);
          }
        },
        {
          title: '任务进度(%)',
          key: 'projectSchedule',
          render: (h, params) => {
            return h('div', params.row.projectSchedule);
          }
        },
        {
          title: '创建时间',
          key: 'projectCreatorTime',
          render: (h, params) => {
            return h('div', params.row.projectCreatorTime);
          }
        }
      ],
      data1: [],
      data2:this.getPersonalProject(),
      flag: false,
      searchProject:null,
      isOwnerFlag:false,
      isProject:false,
    }
  },
  methods: {
    add() {
      this.flag = true;
      this.$nextTick(() => {
        this.$refs.projectAdd.init();
      });
    },
    open(data) {
      this.$router.push({name:'projectView', params: { projectID: data.projectID }});
    },
    getPersonalProject(){
      let data = [];
      this.axios.get(this.api.baseUrl + '/project/getProject/'+this.$cookies.get("userID")+'/'+this.$cookies.get("userCompany")).then((res) => {
        let msg = res.data.msg;
        let code = res.data.code;
        if (code === 200) {
          for (let i = 0; i < res.data.data.length;i++){
            data.push({
              projectID: JSON.parse(JSON.stringify(res.data.data[i].projectID)),
              projectName: JSON.parse(JSON.stringify(res.data.data[i].projectName)),
              departmentID:  JSON.parse(JSON.stringify(res.data.data[i].departmentName)),
              projectLeader:  JSON.parse(JSON.stringify(res.data.data[i].projectLeader)),
              projectStatus:  JSON.parse(JSON.stringify(res.data.data[i].projectStatus)),
              projectSchedule:  JSON.parse(JSON.stringify(res.data.data[i].projectSchedule))*100,
              projectCreatorTime:  JSON.parse(JSON.stringify(res.data.data[i].projectCreatorTime)),
            })
            if (data[i].projectStatus===1){
                data[i].projectStatus = "正常"
            }else if (data[i].projectStatus===2){
                data[i].projectStatus = "有风险"
            }else {
                data[i].projectStatus = "失控"
            }
          }
        }else {
          this.$Message.error(msg);
        }
      });

      return data;
    },
    search(){
      let _search = this.searchProject.toString().toLowerCase();
      let newListData = []; //  用于存放搜索出来数据的新数组
      if (_search!==null) {
        this.data1.filter(item => {
          if (item.projectName.toLowerCase().indexOf(_search) !== -1) {
            newListData.push(item);
          }
        })
        this.data2 = newListData;
      }else {
        this.data2 =this.data1;
      }
    },
    getCookies(){
      if (this.$cookies.get("userID")===null){
        this.$router.push("/Login")
      }
    },
    getIsFlag(){
      if (this.$cookies.get("userOwner") === "1"||this.$cookies.get("userRole")==="1") {
        this.isOwnerFlag = true;
        this.isProject = true;
      }
    },
  },
  created() {
    this.getCookies();
    this.data1 = this.getPersonalProject();
    this.getIsFlag();
  }
}
</script>

<style scoped>

</style>