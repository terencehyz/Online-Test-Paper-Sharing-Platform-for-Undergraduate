/**
 * Created by terencehyz on 2017/6/2.
 */
var serverIp="http://119.29.152.53/php/";
var vm = new Vue({
    el:"#myRegister",
    data:{
        userInfo:{
            name:"",
            email:"",
            pwd:"",
            pwdConfirm:"",
            school:"",
            academy:""
        },
        registerMessage:"",
        confirmCode:""
    },
    filters:{

    },
    mounted: function () {

    },
    watch:{

    },
    methods:{
        register: function () {
            var _this = this;
            var url = serverIp+"login.php?Email="+_this.userInfo.id+"&Password="+_this.userInfo.pwd+"&callback=JSON_CALLBACK";
            var url = serverIp +"register.php?School="+_this.userInfo.school+"&Academy="+_this.userInfo.academy+"&Email="+_this.userInfo.email+"&Username"+_this.userInfo+"&callback=JSON_CALLBACK";
            this.$http.get(url).then(function (res) {

            })
        },
        getCode:function () {
            if(vm.userInfo.email!=""){
                //正则表达式判断邮箱是否合法
                var regInvalid=/(@.*@)|(\.\.)|(@\.)|(\.@)|(^\.)/;
                var regValid=/^.+\@(\[?)[a-zA-Z0-9\-\.]+\.([a-zA-Z]{2,3}|[0-9]{1,3})(\]?)$/;
                if(!regInvalid.test(this.userInfo.email)&&regValid.test(this.userInfo.email)){
                    var _this = this;
                    var url = serverIp + "&callback=JSON_CALLBACK";
                    this.$http.get(url).then(function (res) {
                    })
                }
                else{
                    this.userInfo.registerMessage="邮箱格式错误，请重新输入";
                }
            }
            else{
                vm.registerMessage="邮箱不能为空"
            }
        }
    }
});