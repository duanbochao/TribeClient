<template>
  <div class="login">
    <div class="content">
      <el-form>
        <h3>系统登录</h3>
        <el-form-item>
          <el-input v-model="formTable.username"></el-input>
        </el-form-item>

        <el-form-item>
          <el-input v-model="formTable.password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-checkbox v-model="checked">记住密码</el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checked: true,
      formTable:{
        username:'admin',
        password:'123'
      }
    };
  },
  methods:{
    
    login(){
         var _this=this;
        this.postRequest('/login',{
          username:this.formTable.username,
          password:this.formTable.password
        }).then(resp=>{
         
          if (resp.status==200) {
            var json=resp.data;
            if (json.status=='success') {
              _this.$router.replace({path:'/home'})
            }else {
              _this.$alert('登录失败!', '失败!');
            }
          }else{
            this.$alert('登录失败!', '失败!');
          }
        },resp=> {
          console.log("========");
          
          _this.$alert('找不到服务器⊙﹏⊙∥!', '失败!');
        })
    }
  }

};
</script>
<style scoped>
.login{
  width: 100%;
  height: 100px;
}
.content {
  width: 360px;
  height: 300px;
  /* background-color: yellow; */
  border: 1px solid #bbbbf4;
  margin: 130px auto;
  padding: 20px 40px;
  box-shadow: 0px 0px 50px #d4d4f0;
  border-radius: 5%;
}

.el-button--primary{
  width: 100%;
}
</style>
