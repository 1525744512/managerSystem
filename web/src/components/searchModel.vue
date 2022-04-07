<template>
  <Modal title="搜索" v-model="modal" style="width: 500px">
    <div>
      <Input v-model="inputSearch" search placeholder="搜索" @keyup.enter.native="search" />
    </div>
    <Tabs value="name1">
      <TabPane label="任务" name="name1">
        <Table height="300" :columns="task" :data="taskData" style="margin-top: 2%" @on-row-click="taskOpen">
        </Table>
      </TabPane>
      <TabPane label="项目" name="name2">
        <Table height="300" :columns="project" :data="projectData" style="margin-top: 2%" @on-row-click="peojectOpen">
        </Table>
      </TabPane>
    </Tabs>
    <work-view v-if="flag2" ref="workView"></work-view>
  </Modal>
</template>

<script>
import workView from "@/components/workView";

export default {
  name: "search",
  components:{workView},
  data () {
    return {
      modal: false,
      projectData:[],
      taskData:[],
      flag2:false,
      task:[
        {
        type: 'index',
        width: 60,
        align: 'center'
        },
        {
          title: '任务名称',
          key: 'taskName'
        },
      ],
      project:[
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
      ],
      flag: false,
      inputSearch:'',
    }
  },
  methods:{
    init(){
      this.modal = true;
    },
    taskOpen(data){
      this.flag2 = true;
      this.$nextTick(() => {
        this.$refs.workView.init(data.taskID);
      });
    },
    peojectOpen(data){
      this.$router.push({name:'projectView', params: { projectID: data.projectID }});
      this.modal = false;
    },
    search(){
      this.taskData = [];
      this.projectData = [];
      if (this.inputSearch!==null){
        this.axios.get(this.api.baseUrl + "/user/getSearch/"+ this.inputSearch + "/" + this.$cookies.get("userID")).then((res) => {
          let code = res.data.code;
          if (code === 200) {
            for (let i=0;i<res.data.data.taskList.length;i++){
              if (JSON.parse(JSON.stringify(res.data.data.taskList[i].taskStatus))!==1) {
                this.taskData.push({
                  taskID: JSON.parse(JSON.stringify(res.data.data.taskList[i].taskID)),
                  taskName: JSON.parse(JSON.stringify(res.data.data.taskList[i].taskName))
                })
              }
            }
            for (let i=0;i<res.data.data.projectList.length;i++){
              this.projectData.push({
                projectID:JSON.parse(JSON.stringify(res.data.data.projectList[i].projectID)),
                projectName:JSON.parse(JSON.stringify(res.data.data.projectList[i].projectName))
              })
            }
          }
        });
      }
    },
  }
}
</script>

<style scoped>

</style>