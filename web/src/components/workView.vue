<template>
  <modal v-model="modal" title="个人任务详情" width="60" :styles="{top: '20px'}">
      <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="0">
        <label>标题</label>
        <Input v-model="formItem.workName" placeholder="任务标题" />
        <row style="margin-top: 1.5%">
          <Col span="6">
            <label>任务状态</label>
          </Col>
          <Col span="6">
            <label>负责人</label>
          </Col>
          <Col span="6">
            <label>开始时间</label>
          </Col>
          <Col span="6">
            <label>完成时间</label>
          </Col>
        </row>
        <row style="margin-bottom: 1.5%;margin-top: 0.5%;">
            <Select v-model="formItem.workState" clearable style="width: 24.6%;">
              <Option v-for="item in workstate" :value="item.value" :key="item.value" placeholder="选择状态">{{ item.label }}</Option>
            </Select>
            <Select v-model="formItem.workUser" filterable style="width: 24.6%;margin-left: 0.5%">
              <Option v-for="item in workusers" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <DatePicker v-model="formItem.workStartTime"  type="date" placeholder="任务开始时间" style="width: 24.6%;margin-left: 0.5%"></DatePicker>
            <DatePicker v-model="formItem.workEndTime"  type="date" placeholder="任务截至时间" style="width: 24.6%;margin-left: 0.5%"></DatePicker>
        </row>
        <row style="margin-top: 2%">
          <Tabs value="name1" style="width: 100%">
            <TabPane label="任务信息" name="name1">
              <Row>
                <Col span="12">
                  <label>优先级</label>
                </Col>
                <Col span="12">
                  <label style="margin-left: 5%">参与人</label>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <Select v-model="formItem.Class" filterable style="width: 95%">
                    <Option v-for="item in classes" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </Col>
                <Col span="12">
                  <Select v-model="formItem.usersChoose" multiple filterable :max-tag-count="2"
                          :max-tag-placeholder="maxTagPlaceholder" style="width: 95%;margin-left: 5%"
                  >
                    <Option v-for="item in users" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </Col>
              </Row>
              <row>
                <label style="margin-top: 2%">描述</label>
              </row>
              <row style="margin-bottom: 1.5%;margin-top: 0.5%;height: 100px">
                <Col>
                <quill-editor
                    v-model="formItem.content"
                    ref="myQuillEditor"
                    :options="editorOption"
                    @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                    @change="onEditorChange($event)">
                </quill-editor>
                </Col>
              </row>
            </TabPane>
            <TabPane label="子任务" name="name2">
              <row>
                <Tag>共0个任务</Tag>
                <Button type="primary" icon="md-add" @click.native="add" style="height: 21px;font-size: 15px;margin-left: 69%">新建子任务</Button>
<!--                <Input v-if="flag" @keydown.enter.native="addChildrenWork"></Input>-->
                <Children-Work-View v-if="flag" ref="ChildrenWorkView"></Children-Work-View>
              </row>
              <Table height="300" :columns="ChildrenWork" :data="ChildrenWorkData" style="margin-top: 2%"></Table>
            </TabPane>
            <TabPane label="附件" name="name3">
              <row>
                <Tag>共0个附件</Tag>
                <Upload action="//jsonplaceholder.typicode.com/posts/">
                  <Button icon="md-add" style="height: 21px;font-size: 15px;margin-left: 412%">添加附件</Button>
                </Upload>
              </row>
              <Table height="300" :columns="plife" :data="plifes" style="margin-top: 2%"></Table>
            </TabPane>
          </Tabs>
        </row>
      </Form>
  </modal>
</template>

<script>
import ChildrenWorkView from "@/components/ChildrenWorkView";
export default {
  name: "workView",
  components:{ChildrenWorkView},
  data() {
    return {
      formItem:{
        workName: '',
        workState: '',
        workUser: '',
        workStartTime:'',
        workEndTime:'',
        Class:'',
        Laber:'',
        usersChoose:'',
        content:'',
      },
      ruleValidate:{

      },
      workstate: [
        {
          value: '已完成',
          label: '已完成'
        },
        {
          value: '未完成',
          label: '未完成'
        },
      ],
      workusers: [
        {
          value: '负责人1',
          label: '负责人1'
        },
        {
          value: '负责人2',
          label: '负责人2'
        },
        {
          value: '负责人3',
          label: '负责人3'
        },
      ],
      classes: [
        {
          value: '最高',
          label: '最高'
        },
        {
          value: '最低',
          label: '最低'
        },
        {
          value: '较高',
          label: '较高'
        },
        {
          value: '普通',
          label: '普通'
        },
        {
          value: '较低',
          label: '较低'
        },
      ],
      laberes: [
        {
          value: 'P0',
          label: 'P0'
        },
        {
          value: 'P1',
          label: 'P1'
        },
        {
          value: 'P2',
          label: 'P2'
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
      ChildrenWork: [
        {
          title: '任务名称',
          key: 'name'
        }
      ],
      ChildrenWorkData: [
        {
          name: '任务1',
        },
        {
          name: '任务2',
        },
        {
          name: '任务3',
        },
        {
          name: '任务4',
        }
      ],
      plife: [
        {
          title: '附件名称',
          key: 'name'
        }
      ],
      plifes: [
        {
          name: '附件1',
        },
        {
          name: '附件2',
        },
        {
          name: '附件3',
        },
        {
          name: '附件4',
        }
      ],
      editorOption:{},
      modal:false,
      flag:false
    }
  },
  methods: {
    init(){
      this.modal =true;
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
    add() {
      this.flag=true;
      this.$nextTick(() => {
        this.$refs.ChildrenWorkView.init();
      });
    },
    // addChildrenWork(){
    //   this.childrenWork='123'
    // },
  }
}
</script>

<styles scoped>
.layout-header {
  background-color: #ffffff;
}
</styles>