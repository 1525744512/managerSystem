<template>
  <!--  <Breadcrumb>-->
  <!--    <BreadcrumbItem>-->
  <!--      <Icon type="ios-home-outline"></Icon>成员管理-->
  <!--    </BreadcrumbItem>-->
  <!--  </Breadcrumb>-->
  <Card :bordered="false" style="height: 100vh;">
    <p slot="title" style="font-size: 20px">
      <Icon type="ios-contact"/>
      成员管理
    </p>
    <Layout>
      <Sider hide-trigger :style="{background: '#fff'}" style="height: 88vh">
        <Input search placeholder="搜索项目(按Enter搜索)" style="width: 93%" v-model="searchProject" @keyup.enter.native="search" @input="search"/>
        <Tree :data="data1" expand-node @on-contextmenu="handleContextMenu">
          <template slot="contextMenu">
            <DropdownItem @click.native="addChildrenDepartment">添加子部门</DropdownItem>
            <add-department v-if="flag2" ref="addDepartment"></add-department>

            <DropdownItem @click.native="DepartmentEdit">编辑部门</DropdownItem>
            <add-department v-if="flag3" ref="addDepartment"></add-department>

            <DropdownItem @click.native="DepartmentDelete">删除部门</DropdownItem>
          </template>
        </Tree>
      </Sider>
      <Content style="margin-left: 1.5vh;">
        <Button type="primary" icon="md-add" @click="add" size="4" style="float: right;margin-top: 2vh;margin-right: 1.5vh">添加成员</Button>
        <invite-members v-if="flag" ref="inviteMembers"></invite-members>
        <Table stripe :columns="columns1" :data="data2" style="margin-top: 10vh;width: 150vh;"></Table>
      </Content>
    </Layout>

    <!--    <Table stripe :columns="columns1" :data="data2" v-model="data1" style="margin-top: 2%;width: 100%" @on-row-click="open"></Table>-->
  </Card>
</template>

<script>
import inviteMembers from "@/components/inviteMembers";
import addDepartment from "@/components/addDepartment";

export default {
  name: "userManage",
  components:{inviteMembers,addDepartment},
  data() {
    return {
      // companyName:'吉磊控股有限公司',
      data1: [
        {
          title: '吉磊控股有限公司',
          contextmenu: true,
          expand: true,
          children: [
            {
              title: '财务',
              expand: true,
              contextmenu: true,
              children: [
                {
                  title: '222',
                  contextmenu: true
                },
                {
                  title: '333',
                  contextmenu: true
                }
              ]
            },
            {
              title: '未分配部门',
              expand: true,
              contextmenu: true,
              children: [
                {
                  title: '444',
                  contextmenu: true
                },
                {
                  title: '555',
                  contextmenu: true
                }
              ]
            }
          ]
        }
      ],
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
          title: '手机号/邮箱',
          key: 'tel',
          align: 'center'
        },
        {
          title: '操作',
          key: 'operation',
          align: 'center',
          render: (h) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                }
              }, '删除')
            ]);
          }
        },
      ],
      data2:[
        {
          userName:'吉磊',
          tel:'123112312',
        }
      ]
    }
  },
  methods: {
    addChildrenDepartment() {
      this.flag2 = true;
      this.$nextTick(() => {
        this.$refs.addDepartment.init();
      });
    },
    DepartmentEdit() {
      this.flag3 = true;
      this.$nextTick(() => {
        this.$refs.addDepartment.init();
      });
    },
    DepartmentDelete() {
      window.alert('确认删除？')
    },
    add() {
      this.flag = true;
      this.$nextTick(() => {
        this.$refs.inviteMembers.init(this.$cookies.get("userCompany"));
      });
    },
    search(){
      // let _search = this.searchProject.toString().toLowerCase();
      // let newListData = []; //  用于存放搜索出来数据的新数组
      // if (_search!==null) {
      //   this.data1.filter(item => {
      //     if (item.projectName.toLowerCase().indexOf(_search) !== -1) {
      //       newListData.push(item);
      //     }
      //   })
      //   this.data2 = newListData;
      // }else {
      //   this.data2 =this.data1;
      // }
    }
  }
}
</script>

<style scoped>

</style>