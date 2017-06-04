/**
 * Created by terencehyz on 2017/6/2.
 */
var serverIp="http://47.93.31.225/project/";
var vm = new Vue({
   el:"myForget",
   data:{
       rUser:{
           email:""
       },
       rMessage:{
           getCode:""
       }
   },
   watch:{

   },
   methods:{
       getcode:function () {
           var _this = this;
           var url = serverIp+""+_this.rUser.email+"&callback=JSON_CALLBACK";
           this.$http.get(url).then(function (res) {
               if(res.body){

               }
               else{
                   _this.rMessage.getCode="账号不存在，请重新输入！";
               }
           })
       }
   }
});