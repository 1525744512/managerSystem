<template>
  <modal v-model="modal" title="个人任务详情" width="60" :styles="{top: '16px'}"  @on-ok="ok"  @on-cancel="cancel">
      <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="0">
        <label>标题</label>
        <Input v-model="formItem.taskName" placeholder="任务标题" />
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
            <Select v-model="formItem.taskStatus" clearable style="width: 24.6%;">
              <Option v-for="item in workState" :value="item.value" :key="item.value" placeholder="选择状态">{{ item.label }}</Option>
            </Select>
            <Select v-model="formItem.taskLeader" filterable style="width: 24.6%;margin-left: 0.5%">
              <Option v-for="item in users" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <DatePicker v-model="formItem.taskStartTime"  type="date" placeholder="任务开始时间" style="width: 24.6%;margin-left: 0.5%"></DatePicker>
            <DatePicker v-model="formItem.taskEndTime"  type="date" placeholder="任务截至时间" style="width: 24.6%;margin-left: 0.5%"></DatePicker>
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
                  <Select v-model="formItem.taskPriority" filterable style="width: 95%">
                    <Option v-for="item in Priority" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </Col>
                <Col span="12">
                  <Select v-model="formItem.userIDList" multiple filterable :max-tag-count="2"
                          :max-tag-placeholder="maxTagPlaceholder" style="width: 95%;margin-left: 5%">
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
                    v-model="formItem.taskDescribe"
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
                <Col span="21">
                  <span style="margin-left: 1%">共{{childrenTaskTotal}}个任务</span>
                </Col>
                <Col>
                  <Button type="default " size="small" icon="md-add" @click.native="add" style="float: right">新建子任务</Button>
                </Col>
<!--                <Input v-if="flag" @keydown.enter.native="addChildrenWork"></Input>-->
                <Children-Work-View v-if="flag" ref="ChildrenWorkView"></Children-Work-View>
              </row>
              <Table height="300" :columns="ChildrenTask" :data="ChildrenTaskData" style="margin-top: 2%">
                <template slot-scope="{ row }" slot="name">
                  <strong>{{ row.name }}</strong>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                  <Button type="error" size="small" @click="remove(index)">删除</Button>
                </template>
              </Table>
            </TabPane>
            <TabPane label="附件" name="name3">
              <row>
                <span>共{{0}}个附件</span>
                <Upload action="//jsonplaceholder.typicode.com/posts/">
                  <Button icon="md-add" style="height: 21px;font-size: 15px;margin-left: 412%">添加附件</Button>
                </Upload>
              </row>
              <Table height="300" :columns="plife" :data="plifes" style="margin-top: 2%"></Table>
            </TabPane>
          </Tabs>
        </row>
      </Form>
    <div slot="footer">
      <Button type="text" @click="cancel">取消</Button>
      <Button type="primary" @click="ok">确定</Button>
    </div>
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
        taskID:'',
        taskName: '',
        taskStatus: '',
        taskLeader: '',
        taskStartTime:'',
        taskEndTime:'',
        taskPriority:'',
        userIDList:[],
        taskDescribe:'',
      },
      ruleValidate:{

      },
      workState: [
        {
          value:  0,
          label:'未完成',
        },
        {
          value: 1,
          label: '已完成'
        },
      ],
      Priority: [
        {
          value:  4,
          label: '最高'
        },
        {
          value:  3,
          label: '较高'
        },
        {
          value:  2,
          label: '普通'
        },
        {
          value:  1,
          label: '较低'
        },
        {
          value:  0,
          label: '最低'
        },
      ],
      users: [],
      ChildrenTask: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '任务名称',
          slot: 'name'
        },
        {
          title: '操作',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      ChildrenTaskData: [],
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
      flag:false,
      childrenTaskTotal:'',
    }
  },
  methods: {
    init(value){
      this.modal =true;
      const that = this;
      this.axios.get(this.api.baseUrl + "/task/getTask/"+ value + "/" + this.$cookies.get("userCompany")).then((res) => {
        let code = res.data.code;
        let msg = res.data.msg;
        if (code === 200) {
          this.formItem.taskID =   JSON.parse(JSON.stringify(res.data.data.taskID));
          this.formItem.taskName =   JSON.parse(JSON.stringify(res.data.data.taskName));
          this.formItem.taskStatus =   JSON.parse(JSON.stringify(res.data.data.taskStatus));
          this.formItem.taskLeader =   JSON.parse(JSON.stringify(res.data.data.taskLeader));
          this.formItem.taskStartTime =  JSON.parse(JSON.stringify(res.data.data.taskStartTime));
          this.formItem.taskEndTime =  JSON.parse(JSON.stringify(res.data.data.taskEndTime));
          this.formItem.taskPriority = JSON.parse(JSON.stringify(res.data.data.taskPriority));
          if (res.data.data.userIDList.length!==0){
            for (let i=0;i<res.data.data.userIDList.length;i++){
              this.formItem.userIDList.push(JSON.parse(JSON.stringify(res.data.data.userIDList[i]))) ;
            }
          } else {
            this.formItem.userIDList=null;
          }
          this.formItem.taskDescribe= JSON.parse(JSON.stringify(res.data.data.taskDescribe));
        } else {
          that.$Message.error(msg);
        }
      }).catch(function() {
        //todo 接口访问异常处理
        that.$Message.error("获取当前任务信息失败!");
      });
      this.axios.get(this.api.baseUrl + "/task/getChildernTask/"+ value + "/" + this.$cookies.get("userCompany")).then((res) => {
        let code = res.data.code;
        if (code === 200) {
          for (let i = 0; i < res.data.data.length;i++){
            this.ChildrenTaskData.push({
              name: JSON.parse(JSON.stringify(res.data.data[i].taskName)),
            })
          }
          this.childrenTaskTotal =  res.data.data.length;
        }
      });
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
    getUsers(){
      let data = [];
      const that = this;
      this.axios.get(this.api.baseUrl + "/user/getCompanyUser/"+parseInt(this.$cookies.get("userCompany"))).then((res) => {
        let code = res.data.code;
        let msg = res.data.msg;
        if (code === 200) {
          for (let i = 0; i < res.data.data.length;i++){
            data.push({
              value:JSON.parse(JSON.stringify(res.data.data[i].userID)),
              label:JSON.parse(JSON.stringify(res.data.data[i].userName)),
            })
          }
        } else {
          // todo 登录失败处理
          that.$Message.error(msg);
        }
      }).catch(function() {
        //todo 接口访问异常处理
        that.$Message.error("接口访问失败!");
      });
      return data;
    },
    remove (index) {
      this.ChildrenTaskData.splice(index, 1);
    },
    ok () {
      const that = this;
      if (this.formItem.taskName!=="") {
        // 校验成功 发起请求
        this.axios.post(this.api.baseUrl + "/task/updateTask",this.formItem).then((res) => {
          let code = res.data.code;
          let msg = res.data.msg;
          if (code === 200) {
            that.$Message.success(msg);
            this.modal = false;
            this.formItem.taskName =  null;
            this.formItem.taskStatus =  null;
            this.formItem.taskLeader =   null;
            this.formItem.taskStartTime = null;
            this.formItem.taskEndTime = null;
            this.formItem.taskPriority = null;
            this.formItem.userIDList = [];
            this.formItem.taskDescribe=null;
            this.ChildrenTaskData = [];
          } else {
            // todo 登录失败处理
            that.$Message.error(msg);
          }
        }).catch(function() {
          //todo 接口访问异常处理
          that.$Message.error("新建任务接口访问失败!");
        });
      } else {
        that.$Message.error("请输入任务名称或者选择项目!");
      }
    },
    cancel () {
      this.modal = false;
      this.formItem.taskName =  null;
      this.formItem.taskStatus =  null;
      this.formItem.taskLeader =   null;
      this.formItem.taskStartTime = null;
      this.formItem.taskEndTime = null;
      this.formItem.taskPriority = null;
      this.formItem.userIDList = [];
      this.formItem.taskDescribe= null;
      this.ChildrenTaskData = [];
    },
  },
  created() {
    this.users = this.getUsers();
  }
}
</script>

<styles scoped>
.layout-header {
  background-color: #ffffff;
}
</styles>