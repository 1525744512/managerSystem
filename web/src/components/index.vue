<template>
  <Layout>
    <Header :style="{padding: 0}" class="layout-header-bar">
      我的工作台
      <icon class="icon-change" type="ios-sync" size="25" @click="update"></icon>
    </Header>
    <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
      <div>我的任务</div>
    </Content>
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
}
.icon-change{
  margin-right: 20px;
  margin-top: 18px;
  float: right;
}
.icon-change:hover{
  background-color: #d7dde4;
}
</style>