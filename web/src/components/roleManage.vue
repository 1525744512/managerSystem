<template>
  <Card :bordered="false" style="height: 100vh;">
    <p slot="title" style="font-size: 20px">
      <Icon type="ios-contact"/>
      角色管理
    </p>
    <Layout>
      <Sider hide-trigger :style="{background: '#fff'}" style="height: 88vh">
        <Button type="text" icon="md-add" @click="addRole" size="2" style="color: #0066cc">新增角色</Button>
        <add-role v-if="flag2" ref="addRole"></add-role>

        <Tree :data="data1" expand-node @on-contextmenu="handleContextMenu"></Tree>
      </Sider>
      <Content style="margin-left: 1.5vh;">
        <Button type="primary" icon="md-add" @click="addUser" size="4"
                style="float: right;margin-top: 2vh;margin-right: 1.5vh">添加成员
        </Button>
        <invite-members v-if="flag" ref="inviteMembers"></invite-members>
        <Table stripe :columns="columns1" :data="data2" style="margin-top: 10vh;width: 150vh;"></Table>
      </Content>
    </Layout>

    <!--    <Table stripe :columns="columns1" :data="data2" v-model="data1" style="margin-top: 2%;width: 100%" @on-row-click="open"></Table>-->
  </Card>
</template>

<script>
import inviteMembers from "@/components/inviteMembers";
import addRole from "@/components/addRole";
export default {
  name: "roleManage",
  components: {inviteMembers,addRole},
  data() {
    return {
      // companyName:'吉磊控股有限公司',
      data1: [
        {
          title: '默认',
          expand: true,
          children: [
            {
              title: '所有者',
              expand: true,
            },
            {
              title: '管理员',
              expand: true,
            },
            {
              title: '部门主管',
              expand: true,
            },
            {
              title: '成员',
              expand: true,
            }
          ]
        },
        {
          title: '职务',
          contextmenu: true,
          expand: true,
          children: [
            {
              title: '财务',
              expand: true,
            },
            {
              title: '出纳',
              expand: true,
            },
            {
              title: '采购',
              expand: true,
            },
            {
              title: '客服',
              expand: true,
            },
            {
              title: '人事',
              expand: true,
            },
            {
              title: '行政',
              expand: true,
            },
            {
              title: 'HR',
              expand: true,
            }
          ]
        },
        {
          title: '总监',
          expand: true,
          children: [
            {
              title: '研发总监',
              expand: true,
            },
            {
              title: '市场总监',
              expand: true,
            },
            {
              title: '销售总监',
              expand: true,
            },
            {
              title: '客服',
              expand: true,
            },
            {
              title: '人力资源总监',
              expand: true,
            }
          ]
        },
        {
          title: '区域',
          expand: true,
          children: [
            {
              title: '东区',
              expand: true,
            },
            {
              title: '西区',
              expand: true,
            },
            {
              title: '南区',
              expand: true,
            },
            {
              title: '北区',
              expand: true,
            },
            {
              title: '华中区',
              expand: true,
            }
          ]
        }
      ],
      searchProject: null,
      flag: false,
      flag2: false,
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
          title: '手机号',
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
      data2: [
        {
          userName: '吉磊',
          tel: '123112312',
        }
      ]
    }
  },
  methods: {
    addUser() {
      this.flag = true;
      this.$nextTick(() => {
        this.$refs.inviteMembers.init(this.$cookies.get("userCompany"));
      });
    },
    addRole() {
      this.flag2 = true;
      this.$nextTick(() => {
        this.$refs.addRole.init();
      });
    }
  }
}
</script>

<style scoped>

</style>