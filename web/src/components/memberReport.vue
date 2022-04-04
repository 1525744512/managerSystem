<template>
  <Card :bordered="false" style="width: 98%;margin-top: 0.5%;margin-left: 1%;height: 97%">
    <row slot="title" align="middle">
      <Col span="5">
        <p>成员进度报表</p>
      </Col>
    </row>
    <row>
      <row style="width: 100%;">
        <Col style="margin-left: 5%;margin-top: 2.5%">
          <row>
            <label style="font-size: 15px;color: #777777">成员</label>
          </row>
          <row>
            <label style="font-size: 30px;margin-top: 50%">{{ formItem.userSum }}</label>
          </row>
        </Col>
        <Col style="margin-left: 10%;margin-right: 7%;margin-top: 2.5%">
          <row>
            <label style="font-size: 15px;color: #777777">总任务</label>
          </row>
          <row>
            <label style="font-size: 30px;margin-top: 35%">{{ formItem.workSum }}</label>
          </row>
        </Col>
        <Divider type="vertical" style="height: 100%"/>

        <Col style="margin-left: 5%;margin-top: 2.5%">
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
            <label style="font-size: 15px;color: #777777">已完成</label>
          </row>
          <row>
            <label style="font-size: 30px;color: #54a3ff;margin-top: 35%">{{ formItem.hadWorkSum }}</label>
          </row>
        </Col>
        <Divider type="vertical" style="height: 100%"/>

        <Col style="margin-left: 10%;margin-top: 1%">
          <i-circle :percent="formItem.completionRate" stroke-color="#00FF00" dashboard>
            <span style="font-size:15px;color: #777777">完成率</span>
            <span class="demo-circle-inner" style="font-size:20px;color: #00FF00;margin-left: 2%">{{
                formItem.completionRate + '%'
              }}</span>
          </i-circle>
        </Col>
      </row>
      <Divider/>
      <row style="width: 100%;height: 100%">
        <Table size="small" height="350" style="width: 100%;height: 100%" border stripe :columns="columns1" :data="data1"
               v-model="data1"></Table>
      </row>
    </row>
  </Card>
</template>

<script>
export default {
  name: "memberReport",
  data() {
    return {
      formItem: {
        userSum: 0,
        workSum: 0,
        notStartWorkSum: 0,
        conductWorkSum: 0,
        hadWorkSum: 0,
        completionRate: 0
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
          title: '总任务',
          key: 'taskTotal',
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
          title: '已完成',
          key: 'taskFinishTotal',
          align: 'center',
        },
        {
          title: '完成率',
          key: 'completionRate',
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
      this.axios.get(this.api.baseUrl + "/task/getMemberProgressReport/"+this.$cookies.get("userCompany")).then((res) => {
        let code = res.data.code;
        if (code === 200) {
          for (let i = 0; i < res.data.data.length;i++){
            data.push({
              userName: JSON.parse(JSON.stringify(res.data.data[i].userName)),
              userID: JSON.parse(JSON.stringify(res.data.data[i].userID)),
              taskTotal: JSON.parse(JSON.stringify(res.data.data[i].taskTotal)),
              taskNoStartTotal: JSON.parse(JSON.stringify(res.data.data[i].taskNoStartTotal)),
              taskFinishTotal: JSON.parse(JSON.stringify(res.data.data[i].taskFinishTotal)),
              taskingTotal: JSON.parse(JSON.stringify(res.data.data[i].taskingTotal)),
              completionRate: JSON.parse(JSON.stringify(res.data.data[i].completionRate))*100,
            })
            this.formItem.notStartWorkSum =  this.formItem.notStartWorkSum+data[i].taskNoStartTotal;
            this.formItem.workSum = this.formItem.workSum+data[i].taskTotal;
            this.formItem.conductWorkSum = this.formItem.conductWorkSum + data[i].taskingTotal;
            this.formItem.hadWorkSum =  this.formItem.hadWorkSum+data[i].taskFinishTotal;
          }
          this.formItem.userSum = res.data.data.length;
          if (this.formItem.workSum===0){
            this.formItem.completionRate =0;
          }else {
            this.formItem.completionRate = (this.formItem.hadWorkSum/this.formItem.workSum)*100;

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