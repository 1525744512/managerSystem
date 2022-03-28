<template>
  <div class="layout">
    <Row>
      <Col span="1.5">
        <Menu active-name="1-1" theme="dark" width="auto" style="height: 100vh">
          <MenuItem name="1-1" @click.native="push('/index')">
              <Icon type="md-home"></Icon>
              <span>工作台</span>
          </MenuItem>
          <MenuItem name="1-2" @click.native="push('/project')">
            <Icon type="ios-cube-outline"></Icon>
            <span>项目</span>
          </MenuItem>
          <MenuItem name="1-3" @click.native="value1 = true">
            <Icon type="md-add"></Icon>
            <span>新建</span>
          </MenuItem>
          <MenuItem name="1-4">
            <Icon type="ios-search"></Icon>
            <span>搜索</span>
          </MenuItem>
          <MenuItem name="1-5" v-show="isOwnerFlag" @click.native="openInviteMembers">
            <Icon type="md-person-add"></Icon>
            <span>邀请用户</span>
          </MenuItem>
          <MenuItem name="1-6">
            <Icon type="ios-contact"></Icon>
            <span>个人</span>
          </MenuItem>
        </Menu>
      </Col>

<!--      新建弹出框-->
      <Drawer title="新建" :closable="false" v-model="value1" width="9%">
        <Button type="text" @click="addProject">新建项目</Button>
        <project-add v-if="flag2" ref="projectAdd"></project-add>

        <Button type="text" @click="add">新建任务</Button>
        <workAdd  v-if="flag" ref="workAdd"></workAdd>
      </Drawer>
      <router-view></router-view>
      <inviteMembers title="测试窗口" v-if="openDialog" ref="inviteMembers"/>
    </Row>
  </div>
</template>

<script>
import workAdd from "@/components/workAdd"
import projectAdd from "@/components/projectAdd";
import inviteMembers from "@/components/inviteMembers";
export default {
  name: "mainPage",
  components:{workAdd,projectAdd,inviteMembers},
  data () {
    return {
      value1: false,
      flag: false,
      flag2: false,
      openDialog:false,
      isOwnerFlag:false,
    }
  },
  methods:{
    push(name){
      this.$router.push(name);
    },
    add () {
      this.flag = true;
      this.$nextTick(() => {
        this.$refs.workAdd.init();
      });
    },
    addProject () {
      this.flag2 = true;
      this.$nextTick(() => {
        this.$refs.projectAdd.init();
      });
    },
    openInviteMembers(){
      this.openDialog = true;
      this.$nextTick(() => {
        this.$refs.inviteMembers.init(this.$cookies.get("userCompany"));
      });
    },
    isOwner(){
      if (this.$cookies.get("userOwner")==="1"){
        this.isOwnerFlag = true;
      }
    }
  },
  created() {
    this.isOwner();

  }
}
</script>

<style scoped>
.layout{
  background: #f5f7f9;
  overflow: hidden;
  height: 100vh;
}

.menu-item span{
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width .2s ease .2s;
}
.menu-item i{
  transform: translateX(0px);
  transition: font-size .2s ease, transform .2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span{
  width: 0;
  transition: width .2s ease;
}
.collapsed-menu i{
  transform: translateX(5px);
  transition: font-size .2s ease .2s, transform .2s ease .2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>