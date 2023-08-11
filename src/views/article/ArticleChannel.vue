<script setup>
import { ref } from 'vue'
import { artGetChannelService, artDelChannelService } from '@/api/article'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelEdit from './components/ChannelEdit.vue'
const channelList = ref([])
const dialog = ref()

// 定义控制 loading 的变量
// 用函数控制loading 的显隐时间
const loading = ref(false)

const getChannelList = async () => {
  loading.value = true
  const res = await artGetChannelService()
  channelList.value = res.data.data
  loading.value = false
}
getChannelList()

// 点击编辑事件
const onEditChannel = (row) => {
  dialog.value.open(row)
}
// 点击删除按钮事件
const onDelChannel = async (row) => {
  await ElMessageBox.confirm('你确认熬删除该分类吗', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  // console.log(row, $index)
  await artDelChannelService(row.id)
  ElMessage.success('删除成功')
  getChannelList()
}
// 点击 打开弹窗的事件
const onAddChannel = () => {
  // dialogVisible.value = true
  dialog.value.open({})
}
// 文章分类修改成功后，立即再重新刷新数据页面
const onSuccess = () => {
  getChannelList()
}
</script>

<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button @click="onAddChannel">添加分类</el-button>
    </template>

    <el-table v-loading="loading" :data="channelList" style="width: 100%">
      <el-table-column label="序号" width="100" type="index"> </el-table-column>
      <el-table-column label="分类名称" prop="cate_name"></el-table-column>
      <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
      <el-table-column label="操作" width="150">
        <!-- row 就是 channelList 的每一项， $index 下标 -->
        <template #default="{ row, $index }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditChannel(row, $index)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDelChannel(row, $index)"
          ></el-button>
        </template>
      </el-table-column>

      <!-- 没有数据时 -->
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>

    <!-- 随便选择的位置 放置弹窗的代码 -->
    <ChannelEdit ref="dialog" @success="onSuccess"></ChannelEdit>
  </page-container>
</template>

<style lang="scss" scoped></style>
