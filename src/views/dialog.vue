<template>
  <el-dialog :title="title" v-model="dialogVisible" width="30%" :before-close="handleClose">
      <div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="姓名">
            <el-input v-model="form.userName"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="form.age"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="form.mobile_phone"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio v-model="form.sex" label="男">男</el-radio>
            <el-radio v-model="form.sex" label="女">女</el-radio>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleevent()">确 定</el-button>
        </span>
      </template>
    </el-dialog>
</template>

<script>
import axios from "axios";
import { ElMessage } from "element-plus";
import api from "../api/index"
export default {
  data() {
    return {
      title: "",
      form: {
        userName: "",
        sex: "",
        age: "",
        mobile_phone: "",
        id: ""
      },
      dialogVisible: false,
    }
  },
  methods: {
    handleevent() {
      if (this.title == "添加用户") {
        this.addUser();
      } else if (this.title == "编辑用户") {
        this.update();
      }
    },
    update() {
      let params = {
          id: this.form.id,
          userName: this.form.userName,
          sex: this.form.sex == "男"?1:0,
          age: this.form.age,
          mobile_phone: this.form.mobile_phone,
          password: "123456"
        }
      api.updateUser(params).then(res => {
        if (res.data.msg == "success") {
          this.dialogVisible = !this.dialogVisible;
          ElMessage.success("修改成功！");
          this.$parent.getTableData();
        } else if (res.data.ret == 101) {
          ElMessage.error("信息未完善，请重试！");
        } else {
          ElMessage.error("修改失败！请重试");
        }
      })
    },
    addUser() {
      let params = {
          userName: this.form.userName,
          sex: this.form.sex == "男"?1:0,
          age: this.form.age,
          mobile_phone: this.form.mobile_phone,
          password: "123456"
        }

      api.addUser(params).then(res => {
        if (res.data.msg == "success") {
          this.dialogVisible = !this.dialogVisible;
          ElMessage.success("添加成功！");
          this.$parent.getTableData();
        } else if (res.data.ret == 101) {
          ElMessage.error("信息未完善，请重试！");
        } else {
          ElMessage.error("添加失败！请重试");
        }
      })
    }
  }
}
</script>