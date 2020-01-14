<template>
  <div>
    <div class="search_box">
      <el-input placeholder="请通过标题搜索该分类下的博客..." size="mini" style="width:35%;margin-right:5px;"></el-input>
      <el-button type="primary" size="mini" icon="el-icon-search">搜索</el-button>
    </div>

    <el-table
      max-height="390"
      :data="tableData"
      style="width: 100%"
      ref="multipleTable"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="date" label="标题" width="180"></el-table-column>
      <el-table-column prop="name" label="最近编辑时间" width="180"></el-table-column>
      <el-table-column prop="address" label="作者"></el-table-column>
      <el-table-column prop="address" label="所属分类"></el-table-column>
      <el-table-column prop="address" label="操作">
        <el-button size="mini">编译</el-button>
        <el-button type="danger" size="mini">删除</el-button>
      </el-table-column>
    </el-table>
    <div class="bottom_box">    
      <el-button type="danger" disabled size="mini">批量删除</el-button>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalCount"
        :page-size="pageSize"
        @current-change="currentChange"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
    created(){
        console.log("====",this.state);
    },
  data() {
    return {
        currentPage:-1,
      totalCount: -1,
      pageSize: 2,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市路 1516 弄"
        }
      ],
      multipleSelection: []
    };
  },
  methods: {
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    currentChange(currentPage) {
      this.currentPage = currentPage;
      console.log(currentPage);
      
    }
  },
   props: ['state']
};
</script>
<style scoped>
.search_box {
  display: flex;
  justify-items: flex-start;
  align-items: center;
}

.bottom_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
</style>
