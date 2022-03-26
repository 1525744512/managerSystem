<template>
  <Layout>
    <Header class="layout-header-bar">
      <div style="width: 100%;height: 100%;vertical-align: middle;line-height: 8vh">
        <div style="float:left;margin-left: 2%;text-align: center;height: 8vh;display: inline-block;">
          <span>我的工作台</span>
        </div>
        <div style="float: right;width: 50px;height: 50px">
          <icon class="icon-change" type="ios-sync" @click="update"></icon>
        </div>
      </div>
    </Header>
    <content :style="{padding: '20px',background: '#e5ecfc',height:'92vh'}">
      <card :bordered="false">
        <p slot="title">我的任务</p>
      </card>
    </content>
  </Layout>
</template>

<script>
export default {
  name: "index",
  methods:{
    update (){

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
}
.icon-change:hover{
  background-color: #d7dde4;
}
</style>