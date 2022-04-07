<template>
  <modal v-model="modal" title="个人事务安排" width="60" :styles="{top: '10px'}" @on-ok="ok"  @on-cancel="cancel">
    <Breadcrumb>
      <BreadcrumbItem>当前任务</BreadcrumbItem>
      <BreadcrumbItem @click.native="close">返回父任务</BreadcrumbItem>
    </Breadcrumb>
      <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="0">
        <label>标题</label>
        <Input v-model="formItem.taskName" placeholder="任务名称" />
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
                  <Select v-model="formItem.userID" multiple filterable :max-tag-count="2"
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
            <TabPane label="附件" name="name3">
              <row>
                <Col span="20">
                  <Upload
                      ref="upload"
                      :before-upload="handleUpload"
                      :data="uploadData"
                      action="//81.69.201.78:8550/task/upload"
                  >
                    <Button icon="ios-cloud-upload-outline" size="small">选择文件上传</Button>
                  </Upload>
                  <div v-if="file!==null">上传文件: {{ file.name }}<Button type="text" @click="upload" :loading="loadingStatus">{{ loadingStatus ? 'Uploading' : '点击上传' }}</Button></div>
                </Col>
                <Col>
                  <Span>共{{taskFileTotal}}个附件</Span>
                </Col>
              </row>
              <Table height="300" :columns="pLife" :data="uploadList" style="margin-top: 2%" @on-row-click="download">
                <template slot-scope="{ row }" slot="taskFileName">
                  <strong>{{ row.taskFileName }}</strong>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                  <Button size="small"  style="margin-right: 5px" type="primary"  @click="download(index)">下载</Button>
                  <Button type="error" size="small" @click="removeTaskFile(index)">删除</Button>
                </template>
              </Table>
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
import {validationMixin} from "vuelidate";
import {getData} from "@/mixins/getData";
import Utils from "@/assets/util";

export default {
  name: "ChildrenWorkView",
  mixins: [validationMixin,getData],
  data() {
    return {
      formItem:{
        taskID:'',
        projectID:'',
        userCompanyID:this.$cookies.get("userCompany"),
        taskCreator:this.$cookies.get("userID"),
        taskName: '',
        taskStatus: '',
        taskLeader: '',
        taskStartTime:'',
        taskEndTime:'',
        taskPriority:'',
        userID:[],
        taskDescribe:'',
        parentTask:'',
      },
      ruleValidate:{

      },
      workState: [
        {
          value:  0,
          label:'未开始',
        },
        {
          value: 1,
          label: '已完成'
        },
        {
          value: 2,
          label: '进行中'
        },
      ],
      users: [],
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
      editorOption:{},
      modal:false,
      flag:false,
      childrenWork:'',
      data:[],
      pLife: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '文件名',
          key: 'taskFileName'
        },
        {
          title: '操作',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      uploadList: [],
      file: null,
      loadingStatus: false,
      uploadData:{'taskID':null},
      taskFileTotal:0,
    }
  },
  methods: {
    init(parentTaskID,projectID){
      this.modal =true;
      this.formItem.parentTask = parentTaskID;
      this.formItem.projectID = projectID;
    },
    clickInit(data){
      this.modal =true;
      this.formItem.taskName =  data.taskName;
      this.formItem.taskID =  data.taskID;
      this.formItem.projectID = data.projectID;
      this.formItem.taskStatus =  data.taskStatus;
      this.formItem.taskLeader =   data.taskLeader;
      this.formItem.taskStartTime = data.taskStartTime;
      this.formItem.taskEndTime = data.taskEndTime;
      this.formItem.taskPriority = data.taskPriority;
      this.formItem.userID = data.userID;
      this.formItem.taskDescribe= data.taskDescribe;
      this.getTaskFile();
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
    close() {
      this.modal = false;
    },
    ok () {
      const that = this;
      this.modal = false;
      if (this.formItem.taskName!=="") {
        // 校验成功 发起请求
        this.axios.post(this.api.baseUrl + "/task/updateTask",this.formItem).then((res) => {
          let code = res.data.code;
          let msg = res.data.msg;
          if (code === 200) {
            that.$Message.success(msg);
            Utils.$emit('demo','msg');
          } else {
            // todo 登录失败处理
            that.$Message.error(msg);
          }
        }).catch(function() {
          //todo 接口访问异常处理
          that.$Message.error("新建子任务接口访问失败!");
        });
      } else {
        that.$Message.error("请输入任务名称或者选择项目!");
      }
    },
    cancel () {
      this.modal = false;
    },
    handleUpload (file) {
      this.file = file;
      this.uploadData = {'taskID': 1} //修改参数位置
      return false;
    },
    upload () {
      this.loadingStatus = true;
      this.$set(this.$refs.upload.data, 'taskID', this.formItem.taskID);
      this.$refs.upload.post(this.file);
      setTimeout(() => {
        this.file = null;
        this.loadingStatus = false;
        this.$Message.success('Success')
        this.getTaskFile();
      }, 1500);
    },
    download(index){
      window.open(this.api.baseUrl+ "/task/download/" + this.uploadList[index].taskFilePathName, '_blank')
    },
    getTaskFile(){
      this.axios.get(this.api.baseUrl + "/task/getTaskFileName/"+ this.formItem.taskID).then((res) => {
        let code = res.data.code;
        this.uploadList = [];
        if (code === 200) {
          for (let i = 0; i < res.data.data.length;i++){
            this.uploadList.push({
              taskFileID: JSON.parse(JSON.stringify(res.data.data[i].taskFileID)),
              taskID: JSON.parse(JSON.stringify(res.data.data[i].taskID)),
              taskFileUrl: JSON.parse(JSON.stringify(res.data.data[i].taskFileUrl)),
              taskFilePathName: JSON.parse(JSON.stringify(res.data.data[i].taskFilePathName)),
              taskFileName: JSON.parse(JSON.stringify(res.data.data[i].taskFileName)),
            })
          }
          this.taskFileTotal =  res.data.data.length;
        }
      });
    },
    removeTaskFile(index){
      this.axios.delete(this.api.baseUrl + '/task/deleteTaskFile' + '/' + this.uploadList[index].taskFileID).then((res) => {
        let msg = res.data.msg;
        let code = res.data.code;
        if (code === 200) {
          this.$Message.success(msg);
          this.uploadList.splice(index,1);
        }else {
          this.$Message.error(msg);
        }
      });
    },
    getCookies(){
      if (this.$cookies.get("userID")===null){
        this.$router.push("/Login")
      }
    }
  },
  created() {
    this.getCookies();
    this.users = this.getUsers();
  },
}
</script>

<style scoped>

</style>