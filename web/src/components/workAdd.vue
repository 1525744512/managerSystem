<template>
  <modal v-model="modal"
         title="创建任务">
    <Layout style="height: 70vh">
      <Content>
        <Content style="margin: 3.5%">
          <label>标题</label>
          <Input v-model="title" placeholder="请输入标题" style="width: 100%;margin-top: 0.5%;margin-bottom: 1.5%"/>
          <row>
            <Col span="12">
              <label>选择项目</label>
            </Col>
            <Col span="12">
              <label style="margin-left: 5%">截至时间</label>
            </Col>
          </row>
          <row style="margin-bottom: 1.5%;margin-top: 0.5%;">
            <Col span="12">
              <Select v-model="workChoose" clearable style="width: 95%">
                <Option v-for="item in work" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
            <Col span="12">
              <DatePicker type="date" placeholder="任务截至时间" style="width: 95%;margin-left: 5%"></DatePicker>
            </Col>
          </row>
          <row>
            <Col span="12">
              <label>负责人</label>
            </Col>
            <Col span="12">
              <label style="margin-left: 5%">参与人</label>
            </Col>

          </row>
          <row style="margin-bottom: 1.5%;margin-top: 0.5%;">
            <Col span="12">
              <Icon type="ios-contact" size="40" style="color: aqua"></Icon>
              <label style="margin-top: 2%">吉磊</label>
            </Col>
            <Col span="12">
              <Select v-model="usersChoose" multiple filterable :max-tag-count="2"
                      :max-tag-placeholder="maxTagPlaceholder"
                      style="width: 95%;margin-left: 5%">
                <Option v-for="item in users" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
          </row>
          <row>
            <label>描述</label>
          </row>
          <row style="margin-bottom: 1.5%;margin-top: 0.5%;">
            <quill-editor
                v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                @change="onEditorChange($event)">
            </quill-editor>
          </row>
        </Content>
      </Content>
    </Layout>
  </modal>
</template>

<script>
export default {
  name: "workAdd",
  data() {
    return {
      title: '',
      work: [
        {
          value: '熟悉项目应用',
          label: '熟悉项目应用'
        },
        {
          value: '个人事务安排',
          label: '个人事务安排'
        },
        {
          value: '读书计划',
          label: '读书计划'
        },
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
      usersChoose: [],
      content:null,
      editorOption:{},
      modal:false,
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