<template>
  <Card :bordered="false" style="width: 98%;margin-top: 0.5%;margin-left: 1%;height: 97%">
    <row slot="title" align="middle">
      <Col span="5">
        <p>成员延期报表</p>
      </Col>
    </row>
    <row >
      <row style="width: 100%;text-align: center">
        <Col style="margin-left: 5%;margin-top: 2.5%">
          <row>
            <label style="font-size: 15px;color: #777777">成员</label>
          </row>
          <row>
            <label style="font-size: 30px;margin-top: 50%">{{ formItem.userSum }}</label>
          </row>
        </Col>
        <Col style="margin-left: 10%;margin-right: 5%;margin-top: 2.5%">
          <row>
            <label style="font-size: 15px;color: #777777">待处理任务</label>
          </row>
          <row>
            <label style="font-size: 30px;margin-top: 20%">{{ formItem.workSum }}</label>
          </row>
        </Col>
        <Divider type="vertical" style="height: 100%"/>

        <Col style="margin-left: 7%;margin-top: 2.5%">
          <row>
            <label style="font-size: 15px;color: #777777">未开始</label>
          </row>
          <row>
            <label style="font-size: 30px;margin-top: 35%">{{ formItem.notStartWorkSum }}</label>
          </row>
        </Col>
        <Col style="margin-left: 10%;margin-top: 2.5%">
          <row>
            <label style="font-size: 15px;color: #777777">进行中</label>
          </row>
          <row>
            <label style="font-size: 30px;color: #ff9900;margin-top: 35%">{{ formItem.conductWorkSum }}</label>
          </row>
        </Col>
        <Col style=" margin-left: 10%;margin-right: 5%;margin-top: 2.5%">
          <row>
            <label style="font-size: 15px;color: #777777">延期未完成</label>
          </row>
          <row>
            <label style="font-size: 30px;color: red;margin-top: 20%">{{ formItem.delayWorkSum }}</label>
          </row>
        </Col>
        <Divider type="vertical" style="height: 100%"/>

        <Col style="margin-left: 6%;margin-top: 1%">
          <i-circle :percent="formItem.completionRate"  dashboard stroke-color="red">
            <span style="font-size:15px;color: #777777">延期率</span>
            <span class="demo-circle-inner" style="font-size:20px;color: red;margin-left: 2%">{{ formItem.delayRate + '%' }}</span>
          </i-circle>
        </Col>
      </row>
      <Divider/>
      <row>
        <Table size="small" height="350" style="width: 100%;height: 100%" border stripe :columns="columns1" :data="data1"
               v-model="data1"></Table>
      </row>
    </row>
  </Card>
</template>

<script>
export default {
  name: "memberDelayReport",
  data() {
    return {
      formItem: {
        userSum: 0,
        workSum: 0,
        notStartWorkSum: 0,
        conductWorkSum: 0,
        delayWorkSum: 0,
        delayRate: 0
      },
      columns1: [
        {
          type: 'index',
          width: 60,
          align: 'center',
          fixed: 'left'
        },
        {
          title: '成员',
          key: 'userName',
          align: 'center',
        },
        {
          title: '待处理任务',
          key: 'pendingTaskTotal',
          align: 'center',
        },
        {
          title: '未开始',
          key: 'taskNoStartTotal',
          align: 'center',
        },
        {
          title: '进行中',
          key: 'taskingTotal',
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
          key: 'delayRate',
          align: 'center'
        }
      ],
      data1: [],
    }
  },
  methods:{
    // open(data) {
    //   this.flag = true;
    //   this.$nextTick(() => {
    //     this.$refs.workView.init(data.taskID);
    //   });
    // },
    getProjectProgressReport(){
      let data = []
      this.axios.get(this.api.baseUrl + "/task/getMemberDelayReport/"+this.$cookies.get("userCompany")).then((res) => {
        let code = res.data.code;
        if (code === 200) {
          for (let i = 0; i < res.data.data.length;i++){
            data.push({
              userName: JSON.parse(JSON.stringify(res.data.data[i].userName)),
              userID: JSON.parse(JSON.stringify(res.data.data[i].userID)),
              pendingTaskTotal: JSON.parse(JSON.stringify(res.data.data[i].pendingTaskTotal)),
              taskNoStartTotal: JSON.parse(JSON.stringify(res.data.data[i].taskNoStartTotal)),
              taskFinishTotal: JSON.parse(JSON.stringify(res.data.data[i].taskFinishTotal)),
              taskingTotal: JSON.parse(JSON.stringify(res.data.data[i].taskingTotal)),
              delayTaskNotFinishTotal: JSON.parse(JSON.stringify(res.data.data[i].delayTaskNotFinishTotal)),
              delayTaskFinishTotal: JSON.parse(JSON.stringify(res.data.data[i].delayTaskFinishTotal)),
              delayRate: Number(JSON.parse(JSON.stringify(res.data.data[i].delayRate))*100).toFixed(1),
            })
            this.formItem.notStartWorkSum =  this.formItem.notStartWorkSum+data[i].taskNoStartTotal;
            this.formItem.workSum = this.formItem.workSum+data[i].pendingTaskTotal;
            this.formItem.conductWorkSum = this.formItem.conductWorkSum + data[i].taskingTotal;
            this.formItem.delayWorkSum =  this.formItem.delayWorkSum + data[i].delayTaskNotFinishTotal;
          }
          this.formItem.userSum = res.data.data.length;
          if (this.formItem.workSum===0){
            this.formItem.delayRate =0;
          }else {
            this.formItem.delayRate = Number((this.formItem.delayWorkSum/this.formItem.workSum)*100).toFixed(1);
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
    this.data1 = this.getProjectProgressReport();
  }
}
</script>

<style scoped>

</style>