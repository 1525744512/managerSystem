exports.default = exports.getData = {
    data: () => ({
        project: [],
        users: [],
        grouping: [],
    }),
    methods:{
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
        getProject(){
            let data = [];
            const that = this;
            this.axios.get(this.api.baseUrl + "/project/getProject/"+parseInt(this.$cookies.get("userCompany"))).then((res) => {
                let code = res.data.code;
                let msg = res.data.msg;
                if (code === 200) {
                    for (let i = 0; i < res.data.data.length;i++){
                        data.push({
                            value:JSON.parse(JSON.stringify(res.data.data[i].projectID)),
                            label:JSON.parse(JSON.stringify(res.data.data[i].projectName)),
                        })
                    }
                } else {
                    // todo 登录失败处理
                    that.$Message.error(msg);
                }
            }).catch(function() {
                //todo 接口访问异常处理
                that.$Message.error("项目接口访问失败!");
            });
            return data;
        },
        getDepartment(){
            let data = [];
            const that = this;
            this.axios.get(this.api.baseUrl + "/department/getDepartment/"+parseInt(this.$cookies.get("userCompany"))).then((res) => {
                let code = res.data.code;
                let msg = res.data.msg;
                if (code === 200) {
                    for (let i = 0; i < res.data.data.length;i++){
                        data.push({
                            value:JSON.parse(JSON.stringify(res.data.data[i].departmentID)),
                            label:JSON.parse(JSON.stringify(res.data.data[i].departmentName)),
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
    }
}