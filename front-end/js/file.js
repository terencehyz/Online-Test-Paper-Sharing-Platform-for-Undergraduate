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
                    _this.FileInfo.File_ID=res.body.Info.File_ID;
                    _this.FileInfo.Filename=res.body.Info.Filename;
                    _this.FileInfo.Type=res.body.Info.Type;
                    _this.FileInfo.About=res.body.Info.About;
                    _this.FileInfo.Username=res.body.Info.Username;
                    _this.FileInfo.File_date=res.body.Info.File_date;
                    _this.FileInfo.File_URl="http://ow365.cn/?i=12737&furl=http://119.29.152.53/file/"+res.body.Info.Name2;
                    _this.FileInfo.File_link="http://119.29.152.53/file/"+res.body.Info.Name2;
                    var ele = document.getElementById('fuck');
                    ele.src=_this.FileInfo.File_URl;
                    var ele2 = document.getElementById('QRCode');
                    ele2.src="http://s.jiathis.com/qrcode.php?url=http://ow365.cn/?i=12737&furl=http://119.29.152.53/file/"+res.body.Info.Name2;
                }
                else{

                }
            })
        }
    }
});