/**
 * Created by terencehyz on 2017/6/12.
 */
var serverIp="http://119.29.152.53/php/";
var vm = new Vue({
    el:'#myUpload',
    data:{
        fileInfo:{
            name:"",
            type:"",
            about:""
        },
        ShowState:{
            showLogin:true,
            showRegister:true,
            showUser:true
        },
        UserInfo:{
            Username:'',
            Email:'',
            Academy:'',
            School:''
        }
    },
    mounted:function(){
        var _this=this;
        _this.getState();
    },
    methods:{
        logOut:function () {
            localStorage.clear();
            window.location.href="index.html";
        },
        getState:function () {
            var _this=this;
            _this.ShowState.showLogin=!localStorage.getItem("lLoginStatus");
            _this.ShowState.showRegister=!localStorage.getItem("lLoginStatus");
            _this.ShowState.showUser=localStorage.getItem("lLoginStatus");
            _this.UserInfo.Username=localStorage.getItem("lUserName");
            _this.UserInfo.Email=localStorage.getItem("lUserEmail");
            _this.UserInfo.Academy=localStorage.getItem("lUserAcademy");
            _this.UserInfo.School=localStorage.getItem("lUserSchool");
        }
    }
});