<template>
  <Card :bordered="false" style="width: 98%;margin-top: 0.5%;margin-left: 1%;height: 97%">
    <row slot="title" align="middle">
      <Col span="5">
        <p>项目延期报表</p>
      </Col>
    </row>
    <row>
      <row style="width: 100%;text-align: center">
        <Col style="margin-left: 5%;margin-top: 2.5%">
          <row>
            <label style="font-size: 15px;color: #777777">项目</label>
          </row>
          <row>
            <label style="font-size: 30px;margin-top: 50%">{{ formItem.projectSum }}</label>
          </row>
        </Col>
        <Col style="margin-left: 10%;margin-right: 5%;margin-top: 2.5%">
          <row>
            <label style="font-size: 15px;color: #777777">待处理任务</label>
          </row>
          <row>
            <label style="font-size: 30px;margin-top: 20%">{{ formItem.pendingWork }}</label>
          </row>
        </Col>
        <Divider type="vertical" style="height: 100%"/>

        <Col style="margin-left: 7%;margin-top: 2.5%">
          <row>
            <label style="font-size: 15px;color: #777777">未开始</label>
          </row>
          <row>
            <label  style="font-size: 30px;margin-top: 35%">{{ formItem.notStartWorkSum }}</label>
          </row>
        </Col>
        <Col style="margin-left: 10%;margin-top: 2.5%">
          <row>
            <label style="font-size: 15px;color: #777777">进行中</label>
          </row>
          <row>
            <label  style="font-size: 30px;color: #ff9900;margin-top: 35%">{{ formItem.conductWorkSum }}</label>
          </row>
        </Col>
        <Col style="margin-left: 10%; margin-right: 5%;margin-top: 2.5%">
          <row>
            <label style="font-size: 15px;color: #777777">延期未完成</label>
          </row>
          <row>
            <label style="font-size: 30px;color: red;margin-top: 20%">{{ formItem.delayWorkSum }}</label>
          </row>
        </Col>
        <Divider type="vertical" style="height: 100%"/>

        <Col style="margin-left: 6%;margin-top: 1%">
          <i-circle :percent="formItem.completionRate" dashboard stroke-color="red">
            <span style="font-size:15px;color: #777777">延期率</span>
            <span class="demo-circle-inner" style="font-size:20px;color: red;margin-left: 2%">{{ formItem.projectDelayRate + '%' }}</span>
          </i-circle>
        </Col>
      </row>
      <Divider/>
      <row style="width: 100%;height: 100%">
        <Table size="small" height="370" style="width: 100%" border  stripe :columns="columns1" :data="data1" v-model="data1"></Table>
        <work-view v-if="flag" ref="workView"></work-view>
      </row>
    </row>
  </Card>
</template>

<script>
import workView from "@/components/workView";

export default {
  name: "projectDelayReport",
  components: {workView},
  data(){
    return{
      formItem: {
        projectSum: 0,
        pendingWork: 0,
        notStartWorkSum: 0,
        conductWorkSum: 0,
        delayWorkSum: 0,
        delayFinishWorkSum:0,
        projectDelayRate: 0
      },
      columns1:[
        {
          type: 'index',
          width: 60,
          align: 'center',
          fixed: 'left'
        },
        {
          title: '项目',
          key: 'projectName',
          align: 'center',
        },
        {
          title: '项目状态',
          key: 'projectStatus',
          align: 'center',
        },
        {
          title: '待处理任务',
          key: 'projectPendingTaskTotal',
          align: 'center',
        },
        {
          title: '未开始',
          key: 'projectTaskNoStartTotal',
          align: 'center',
        },
        {
          title: '进行中',
          key: 'projectTaskingTotal',
          align: 'center',
        },
        {
          title: '延期未完成',
          key: 'delayTaskNotFinishTotal',
          align: 'center',
        },
        {
          title: '延期已完成',
          key: 'delayTaskFinishTotal',
          align: 'center',
        },
        {
          title: '延期率',
          key: 'projectDelayRate',
          align: 'center'
        }
      ],
      data1: [],
      flag:false,
    }
  },
  methods:{
    open(data) {
      this.flag = true;
      this.$nextTick(() => {
        this.$refs.workView.init(data.taskID);
      });
    },
    getProjectDelayReport(){
      let data = []
      this.axios.get(this.api.baseUrl + "/project/getProjectDelayReport/"+ this.$cookies.get("userID")+"/"+this.$cookies.get("userCompany")).then((res) => {
        let code = res.data.code;
        if (code === 200) {
          for (let i = 0; i < res.data.data.length;i++){
            data.push({
              projectName: JSON.parse(JSON.stringify(res.data.data[i].projectName)),
              projectID: JSON.parse(JSON.stringify(res.data.data[i].projectID)),
              projectStatus: JSON.parse(JSON.stringify(res.data.data[i].projectStatus)),
              projectPendingTaskTotal: JSON.parse(JSON.stringify(res.data.data[i].projectPendingTaskTotal)),
              projectTaskNoStartTotal: JSON.parse(JSON.stringify(res.data.data[i].projectTaskNoStartTotal)),
              delayTaskNotFinishTotal: JSON.parse(JSON.stringify(res.data.data[i].delayTaskNotFinishTotal)),
              delayTaskFinishTotal: JSON.parse(JSON.stringify(res.data.data[i].delayTaskFinishTotal)),
              projectTaskingTotal: JSON.parse(JSON.stringify(res.data.data[i].projectTaskingTotal)),
              projectDelayRate: JSON.parse(JSON.stringify(res.data.data[i].projectDelayRate))*100,
            })
            this.formItem.notStartWorkSum =  this.formItem.notStartWorkSum+data[i].projectTaskNoStartTotal;
            this.formItem.pendingWork = this.formItem.pendingWork + data[i].projectPendingTaskTotal;
            this.formItem.conductWorkSum = this.formItem.conductWorkSum + data[i].projectTaskingTotal;
            this.formItem.delayWorkSum =  this.formItem.delayWorkSum + data[i].delayTaskNotFinishTotal;
            this.formItem.delayFinishWorkSum =  this.formItem.delayFinishWorkSum + data[i].delayTaskFinishTotal;
            if (data[i].projectStatus===1){
              data[i].projectStatus="正常"
            }else if (data[i].projectStatus===2){
              data[i].projectStatus="有风险"
            }else if (data[i].projectStatus===3) {
              data[i].projectStatus="失控"
            }else {
              data[i].projectStatus=null
            }
          }
          this.formItem.projectSum = res.data.data.length;
          this.formItem.projectDelayRate = ((this.formItem.delayWorkSum+this.formItem.delayFinishWorkSum)/this.formItem.pendingWork)*100;
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
    this.data1 = this.getProjectDelayReport();
  }
}
</script>

<style scoped>

</style>