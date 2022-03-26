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
          <MenuItem name="1-3">
            <Icon type="md-add"></Icon>
            <span>新建</span>
          </MenuItem>
          <MenuItem name="1-4">
            <Icon type="ios-search"></Icon>
            <span>搜索</span>
          </MenuItem>
          <MenuItem name="1-5" >
            <Icon type="md-person-add"></Icon>
            <span>邀请用户</span>
          </MenuItem>
          <MenuItem name="1-6">
            <Icon type="ios-contact"></Icon>
            <span>个人</span>
          </MenuItem>
        </Menu>
      </Col>
      <router-view></router-view>
    </Row>
  </div>
</template>

<script>
export default {
  name: "mainPage",
  methods:{
    push(name){
      this.$router.push(name);
    }
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