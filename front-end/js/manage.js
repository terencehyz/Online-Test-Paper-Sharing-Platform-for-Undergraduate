/**
 * Created by terencehyz on 2017/6/13.
 */
var serverIp="http://119.29.152.53/php/";
var vm = new Vue({
    el:'#myManage',
    data:{
        ShowState:{
            showLogin:true,
            showRegister:true,
            showUser:true,
            showDownload:false,
            showUpload:false
        },
        UserInfo:{
            Username:'',
            Email:'',
            Academy:'',
            School:''
        },
        Upload:[],
        Download:[]
    },
    mounted:function () {
        var _this=this;
        _this.getInfo();
        _this.getState();
    },
    methods:{
        logOut:function () {
            localStorage.clear();
            window.location.href="index.html";
        },
        downLoadFile:function (File_id,Name) {
            var _this = this;
            var url = serverIp + "download.php";
            var data={
                Email:localStorage.getItem("lUserEmail"),
                File_ID:File_id
            };
            _this.$http.post(url,data,{emulateJSON:true}).then(function(res){
                if(res.body.response==1){
                    fileURL="http://119.29.152.53/file/"+Name;
                    window.open(fileURL);
                }
                else{
                    alert("发生错误，请稍后重试");
                }
            });
        },
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
        },
        getInfo:function () {
            var _this=this;
            var url=serverIp+"manage.php";
            var data={
                Email:localStorage.getItem("lUserEmail")
            };
            _this.$http.post(url,data,{emulateJSON:true}).then(function (res) {
                _this.Upload=res.body.upload;
                _this.Download=res.body.download;
                if(res.body.uploadState==true){
                    _this.ShowState.showUpload=true;
                }
                if(res.body.downloadState==true){
                    _this.ShowState.showDownload=true;
                }
            })
        }
    }
});