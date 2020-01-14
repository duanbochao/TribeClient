<template>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="margin-top:10px">
    <el-tab-pane label="全部文章" name="first">
      <blog_table state="-1"></blog_table>
    </el-tab-pane>
    <el-tab-pane label="已发表" name="second">
      <blog_table state="0"></blog_table>
    </el-tab-pane>
    <el-tab-pane label="草稿箱" name="third">
      <blog_table state="1"></blog_table>
    </el-tab-pane>
    <el-tab-pane label="回收站" name="fourth">
      <blog_table state="2"></blog_table>
    </el-tab-pane>
    <el-tab-pane label="博客管理" name="severn" v-if="isAdmin">
      <blog_table state="-2"></blog_table>
    </el-tab-pane>
    <el-tab-pane label="博客配置" name="six">博客配置</el-tab-pane>
  </el-tabs>
</template>
<script>
import BlogTable from "./BlogTable";

export default {
  mounted: function() {
    var _this = this;
    this.getRequest("/isAdmin").then(resp => {
      if (resp.status == 200) {
        _this.isAdmin = resp.data;
      }
    });
  },
  data() {
    return {
      isAdmin: false,
      activeName: "second"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  components: {
    blog_table: BlogTable
  }
};
</script>
<style scoped>
</style>
