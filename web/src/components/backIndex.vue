<template>
  <div class="layout">
    <Layout class="divlayout">
      <Header></Header>
      <Content :style="{padding: '0 50px'}">
        <Breadcrumb :style="{margin: '20px 0'}">
          <BreadcrumbItem>管理用户信息</BreadcrumbItem>
        </Breadcrumb>
        <Card>
          <Table border height="450" :data="data1" :columns="columns" >
            <template slot-scope="{ row }" slot="name">
              <strong>{{ row.name }}</strong>
            </template>
            <template slot-scope="{ row, index }" slot="action">
              <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看</Button>
              <Button type="error" size="small" @click="remove(index)">删除</Button>
            </template>
          </Table>
          <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
              <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" @on-change="changePage" show-total></Page>
            </div>
          </div>
        </Card>
      </Content>
      <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
    </Layout>
  </div>
</template>

<script>
export default {
  name: "backIndex",
  data () {
    return {
      data1: this.mockTableData1(1),
      columns: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '用户',
          key: 'name',
          render: (h, params) => {
            return h('div', params.row.name);
          }
        },
        {
          title: '密码',
          key: 'password',
          render: (h, params) => {
            return h('div', params.row.password);
          }
        },
        {
          title: '操作',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      pageSize:10,
      pageNum:1,
      pageTotal:0,
    }
  },
  methods: {
    mockTableData1 (pageNum) {
      let data = [];
      let userName = this.$cookies.get("userName");
      this.axios.get(this.api.baseUrl + '/user/getUser' + '/' + userName + '/' + pageNum + '/10').then((res) => {
        let msg = res.data.msg;
        let code = res.data.code;
        this.pageTotal = res.data.total;
        if (code === 200) {
          for (let i = 0; i < res.data.data.records.length;i++){
            data.push({
              name: JSON.parse(JSON.stringify(res.data.data.records[i].userName)),
              password:  JSON.parse(JSON.stringify(res.data.data.records[i].passWord)),
            })
          }
        }else {
          this.$Message.error(msg);
        }
      });
      return data;
    },
    changePage (value) {
      this.data1 = this.mockTableData1(value);
    },
    show (index) {
      this.$Modal.info({
        title: '信息',
        content: `用户：${this.data1[index].name}<br>密码：${this.data1[index].password}<br>`
      })
    },
    remove (index) {
      this.axios.delete(this.api.baseUrl + '/user/delete' + '/' + this.data1[index].name + '/' + this.data1[index].password).then((res) => {
        let msg = res.data.msg;
        let code = res.data.code;
        if (code === 200) {
          this.$Message.success(msg);
          this.data1.splice(index,1);
        }else {
          this.$Message.error(msg);
        }
      });
    },
  },
}
</script>

<style scoped>
.layout{
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  height:100vh;
}
.divlayout{
  height:100vh;
}
.layout-footer-center{
  text-align: center;
  height: 5%;

}
</style>