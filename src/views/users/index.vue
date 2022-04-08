<template>
  <el-card>
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input :placeholder="$t('table.placeholder')" clearable v-model="queryForm.query"></el-input>
      </el-col>
      <el-button type="primary" :icon="Search" @click="initGetUserList">{{ $t('table.search') }}</el-button>
      <el-button type="primary" @click="handleDialogValue()">{{ $t('table.adduser') }}</el-button>
    </el-row>

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column 
        :width="item.width"
        :prop="item.prop" 
        :label="$t(`table.${item.label}`)" 
        v-for="(item, index) in options" 
        :key="index">
        <template v-slot="{ row }" v-if="item.prop === 'mg_state'">
          <el-switch v-model="row.mg_state" @change="changeState(row)" />
        </template>
        <template v-slot="{ row }" v-else-if="item.prop === 'create_time'">
          {{ $filters.filterTimes(row.create_time) }}
        </template>
        <template #default="{ row }" v-else-if="item.prop === 'action'">
          <el-button type="primary" :icon="Edit" @click="handleDialogValue(row)"></el-button>
          <el-button type="warning" :icon="Setting" @click="handleSetting"></el-button>
          <el-button type="danger" :icon="Delete" @click="handleDelete(row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="footer">
      <el-pagination
        v-model:currentPage="queryForm.pagenum"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="queryForm.pagesize"
        layout="total, sizes, prev, pager, next"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </el-card>

  <Dialog 
    v-if="dialogVisible" 
    v-model="dialogVisible" 
    :dialogTitle="dialogTitle" 
    :dialogTableValue="dialogTableValue"
    @initUserList="initGetUserList" 
  />
</template>

<script setup>
import { Search, Edit, Setting, Delete } from '@element-plus/icons-vue'
import Dialog from './components/dialog.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'
import { getUser, changeUserState, deleteUser } from '@/api/user'
import { options } from './options'
import { useI18n } from 'vue-i18n'
import { isNull } from '@/utils/filters'
 
const i18n = useI18n()

const queryForm = ref({
  query: '',
  pagenum: 1,
  pagesize: 10
})

const total = ref(0)

const tableData = ref([])

const dialogVisible = ref(false)
const dialogTitle = ref('')
const dialogTableValue = ref({})

const initGetUserList = async () => {
  const res = await getUser(queryForm.value)
  total.value = res.total
  tableData.value = res.users
}
initGetUserList()

const handleSizeChange = (pageSize) => {
  queryForm.value.pagenum = 1
  queryForm.value.pagesize = pageSize
  initGetUserList()
}

const handleCurrentChange = (pageNum) => {
  queryForm.value.pagenum = pageNum
  initGetUserList()
}

const changeState = async (row) => {
  let { id, mg_state } = row
  await changeUserState(id, mg_state)
  ElMessage({
    message: i18n.t('message.updeteSuccess'),
    type: 'success'
  })
}

const handleDialogValue = (row) => {
  if (isNull(row)) {
    dialogTitle.value = '添加用户'
    dialogTableValue.value = {}
  } else {
    dialogTitle.value = '编辑用户'
    dialogTableValue.value = JSON.parse(JSON.stringify(row))
  }
  dialogVisible.value = true
}

const handleDelete = (row) => {
  ElMessageBox.confirm(
    i18n.t('dialog.deleteTitle'),
    '删除',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }
  )
    .then(async () => {
      await deleteUser(row.id)
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
      initGetUserList()
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '删除失败'
      })
    })
}

const handleSetting = () => {
  ElMessage({
    message: '乖乖，爱你哟！',
    type: 'success'
  })
}
</script>

<style lang="scss" scoped>
.header{
  padding-bottom: 16px;
  box-sizing: border-box;
}
.footer{
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
