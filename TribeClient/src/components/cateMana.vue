<template>
  <div style="width:100%;height:100%">
    <el-container>
      <el-header>
        <el-input v-model="cateName" placeholder="请输入栏目的名称" style="width:20%;margin-right:10px"></el-input>
        <el-button type="primary" @click="addNewAritcle">新增栏目</el-button>
      </el-header>
      <el-main>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%"
          ref="multipleTable"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="编号" width="180"></el-table-column>
          <el-table-column prop="cateName" label="栏目名称" width="180"></el-table-column>
          <el-table-column prop="date" label="启用时间">
            <template slot-scope="scope">{{ scope.row.date | formatDate}}</template>
          </el-table-column>
          <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="btn">
          <el-button type="danger" disabled>批量删除</el-button>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cateName: "",
      multipleSelection: [],
      tableData: []
    };
  },
  mounted() {
    this.refresh();
  },
  methods: {
    handleEdit(index, row) {
      console.log(index);
      var _this = this;
      this.$prompt("请输入新名称", "编辑", {
        confirmButtonText: "更新",
        cancelButtonText: "取消",
        inputValue: row.cateName
      })
        .then(({ value }) => {
          if (value == null || value == "") {
            _this.$message({
              type: "info",
              message: "栏目名不能为空"
            });
            return;
          }

          //当栏目不为空的时候，更新数据
          _this
            .postRequest("/admin/category/updateCateCoryById", {
              id: row.id,
              cateName: value
            })
            .then(resp => {
              if (resp.data.status == "success") {
                _this.$message({
                  type: "success",
                  message: resp.data.msg
                });

                _this.refresh();
              }
            });
        })
        .catch(() => {
          _this.$message({
            type: "info",
            message: "取消编辑"
          });
        });
    },
    refresh() {
      var _this = this;
      this.getRequest("/admin/category/all").then(resp => {
        if (resp.status == 200) {
          console.log(resp.data);

          _this.tableData = resp.data;
        }
      });
    },
    addNewAritcle() {
        var _this=this;
      var cateNameData = this.cateName;
      if (cateNameData == "" || cateNameData == null) {
        this.$message.error("栏目名称不能为空哦!");
        return;
      }
      this.postRequest("/admin/category/", {
        cateName: cateNameData
      }).then(resp => {
        if (resp.data.status == "success") {
          this.$message({
            message: resp.data.msg,
            type: "success"
          });
          _this.refresh();
        } else {
          this.$message.error(resp.data.msg);
        }
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    }
  }
};
</script>
<style scoped>
.el-container {
  background-color: white;
  width: 100%;
  height: 100%;
  margin-top: 10px;
}

.el-container header {
  background-color: aliceblue;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 5px;
  margin-bottom: 10px;
}

.el-container main {
  background-color: aliceblue;
  padding: 10px 5px;
}

.btn {
  width: 100%;
  background-color: #fff;
  text-align: left;
  margin-top: 10px;
  background-color: aliceblue;
}
</style>

