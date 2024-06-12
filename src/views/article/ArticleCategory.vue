<script setup>
import {
  Edit,
  Delete
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import {ref} from "vue";
import {
  addCategoryService,
  categoryDeleteService,
  categoryDetailService,
  categoryEditService,
  categoryListService} from "@/api/category";

const categoryList = ref([])
const categoryReqData = ref({
  categoryName: '',
  categoryAlias: ''
})

const getAllCategoryList = async () => {
  let result = await categoryListService()
  categoryList.value = result.data
}
getAllCategoryList()

// 新增文章分类
const dialogVisible = ref(false);
const addCategoryRule = {
  categoryName: [
    {required: true, message: '请输入分类名称', trigger: 'blur' },
  ],
  categoryAlias: [
    {required: true, message: '请输入分类别名', trigger: 'blur' },
  ]
}
const addCategory = async () => {
  let result = await addCategoryService(categoryReqData.value)
  ElMessage.success(result.message ? result.message : '添加成功')
  dialogVisible.value = false
  getAllCategoryList()
}



</script>
<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>文章分类</span>
        <div class="extra">
          <el-button type="primary" @click="dialogVisible=true">添加分类</el-button>
        </div>
      </div>
    </template>
    <el-table :data="categoryList" style="width: 100%">
      <el-table-column label="序号" width="100" type="index"> </el-table-column>
      <el-table-column label="分类名称" prop="categoryName"></el-table-column>
      <el-table-column label="分类别名" prop="categoryAlias"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button :icon="Edit" circle plain type="primary" ></el-button>
          <el-button :icon="Delete" circle plain type="danger"></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
  </el-card>

  <el-dialog v-model="dialogVisible" title="添加文章分类" width="30%">
    <el-form :model="categoryReqData" :rules="addCategoryRule" label-width="100px" style="padding-right: 30px">
      <el-form-item label="分类名称" prop="categoryName">
        <el-input v-model="categoryReqData.categoryName" minlength="1" maxlength="10"></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="categoryAlias">
        <el-input v-model="categoryReqData.categoryAlias" minlength="1" maxlength="15"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
        <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="addCategory"> 确认 </el-button>
        </span>
    </template>
  </el-dialog>
</template>
<style lang="scss" scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>