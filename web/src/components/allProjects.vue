<template>
  <Card :bordered="false" style="height: 86vh;margin: 20px">
    <p slot="title">全部项目</p>
    <Input search placeholder="搜索项目(按Enter搜索)" style="width: 50vh"/>
    <Button type="primary" icon="md-add" @click="add" style="float: right">新建项目</Button>
    <project-add v-if="flag" ref="projectAdd"></project-add>
    <Table stripe :columns="columns1" :data="data1" style="margin-top: 2%;width: 100%" @on-row-click="open">

    </Table>
  </Card>
</template>

<script>
import projectAdd from "@/components/projectAdd";

export default {
  name: "allProjects",
  components: {projectAdd},
  data() {
    return {
      columns1: [
        {
          title: '项目名称',
          key: 'name'
        },
        {
          title: '所属分组',
          key: 'group'
        },
        {
          title: '项目负责人',
          key: 'personLiable'
        },
        {
          title: '项目状态',
          key: 'state'
        },
        {
          title: '任务进度',
          key: 'plan'
        },
        {
          title: '创建时间',
          key: 'time'
        }
      ],
      data1: [
        {
          name: '1',
          group: '1组',
          personLiable: '吉磊',
          state: '正常',
          plan: '10%',
          time: '2016-10-03'
        },
        {
          name: '2',
          group: '2组',
          personLiable: '吉磊',
          state: '正常',
          plan: '10%',
          time: '2016-10-03'
        },
        {
          name: '3',
          group: '3组',
          personLiable: '吉磊',
          state: '正常',
          plan: '10%',
          time: '2016-10-03'
        },
        {
          name: '4',
          group: '4组',
          personLiable: '吉磊',
          state: '正常',
          plan: '10%',
          time: '2016-10-03'
        }
      ],
      flag: false,
    }
  },
  methods: {
    add() {
      this.flag = true;
      this.$nextTick(() => {
        this.$refs.projectAdd.init();
      });
    },
    open() {
      this.$router.push('/projectView')
      // Utils.$emit('demo','msg');
    }
  }
}
</script>

<style scoped>

</style>