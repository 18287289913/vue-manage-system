<template>
  <div>
    <div>会员查询</div>
    <div>
      <el-input class="input" v-model="companycode" placeholder="商家编码" clearable></el-input>
    </div>

    <el-input class="input" placeholder="手机号码" v-model="phoneNum" clearable></el-input>
    <el-input class="input" placeholder="卡号" v-model="cardNum" clearable></el-input>
    <el-button type="primary" @click="query()">查询</el-button>
    <!-- <el-table :data="tableData">
      <el-table-column label="基本信息">
      </el-table-column>
      <el-table-column prop="userName" label="性别/生日"></el-table-column>
      <el-table-column prop="sex" label="消费信息"></el-table-column>
      <el-table-column prop="age" label="账户信息"></el-table-column>
      <el-table-column prop="mobile_phone" label="售卡信息"></el-table-column>
      <el-table-column prop="i1" label="实体卡状态"></el-table-column>
      <el-table-column prop="i2" label="绑定状态"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">会员详细信息</el-button>
          <el-button size="mini" type="primary" @click="handleDelete(scope.$index, scope.row)">交易记录</el-button>
          <el-button size="mini" type="danger">解绑</el-button>
        </template>
      </el-table-column>
    </el-table>-->

    <table width="100%" class="table">
      <thead>
        <tr>
          <th>基本信息</th>
          <th>性别/生日</th>
          <th>消费信息</th>
          <th>账户信息</th>
          <th>售卡信息</th>
          <th>实体卡状态</th>
          <th>绑定状态</th>
          <th>操作</th>
        </tr>
        <tr v-for="(item, index) in list" :key="index">
          <td>
            <div>会员名称：{{item.mn}}</div>
            <div>手机号：{{item.mb}}</div>
            <div>等级名称：{{item.gn}}</div>
            <div>卡号：{{item.cn}}</div>
            <div>有效期：{{item.uld}}</div>
          </td>
          <td>
            <div>{{item.sex}}</div>
            <div>{{item.bir}}</div>
          </td>
          <td>
            <div>消费次数：</div>
            <div>总消费金额：{{item.tc}}元</div>
            <div>最后消费时间：{{item.lct}}</div>
          </td>
          <td>
            <div>账户余额：{{item.ab}}元</div>
            <div>账户本金：{{item.ac}}元</div>
            <div>赠送金额：{{item.ap}}元</div>
            <div>积分余额：{{item.ib}}</div>
          </td>
          <td>
            <div>购卡金额：</div>
            <div>购卡标志：</div>
            <div>用户来源：</div>
            <div>购卡时间：</div>
            <div>绑卡日期：</div>
            <div>建卡时间：{{item.ct}}</div>
          </td>
          <td>{{item.st}}</td>
          <td>未绑卡</td>
          <td>
            <el-button class="tb-btn" size="mini">会员详情记录</el-button>
            <br />
            <el-button class="tb-btn" size="mini" type="primary">交易记录</el-button>
            <br />
            <el-button class="tb-btn" size="mini" type="danger">解绑</el-button>
          </td>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>
import axios from "axios"
import api from "../api/index"
export default {
  data() {
    return {
      phoneNum: "",
      cardNum: "",
      companycode: "",
      list: [
        {
          ab: "账户余额",
          ac: "账户本金",
          am: "购卡余额",
          ap: "账户赠送金额",
          bir: "生日",
          cn: "卡号",
          ct: "建卡日期",
          gi: "等级id",
          gn: "等级名称",
          ib: "积分余额",
          kmid: "电子会员id",
          lct: "最近消费时间",
          mb: "会员手机号",
          mi: "会员id",
          mn: "会员名称",
          os: "在线状态",
          sex: "性别",
          st: "线下会员状态",
          tc: "总消费金额",
          uld: "到期时间"
        },
        {
          ab: "10",
          ac: "10",
          am: "20",
          ap: "100",
          bir: "生日",
          cn: "卡号",
          ct: "建卡日期",
          gi: "等级id",
          gn: "等级名称",
          ib: "积分余额",
          kmid: "电子会员id",
          lct: "最近消费时间",
          mb: "会员手机号",
          mi: "会员id",
          mn: "会员名称",
          os: "在线状态",
          sex: "性别",
          st: "线下会员状态",
          tc: "总消费金额",
          uld: "到期时间"
        }
      ],
      tableData: [
        {
          mn: "123",
          name: "nihao",
          number: "13529456",
          userName: "哈哈哈",
          sex: "nan",
          age: "12",
          mobile_phone: "15649465",
          i1: "123",
          i2: "123"
        },
        {
          mn: "123",
          name: "nihao",
          number: "13529456",
          userName: "哈哈哈",
          sex: "nan",
          age: "12",
          mobile_phone: "15649465",
          i1: "123",
          i2: "123"
        }
      ]
    };
  },
  methods: {
    query() {

      let params = {
          sign: '23C57B57F44C6A30003B918ACA0A2BAC',
          ci: 8551,
          m: 15005002870
        }
    }
  }
};
</script>

<style>
.input {
  width: 20%;
  margin: 10px;
}
.tb-btn {
  margin: 2px;
}
</style>

<style type="text/css">
table {
  border-collapse: collapse;
  margin: 0 auto;
  text-align: center;
}
table td,
table th {
  border: 1px solid #cad9ea;
  color: #666;
  /* height: 30px; */
  padding: 4px 0;
}
table thead th {
  background-color: #cce8eb;
  width: 100px;
}
table tr:nth-child(odd) {
  background: #fff;
}
table tr:nth-child(even) {
  background: #f5fafa;
}
table tr:hover td {
  background-color: #f2f2f2;
}
</style>