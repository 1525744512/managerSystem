<template>
  <div style="background:#eee;padding: 20px;height: 100%">
    <Card :bordered="false" style="float: left;width: 63%">
      <row slot="title" align="middle">
        <Col span="8">
          <Breadcrumb separator=">">
            <BreadcrumbItem @click.native="closeThisVue"><Icon type="ios-home-outline"></Icon> 返回</BreadcrumbItem>
            <BreadcrumbItem><Icon type="logo-buffer"></Icon>{{ formItem.projectName }}</BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </row>
      <Form v-if="!show" disabled  :ref="formItem" v-model="formItem">
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
          <Select v-model="formItem.projectLeader" filterable style="width: 24.6%;">
            <Option v-for="item in workUsers" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <DatePicker
              v-model="formItem.projectStartTime"
              :open="open"
              :value="formItem.projectStartTime"
              confirm
              type="date"
              @on-change="handleChangeStart"
              @on-clear="handleClear(0)"
              @on-ok="handleOk(0)"
              style="width: 24.6%;margin-left: 4.5%"
          >
            <a href="javascript:void(0)" @click="handleClick(0)">
              <Icon type="ios-calendar-outline"></Icon>
              <template v-if="formItem.projectStartTime === ''">任务开始时间</template>
              <template v-else>{{ formItem.projectStartTime }}</template>
            </a>
          </DatePicker>
          <DatePicker
              v-model="formItem.projectEndTime"
              :open="open2"
              :value="formItem.projectEndTime"
              confirm
              type="date"
              @on-change="handleChangeEnd"
              @on-clear="handleClear(1)"
              @on-ok="handleOk(1)"
              style="width: 24.6%;margin-left: 4.5%"
          >
            <a href="javascript:void(0)" @click="handleClick">
              <Icon type="ios-calendar-outline"></Icon>
              <template v-if="formItem.projectEndTime === ''">任务结束时间</template>
              <template v-else>{{ formItem.projectEndTime }}</template>
            </a>
          </DatePicker>
        </row>
        <row>
          <label style="margin-top: 1.5%">项目描述</label>
          <Input disabled :border="false" placeholder="无描述" v-model="formItem.projectDescribe" v-if="flag1"/>
          <Input v-model="formItem.projectDescribe" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入描述"
                 v-if="flag2"/>
          <div style="width: 100%">
            <Button type="primary" v-if="flag2" @click="submit" style="float: right;margin-top: 1.5%">保存</Button>
            <Button type="text" v-if="flag2" @click="close" style="float: right;margin-top: 1.5%">取消</Button>

          </div>
          <label v-if="flag1" style="margin-left: 1%" @click="openDescribe"><font color="#6495ed">编辑</font></label>
        </row>
        <Divider/>
        <row align="middle">
          <Col span="20">
            <label>项目成员</label>
          </Col>
          <Col style="margin-left: 0.5%">
            <Button icon="md-add" type="text" size="small" @click="addUser">添加成员</Button>
          </Col>
        </row>
        <row align="middle">
          <Col span="22">
            <Input suffix="ios-search" placeholder="搜索成员(按Enter搜索)" style="width: auto" search v-model="searchProjectPersonal" @keyup.enter.native="search" @input="search"/>
          </Col>
          <Col>
            <label>共{{totalPerson}}人</label>
          </Col>
        </row>
        <row>
          <Col>
            <Table border v-if="show" :columns="users" height="270" :data="data3" v-model="data1" style="width: 98vh;margin-top: 1.5%">
              <template slot-scope="{ row }" slot="userName">
                <strong>{{ row.userName }}</strong>
              </template>
              <template slot-scope="{ row, index }" slot="action" >
                <Button type="error" size="small"  @click="remove(index)">删除</Button>
              </template>
            </Table>
            <Table border v-if="!show" :columns="usersShow" height="270" :data="data3" v-model="data1" style="width: 98vh;margin-top: 1.5%">
            </Table>
          </Col>
        </row>
      </Form>

      <Form v-if="show" :ref="formItem" v-model="formItem">
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
          <Select v-model="formItem.projectLeader" filterable style="width: 24.6%;">
            <Option v-for="item in workUsers" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <DatePicker
              v-model="formItem.projectStartTime"
              :open="open"
              :value="formItem.projectStartTime"
              confirm
              type="date"
              @on-change="handleChangeStart"
              @on-clear="handleClear(0)"
              @on-ok="handleOk(0)"
              style="width: 24.6%;margin-left: 4.5%"
          >
            <a href="javascript:void(0)" @click="handleClick(0)">
              <Icon type="ios-calendar-outline"></Icon>
              <template v-if="formItem.projectStartTime === ''">任务开始时间</template>
              <template v-else>{{ formItem.projectStartTime }}</template>
            </a>
          </DatePicker>
          <DatePicker
              v-model="formItem.projectEndTime"
              :open="open2"
              :value="formItem.projectEndTime"
              confirm
              type="date"
              @on-change="handleChangeEnd"
              @on-clear="handleClear(1)"
              @on-ok="handleOk(1)"
              style="width: 24.6%;margin-left: 4.5%"
          >
            <a href="javascript:void(0)" @click="handleClick">
              <Icon type="ios-calendar-outline"></Icon>
              <template v-if="formItem.projectEndTime === ''">任务结束时间</template>
              <template v-else>{{ formItem.projectEndTime }}</template>
            </a>
          </DatePicker>
        </row>
        <row>
          <label style="margin-top: 1.5%">项目描述</label>
          <Input disabled :border="false" placeholder="无描述" v-model="formItem.projectDescribe" v-if="flag1"/>
          <Input v-model="formItem.projectDescribe" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入描述"
                 v-if="flag2"/>
          <div style="width: 100%">
            <Button type="primary" v-if="flag2" @click="submit" style="float: right;margin-top: 1.5%">保存</Button>
            <Button type="text" v-if="flag2" @click="close" style="float: right;margin-top: 1.5%">取消</Button>

          </div>
          <label v-if="flag1" style="margin-left: 1%" @click="openDescribe"><font color="#6495ed">编辑</font></label>
        </row>
        <Divider/>
        <row align="middle">
          <Col span="20">
            <label>项目成员</label>
          </Col>
          <Col style="margin-left: 0.5%">
            <Button icon="md-add" type="text" size="small" @click="addUser">添加成员</Button>
          </Col>
        </row>
        <row align="middle">
          <Col span="22">
            <Input suffix="ios-search" placeholder="搜索成员(按Enter搜索)" style="width: auto" search v-model="searchProjectPersonal" @keyup.enter.native="search" @input="search"/>
          </Col>
          <Col>
            <label>共{{totalPerson}}人</label>
          </Col>
        </row>
        <row>
          <Col>
            <Table border v-if="show" :columns="users" height="270" :data="data3" v-model="data1" style="width: 98vh;margin-top: 1.5%">
              <template slot-scope="{ row }" slot="userName">
                <strong>{{ row.userName }}</strong>
              </template>
              <template slot-scope="{ row, index }" slot="action" >
                <Button type="error" size="small"  @click="remove(index)">删除</Button>
              </template>
            </Table>
            <Table border v-if="!show" :columns="usersShow" height="270" :data="data3" v-model="data1" style="width: 98vh;margin-top: 1.5%">
            </Table>
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
          <Button type="text" size="small" icon="ios-sync" @click="updata">更新</Button>
        </Col>
      </row>
      <row style="width: 100%;">
        <Form ref="formWork" :model="formWork" style="width: 100%">
          <FormItem label="当前状态:">
            <label>{{ formWork.projectStatusLabel }}</label>
          </FormItem>
          <FormItem label="附件:" style="width: 100%">
            <label style="width: 100%;margin-left: 7%">{{ formWork.projectFileName }}</label>
            <div v-if="formWork.projectFileName !== '无附件'" style="width: 100%">
              <Button type="primary" style="margin-left: 7%" @click="download" icon="ios-download-outline" shape="circle"/>
              <Button type="error" style="margin-left: 3%" @click="removeTaskFile" icon="md-trash" shape="circle"/>
            </div>
          </FormItem>
        </Form>
      </row>
      <Divider/>

      <label>任务统计</label>
      <Button size="small" style="margin-left: 31vh;" @click="taskManagement">任务管理</Button>
      <row>
        <Form ref="formWorkDescribe" :model="formWorkDescribe" inline style="margin-top: 5%">
          <row>
            <Col>
              <FormItem label="任务总数">
                <label>{{ formWorkDescribe.taskTotal }}</label>
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
                <label>{{ formWorkDescribe.delayTaskTotal }}</label>
              </FormItem>
            </Col>
            <Col>
              <FormItem label="完成率" style="margin-left: 2vh">
                <label><font color="#7fffd4">{{ formWorkDescribe.completionRate + '%' }}</font></label>
              </FormItem>
            </Col>
            <Col>
              <FormItem label="延期率" style="margin-left: 2vh">
                <label><font color="red">{{ formWorkDescribe.delayRate + '%' }}</font></label>
              </FormItem>
            </Col>
          </row>
        </Form>
      </row>
    </Card>

    <!--    更新状态的model-->
    <modal v-model="modal" title="状态更新" :styles="{top: '20px'}" @on-ok="ok"  @on-cancel="cancel">
        <row>
          <Col span="4" style="margin-top: 4%">
          <label>项目状态:</label>
          </Col>
          <Col>
            <Select v-model="projectStatus" filterable style="width: 100%;height: 40%">
              <Option v-for="item in states" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
        </row>
        <row style="margin-top: 4%">
          <Col span="4" >
            <label>附件:</label>
          </Col>
          <Col>
            <Upload
                ref="upload"
                :before-upload="handleUpload"
                :data="uploadData"
                action="http://81.69.201.78:8550/project/upload"
            >
              <Button icon="ios-cloud-upload-outline" size="small">选择文件上传</Button>
            </Upload>
            <div v-if="file!==null">上传文件: {{ file.name }}<Button type="text" @click="upload" :loading="loadingStatus">{{ loadingStatus ? 'Uploading' : '点击上传' }}</Button></div>
          </Col>
        </row>
      <div slot="footer">
        <Button type="text" @click="cancel">取消</Button>
        <Button type="primary" @click="ok">确定</Button>
      </div>
    </modal>

    <!--    任务管理-->
    <modal v-model="modal2" title="全部任务" :styles="{top: '20px',width:'55%'}">
      <row>
        <Col span="20">
          <Input suffix="ios-search" v-model="searchTaskInput" placeholder="搜索成员(按Enter搜索)" style="width: auto" @keyup.enter.native="searchTask" @input="searchTask"/>
        </Col>
        <Col style="margin-left: 1.8%">
          <Button type="primary" icon="ios-add" @click="add">新建任务</Button>
          <work-add v-if="flag3" ref="workAdd"></work-add>
        </Col>
      </row>
      <row>
        <Table border :columns="work" height="300" v-model="data2" :data="data4" style="width: 100%;margin-top: 1.5%" @on-row-click="openWork"></Table>
        <work-view v-if="flag4" ref="workView"></work-view>
      </row>
    </modal>

    <!--    添加成员-->
    <modal v-model="modal3" title="添加成员" @on-ok="addOk"  @on-cancel="addCancel">
      <Select v-model="addUserID" multiple filterable :max-tag-count="2"
              :max-tag-placeholder="maxTagPlaceholder" style="width: 95%">
        <Option v-for="item in workUsers" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <div slot="footer">
        <Button type="text" @click="addCancel">取消</Button>
        <Button type="primary" @click="addOk">确定</Button>
      </div>
    </modal>
  </div>
</template>

<script>
import workAdd from "@/components/workAdd";
import workView from "@/components/workView";
import {validationMixin} from "vuelidate";
import {getData} from "@/mixins/getData";
import {parseDate} from "view-design/src/components/date-picker/util";
import Utils from "@/assets/util";

export default {
  name: "projectView",
  components: {workAdd,workView},
  mixins: [validationMixin,getData],
  data() {
    return {
      formItem: {
        projectID:this.$route.params.projectID,
        projectName: '',
        projectLeader: null,
        projectStartTime: '',
        projectEndTime: '',
        projectDescribe: '',
        projectCreator:'',
      },
      formWork: {
        projectStatusLabel: '正常',
        projectFileID:'',
        projectID:'',
        projectFileUrl:'',
        projectFileName: '无附件',
        projectFilePathName:'',
      },
      projectStatus:1,
      editorOption: {},
      formWorkDescribe: {
        taskTotal: '',
        completed: '',
        haveInHand: '',
        notStarted: '',
        delayTaskTotal: '',
        completionRate: '',
        delayRate: ''
      },
      addUserID:[],
      flag1: true,
      flag2: false,
      flag3: false,
      flag4:false,
      modal: false,
      modal2: false,
      modal3:false,
      open: false,
      open2: false,
      workUsers: [],
      usersShow:[
        {
          title: '成员',
          key: 'userName'
        },
      ],
      users: [
        {
          title: '成员',
          key: 'userName'
        },
        {
          title: '操作',
          slot: 'action',
          width: 200,
          align: 'center',
        }
      ],
      data1: [],
      states: [
        {
          value:  1,
          label: '正常'
        },
        {
          value:  2,
          label: '有风险'
        },
        {
          value:  3,
          label: '失控'
        },
      ],
      work: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '状态',
          key: 'taskStatus'
        },
        {
          title: '标题',
          key: 'taskName'
        },
        {
          title: '负责人',
          key: 'taskLeader'
        },
        {
          title: '优先级',
          key: 'taskPriority'
        },
        {
          title: '开始时间',
          key: 'taskStartTime'
        },
        {
          title: '截止时间',
          key: 'taskEndTime'
        },
      ],
      data2: [],
      data3: [],
      data4:[],
      totalPerson:0,
      searchProjectPersonal:null,
      file: null,
      loadingStatus: false,
      uploadData:{'projectID':null},
      show:false,
      searchTaskInput:null,
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
      this.formItem.projectStartTime = date;
    },
    handleChangeEnd(data) {
      this.formItem.projectEndTime = data;
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
      this.flag2 = false;
      this.flag1 = true;
        // 校验成功 发起请求
      this.axios.post(this.api.baseUrl + "/project/updateProjectDescribe/"+this.formItem.projectID+"/" + this.formItem.projectDescribe);
    },
    closeThisVue() {
      this.$router.push('allProjects');
    },
    maxTagPlaceholder(num) {
      return 'more ' + num;
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
      this.modal2 = true;
      this.data2 = this.getProjectTask();
      this.data4 = this.getProjectTask();
    },
    getProjectTask(){
      let data = [];
      this.axios.get(this.api.baseUrl + "/project/getProjectTask/"+ this.formItem.projectID).then((res) => {
        let code = res.data.code;
        if (code === 200) {
          for (let i = 0; i < res.data.data.length;i++){
            data.push({
              taskName: JSON.parse(JSON.stringify(res.data.data[i].taskName)),
              taskID: JSON.parse(JSON.stringify(res.data.data[i].taskID)),
              taskStartTime: JSON.parse(JSON.stringify(res.data.data[i].taskStartTime)),
              taskEndTime: JSON.parse(JSON.stringify(res.data.data[i].taskEndTime)),
              taskLeader: JSON.parse(JSON.stringify(res.data.data[i].taskLeader)),
              taskDescribe: JSON.parse(JSON.stringify(res.data.data[i].taskDescribe)),
              taskStatus: JSON.parse(JSON.stringify(res.data.data[i].taskStatus)),
              taskCreateTime: JSON.parse(JSON.stringify(res.data.data[i].taskCreateTime)),
              taskCompleteTime: JSON.parse(JSON.stringify(res.data.data[i].taskCompleteTime)),
              taskPriority: JSON.parse(JSON.stringify(res.data.data[i].taskPriority)),
              taskCreator: JSON.parse(JSON.stringify(res.data.data[i].taskCreator)),
            })
            for (let j=0;j<this.workUsers.length;j++){
              if (this.workUsers[j].value===parseInt(data[i].taskLeader)) {
                data[i].taskLeader = this.workUsers[j].label;
              }
            }
            if (data[i].taskStatus===0){
              data[i].taskStatus="未开始"
            }else if (data[i].taskStatus===1){
              data[i].taskStatus="已完成"
            }else if (data[i].taskStatus===2) {
              data[i].taskStatus="进行中"
            }else {
              data[i].taskStatus="未开始"
            }
            if (data[i].taskPriority==="0"){
              data[i].taskPriority="最低"
            }else if (data[i].taskPriority==="1"){
              data[i].taskPriority="较低"
            }else if (data[i].taskPriority==="2"){
              data[i].taskPriority="普通"
            }else if (data[i].taskPriority==="3"){
              data[i].taskPriority="较高"
            }else if (data[i].taskPriority==="4"){
              data[i].taskPriority="最高"
            }else {
              data[i].taskPriority=null
            }
          }
        }
      });
      return data;
    },
    add() {
      this.flag3= true;
      this.$nextTick(() => {
        this.$refs.workAdd.init(this.formItem.projectID);
      });
    },
    getProjectAll(){
      this.axios.get(this.api.baseUrl + "/project/getProjectID/"+ this.formItem.projectID).then((res) => {
        let code = res.data.code;
        if (code === 200) {
          this.formItem.projectID = JSON.parse(JSON.stringify(res.data.data.projectID));
          this.formItem.projectName =   JSON.parse(JSON.stringify(res.data.data.projectName));
          this.formItem.projectCreator =   JSON.parse(JSON.stringify(res.data.data.projectCreatorID));
          if (res.data.data.projectLeader!==null){
            this.formItem.projectLeader =  parseInt(JSON.parse(JSON.stringify(res.data.data.projectLeader)));
          }
          if (this.formItem.projectLeader===parseInt(this.$cookies.get("userID"))||this.$cookies.get("userOwner") === this.$cookies.get("userID") || this.$cookies.get("userRole") === "1"){
            this.show = true;
          }
          this.formItem.projectDescribe = JSON.parse(JSON.stringify(res.data.data.projectDescribe));
          if (res.data.data.projectStartTime!==null){
            this.formItem.projectStartTime =  parseDate(JSON.parse(JSON.stringify(res.data.data.projectStartTime)));
          }
          if (res.data.data.projectEndTime!==null){
            this.formItem.projectEndTime = parseDate(JSON.parse(JSON.stringify(res.data.data.projectEndTime)),'yyyy-MM-dd');
          }
          this.formWorkDescribe.taskTotal = JSON.parse(JSON.stringify(res.data.data.taskTotal));
          this.formWorkDescribe.completed = JSON.parse(JSON.stringify(res.data.data.taskFinishTotal));
          this.formWorkDescribe.haveInHand = JSON.parse(JSON.stringify(res.data.data.taskingTotal));
          this.formWorkDescribe.notStarted = JSON.parse(JSON.stringify(res.data.data.taskNoStartTotal));
          this.formWorkDescribe.delayTaskTotal = JSON.parse(JSON.stringify(res.data.data.delayTaskTotal));
          this.formWorkDescribe.completionRate = Number(JSON.parse(JSON.stringify(res.data.data.completionRate))*100).toFixed(1);
          this.formWorkDescribe.delayRate = Number(JSON.parse(JSON.stringify(res.data.data.delayRate))*100).toFixed(1);
          if (res.data.data.projectStatus!==null){
            if ( JSON.parse(JSON.stringify(res.data.data.projectStatus)) ===1){
              this.formWork.projectStatusLabel = "正常";
            }else if ( JSON.parse(JSON.stringify(res.data.data.projectStatus))===2){
              this.formWork.projectStatusLabel = "有风险";
            }else {
              this.formWork.projectStatusLabel = "失控";
            }
          }
          this.projectStatus = JSON.parse(JSON.stringify(res.data.data.projectStatus));
          for (let i=0;i<res.data.data.projectUserVos.length;i++){
            this.data3.push({
              userName: JSON.parse(JSON.stringify(res.data.data.projectUserVos[i].userName)),
              userID: JSON.parse(JSON.stringify(res.data.data.projectUserVos[i].userID)),
            })
            this.data1.push({
              userName: JSON.parse(JSON.stringify(res.data.data.projectUserVos[i].userName)),
              userID: JSON.parse(JSON.stringify(res.data.data.projectUserVos[i].userID)),
            })
          }
          this.totalPerson = res.data.data.projectUserVos.length;
          if (res.data.data.projectfile!==null){
            this.formWork.projectFileID = JSON.parse(JSON.stringify(res.data.data.projectfile.projectFileID));
            this.formWork.projectID = JSON.parse(JSON.stringify(res.data.data.projectfile.projectID));
            this.formWork.projectFileName=JSON.parse(JSON.stringify(res.data.data.projectfile.projectFileName));
            this.formWork.projectFilePathName= JSON.parse(JSON.stringify(res.data.data.projectfile.projectFilePathName));
            this.formWork.projectFileUrl=JSON.parse(JSON.stringify(res.data.data.projectfile.projectFileUrl));
          }
        }
      })
    },
    search(){
      let _search = this.searchProjectPersonal.toString().toLowerCase();
      let newListData = []; //  用于存放搜索出来数据的新数组
      if (_search!==null) {
        this.data1.filter(item => {
          if (item.userName.toLowerCase().indexOf(_search) !== -1) {
            newListData.push(item);
          }
        })
        this.data3 = newListData;
      }else {
        this.data3 = this.data1;
      }
    },
    remove (index) {
        if (this.formItem.projectLeader!==this.data1[index].userID){
          this.axios.delete(this.api.baseUrl + '/project/deleteProjectUser' + '/' + this.data1[index].userID+'/' + this.formItem.projectID).then((res) => {
            let msg = res.data.msg;
            let code = res.data.code;
            if (code === 200) {
              this.data3.splice(index,1);
            }else {
              this.$Message.error(msg);
            }
          });
        }else {
          this.$Message.error("负责人是项目的管理人，不能移除");
        }
    },
    handleUpload (file) {
      this.file = file;
      this.uploadData = {'projectID': 1} //修改参数位置
      return false;
    },
    upload () {
      this.loadingStatus = true;
      this.$set(this.$refs.upload.data, 'projectID', this.formItem.projectID);
      this.formWork.projectFileName = this.file.name;
      this.$refs.upload.post(this.file);
      setTimeout(() => {
        this.file = null;
        this.loadingStatus = false;
        this.$Message.success('Success')
      }, 1500);
    },
    download(){
      this.axios.get(this.api.baseUrl + "/project/getProjectFileName/"+ this.formItem.projectID).then((res) => {
        let code = res.data.code;
        if (code === 200) {
          this.formWork.projectFileID = JSON.parse(JSON.stringify(res.data.data.projectFileID));
          this.formWork.projectID = JSON.parse(JSON.stringify(res.data.data.projectID));
          this.formWork.projectFileName=JSON.parse(JSON.stringify(res.data.data.projectFileName));
          this.formWork.projectFilePathName= JSON.parse(JSON.stringify(res.data.data.projectFilePathName));
          this.formWork.projectFileUrl=JSON.parse(JSON.stringify(res.data.data.projectFileUrl));
          window.open(this.api.baseUrl+ "/project/download/" + this.formWork.projectFilePathName , '_blank')
        }
      });
    },
    removeTaskFile(){
      this.axios.delete(this.api.baseUrl + '/project/deleteProjectFile' + '/' + this.formWork.projectFileID).then((res) => {
        let msg = res.data.msg;
        let code = res.data.code;
        if (code === 200) {
          this.$Message.success(msg);
          this.formWork.projectFileName = "无附件";
        }else {
          this.$Message.error(msg);
        }
      });
    },
    ok () {
      const that = this;
      if (this.formWork.projectStatus!=="") {
        // 校验成功 发起请求
        this.axios.post(this.api.baseUrl + "/project/updateProjectStatus/"+this.formItem.projectID+"/" + this.projectStatus).then((res) => {
          let code = res.data.code;
          let msg = res.data.msg;
          if (code === 200) {
            this.modal = false;
            if (this.projectStatus===1){
              this.formWork.projectStatusLabel = "正常";
            }else if (this.projectStatus===2){
              this.formWork.projectStatusLabel = "有风险";
            }else {
              this.formWork.projectStatusLabel = "失控";
            }
            this.projectStatus =  null;
          } else {
            // todo 登录失败处理
            that.$Message.error(msg);
          }
        })
      }else {
        that.$Message.error("项目状态必填");
      }
    },
    cancel () {
      this.modal = false;
    },
    openWork(data){
      this.flag4 = true;
      this.$nextTick(() => {
        this.$refs.workView.init(data.taskID);
      });
    },
    searchTask(){
      let _search = this.searchTaskInput.toString().toLowerCase();
      let newListData = []; //  用于存放搜索出来数据的新数组
      if (_search!==null) {
        this.data2.filter(item => {
          if (item.taskName.toLowerCase().indexOf(_search) !== -1) {
            newListData.push(item);
          }
        })
        this.data4 = newListData;
      }else {
        this.data4 = this.data2;
      }
    },
    getCookies(){
      if (this.$cookies.get("userID")===null){
        this.$router.push("/Login")
      }
    },
    addUser(){
      this.modal3 = true;
    },
    addOk(){
      const that = this;
      if (this.addUserID!=="") {
        this.axios.post(this.api.baseUrl + "/projectpersonnel/updateProjectStatus/"+this.formItem.projectID+"/" + this.addUserID).then((res) => {
          let code = res.data.code;
          let msg = res.data.msg;
          if (code === 200) {
            this.modal3 = false;
            this.addUserID = null;
            this.data3 = [];
            this.data1 =[];
            this.getProjectAll();
          } else {
            that.$Message.error(msg);
          }
        })
      }else {
        that.$Message.error("添加成员必填");
      }
    },
    addCancel(){
      this.modal3 = false;
      this.addUserID = null;
    }
  },
  watch: {
    formItemData: {
      deep: true,
      handler: function (newVal, oldValue) {
        if (newVal!==oldValue){
          this.axios.post(this.api.baseUrl + "/project/updateProject/",newVal)
        }
      }
    },
  },
  computed:{
    formItemData(){
      return JSON.parse(JSON.stringify(this.formItem));
    }
  },
  created() {
    this.getCookies();
    this.workUsers = this.getUsers();
    this.getProjectAll();
  },
  mounted() {
    const that = this;
    Utils.$on('work', function() {
      that.data1 = [];
      that.data4 = that.getProjectTask();
      that.getProjectAll();
    });
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