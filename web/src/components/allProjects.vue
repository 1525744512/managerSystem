<template>
  <Card :bordered="false" style="height: 86vh;margin: 20px">
    <p slot="title">全部项目</p>
    <Input search placeholder="搜索项目(按Enter搜索)" style="width: 50vh"/>
    <Button type="primary" icon="md-add" @click="add" style="float: right">新建项目</Button>
    <project-add v-if="flag" ref="projectAdd"></project-add>
    <Table stripe :columns="columns1" :data="data1" style="margin-top: 2%;width: 100%" @on-row-click="open">
<!--      <template slot-scope="{ row }" slot="projectName">-->
<!--        <strong>{{ row.projectName }}</strong>-->
<!--      </template>-->
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
        // {
        //   type: 'index',
        //   width: 60,
        //   align: 'center'
        // },
        {
          title: '项目名称',
          key: 'projectName',
          render: (h, params) => {
            return h('div', params.row.projectName);
          }
        },
        {
          title: '所属分组',
          key: 'departmentID',
          render: (h, params) => {
            return h('div', params.row.departmentID);
          }
        },
        {
          title: '项目负责人',
          key: 'projectLeader',
          render: (h, params) => {
            return h('div', params.row.projectLeader);
          }
        },
        {
          title: '项目状态',
          key: 'projectStatus',
          render: (h, params) => {
            return h('div', params.row.projectStatus);
          }
        },
        {
          title: '任务进度(%)',
          key: 'projectSchedule',
          render: (h, params) => {
            return h('div', params.row.projectSchedule);
          }
        },
        {
          title: '创建时间',
          key: 'projectCreatorTime',
          render: (h, params) => {
            return h('div', params.row.projectCreatorTime);
          }
        }
      ],
      data1: [],
      flag: false,
      department:[],
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
    },
    getPersonalProject(){
      let data = [];
      this.axios.get(this.api.baseUrl + '/project/getProject/'+this.$cookies.get("userID")+'/'+this.$cookies.get("userCompany")).then((res) => {
        let msg = res.data.msg;
        let code = res.data.code;
        if (code === 200) {
          for (let i = 0; i < res.data.data.length;i++){
            data.push({
              projectName: JSON.parse(JSON.stringify(res.data.data[i].projectName)),
              departmentID:  JSON.parse(JSON.stringify(res.data.data[i].departmentName)),
              projectLeader:  JSON.parse(JSON.stringify(res.data.data[i].projectLeader)),
              projectStatus:  JSON.parse(JSON.stringify(res.data.data[i].projectStatus)),
              projectSchedule:  JSON.parse(JSON.stringify(res.data.data[i].projectSchedule))*100,
              projectCreatorTime:  JSON.parse(JSON.stringify(res.data.data[i].projectCreatorTime)),
            })
          }
        }else {
          this.$Message.error(msg);
        }
      });
      return data;
    },
  },
  created() {
    this.data1 = this.getPersonalProject();
  }
}
</script>

<style scoped>

</style>