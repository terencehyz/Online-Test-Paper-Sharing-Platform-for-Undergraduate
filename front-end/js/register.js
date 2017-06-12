/**
 * Created by terencehyz on 2017/6/2.
 */
var serverIp="http://119.29.152.53/php/";
var vm = new Vue({
    el:"#myRegister",
    data:{
        userInfo:{
            name:"",
            email:"",
            pwd:"",
            pwdConfirm:"",
            school:"",
            academy:""
        },
        registerMessage:"",
        confirmCode:""
    },
    filters:{

    },
    mounted: function () {

    },
    watch:{
        userInfo:function(){
            this.registerMessage="";
        }
    },
    methods:{
        isNull:function (str) {
            var flag;
            if(str.length>0){
                flag = true;
            }
            else {
                flag = false;
            }
            return flag;
        },
        register: function () {
            var _this = this;
            var url = serverIp +"register.php";
            var data = {
                School: _this.userInfo.school,
                Academy: _this.userInfo.academy,
                h_email: _this.userInfo.email,
                Username: _this.userInfo.name,
                Password: _this.userInfo.pwd,
                contents: _this.confirmCode
            };

            if(_this.isNUll(_this.userInfo.school)&&_this.isNUll(_this.userInfo.academy)&&_this.isNUll(_this.userInfo.email)&&_this.isNUll(_this.userInfo.name)&&_this.isNUll(_this.userInfo.pwd)&&_this.isNUll(_this.confirmCode)){
                if(_this.userInfo.pwd==_this.userInfo.pwdConfirm){
                    //正则表达式验证邮箱正确性
                    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
                    if(reg.test(_this.userInfo.email)){
                        _this.$http.post(url,data,{emulateJSON:true}).then(function (res) {
                            if(res.body.response==1){
                                //注册成功，进行跳转
                                alert("注册成功！2秒后跳转到登录页面");
                                window.location="login.html"
                            }
                            if(res.body.response==0){
                                _this.registerMessage="系统错误，请稍后再试";
                            }
                            if(res.body.response==-1){
                                _this.registerMessage="此邮箱已注册，请更换邮箱或直接登录";
                            }
                            if(res.body.response==-2){
                                _this.registerMessage="验证码错误";
                            }
                            if(res.body.response==-3){
                                _this.registerMessage="验证码已过期";
                            }
                        })
                    }
                    else{
                        _this.registerMessage="邮箱格式错误，请重新输入！";
                        _this.UserInfo.Email="";
                    }
                }
                else{
                    _this.registerMessage="两次密码输入不同，请重新输入！";
                    _this.userInfo.pwd="";
                    _this.userInfo.pwdConfirm="";
                }
            }
            else {
                _this.registerMessage="信息还不完全，再检查一下～～～";
            }
        },
        getCode: function () {
            var _this = this;
            var url = serverIp + "sendmail.php?h_email="+_this.userInfo.email+"&callback=JSON_CALLBACK";
            var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
            if(reg.test(_this.userInfo.email)){
                _this.$http.get(url).then(function (res) {
                    if(res.body.judge==1){
                        alert("发送成功～");
                    }
                    else{
                        alert("发送失败！");
                    }
                })
            }
            else{
                _this.registerMessage="邮箱格式错误，请重新输入！";
                _this.UserInfo.Email="";
            }
        }
    }
});