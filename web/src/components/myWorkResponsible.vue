<template>
  <Card :bordered="false" style="height: 86vh;margin: 20px">
    <p slot="title">我负责的</p>
    <Input search placeholder="搜索项目(按Enter搜索)" style="width: 50vh" v-model="searchProject" @keyup.enter.native="search" @input="search"/>
    <Table size="small" height="470" border  stripe :columns="columns1" :data="data1" v-model="data1" style="margin-top: 2%;width: 158vh" @on-row-click="open"></Table>
    <work-view v-if="flag" ref="workView"></work-view>
  </Card>
</template>

<script>
import workView from "@/components/workView";
export default {
  name: "myWork",
  components:{workView},
  data() {
    return {
      columns1:[
        {
          type: 'index',
          width: 60,
          align: 'center',
          fixed: 'left'
        },
        {
          title: '编号',
          key: 'no',
          align: 'center',
          width: 80,
        },
        {
          title: '状态',
          key: 'state',
          align: 'center',
          width: 120,
        },
        {
          title: '标题',
          key: 'titles',
          align: 'center',
          width: 300,
        },
        {
          title: '负责人',
          key: 'user',
          align: 'center',
          width: 120,
        },
        {
          title: '开始时间',
          key: 'startTime',
          align: 'center',
          width: 300,
        },
        {
          title: '截至时间',
          key: 'endTime',
          align: 'center',
          width: 300,
        },
        {
          title: '所属项目',
          key: 'belongWork',
          align: 'center',
          width: 200,
        },
        {
          title: '创建时间',
          key: 'createTime',
          align: 'center',
          width: 300,
        }
      ],
      data1: [
        {
          no:'32',
          state:'未开始',
          titles:'阅读一本书',
          user:'磊儿子',
          startTime:'2021年11月25日',
          endTime:'2022年1月1日',
          belongWork:'读书计划',
          createTime:'2021年11月29日 16:26',
        }
      ],
      searchProject:null,
      flag:false,
    }
  },
  methods:{
    //搜索
    search(){
    },
    open() {
      this.flag = true;
      this.$nextTick(() => {
        this.$refs.workView.init();
      });
    },
  }
}
</script>

<style scoped>

</style>