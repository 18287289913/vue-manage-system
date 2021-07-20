
<template>
  <div>
    <el-button type="primary" @click="add()">添加</el-button>
    <el-table :data="tableData">
      <el-table-column prop="id" label="ID" width="100"></el-table-column>
      <el-table-column prop="userName" label="姓名"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="mobile_phone" label="电话"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <addDialog ref="add"></addDialog>
  </div>
</template>

<script>
import axios from "axios";
import { ElMessage } from "element-plus";
import addDialog from "./dialog.vue"
import api from "../api/index"
export default {
  components: {
    addDialog
  },
  data() {
    return {
      form: {
        userName: "",
        sex: "",
        age: "",
        mobile_phone: "",
        id: ""
      },
      tableData: []
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      api.getUserList().then(res => {
        let data = res.data.data;
        this.tableData = [];
        for (let i = 0; i < data.length; i++) {
          let obj = {};
          obj.id = data[i].id;
          obj.userName = data[i].userName;
          obj.age = data[i].age;
          obj.mobile_phone = data[i].mobile_phone;
          data[i].sex == 0? obj.sex = "女":obj.sex = "男";
          this.tableData.push(obj);
        }
      }).catch(err => console.log(err))
    },
    handleEdit(index, row) {
      let dialogForm = this.$refs.add.form;
      dialogForm.userName = row.userName;
      dialogForm.sex = row.sex;
      dialogForm.age = row.age;
      dialogForm.mobile_phone = row.mobile_phone;
      dialogForm.id = row.id;
      this.$refs.add.title = "编辑用户";
      this.$refs.add.dialogVisible = !this.$refs.add.dialogVisible;
    },
    handleDelete(index, row) {
      let params = {
        id: row.id
      }
      api.deleteUser(params).then(res => {
        this.getTableData();
        if (res.data.msg == "success") {
          ElMessage.success("删除成功！");
        } else {
          ElMessage.error("删除失败！");
        }
      })
    },
    add() {
      this.$refs.add.title = "添加用户";
      this.$refs.add.form = {};
      this.$refs.add.dialogVisible = !this.$refs.add.dialogVisible;
    }
  }
};
</script>

<style>
.el-table {
  margin: 10px auto;
}
</style>
