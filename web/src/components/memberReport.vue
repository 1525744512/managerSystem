<template>
  <Card :bordered="false" style="width: 98%;margin-top: 0.5%;margin-left: 1%">
    <row slot="title" align="middle">
      <Col span="5">
        <p>成员进度报表</p>
      </Col>
    </row>
    <row>
      <row>
        <Col>
          <row>
            <label style="font-size: 15px;color: #777777">成员</label>
          </row>
          <row>
            <label style="font-size: 30px">{{ formItem.userSum }}</label>
          </row>
        </Col>
        <Col style="margin-left: 20vh;margin-right: 10vh">
          <row>
            <label style="font-size: 15px;color: #777777">总任务</label>
          </row>
          <row>
            <label style="font-size: 30px">{{ formItem.workSum }}</label>
          </row>
        </Col>
        <Divider type="vertical" style="height: 100%"/>

        <Col style="margin-left: 10vh">
          <row>
            <label style="font-size: 15px;color: #777777">未开始</label>
          </row>
          <row>
            <label style="font-size: 30px">{{ formItem.notStartWorkSum }}</label>
          </row>
        </Col>
        <Col style="margin-left: 20vh">
          <row>
            <label style="font-size: 15px;color: #777777">进行中</label>
          </row>
          <row>
            <label style="font-size: 30px;color: #ff9900">{{ formItem.conductWorkSum }}</label>
          </row>
        </Col>
        <Col style="margin-left: 20vh; margin-right: 10vh">
          <row>
            <label style="font-size: 15px;color: #777777">已完成</label>
          </row>
          <row>
            <label style="font-size: 30px;color: #54a3ff">{{ formItem.hadWorkSum }}</label>
          </row>
        </Col>
        <Divider type="vertical" style="height: 100%"/>

        <Col style="margin-left: 10vh">
          <i-circle :percent="formItem.completionRate" size="80" dashboard>
            <span style="font-size:15px;color: #777777">完成率</span>
            <span class="demo-circle-inner" style="font-size:20px;color: #54a3ff">{{
                formItem.completionRate + '%'
              }}</span>
          </i-circle>
        </Col>
      </row>
      <Divider/>
      <row>
        <Table size="small" height="440" width="1156" border stripe :columns="columns1" :data="data1"
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
        userSum: 2,
        workSum: 6,
        notStartWorkSum: 1,
        conductWorkSum: 4,
        hadWorkSum: 1,
        completionRate: 40
      },
      columns1: [
        {
          title: '成员',
          key: 'users',
          align: 'center',
        },
        {
          title: '总任务',
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
          title: '已完成',
          key: 'had',
          align: 'center',
        },
        {
          title: '完成率',
          key: 'completeRate',
          align: 'center'
        }
      ],
      data1: [
        {
          users: '大磊儿子',
          sum: 6,
          notStart: 1,
          conduct: 4,
          had: 1,
          completeRate: 80
        },
        {
          users: '小磊儿子',
          sum: 0,
          notStart: 0,
          conduct: 0,
          had: 0,
          completeRate: 0
        }
      ],
    }
  }
}
</script>

<style scoped>

</style>