<template>
  <div class="home">
    <el-container>
      <el-header class="header">
        <span style="font-size:24px;color:white;">V部落博客管理平台</span>
        <div>
          <el-dropdown style="color:white">
            <span class="el-dropdown-link">
              {{nickName}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>系统消息</el-dropdown-item>
              <el-dropdown-item>我的文章</el-dropdown-item>
              <el-dropdown-item>个人主页</el-dropdown-item>
              <el-dropdown-item divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px" class="aside">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            unique-opened:true
            router
          >
          <template>
            <el-submenu v-for="(item,index) in this.$router.options.routes" :index="index+''" :key="index" v-if="!item.hidden">
              <template slot="title" >
                <i :class="item.iconCls"></i>
                <span>{{item.name}}</span>
              </template>
              <el-menu-item :index="child.path" v-for="(child,index) in item.children" :key="index">{{child.name}}</el-menu-item>
            </el-submenu>
             </template>
          </el-menu>
        </el-aside>
        <el-main class="main">

          <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-text="this.$router.currentRoute.name"></el-breadcrumb-item>
        </el-breadcrumb>
           <keep-alive>
             <router-view/>
           </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      nickName: ""
    };
  },
  mounted: function() {
    // this.$alert(
    //   "为了确保所有的小伙伴都能看到完整的数据演示，数据库只开放了查询权限和部分字段的更新权限，其他权限都不具备，完整权限的演示需要大家在自己本地部署后，换一个正常的数据库用户后即可查看，这点请大家悉知!",
    //   "友情提示",
    //   {
    //     confirmButtonText: "确定",
    //     callback: action => {}
    //   }
    // );
    var _this = this;
    this.getRequest("/currentUserName").then(resp => {
      _this.nickName = resp.data;
    });
  }
};
</script>
<style scoped>
.home {
  position: absolute;
  left: 0px;
  top: 0px;
  bottom: 0px;
  right: 0px;
  /* background: firebrick; */
  height: 100%;
}
.el-container {
  /* background-color: yellow; */
  width: 100%;
  height: 100%;
}
.header {
  background-color: #20a0ff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.aside {
  background-color: gray;
}
.main {
  /* background-color: antiquewhite; */
}
</style>
