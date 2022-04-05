<template>
  <Card :bordered="false" style="height: 100vh;">
    <p slot="title" style="font-size: 20px">
      <Icon type="ios-contact"/>
      角色管理
    </p>
    <Layout>
      <Sider hide-trigger :style="{background: '#fff'}" style="height: 88vh">
        <Button type="text" icon="md-add" @click="addRole" size="small" style="color: #0066cc">新增角色</Button>
        <add-role v-if="flag2" ref="addRole"></add-role>

        <Tree :data="data1" @on-select-change="ContextMenu"></Tree>
      </Sider>
      <Content style="margin-left: 1.5vh;">
        <Table stripe :columns="columns1" :data="data2" style="margin-top: 10vh;width: 150vh;">
          <template slot-scope="{ row }" slot="taskFileName">
            <strong>{{ row.userName }}</strong>
          </template>
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" @click="update(index)" size="small">调整角色</Button>
            <update-role v-if="flag4" ref="updateRole"></update-role>
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
import addRole from "@/components/addRole";
import Utils from "@/assets/util";
import UpdateRole from "@/components/updateRole";
export default {
  name: "roleManage",
  components: {UpdateRole, addRole},
  data() {
    return {
      data1: [
        {
          title: '默认',
          userRoleId:0,
          loading: false,
          expand: true,
          contextmenu: true,
          children: []
        },
      ],
      searchProject: null,
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
          title: '姓名',
          key: 'userName',
          align: 'center'
        },
        {
          title: '邮箱',
          key: 'userEmail',
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
      data2: [
        {
          userName: '吉磊',
          tel: '123112312',
        }
      ],
      userRoleId:0,
    }
  },
  methods: {
    addRole() {
      this.flag2 = true;
      this.$nextTick(() => {
        this.$refs.addRole.init();
      });
    },
    getMyChildren () {
        this.axios.get(this.api.baseUrl + "/role/getMyChildrenRole/" + this.$cookies.get("userCompany")).then((res) => {
          let code = res.data.code;
          if (code === 200) {
            for (let i=0;i<res.data.data.length;i++){
              this.data1[0].children.push(
                  {
                    title: JSON.parse(JSON.stringify(res.data.data[i].userRoleName)),
                    userRoleId:   JSON.parse(JSON.stringify(res.data.data[i].userRoleId)),
                    loading: false,
                    expand: true,
                    contextmenu: true,
                  },
              )
            }
          }
        });
    },
    ContextMenu(data){
      this.userRoleId = data[0].userRoleId;
      this.data2 = this.getMyUser(this.pageNum);
    },
    getMyUser(pageNum){
      let data = [];
      this.axios.get(this.api.baseUrl + '/user/getMyUserRole/' + this.userRoleId + '/' + this.$cookies.get("userCompany") + '/' + pageNum + '/' + this.pageSize).then((res) => {
        let msg = res.data.msg;
        let code = res.data.code;
        this.pageTotal = res.data.total;
        if (code === 200) {
          for (let i = 0; i < res.data.data.records.length;i++){
            data.push({
              userID: JSON.parse(JSON.stringify(res.data.data.records[i].userID)),
              userName: JSON.parse(JSON.stringify(res.data.data.records[i].userName)),
              userEmail:  JSON.parse(JSON.stringify(res.data.data.records[i].userEmail)),
            })
          }
        }else {
          this.$Message.error(msg);
        }
      });
      return data;
    },
    update(index){
      this.flag4 = true;
      this.$nextTick(() => {
        this.$refs.updateRole.init(this.data2[index].userID);
      });
    },
    changePage (value) {
      this.data2 = this.getMyUser(value);
    },
  },
  created() {
    this.getMyChildren();
    this.data2 = this.getMyUser(this.pageNum);
  },
  mounted() {
    const that = this;
    Utils.$on('addRole', function() {
      that.data1[0].children = [];
      that.getMyChildren();
    });
  }
}
</script>

<style scoped>

</style>