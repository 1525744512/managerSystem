<template>
  <Card :bordered="false" style="width: 98%;margin-top: 0.5%;margin-left: 1%">
    <row slot="title" align="middle">
      <Col span="5">
        <p>项目延期报表</p>
      </Col>
    </row>
    <row>
      <row>
        <Col>
          <row>
            <label style="font-size: 15px;color: #777777">项目</label>
          </row>
          <row>
            <label style="font-size: 30px">{{ formItem.projectSum }}</label>
          </row>
        </Col>
        <Col style="margin-left: 20vh;margin-right: 10vh">
          <row>
            <label style="font-size: 15px;color: #777777">待处理任务</label>
          </row>
          <row>
            <label style="font-size: 30px">{{ formItem.pendingWork }}</label>
          </row>
        </Col>
        <Divider type="vertical" style="height: 100%"/>

        <Col style="margin-left: 10vh">
          <row>
            <label style="font-size: 15px;color: #777777">未开始</label>
          </row>
          <row>
            <label  style="font-size: 30px">{{ formItem.notStartWorkSum }}</label>
          </row>
        </Col>
        <Col style="margin-left: 20vh">
          <row>
            <label style="font-size: 15px;color: #777777">进行中</label>
          </row>
          <row>
            <label  style="font-size: 30px;color: #ff9900">{{ formItem.conductWorkSum }}</label>
          </row>
        </Col>
        <Col style="margin-left: 20vh; margin-right: 10vh">
          <row>
            <label style="font-size: 15px;color: #777777">延期未完成</label>
          </row>
          <row>
            <label style="font-size: 30px;color: red">{{ formItem.delayWorkSum }}</label>
          </row>
        </Col>
        <Divider type="vertical" style="height: 100%"/>

        <Col style="margin-left: 10vh">
          <i-circle :percent="formItem.completionRate" size="80" dashboard stroke-color="red">
            <span style="font-size:15px;color: #777777">延期率</span>
            <span class="demo-circle-inner" style="font-size:20px;color: red">{{ formItem.completionRate + '%' }}</span>
          </i-circle>
        </Col>
      </row>
      <Divider/>
      <row>
        <Table size="small" height="440" width="1156" border  stripe :columns="columns1" :data="data1" v-model="data1"></Table>
      </row>
    </row>
  </Card>
</template>

<script>
export default {
  name: "projectDelayReport",
  data(){
    return{
      formItem: {
        projectSum: 2,
        pendingWork: 6,
        notStartWorkSum: 1,
        conductWorkSum: 4,
        delayWorkSum: 1,
        completionRate: 48
      },
      columns1:[
        {
          title: '项目',
          key: 'project',
          align: 'center',
        },
        {
          title: '项目状态',
          key: 'state',
          align: 'center',
        },
        {
          title: '待处理任务',
          key: 'sum',
          align: 'center',
        },
        {
          title: '未开始',
          key: 'notStart',
          align: 'center',
        },
        {
          title: '进行中',
          key: 'conduct',
          align: 'center',
        },
        {
          title: '延期未完成',
          key: 'delayNotHad',
          align: 'center',
        },
        {
          title: '延期已完成',
          key: 'delayHad',
          align: 'center',
        },
        {
          title: '延期率',
          key: 'delayRate',
          align: 'center'
        }
      ],
      data1: [
        {
          project:'熟悉项目应用',
          state:'正常',
          sum:6,
          notStart:1,
          conduct:4,
          delayNotHad:0,
          delayHad:1,
          delayRate:48
        },
        {
          project:'项目应用',
          state:'正常',
          sum:0,
          notStart:0,
          conduct:0,
          delayHad:1,
          delayNotHad:0,
          delayRate:48
        }
      ],
    }
  }
}
</script>

<style scoped>

</style>