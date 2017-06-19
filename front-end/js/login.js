/**
 * Created by terencehyz on 2017/6/2.
 */
var serverIp="http://119.29.152.53/php/";
var vm = new Vue({
    el:"#app",
    data:{
        userInfo:{
            id:"",
            pwd:""
        },
        loginMessage:""
    },
    filters:{

    },
    mounted: function () {

    },
    watch:{
        userInfo:function () {
            this.loginMessage="";
        }
    },
    methods:{
        login: function () {
            var _this = this;
            var url = serverIp+"login.php";
            var data = {
                Email: _this.userInfo.id,
                Password: _this.userInfo.pwd
            };
            this.$http.post(url, data, {emulateJSON:true}).then(function (res) {
                /* res.body是取到的真正PHP返回的内容 */
                if(res.body.response==1){
                    _this.loginMessage="";
                    localStorage.setItem("lLoginStatus",true);
                    localStorage.setItem("lEmail",_this.userInfo.id);
                    window.location="homepage.html";
                }
                else{
                    _this.loginMessage="用户名或密码错误！请重试";
                }
            });
        }
    }
});