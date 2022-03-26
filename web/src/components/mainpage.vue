<template>
  <div class="layout">
    <Layout style="height: 99.6vh">
      <Sider ref="side1">
        <Menu active-name="1-1" theme="dark" width="auto">
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
          <MenuItem name="1-5" style="margin-top: 200%;position: relative;">
            <Icon type="md-person-add"></Icon>
            <span>邀请用户</span>
          </MenuItem>
          <MenuItem name="1-6">
            <Icon type="ios-contact"></Icon>
            <span>个人</span>
          </MenuItem>

        </Menu>
      </Sider>
      <router-view></router-view>
    </Layout>
  </div>
</template>

<script>
export default {
  name: "mainpage",
  methods:{
    push(name){
      this.$router.push(name);
    }
  }
}
</script>

<style scoped>
.layout{
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-header-bar{
  background: #fff;
  box-shadow: 0 1px 1px rgba(0,0,0,.1);
}
.layout-logo-left{
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}
.menu-icon{
  transition: all .3s;
}
.rotate-icon{
  transform: rotate(-90deg);
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
  width: 0px;
  transition: width .2s ease;
}
.collapsed-menu i{
  transform: translateX(5px);
  transition: font-size .2s ease .2s, transform .2s ease .2s;
  vertical-align: middle;
  font-size: 22px;
}

</style>