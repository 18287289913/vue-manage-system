
<template>
  <div>
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
    <el-dialog title="编辑用户" v-model="dialogVisible" width="30%" :before-close="handleClose">
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
          <el-button type="primary" @click="edit()">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      form: {
        userName: "",
        sex: "",
        age: "",
        mobile_phone: "",
        id: ""
      },
      dialogVisible: false,
      tableData: [
        {
          id: "1",
          userName: "王小虎",
          sex: "男",
          age: "30",
          mobile_phone: "1231561"
        }
      ]
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      axios({
        url: "http://localhost:3012/wjsyncservice/user/findall",
        method: "get"
      }).then(res => {
        // console.log(res);
        this.tableData = [];
        for (let i = 0; i < res.data.length; i++) {
          let obj = {};
          obj.id = res.data[i].id;
          obj.userName = res.data[i].userName;
          obj.age = res.data[i].age;
          obj.mobile_phone = res.data[i].mobile_phone;
          if (res.data[i].sex == 0) {
            obj.sex = "女";
          } else {
            obj.sex = "男";
          }
          this.tableData.push(obj);
        }
      });
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.form.userName = row.userName;
      this.form.sex = row.sex;
      this.form.age = row.age;
      this.form.mobile_phone = row.mobile_phone;
      this.form.id = row.id;
      this.dialogVisible = !this.dialogVisible;
    },
    handleDelete(index, row) {
      console.log(index, row);
      axios({
        url: "http://localhost:3012/wjsyncservice/user/delete",
        method: "post",
        params: {
          id: row.id
        }
      }).then(res => {
        console.log(res);
        this.getTableData();
        if (res.data == "success") {
          ElMessage.success("删除成功！");
        } else {
          ElMessage.error("删除失败！");
        }
      });
    },
    edit() {
      if(this.form.sex == "男") {
        this.form.sex = 1;
      } else {
        this.form.sex = 0;
      }
      axios({
        url: "http://localhost:3012/wjsyncservice/user/update",
        method: "post",
        params: {
          id: this.form.id,
          userName: this.form.userName,
          sex: this.form.sex,
          age: this.form.age,
          mobile_phone: this.form.mobile_phone,
          password: "123456"
        }
      }).then(res => {
        console.log(res)
        if (res.data == "success") {
          ElMessage.success("修改成功！");
          this.getTableData();
        } else {
          ElMessage.error("修改失败！");
        }
        this.dialogVisible = !this.dialogVisible;
      })
    }
  }
};
</script>

<style>
.el-table {
  margin: 10px auto;
}
</style>
