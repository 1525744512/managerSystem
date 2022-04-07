<template>
  <Card :bordered="false" style="height: 100vh;">
    <p slot="title" style="font-size: 20px">
      <Icon type="ios-contact"/>
      项目管理
    </p>
    <Layout>
      <Content style="margin-left: 1.5vh;">
        <Table stripe :columns="columns1" :data="data2"  @on-row-click="open" style="margin-top: 10vh;width: 175vh;">
          <template slot-scope="{ row }" slot="taskFileName">
            <strong>{{ row.projectName }}</strong>
          </template>
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" @click="update(index)" size="small">完成</Button>
          </template>
        </Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" @on-change="changePage" show-total></Page>
          </div>
        </div>
      </Content>
    </Layout>
  </Card>
</template>

<script>

export default {
  name: "projectManager",
  data() {
    return {
      flag: false,
      flag2: false,
      flag4:false,
      columns1: [
        {
          type: 'index',
          width: 60,
          align: 'center',
          fixed: 'left'
        },
        {
          title: '项目名称',
          key: 'projectName',
          align: 'center'
        },
        {
          title: '项目完成状态',
          key: 'projectIsFinsh',
          align: 'center'
        },
        {
          title: '项目截至时间',
          key: 'projectEndTime',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          width: 200,
          align: 'center'
        },
      ],
      pageSize:5,
      pageNum:1,
      pageTotal:0,
      data2: [],
      userRoleId:0,
    }
  },
  methods: {
    getProject(pageNum){
      let data = [];
      this.axios.get(this.api.baseUrl + '/project/getProject/'  + this.$cookies.get("userCompany") + '/' + pageNum + '/' + this.pageSize).then((res) => {
        let msg = res.data.msg;
        let code = res.data.code;
        this.pageTotal = res.data.total;
        if (code === 200) {
          for (let i = 0; i < res.data.data.records.length;i++){
            data.push({
              projectID: JSON.parse(JSON.stringify(res.data.data.records[i].projectID)),
              projectName: JSON.parse(JSON.stringify(res.data.data.records[i].projectName)),
              projectEndTime: JSON.parse(JSON.stringify(res.data.data.records[i].projectEndTime)),
              projectIsFinsh: JSON.parse(JSON.stringify(res.data.data.records[i].projectIsFinsh)),
            })
            if (data[i].projectIsFinsh===1){
              data[i].projectIsFinsh = '已完成';
            }else {
              data[i].projectIsFinsh = '未完成';
            }
          }
        }else {
          this.$Message.error(msg);
        }
      });
      return data;
    },
    update(index){
      if (this.data2[index].projectIsFinsh!=="已完成"){
        this.axios.post(this.api.baseUrl + '/project/isProjectFinsh/'  + this.data2[index].projectID).then((res) => {
          let msg = res.data.msg;
          let code = res.data.code;
          if (code === 200) {
            this.$Message.success(msg);
            this.data2 = this.getProject(this.pageNum);
          }else {
            this.$Message.error(msg);
          }
        });
      }else {
        this.$Message.error('该项目已完成不可以重复完成');
      }
    },
    changePage (value) {
      this.data2 = this.getProject(value);
    },
    open(data) {
      this.$router.push({name:'projectView', params: { projectID: data.projectID }});
    },
  },
  created() {
    this.data2 = this.getProject(this.pageNum);
  },
}
</script>

<style scoped>

</style>