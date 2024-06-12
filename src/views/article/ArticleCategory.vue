<script setup>
import {
  Edit,
  Delete
} from '@element-plus/icons-vue'
import {ElMessage, ElMessageBox} from 'element-plus'
import {ref} from "vue";
import {
  addCategoryService,
  categoryDeleteService,
  categoryDetailService,
  categoryEditService,
  categoryListService} from "@/api/category";

const title = ref('');
const categoryList = ref([])
const categoryReqData = ref({
  categoryName: '',
  categoryAlias: ''
})
const cleanCategoryReq = () => {
  categoryReqData.value.categoryName = ''
  categoryReqData.value.categoryAlias = ''
}
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
  await getAllCategoryList()
}

//更新文章分类
////修改分类数据回显
const updateCategoryEcho = (data) => {
  title.value = '修改文章分类'
  dialogVisible.value = true
  categoryReqData.value.id = data.id;
  categoryReqData.value.categoryName = data.categoryName
  categoryReqData.value.categoryAlias = data.categoryAlias
}

const updateCategory = async () => {
  let result = await categoryEditService(categoryReqData.value)
  ElMessage.success(result.message ? result.message : '修改成功')
  dialogVisible.value = false
  await getAllCategoryList()
}
// 删除文章分类
const deleteCategory = async (data) => {
  ElMessageBox.confirm(
      '你确认删除该分类信息吗？',
      '温馨提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(async () => {
        //用户点击了确认
        let categoryId = parseInt(data.id, 10)
        let result = await categoryDeleteService(categoryId)
        ElMessage.success(result.message?result.message:'删除成功')
        //再次调用getAllCategory，获取所有文章分类
        await getAllCategoryList()
      })
      .catch(() => {
        //用户点击了取消
        ElMessage({
          type: 'info',
          message: '取消删除',
        })
      })
}


</script>
<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>文章分类</span>
        <div class="extra">
          <el-button type="primary" @click="title = '添加分类'; dialogVisible = true; cleanCategoryReq()">添加分类</el-button>
        </div>
      </div>
    </template>
    <el-table :data="categoryList" style="width: 100%">
      <el-table-column label="序号" width="100" type="index"> </el-table-column>
      <el-table-column label="分类名称" prop="categoryName"></el-table-column>
      <el-table-column label="分类别名" prop="categoryAlias"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button :icon="Edit" circle plain type="primary" @click="updateCategoryEcho(row)"></el-button>
          <el-button :icon="Delete" circle plain type="danger" @click="deleteCategory(row)"></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
  </el-card>

  <el-dialog v-model="dialogVisible" :title="title" width="30%">
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
            <el-button type="primary" @click="title==='添加分类'?addCategory():updateCategory()"> 确认 </el-button>
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