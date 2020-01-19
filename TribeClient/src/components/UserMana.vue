<template>
  <div>
    <div>
      <el-input
        v-model="nickName"
        placeholder="请输入内容"
        style="width:35%"
        size="small"
      ></el-input>
      <el-button type="primary" icon="el-icon-search" size="small"   @click="getDate">搜索</el-button>
    </div>

    <div class="box">
      <el-card class="box-card" v-for="(item,index) in tableData" :key="index">
        <div slot="header" class="clearfix">
          <span>{{item.nickname}}</span>
          <el-button
            style="float: right; padding: 3px 0;color:#ff0509"
            type="text"
            class="el-icon-delete"
            @click="deleteUser(item.id)"
          >&nbsp;删除</el-button>
        </div>
        <div class="item text">
          <div>
            <span>用户名:</span>
            <span>{{item.username}}</span>
          </div>

          <div>
            <span>电子邮箱:</span>
            <span>{{item.email}}</span>
          </div>

          <div>
            <span>注册时间:</span>
            <span>{{item.regTime }}</span>
          </div>

          <div>
            <span>用户状态:</span>
            <el-switch v-model="item.enabled" active-text="启用" inactive-text="禁用" @change="updateEnabled(item.enabled,item.id)"></el-switch>
          </div>
          <div>
            <span>用户角色:</span>
            <el-tag
              type="success"
              size="mini"
              v-for="(tags,index) in item.roles"
              :key="index"
            >{{tags.name}}</el-tag>

            <el-popover placement="right" width="200" trigger="click" title="角色列表">
              <el-select v-model="selectRoles" multiple placeholder="请选择">
                <el-option
                  v-for="item in allRoles"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
              <el-button
                icon="el-icon-more"
                style="padding-top: 0px"
                slot="reference"
                size="mini"
                @click="showRole(item.roles)"
              ></el-button>
            </el-popover>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      allRoles: [],
      selectRoles: [],
      disabled: false,
      tableData: [],
      input: "",
      nickName: ""
    };
  },
  created() {
    this.getDate();
    this.getAllRoles();
  },
  methods: {

    deleteUser(uid){
   var _this=this;
   this.postRequest("/admin/user/delete").then(resp=>{
     if (resp.data.status=="success") {
        _this.$message({type: 'success', message: '删除成功!'});
        _this.getDate();
     }
   })
      
    },
    updateEnabled(enabled,uid){
      console.log(enabled,uid);
     var _this=this;
      this.postRequest("/admin/user/enabled",{
        enabled:enabled,
        uid:uid
      }).then(resp=>{
        if (resp.data.status=="success") {
               _this.$message({type: 'success', message: '更新成功!'});
               _this.getDate();
        }else{
             _this.$message({type: 'error', message: '更新成功!'});
        }
      })
      
    },
    getDate() {
      console.log("========");
      var _this = this;
      this.postRequest("/admin/user",{
        nickName:_this.nickName
      }).then(resp => {
        if (resp.status == 200) {
          _this.tableData = resp.data;
          // _this.enabled=res.data.enabled;
        }
      });
    },
    showRole(roles) {
      var selectRole = [];
      roles.forEach(r => {
        selectRole.push(r.name);
      });

      this.selectRoles = selectRole;
    },
    getAllRoles() {
      var _this = this;
      this.getRequest("/admin/roles").then(resp => {
        if (resp.status == 200) {
          _this.allRoles = resp.data;
          console.log(_this.allRoles);
        }
      });
    }
  }
};
</script>
<style scoped>
.box-card {
  width: 350px;
  height: 300px;
  margin-bottom: 10px;
  text-align: left;
}
.item {
  margin-top: 105px;
}

.box {
  width: 100%;
  height: 100%;
  display: flex;
  background-color: yellow;
  justify-content: space-around;
  align-content: center;
  flex-wrap: wrap;
  /* margin-top:10px; */
  padding: 20px 10px;
}

.text {
  font-size: 12px;
  color: blue;
}
</style>
