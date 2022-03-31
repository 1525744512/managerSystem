<template>
  <div style="background:#eee;padding: 20px;height: 100%">
    <Card :bordered="false" style="float: left;width: 63%">
      <!--      <p slot="title">项目1</p>-->
      <row slot="title" align="middle">
        <Col span="5">
          <Breadcrumb>
            <BreadcrumbItem @click.native="closeThisVue">返回</BreadcrumbItem>
            <BreadcrumbItem>{{ formItem.workName }}</BreadcrumbItem>
          </Breadcrumb>
        </Col>
        <!--        <Col style="margin-left: 55%">-->
        <!--          <Button type="text" size="5" icon="ios-sync">更新</Button>-->
        <!--        </Col>-->
      </row>
      <Form :ref="formItem" v-model="formItem">
        <row>
          <Col span="7">
            <label>负责人</label>
          </Col>
          <Col span="7">
            <label>开始时间</label>
          </Col>
          <Col span="7">
            <label>结束时间</label>
          </Col>
        </row>
        <row>
          <Select v-model="formItem.workUser" filterable style="width: 24.6%;">
            <Option v-for="item in workusers" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <!--          <DatePicker v-model="formItem.workStartTime" type="date" placeholder="任务开始时间"-->
          <!--                      style="width: 24.6%;margin-left: 4.5%"></DatePicker>-->
          <DatePicker
              v-model="formItem.workStartTime"
              :open="open"
              :value="formItem.workStartTime"
              confirm
              type="date"
              @on-change="handleChangeStart"
              @on-clear="handleClear(0)"
              @on-ok="handleOk(0)"
              style="width: 24.6%;margin-left: 4.5%"
          >
            <a href="javascript:void(0)" @click="handleClick(0)">
              <Icon type="ios-calendar-outline"></Icon>
              <template v-if="formItem.workStartTime === ''">任务开始时间</template>
              <template v-else>{{ formItem.workStartTime }}</template>
            </a>
          </DatePicker>
          <!--          <DatePicker v-model="formItem.workEndTime" type="date" placeholder="任务截至时间"-->
          <!--                      style="width: 24.6%;margin-left: 4.5%"></DatePicker>-->
          <DatePicker
              v-model="formItem.workEndTime"
              :open="open2"
              :value="formItem.workEndTime"
              confirm
              type="date"
              @on-change="handleChangeEnd"
              @on-clear="handleClear(1)"
              @on-ok="handleOk(1)"
              style="width: 24.6%;margin-left: 4.5%"
          >
            <a href="javascript:void(0)" @click="handleClick">
              <Icon type="ios-calendar-outline"></Icon>
              <template v-if="formItem.workEndTime === ''">任务开始时间</template>
              <template v-else>{{ formItem.workEndTime }}</template>
            </a>
          </DatePicker>
        </row>
        <row>
          <label style="margin-top: 1.5%">项目描述</label>
          <Input disabled :border="false" placeholder="无描述" v-if="flag1"/>
          <Input v-model="formItem.describe" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入描述"
                 v-if="flag2"/>
          <Button type="text" v-if="flag2" @click="close" style="margin-left: 78vh;margin-top: 1.5%">取消</Button>
          <Button type="primary" v-if="flag2" @click="submit" style="margin-left: 2vh;margin-top: 1.5%">保存</Button>
          <label v-if="flag1" style="margin-left: 1%" @click="openDescribe"><font color="#6495ed">编辑</font></label>
        </row>
        <Divider/>
        <row align="middle">
          <Col span="20">
            <label>项目成员</label>
          </Col>
          <Col style="margin-left: 0.5%">
            <Button icon="md-add" type="text" size="5">添加成员</Button>
          </Col>
        </row>
        <row align="middle">
          <Col span="22">
            <Input suffix="ios-search" placeholder="搜索成员(按Enter搜索)" style="width: auto"/>
          </Col>
          <Col>
            <label>共0人</label>
          </Col>
        </row>
        <row>
          <Col>
            <Table border :columns="users" :data="data1" style="width: 98vh;margin-top: 1.5%"></Table>
          </Col>
        </row>
      </Form>
    </Card>
    <Card :bordered="false" style="float: right;width: 35%;margin-left: 2%">
      <row slot="title" align="middle">
        <Col span="5">
          <p>项目状态</p>
        </Col>
        <Col style="margin-left: 55%">
          <Button type="text" size="5" icon="ios-sync" @click="updata">更新</Button>
        </Col>
      </row>
      <row>
        <Form ref="formWork" :model="formWork" inline>
          <row>
            <Col>
              <FormItem label="当前状态">
                <label>{{ formWork.state }}</label>
              </FormItem>
            </Col>
          </row>
          <row>
            <FormItem label="状态描述">
              <label>{{ formWork.describe }}</label>
            </FormItem>
          </row>
          <row>
            <FormItem label="附件">
              <label>{{ formWork.enclosure }}</label>
            </FormItem>
          </row>
        </Form>
      </row>
      <Divider/>

      <label>任务统计</label>
      <Button size="5" style="margin-left: 31vh;" @click="taskManagement">任务管理</Button>
      <row>
        <Form ref="formWorkDescribe" :model="formWorkDescribe" inline style="margin-top: 5%">
          <row>
            <Col>
              <FormItem label="任务总数">
                <label>{{ formWorkDescribe.sum }}</label>
              </FormItem>
            </Col>
            <Col style="margin-left: 2vh">
              <FormItem label="已完成">
                <label>{{ formWorkDescribe.completed }}</label>
              </FormItem>
            </Col>
            <Col style="margin-left: 2vh">
              <FormItem label="进行中">
                <label>{{ formWorkDescribe.haveInHand }}</label>
              </FormItem>
            </Col>
            <Col>
              <FormItem label="未开始" style="margin-left: 2vh">
                <label>{{ formWorkDescribe.notStarted }}</label>
              </FormItem>
            </Col>
          </row>

          <row>
            <Col>
              <FormItem label="延期任务">
                <label>{{ formWorkDescribe.deferredTask }}</label>
              </FormItem>
            </Col>
            <Col>
              <FormItem label="完成率" style="margin-left: 2vh">
                <label><font color="#7fffd4">{{ formWorkDescribe.completionRate + '%' }}</font></label>
              </FormItem>
            </Col>
            <Col>
              <FormItem label="完成率" style="margin-left: 2vh">
                <label><font color="red">{{ formWorkDescribe.delayRate + '%' }}</font></label>
              </FormItem>
            </Col>
          </row>
        </Form>
      </row>
    </Card>

    <!--    更新状态的model-->
    <modal v-model="modal" title="状态更新" :styles="{top: '20px'}">
      <Col>
        <row>
          <label>项目状态</label>
        </row>
        <row>
          <Select v-model="formWork.state" filterable style="width: 100%">
            <Option v-for="item in states" :value="item.label" :key="item.value">{{ item.label }}</Option>
          </Select>
        </row>
      </Col>
      <Col style="margin-top: 3vh">
        <row>
          <label>描述</label>
        </row>
        <row>
          <quill-editor
              v-model="formWork.content"
              ref="myQuillEditor"
              :options="editorOption"
              @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
              @change="onEditorChange($event)">
          </quill-editor>
        </row>
      </Col>

      <Col style="margin-top: 15vh">
        <row>
          <label>附件</label>
        </row>
        <row>
          <Upload action="//jsonplaceholder.typicode.com/posts/" v-model="formWork.enclosure">
            <Button icon="ios-cloud-upload-outline" size="5">上传附件</Button>
          </Upload>
        </row>
      </Col>
    </modal>

    <!--    任务管理-->
    <modal v-model="modal2" title="全部任务" :styles="{top: '20px',width:'110vh'}">
      <row>
        <Col span="10">
          <Input suffix="ios-search" placeholder="搜索成员(按Enter搜索)" style="width: auto"/>
        </Col>
        <Col style="margin-left: 44.5vh">
          <Button type="primary" icon="ios-add" @click="add">新建任务</Button>
          <work-add v-if="flag3" ref="workAdd"></work-add>
        </Col>
      </row>
      <row>
        <Table border :columns="work" :data="data2" style="width: 100%;margin-top: 1.5%"></Table>
      </row>

    </modal>
  </div>
</template>

<script>
import workAdd from "@/components/workAdd";

export default {
  name: "projectView",
  components: {workAdd},
  data() {
    return {
      formItem: {
        workName: '任务1',
        workUser: '',
        workStartTime: '',
        workEndTime: '',
        describe: ''
      },
      formWork: {
        state: '正常',
        describe: '1111',
        enclosure: '无附件'
      },
      editorOption: {},
      formWorkDescribe: {
        sum: '0',
        completed: '0',
        haveInHand: '0',
        notStarted: '0',
        deferredTask: '0',
        completionRate: '0',
        delayRate: '0'
      },
      flag1: true,
      flag2: false,
      flag3: false,
      modal: false,
      modal2: false,
      open: false,
      open2: false,
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
      users: [
        {
          title: '成员',
          key: 'name'
        },
        {
          title: '角色',
          key: 'class'
        },
        {
          title: '操作',
          key: 'operation',
          render: (h) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                }
              }, '设置'),
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                }
              }, '删除')
            ]);
          }
        }
      ],
      data1: [
        {
          name: '磊儿子',
          class: '管理员;负责人'
        }
      ],
      states: [
        {
          value: '1',
          label: '正常'
        },
        {
          value: '2',
          label: '有风险'
        },
        {
          value: '3',
          label: '失控'
        },
      ],
      work: [
        {
          title: '状态',
          key: 'state'
        },
        {
          title: '标题',
          key: 'titles'
        },
        {
          title: '负责人',
          key: 'user'
        },
        {
          title: '优先级',
          key: 'priority'
        },
        {
          title: '开始时间',
          key: 'startTime'
        },
        {
          title: '截止时间',
          key: 'endTime'
        },
      ],
      data2: [
        {
          state:'未开始',
          titles:'任务1',
          user:'磊儿子',
          priority:'最高',
          startTime:'2021-12-30',
          endTime:'2022-12-30',
        }
      ]
    }
  },
  methods: {
    openDescribe() {
      this.flag1 = false;
      this.flag2 = true;
    },
    handleClick(type) {
      if (type === 0) {
        this.open = !this.open;
      } else {
        this.open2 = !this.open2;

      }
    },
    handleChangeStart(date) {
      this.formItem.workStartTime = date;
    },
    handleChangeEnd(data) {
      this.formItem.workEndTime = data;
    },
    handleClear(type) {
      if (type === 0) {
        this.open = false;
      } else {
        this.open2 = false;
      }
    },
    handleOk(type) {
      if (type === 0) {
        this.open = false;
      } else {
        this.open2 = false;
      }
    },
    close() {
      this.flag2 = false;
      this.flag1 = true;
    },
    submit() {
      window.alert('提交成功');
      this.flag2 = false;
      this.flag1 = true;
    },
    closeThisVue() {
      this.$router.push('allProjects');
    },
    updata() {
      this.modal = true
    },
    onEditorBlur() {//失去焦点事件
    },
    onEditorFocus() {//获得焦点事件
    },
    onEditorChange() {//内容改变事件
    },
    taskManagement() {
      this.modal2 = true
    },
    add() {
      this.flag3= true;
      this.$nextTick(() => {
        this.$refs.workAdd.init();
      });
    }
  }
}
</script>

<style scoped>
.outer-class .ivu-tabs-nav-wrap {
  text-align: center;
}

.outer-class .ivu-tabs-nav-scroll {
  display: inline-block;
}
</style>