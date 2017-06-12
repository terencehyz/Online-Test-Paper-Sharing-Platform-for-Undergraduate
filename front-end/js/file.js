/**
 * Created by terencehyz on 2017/6/12.
 */
var serverIp="http://119.29.152.53/php/";
var vm = new Vue({
    el:'#myFile',
    data:{
        FileInfo:{
            File_ID:'',
            Filename:'',
            Type:'',
            About:'',
            Username:'',
            File_date:'',
            File_URl:'',
            File_QR:'',
            File_link:''
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
        _this.getFileInfo();
    },
    methods:{
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
        getFileInfo:function () {
            var _this = this;
            var url = serverIp+"preview.php";
            var data ={
                File_ID:localStorage.getItem("currentGo")
            };
            _this.$http.post(url,data,{emulateJSON:true}).then(function (res) {
                if(res.body.response==1){
                    _this.FileInfoFile_ID='';
                    _this.FileInfoFilename='';
                    _this.FileInfo.Type='';
                    _this.FileInfo.About='';
                    _this.FileInfo.Username='';
                    _this.FileInfo.File_date='';
                    _this.FileInfo.File_URl='';
                    _this.FileInfo.File_QR='';
                    _this.FileInfo.File_link='';
                }
                else{

                }
            })
        }
    }
});