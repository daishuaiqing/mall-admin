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
    <Table :data="tableData" :columns="tableColumns" stripe></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" :current="current" @on-change="changePage"></Page>
      </div>
    </div>
  </Card>
</template>

<script>
import { getList, deleteById } from "@/api/goods";

export default {
  data() {
    return {
      tableColumns: [
        {
          title: "编号",
          key: "id"
        },
        {
          title: "商品名称",
          key: "name"
        },
        {
          title: "所属分类",
          key: "categoryId"
        },
        {
          title: "是否上架",
          key: "isOnSale"
        },
        {
          title: "排序",
          key: "sortOrder"
        },
        {
          title: "商品图片",
          key: "picUrl",
          render: (h, params) => {
            return h("img", {
              attrs: {
                src: params.row.picUrl
              },
              style: {
                width: "50px",
                height: "50px"
              }
            });
          }
        },
        {
          title: "单位",
          key: "unit"
        },
        {
          title: "市场价格",
          key: "originalPrice"
        },
        {
          title: "价格",
          key: "price"
        },
        {
          title: "更新时间",
          key: "updateTime"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.edit(params);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
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
    },
    edit(params) {
      console.log("编辑参数：", params);
      this.$router.push({ name: 'modifyGoods', params: params.row});
    },
    remove(params) {
      this.$Modal.confirm({
        title: "删除提示",
        content: "<p>删除后将不可恢复，您确认删除吗</p>",
        okText: "确认",
        cancelText: "取消",
        onOk: () => {
          deleteById(params.row.id).then(res=>{
            if(res.data){
              this.$Message.info("删除成功");
              this.changePage(this.current);
            }else{
              this.$Message.info("删除失败");
            }
          })
        },
        onCancel: () => {
          this.$Message.info("已取消");
        }
      });
    }
  }
};
</script>
