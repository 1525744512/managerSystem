<template>
  <modal v-model="modal"
         title="新建项目">
    <Layout style="height: 50vh;">
      <Content style="width: 100%">
        <Content style="margin: 3.5%;">
          <label>项目名称</label>
          <Input v-model="title" placeholder="项目名称" style="width: 100%;margin-top: 0.5%;margin-bottom: 1.5%"/>
          <row>
            <Col span="12">
              <label>可见范围</label>
            </Col>
            <Col span="12">
              <label style="margin-left: 5%">所属分组</label>
            </Col>
          </row>
          <row style="margin-bottom: 1.5%;margin-top: 0.5%;">
            <Col span="12">
              <Select v-model="workChoose" clearable style="width: 95%">
                <Option v-for="item in Range" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
            <Col span="12">
              <Select v-model="projectChoose" filterable  clearable style="width: 95%;margin-left: 5%;" >
                <Option v-for="item in grouping" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
          </row>
          <row>
            <Col span="12">
              <label>项目描述</label>
            </Col>
          </row>
          <row>
            <Input v-model="value6" type="textarea" :rows="4" placeholder="本项目是..." />
          </row>
          <row style="margin-top: 1.5%;">
            <Col span="12">
              <label>参与人</label>
            </Col>
          </row>
          <row style="margin-bottom: 1.5%;margin-top: 0.5%;">
            <Col span="12">
              <Select v-model="usersChoose" multiple filterable :max-tag-count="2"
                      :max-tag-placeholder="maxTagPlaceholder"
                      style="width: 95%;">
                <Option v-for="item in users" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
          </row>
        </Content>
      </Content>
    </Layout>
  </modal>
</template>

<script>
export default {
  name: "projectAdd",
  data() {
    return {
      title: '',
      Range: [
        {
          value: '私有：加入的成员可见',
          label: '私有：加入的成员可见'
        },
        {
          value: '公开：加入的成员可见',
          label: '公开：加入的成员可见'
        }
      ],
      grouping: [
        {
          value: '分组1',
          label: '分组1'
        },
        {
          value: '分组2',
          label: '分组2'
        }
      ],
      users: [
        {
          value: '用户1',
          label: '用户1'
        },
        {
          value: '用户2',
          label: '用户2'
        },
        {
          value: '用户3',
          label: '用户3'
        },
        {
          value: '用户4',
          label: '用户4'
        }
      ],
      workChoose: '',
      projectChoose: '',
      usersChoose: [],
      content:null,
      editorOption:{},
      modal:false,
      value6:''
    }
  },
  methods: {
    close() {

    },
    maxTagPlaceholder(num) {
      return 'more ' + num;
    },
    onEditorBlur(){//失去焦点事件
    },
    onEditorFocus(){//获得焦点事件
    },
    onEditorChange(){//内容改变事件
    },
    init(){
      this.modal =true;
    },
  }
}
</script>

<style scoped>
.layout-header {
  background-color: #ffffff;
}
</style>