<template>
  <Card :bordered="false" style="width: 98%;margin-top: 0.5%;margin-left: 1%;height: 97%">
    <row slot="title" align="middle">
      <Col span="5">
        <p>项目进度报表</p>
      </Col>
    </row>
    <row style="width: 100%;">
      <row style="width: 100%;text-align: center">
        <Col style="margin-left: 5%;margin-top: 2.5%">
          <row>
            <label style="font-size: 15px;color: #777777">项目</label>
          </row>
          <row>
            <label style="font-size: 30px;margin-top: 50%">{{ formItem.projectSum }}</label>
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
        <Col style=" margin-left: 10%;margin-right: 5%;margin-top: 2.5%">
          <row>
            <label style="font-size: 15px;color: #777777">已完成</label>
          </row>
          <row>
            <label style="font-size: 30px;color: #00FF00;margin-top: 35%">{{ formItem.hadWorkSum }}</label>
          </row>
        </Col>
        <Divider type="vertical" style="height: 100%"/>
        <Col style="margin-left: 10%;margin-top: 1%">
          <i-circle :percent="formItem.completionRate" stroke-color="#00FF00"  dashboard>
            <span style="font-size:15px;color: #777777">完成率</span>
            <span class="demo-circle-inner" style="font-size:20px;color: #00FF00;margin-left: 2%">{{ formItem.completionRate + '%' }}</span>
          </i-circle>
        </Col>
      </row>
      <Divider/>
      <row style="width: 100%;height: 100%">
        <Table size="small" height="350" style="width: 100%;height: 100%" border  stripe :columns="columns1" :data="data1" v-model="data1"></Table>
      </row>
    </row>
  </Card>
</template>

<script>
export default {
  name: "projectReport",
  data(){
    return{
      formItem: {
        projectSum: 0,
        workSum: 0,
        notStartWorkSum: 0,
        conductWorkSum: 0,
        hadWorkSum: 0,
        completionRate: 0
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
          title: '总任务',
          key: 'projectTaskTotal',
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
          title: '已完成',
          key: 'projectTaskFinishTotal',
          align: 'center',
        },
        {
          title: '完成率',
          key: 'projectCompletionRate',
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
      this.axios.get(this.api.baseUrl + "/project/getProjectProgressReport/"+ this.$cookies.get("userID")+"/"+this.$cookies.get("userCompany")).then((res) => {
        let code = res.data.code;
        if (code === 200) {
          for (let i = 0; i < res.data.data.length;i++){
            data.push({
              projectName: JSON.parse(JSON.stringify(res.data.data[i].projectName)),
              projectID: JSON.parse(JSON.stringify(res.data.data[i].projectID)),
              projectStatus: JSON.parse(JSON.stringify(res.data.data[i].projectStatus)),
              projectTaskTotal: JSON.parse(JSON.stringify(res.data.data[i].projectTaskTotal)),
              projectTaskNoStartTotal: JSON.parse(JSON.stringify(res.data.data[i].projectTaskNoStartTotal)),
              projectTaskFinishTotal: JSON.parse(JSON.stringify(res.data.data[i].projectTaskFinishTotal)),
              projectTaskingTotal: JSON.parse(JSON.stringify(res.data.data[i].projectTaskingTotal)),
              projectCompletionRate: JSON.parse(JSON.stringify(res.data.data[i].projectCompletionRate))*100,
            })
            this.formItem.notStartWorkSum =  this.formItem.notStartWorkSum+data[i].projectTaskNoStartTotal;
            this.formItem.workSum = this.formItem.workSum+data[i].projectTaskTotal;
            this.formItem.conductWorkSum = this.formItem.conductWorkSum + data[i].projectTaskingTotal;
            this.formItem.hadWorkSum =  this.formItem.hadWorkSum+data[i].projectTaskFinishTotal;
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
          this.formItem.completionRate = (this.formItem.hadWorkSum/this.formItem.workSum)*100;
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