/**
 * Created by terencehyz on 2017/6/10.
 */
var serverIp="http://119.29.152.53/php/";
var vm = new Vue({
    el:'#myIndex',
    data:{
        NewFile:[],
        Download:[],
        Upload:[],
        UserInfo:{},
        ShowState:{
            showLogin:true,
            showRegister:true,
            showUser:true
        }
    },
    mounted:function () {
        var _this=this;
        _this.getView();
    },
    watch:{

    },
    methods:{
        directToSingle:function(File_id){
            localStorage.setItem("currentGo",File_id);
            //跳转到单一页面
            window.location="";
        },
        getView:function () {
            var _this=this;
            var data={
                Email:localStorage.getItem("lEmail")
            };
            var url=serverIp+"index.php";
            //this.$http.post("./data.json",data,{emulateJSON:true}).then(function (res) {
            this.$http.post(url,data,{emulateJSON:true}).then(function (res) {
                console.log(res.body);
                _this.NewFile=res.body.newfile;
                _this.Download=res.body.download;
                _this.Upload=res.body.upload;
                _this.UserInfo=res.body.user;
                _this.ShowState.showLogin=!localStorage.getItem("lLoginStatus");
                _this.ShowState.showRegister=!localStorage.getItem("lLoginStatus");
                _this.ShowState.showUser=localStorage.getItem("lLoginStatus");
            });
        }
    }
});

