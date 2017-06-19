/**
 * Created by terencehyz on 2017/6/2.
 */
var serverIp="http://119.29.152.53/php/";
var vm = new Vue({
   el:'#app2',
   data:{
       rUser:{
           email:"",
           code:"",
           pwd:"",
           pwdConfirm:""
       },
       forgetMessage:""
   },
   watch:{

   },
   methods:{
       logOut:function () {
           localStorage.clear();
           window.location.href="index.html";
       },
       resetPwd:function () {
           var _this= this;
           var url= serverIp+"password.php";
           var data={
               h_email:_this.rUser.email,
               Password:_this.rUser.pwd,
               captcha:_this.rUser.code
           };
           _this.$http.post(url,data,{emulateJSON:true}).then(function (res) {
               if(res.body.response==1){
                   alert("修改成功！2秒后跳转到登录页面");
                   window.location="index.html"
               }
               else{
                   _this.forgetMessage="出现错误，请重新尝试";
               }
           });
       },
       getCode: function () {
           var _this = this;
           var url = serverIp + "sendmail.php?h_email="+_this.rUser.email+"&callback=JSON_CALLBACK";
           var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
           if(reg.test(_this.rUser.email)){
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
               _this.forgetMessage="邮箱格式错误，请重新输入！";
               _this.rUSer.Email="";
           }
       }
   }
});