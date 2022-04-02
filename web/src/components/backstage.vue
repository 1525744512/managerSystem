<template>
  <Layout>
    <Sider>
      <Menu active-name="1" style="width: 27.7vh;height: 100vh">
        <img class="img" src="../assets/back.png">
        <MenuGroup :title="name" >
          <MenuItem name="1" @click.native="openUserManage">
            <Icon type="md-document" />
            成员管理
          </MenuItem>
          <MenuItem name="2" @click.native="openRoleManage">
            <Icon type="md-chatbubbles" />
            角色管理
          </MenuItem>
        </MenuGroup>
      </Menu>
    </Sider>
    <Content>
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