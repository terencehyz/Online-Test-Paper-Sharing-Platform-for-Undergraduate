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
            var url = serverIp+"login.php?Email="+_this.userInfo.id+"&Password="+_this.userInfo.pwd+"&callback=JSON_CALLBACK";
            this.$http.post(url).then(function (res) {
                /* res.body是取到的真正PHP返回的内容 */
                if(res.body.response==1){
                    _this.loginMessage="";
                    localStorage.setItem("lUserInfo",res.body);
                    localStorage.setItem("lLoginStatus",true);
                    localStorage.setItem("UserName",_this.id);
                    //路由跳转到query页面
                    window.location="index.html"
                }
                else{
                    _this.loginMessage="用户名或密码错误！请重试";
                }
            });
        }
    }
});