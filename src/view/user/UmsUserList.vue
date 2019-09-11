<!--suppress ALL -->
<template>
  <Card>
    <div>
      <Input
        search
        enter-button="查询"
        placeholder="请输入名称..."
        style="width: 350px;margin-bottom:15px;"
      />
    </div>
    <Table :data="tableData" :columns="tableColumns" stripe>
      <template slot-scope="{ row }" slot="gender">
        <div v-if="row.gender===0">未知</div>
        <div v-if="row.gender===1">男</div>
        <div v-if="row.gender===2">女</div>
      </template>
      <template slot-scope="{ row }" slot="userLevel">
        <div v-if="row.status===0">普通用户</div>
        <div v-if="row.status===1">VIP用户</div>
        <div v-if="row.status===2">高级VIP用户</div>
      </template>
      <template slot-scope="{ row }" slot="status">
        <div v-if="row.status===0">正常</div>
        <div v-if="row.status===1">禁用</div>
        <div v-if="row.status===2">注销</div>
      </template>
    </Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" :current="current" @on-change="changePage"></Page>
      </div>
    </div>
  </Card>
</template>

<script>
import { getList } from "@/api/user";
export default {
  data() {
    return {
      tableColumns: [
        {
          title: "头像",
          key: "avatar",
          render: (h, params) => {
            return h("img", {
              attrs: {
                src: params.row.avatar
              },
              style: {
                width: "50px",
                height: "50px"
              }
            });
          }
        },
        {
          title: "昵称",
          key: "nick"
        },
        {
          title: "性别",
          key: "gender",
          slot: "gender"
        },
        {
          title: "生日",
          key: "birthday"
        },
        {
          title: "会员",
          key: "userLevel",
          slot: "userLevel"
        },
        {
          title: "手机号码",
          key: "mobile"
        },
        {
          title: "状态",
          key: "status",
          slot: "status"
        },
        {
          title: "最近一次登录时间",
          key: "lastLoginTime"
        },
        {
          title: "创建时间",
          key: "createTime"
        }
      ],
      tableData: [],
      total: 0,
      current: 1
    };
  },
  created() {
    this.changePage();
  },
  methods: {
    changePage(current) {
      getList({
        pageNum: current
      }).then(res => {
        this.tableData = res.data.data.content;
        this.total = res.data.data.totalElements;
      });
    }
  }
};
</script>