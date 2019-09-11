<!--suppress ALL -->
<style>
.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 10px;
}
.row_title {
  display: inline-block;
  width: 80px;
  text-align: right;
  font-weight: 600;
}
.row_content {
  margin-left: 20px;
}
.row_style {
  margin-bottom: 10px;
}
.block {
  margin-top: 15px;
}

</style>
<template>
  <div>
    <Card>
      <Steps :current="orderInfo.orderStatus">
        <Step title="待付款"></Step>
        <Step title="待配送"></Step>
        <Step title="已发出"></Step>
        <Step title="已完成"></Step>
        <Step title="已关闭"></Step>
      </Steps>
    </Card>
    <Card class="card">
      <p slot="title">收货信息</p>
      <div>
        <div class="row_style">
          <span class="row_title">收件人:</span>
          <span class="row_content">{{orderInfo.consignee}}</span>
        </div>
        <div class="row_style">
          <span class="row_title">手机号码:</span>
          <span class="row_content">{{orderInfo.mobile}}</span>
        </div>
        <div class="row_style">
          <span class="row_title">地址:</span>
          <span class="row_content">{{orderInfo.address}}</span>
        </div>
      </div>
    </Card>
    <Card class="card">
      <p slot="title">商品清单</p>
      <Table :data="tableData" :columns="tableColumns"></Table>
      <div class="block">
        <div class="row_style">
          <span class="row_title">商品件数:</span>
          <span class="row_content">{{orderInfo.totalNumber}}</span>
        </div>
        <div class="row_style">
          <span class="row_title">合计金额:</span>
          <span class="row_content">{{orderInfo.orderPrice}}</span>
        </div>
        <div class="row_style">
          <span class="row_title">优惠券折扣:</span>
          <span class="row_content">{{orderInfo.couponPrice}}</span>
        </div>
        <div class="row_style">
          <span class="row_title">运费:</span>
          <span class="row_content">{{orderInfo.freightPrice}}</span>
        </div>
        <div class="row_style">
          <span class="row_title">实付金额:</span>
          <span class="row_content">{{orderInfo.actualPrice}}</span>
        </div>
        <div class="row_style">
          <span class="row_title">下单时间:</span>
          <span class="row_content">{{orderInfo.createTime}}</span>
        </div>
      </div>
    </Card>
    <Card class="card" v-if='orderInfo.payTime'>
      <p slot="title">付款信息</p>
    </Card>
  </div>
</template>
<script>
import { create, getOrderGoodsList } from "@/api/order";
export default {
  data() {
    return {
      tableColumns: [
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
          title: "名称",
          key: "goodsName"
        },
        {
          title: "数量",
          key: "number"
        },
        {
          title: "价格",
          key: "price"
        }
      ],
      tableData: [],
      orderInfo: {}
    };
  },
  created() {
    this.orderInfo = this.$route.params;
    this.getGoodsList(this.orderInfo.id);
  },
  methods: {
    getGoodsList(orderId) {
      getOrderGoodsList({ orderId: orderId }).then(res => {
        this.tableData = res.data.data;
        this.calc(res.data.data);
      });
    },
    calc(arr) {
      let cartNumber = 0;
      for (let i = 0; i < arr.length; i++) {
        cartNumber += arr[i].number;
      }
      this.orderInfo.totalNumber = cartNumber;
    }
  }
};
</script>