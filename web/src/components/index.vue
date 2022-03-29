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
        <workAdd v-if="flag" ref="workAdd"></workAdd>
        <Tree :data="data1" expand-node style="width: 100%"></Tree>
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
      flag: false,
      data1: [
        {
          title: 'parent 1',
          expand: true,
          children: [
            {
              title: 'parent 1-1',
              expand: true,
              children: [
                {
                  title: 'leaf 1-1-1'
                },
                {
                  title: 'leaf 1-1-2'
                }
              ]
            },
            {
              title: 'parent 1-2',
              expand: true,
              children: [
                {
                  title: 'leaf 1-2-1'
                },
                {
                  title: 'leaf 1-2-1'
                }
              ]
            }
          ]
        }
      ]
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