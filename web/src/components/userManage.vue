<template>
  <Card :bordered="false" style="height: 100vh">
    <p slot="title" style="font-size: 20px">
      <Icon type="ios-contact"/>
      成员管理
    </p>
    <Layout>
      <Sider hide-trigger :style="{background: '#fff'}" style="height: 88vh">
        <Tree :data="data3" :load-data="loadData" @on-contextmenu="handleContextMenu" @on-select-change="ContextMenu" >
          <template slot="contextMenu">
            <DropdownItem @click.native="addChildrenDepartment">添加子部门</DropdownItem>
            <add-department v-if="flag2" ref="addDepartment"></add-department>

            <DropdownItem @click.native="DepartmentEdit">编辑部门</DropdownItem>
            <add-department v-if="flag3" ref="addDepartment"></add-department>

            <DropdownItem @click.native="DepartmentDelete">删除部门</DropdownItem>
          </template>
        </Tree>
      </Sider>
      <Content style="width: 100vh">
        <Button type="primary" icon="md-add" @click="add" size="small" style="float: right;margin-top: 2vh;margin-right: 1.5vh">添加成员</Button>
        <invite-members v-if="flag" ref="inviteMembers"></invite-members>
        <Table stripe height="500" :columns="columns1" :data="data2" style="margin-top: 10vh;width: 100%">
          <template slot-scope="{ row }" slot="taskFileName">
            <strong>{{ row.userName }}</strong>
          </template>
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" @click="update(index)" size="small">调整部门</Button>
            <update-department v-if="flag4" ref="updateDepartment"></update-department>
            <Button type="error" size="small" @click="remove(index)" style="margin-left: 1%">删除</Button>
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
import inviteMembers from "@/components/inviteMembers";
import addDepartment from "@/components/addDepartment";
import Utils from "../assets/util"
import UpdateDepartment from "@/components/updateDepartment";

export default {
  name: "userManage",
  components:{UpdateDepartment, inviteMembers,addDepartment},
  data() {
    return {
      // companyName:'吉磊控股有限公司',
      data3: [],
      contextData: null,
      searchProject:null,
      flag:false,
      flag2:false,
      flag3:false,
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
      data2:[
        {
          userName:'吉磊',
          tel:'123112312',
        }
      ],
      pageSize:5,
      pageNum:1,
      pageTotal:0,
      departmentName: '',
      flag4:false,
    }
  },
  methods: {
    addChildrenDepartment() {
      this.flag2 = true;
      this.$nextTick(() => {
        this.$refs.addDepartment.init(this.contextData.parentId,0);
      });
    },
    DepartmentEdit() {
      this.flag3 = true;
      this.$nextTick(() => {
        this.$refs.addDepartment.init(this.contextData.parentId,this.contextData.title);
      });
    },
    DepartmentDelete() {
      this.axios.delete(this.api.baseUrl + "/department/deleteDepartment/"+this.contextData.title +"/"+ this.contextData.parentId +"/"+this.$cookies.get("userCompany")).then((res) => {
        let code = res.data.code;
        let msg = res.data.msg;
        if (code === 200) {
          this.$Message.success(msg);
          this.data3 = [];
          this.getMyDeparentMent();
        }else {
          this.$Message.error(msg);
        }
      });
    },
    add() {
      this.flag = true;
      this.$nextTick(() => {
        this.$refs.inviteMembers.init(this.$cookies.get("userCompany"));
      });
    },
    loadData (item, callback) {
      setTimeout(() => {
        this.axios.get(this.api.baseUrl + "/user/getMyChildrenDeparentMent/" + item.parentId + "/" + this.$cookies.get("userCompany")).then((res) => {
          let code = res.data.code;
          if (code === 200) {
            let data = [];
            for (let i=0;i<res.data.data.departmentList.length;i++){
              data.push(
                  {
                    title: JSON.parse(JSON.stringify(res.data.data.departmentList[i].departmentName)),
                    parentId:   JSON.parse(JSON.stringify(res.data.data.departmentList[i].departmentID)),
                    loading: false,
                    expand: true,
                    contextmenu: true,
                    children: [],
                  },
              )
            }
            callback(data);
          }
        });
      }, 1000);
    },
    getMyDeparentMent(){
      this.axios.get(this.api.baseUrl + "/user/getMyDeparentMent/" + this.$cookies.get("userCompany")).then((res) => {
        let code = res.data.code;
        if (code === 200) {
          this.data3.push({
            title: JSON.parse(JSON.stringify(res.data.data.userCompany)),
            parentId:0,
            loading: false,
            expand: true,
            contextmenu: true,
            children: [],
          })
          this.departmentName = this.data3[0].parentId;
          this.data2 = this.getMyUser(this.pageNum);
        }
      });
    },
    handleContextMenu (data) {
      this.contextData = data;
    },
    ContextMenu(data){
      this.departmentName = data[0].parentId;
      this.data2 = this.getMyUser(this.pageNum);
    },
    getMyUser(pageNum){
      let data = [];
      this.axios.get(this.api.baseUrl + '/user/getMyUser/' + this.departmentName + '/' + this.$cookies.get("userCompany") + '/' + pageNum + '/' + this.pageSize).then((res) => {
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
    changePage (value) {
      this.data2 = this.getMyUser(value);
    },
    remove(index){
      this.axios.delete(this.api.baseUrl + '/user/deleteUser' + '/' + this.data2[index].userID).then((res) => {
        let msg = res.data.msg;
        let code = res.data.code;
        if (code === 200) {
          this.$Message.success(msg);
          this.data2.splice(index,1);
        }else {
          this.$Message.error(msg);
        }
      });
    },
    update(index){
      this.flag4 = true;
      this.$nextTick(() => {
        this.$refs.updateDepartment.init(this.data2[index].userID);
      });
    }
  },
  created() {
    this.getMyDeparentMent();
  },
  mounted() {
    const that = this;
    Utils.$on('tree', function() {
      that.data3 = [];
      that.getMyDeparentMent();
    });
    Utils.$on('treeUpdate', function() {
      that.data3 = [];
      that.getMyDeparentMent();
    });
  }
}
</script>

<style scoped>

</style>