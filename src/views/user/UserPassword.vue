<script setup>
import { ref } from 'vue'
// import { ElForm, ElInput, ElButton } from 'element-plus'
import { userUpdatePassService } from '@/api/user'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'

const formRef = ref()
const router = useRouter()
const userStore = useUserStore()
const pwdForm = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})
const checkOldSame = (rule, value, cb) => {
  if (value === pwdForm.value.old_pwd) {
    cb(new Error('原密码和新密码不能一样!'))
  } else {
    cb()
  }
}
const checkNewSame = (rule, value, cb) => {
  if (value !== pwdForm.value.new_pwd) {
    cb(new Error('新密码和确认再次输入的新密码不一样!'))
  } else {
    cb()
  }
}
const formRules = {
  // 原密码
  old_pwd: [
    { required: true, message: '请输入原密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码长度必须是6-15位的非空字符串',
      trigger: 'blur'
    }
  ],
  // 新密码
  new_pwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码长度必须是6-15位的非空字符串',
      trigger: 'blur'
    },
    {
      validator: checkOldSame,
      trigger: 'blur'
    }
  ],
  // 确认新密码
  re_pwd: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码长度必须是6-15位的非空字符串',
      trigger: 'blur'
    },
    {
      validator: checkNewSame,
      trigger: 'blur'
    }
  ]
}

const handleChangePwd = async () => {
  const valid = await formRef.value.validate() // 提交密码之前先预校验
  if (valid) {
    // 若校验成功，则继续执行，提交数据到后台修改
    await userUpdatePassService(pwdForm.value)
    ElMessage({ type: 'success', message: '更换密码成功' })
    // 密码更换成功后，应让用户重新登录一下，清除后台存储的token数据
    userStore.setToken('')
    userStore.setUser({})
    router.push('/login')
  }
}
const resetForm = () => {
  // 重置表单等...
  formRef.value.resetFields()
}
</script>

<template>
  <page-container title="重置密码">
    <el-row>
      <el-col :span="12">
        <el-form :model="pwdForm" :rules="formRules" ref="formRef">
          <div>
            <el-form-item label="原密码" prop="old_pwd">
              <el-input v-model="pwdForm.old_pwd"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="新密码" prop="new_pwd">
              <el-input v-model="pwdForm.new_pwd"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="确认密码" prop="re_pwd">
              <el-input v-model="pwdForm.re_pwd"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-button type="primary" @click="handleChangePwd"
              >修改密码</el-button
            >
            <el-button @click="resetForm">重置</el-button>
          </div>
        </el-form>
      </el-col>
    </el-row>
  </page-container>
</template>
