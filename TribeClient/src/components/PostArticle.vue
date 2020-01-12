<template>
  <div class="post_article">
    <el-container>
      <el-header class="post_article_header">
        <el-select
          v-model="article.cid"
          placeholder="请选择文章栏目"
          style="margin-left:3px; width:160px;margin-right:10px"
        >
          <el-option
            v-for="item in categorys"
            :key="item.value"
            :label="item.cateName"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-input
          style="width:30%;margin-right:5px;"
          placeholder="请输入标题..."
          v-model="article.title"
        ></el-input>
        <el-tag
          :key="tag"
          v-for="tag in this.article.dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
          style="margin-left: 10px"
        >{{tag}}</el-tag>
        <el-input
          class="input-new-tag"
          v-if="tagInputVisible"
          v-model="tagValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        ></el-input>
        <el-button v-else class="button-new-tag" type="primary" size="small" @click="showInput">+Tag</el-button>
      </el-header>
      <el-main class="post_article_main">
        <mavon-editor style="height:400px" ref="md" v-model="article.mdContent"/>
        <div class="post_article_bottom">
          <el-button>保存到草稿箱</el-button>
          <el-button type="primary" @click="saveBlog(1)">发表文章</el-button>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { isNotNullORBlank } from "../utils/utils";
export default {
  data() {
    return {
      article: {
        id: -1,
        dynamicTags: ["java", "c", "c++"],
        title: "",
        mdContent: "",
        cid: ""
      },
      tagInputVisible: false,
      tagValue: "",

      categorys: [],
      value: ""
    };
  },
  created() {
    this.getcategorys();
  },
  methods: {
    imgAdd(pos, $file) {
      var _this = this;
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("image", $file);
      this.uploadFileRequest("/article/uploadimg").then(resp => {
        var json = resp.data;
        if (json.status == "success") {
          //            _this.$refs.md.$imgUpdateByUrl(pos, json.msg)
          _this.$refs.md.$imglst2Url([[pos, json.msg]]);
        } else {
          _this.$message({ type: json.status, message: json.msg });
        }
      });
    },
    imgDel(pos) {},
    saveBlog(state) {
      if (
        !isNotNullORBlank(
          this.article.title,
          this.article.mdContent,
          this.article.cid
        )
      ) {
        this.$message({ type: "error", message: "数据不能为空!" });
        return;
      }

      var _this = this;
      this.postRequest("/article/", {
        id: _this.article.id,
        dynamicTags: _this.article.dynamicTags,
        mdContent: _this.article.mdContent,
        title: _this.article.title,
        htmlContent: _this.$refs.md.d_render,
        cid:_this.article.cid,
        state:state
      }).then(resp => {});
    },
    handleInputConfirm() {
      let tagValue = this.tagValue;
      if (tagValue) {
        this.article.dynamicTags.push(tagValue);
      }
      this.tagInputVisible = false;
      this.tagValue = "";
    },
    handleClose(tag) {
      this.article.dynamicTags.splice(this.article.dynamicTags.indexOf(tag), 1);
    },
    showInput() {
      this.tagInputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    getcategorys() {
      var _this = this;
      this.getRequest("/admin/category/all").then(resp => {
        _this.categorys = resp.data;
      });
    }
  }
};
</script>
<style scoped>
.post_article {
  background-color: #ececec;
  width: 100%;
  height: 92%;
  margin-top: 10px;
}

.post_article_header {
  background-color: #ececec;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 5px;
}

.post_article_main {
  background-color: #ececec;
  padding: 0 5px;
}

.post_article_bottom {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
