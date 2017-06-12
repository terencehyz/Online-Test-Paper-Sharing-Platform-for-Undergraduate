/**
 * Created by terencehyz on 2017/6/12.
 */
var serverIp="http://119.29.152.53/php/";
var vm = new Vue({
    el:'#mySingle',
    data:{
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
        },
        wordList:[],
        key:''
    },
    mounted:function(){
        var _this=this;
        _this.getView();
        _this.getState();
    },
    methods:{
        directToSingle:function(File_id){
            localStorage.setItem("currentGo",File_id);
            //跳转到单一页面
            window.location="file.html";
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
            _this.key=localStorage.getItem("currentKey");
        },
        getView:function () {
            var _this=this;
            var url=serverIp+"single.php";
            var data={
                Type:localStorage.getItem("currentKey")
            };
            _this.$http.post(url,data,{emulateJSON:true}).then(function (res) {
                _this.wordList=res.body.list;
            })
        }
    }
});
