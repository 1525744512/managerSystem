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
        <workAdd  v-if="flag" ref="workAdd"></workAdd>
        <Collapse simple style="border: 0">
          <Panel name="1" >
            史蒂夫·乔布斯
            <p slot="content">史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。</p>
          </Panel>
          <Panel name="3">
            乔纳森·伊夫
            <p slot="content">乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果那些著名的产品最有影响力的人。</p>
          </Panel>
        </Collapse>
      </card>
    </content>
  </Layout>
</template>

<script>
import workAdd from "@/components/workAdd"
export default {
  name: "index",
  components:{workAdd},
  data () {
    return{
      flag: false
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
    }
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
</style>