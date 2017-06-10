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

    },
    methods:{
        register: function () {
            var _this = this;
            var url = serverIp +"register.php";
            var data = {
                School: _this.userInfo.school,
                Academy: _this.userInfo.academy,
                Email: _this.userInfo.email,
                Username: _this.userInfo.name,
                Password: _this.userInfo.pwd
            };
            this.$http.post(url,data,{emulateJSON:true}).then(function (res) {
                if(res.body.response==1){
                    //注册成功，进行跳转
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
        },
        getCode: function () {
            var _this = this;
            var url = serverIp + "sendmail.php?h_email="+_this.userInfo.email+"&callback=JSON_CALLBACK";
            this.$http.get(url,{emulateJSON:true}).then(function (res) {
                if(res.body.judge==1){
                    alert("发送成功～");
                }
                else{
                    alert("发送失败！");
                }
            })
        }
    }
});