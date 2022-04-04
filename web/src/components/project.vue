<template>
  <Layout style="background-color: #ffffff;width: 1%;height: 100vh">
    <Sider ref="side1" hide-trigger collapsible :collapsed-width="80" v-model="isCollapsed">
      <Menu active-name="1-3" width="auto" :class="menuitemClasses">
        <MenuItem name="1-2" @click.native="open">
          <Icon type="ios-search"></Icon>
          <span>全部项目</span>
        </MenuItem>
        <Submenu name="1-1">
          <template slot="title">
            <Icon type="ios-paper"/>
            我的任务
          </template>
          <MenuItem name="1-1-1" @click.native="openMyWork">我负责的</MenuItem>
          <MenuItem name="1-1-2" @click.native="openMyJoin">我参与的</MenuItem>
          <MenuItem name="1-1-3" @click.native="openMyCreate">我创建的</MenuItem>
        </Submenu>
        <Submenu name="1-3">
          <template slot="title">
            <Icon type="ios-paper"/>
            报表
          </template>
          <MenuGroup title="项目报表">
            <MenuItem name="1-3-1" @click.native="openProjectReport">
              <Icon type="md-document" />
              项目进度报表
            </MenuItem>
            <MenuItem name="1-3-2" @click.native="openProjectDelayReport">
              <Icon type="md-chatbubbles" />
              项目延期报表
            </MenuItem>
          </MenuGroup>
          <MenuGroup title="成员报表">
            <MenuItem name="1-3-3" @click.native="openMemberReport">
              <Icon type="md-document" />
              成员进度报表
            </MenuItem>
            <MenuItem name="1-3-4" @click.native="openMemberDelayReport">
              <Icon type="md-chatbubbles" />
              成员延期报表
            </MenuItem>
          </MenuGroup>
        </Submenu>
      </Menu>
    </Sider>
    <Layout style="height: 100vh;width: 100vh;">
      <Header :style="{padding: 0,width:'100%'}" class="layout-header-bar">
        <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu"
              size="24"></Icon>
      </Header>
      <Content :style="{height:'92vh',width:'100%'}">
        <router-view></router-view>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
export default {
  name: "project",
  data() {
    return {
      isCollapsed: false,
      ah: false
    }
  },
  computed: {
    rotateIcon() {
      return [
        'menu-icon',
        this.isCollapsed ? 'rotate-icon' : ''
      ];
    },
    menuitemClasses() {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    }
  },
  methods: {
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    },
    open() {
      this.$router.push('/allProjects');
    },
    openMyWork() {
      this.$router.push('/myWorkResponsible');
    },
    openMyJoin() {
      this.$router.push('/myWorkJoin');
    },
    openMyCreate() {
      this.$router.push('/myWorkCreate');
    },
    openProjectReport() {
      this.$router.push('/projectReport')
    },
    openProjectDelayReport() {
      this.$router.push('/projectDelayReport')
    },
    openMemberReport() {
      this.$router.push('/memberReport')
    },
    openMemberDelayReport() {
      this.$router.push('/memberDelayReport')
    },
    getCookies(){
      if (this.$cookies.get("userID")===null){
        this.$router.push("/Login")
      }
    }
  },
  created() {
    this.getCookies();
  }
}
</script>

<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}

.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
  height: 8vh;
}

.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}

.menu-icon {
  transition: all .3s;
}

.rotate-icon {
  transform: rotate(-90deg);
}

.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width .2s ease .2s;
}

.menu-item i {
  transform: translateX(0px);
  transition: font-size .2s ease, transform .2s ease;
  vertical-align: middle;
  font-size: 16px;
}

.collapsed-menu span {
  width: 0px;
  transition: width .2s ease;
}

.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size .2s ease .2s, transform .2s ease .2s;
  vertical-align: middle;
  font-size: 22px;
}

.ivu-layout-sider {
  background-color: #ffffff;
}
</style>