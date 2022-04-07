<template>
  <Layout>
    <Sider>
      <Menu active-name="1" width="auto" style="height: 100vh">
        <img class="img" src="../assets/back.png" alt="">
        <MenuGroup >
          <MenuItem name="1" @click.native="openUserManage">
            <Icon type="md-document" />
            成员管理
          </MenuItem>
          <MenuItem name="2" @click.native="openRoleManage">
            <Icon type="md-chatbubbles" />
            角色管理
          </MenuItem>
          <MenuItem name="3" @click.native="openProjectManage">
            <Icon type="md-chatbubbles" />
            项目管理
          </MenuItem>
        </MenuGroup>
      </Menu>
    </Sider>
    <Content style="height: 100vh">
      <router-view></router-view>
    </Content>
  </Layout>
</template>

<script>
export default {
  name: "backstage",
  data(){
    return{
      name:'吉磊控股有限公司'
    }
  },
  methods:{
    openUserManage(){
      this.$router.push('/userManage')
    },
    openRoleManage(){
      this.$router.push('/roleManage')
    },
    openProjectManage(){
      this.$router.push('/projectManager')
    }
  }
}
</script>

<style scoped>
.img{
  width: 60px;
  height: 60px;
  margin-top: 2vh;
  margin-left: 9vh;
}

</style>