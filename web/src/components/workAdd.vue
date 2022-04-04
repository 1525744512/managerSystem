<template>
  <modal v-model="modal"
         title="创建任务" width="50" @on-ok="ok"  @on-cancel="cancel">
        <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="0">
          <label>标题</label>
          <Input v-model="formItem.taskName" placeholder="请输入标题" style="width: 100%;margin-top: 0.5%;margin-bottom: 1.5%"/>
          <row>
            <Col span="12">
              <label>选择项目</label>
            </Col>
            <Col span="12">
              <label style="margin-left: 5%">截至时间</label>
            </Col>
          </row>
          <row style="margin-bottom: 1.5%;margin-top: 0.5%;">
            <Col span="12" >
              <Select v-if="!flag" v-model="formItem.projectID" clearable style="width: 95%">
                <Option v-for="item in project" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <Select v-if="flag" disabled v-model="formItem.projectID" clearable style="width: 95%">
                <Option v-for="item in project" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
            <Col span="12">
              <DatePicker v-model="formItem.taskEndTime"  type="date" placeholder="任务截至时间" style="width: 95%;margin-left: 5%"></DatePicker>
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
              <Select v-model="formItem.taskLeader" filterable clearable style="width: 95%">
                <Option v-for="item in users" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
            <Col span="12">
              <Select v-model="formItem.userID" multiple filterable :max-tag-count="2"
                      :max-tag-placeholder="maxTagPlaceholder"
                      style="width: 95%;margin-left: 5%">
                <Option v-for="item in users" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
          </row>
          <row>
            <label>优先级</label>
          </row>
          <row>
            <Select v-model="formItem.taskPriority" clearable filterable style="width: 47.5%">
              <Option v-for="item in Priority" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </row>
          <row>
            <label style="margin-top: 1%">描述</label>
          </row>
          <row>
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
        </Form>
    <div slot="footer">
      <Button type="text" @click="cancel">取消</Button>
      <Button type="primary" @click="ok">确定</Button>
    </div>
  </modal>
</template>

<script>
import {validationMixin} from 'vuelidate'
import {getData} from "@/mixins/getData";
import Utils from "@/assets/util";

export default {
  name: "workAdd",
  mixins: [validationMixin,getData],
  data() {
    return {
      formItem:{
        taskCreator:'',
        taskName: '',
        projectID: '',
        userCompanyID:'',
        taskEndTime:'',
        taskLeader:'',
        userID:[],
        taskDescribe:'',
        taskPriority:'',
      },
      ruleValidate:{
        taskName: [
          { required: true, message: '任务名称不能为空', trigger: 'blur' }
        ],
        projectID: [
          { required: true, message: '必须选择所属项目', trigger: 'blur' }
        ],
      },
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
      project: [],
      users: [],
      editorOption:{},
      modal:false,
      flag:false,
    }
  },
  methods: {
    maxTagPlaceholder(num) {
      return 'more ' + num;
    },
    onEditorBlur(){//失去焦点事件
    },
    onEditorFocus(){//获得焦点事件
    },
    onEditorChange(){//内容改变事件
    },
    init(value){
        this.modal =true;
        this.formItem.projectID = value;
        if (value!==null){
          this.flag = true;
        }
    },
    ok () {
      const that = this;
      if (this.formItem.taskName!==""||this.formItem.projectID!==null) {
        // 校验成功 发起请求
        this.formItem.userCompanyID = this.$cookies.get("userCompany");
        this.formItem.taskCreator = this.$cookies.get("userID");
        this.axios.post(this.api.baseUrl + "/task/addTask",this.formItem).then((res) => {
          let code = res.data.code;
          let msg = res.data.msg;
          if (code === 200) {
            that.$Message.success(msg);
            this.modal = false;
            Utils.$emit('work','msg');
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
    },
    getCookies(){
      if (this.$cookies.get("userID")===null){
        this.$router.push("/Login")
      }
    }
  },
  created() {
    this.getCookies();
    this.project = this.getProject();
    this.users = this.getUsers();
  }
}
</script>

<style scoped>
.layout-header {
  background-color: #ffffff;
}
.ivu-form ivu-form-label-right{
  height: 70vh;
}
</style>