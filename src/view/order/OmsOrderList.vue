<!--suppress ALL -->
<template>
    <Card>
        <div><Input search enter-button="查询" placeholder="请输入名称..." style="width: 350px;margin-bottom:15px;"/></div>
        <Table :data="tableData" :columns="tableColumns" stripe>
            <template slot-scope="{ row }" slot="orderStatus">
                <div v-if='row.orderStatus===0'>待付款</div>
                <div v-if='row.orderStatus===1'>待配送</div>
                <div v-if='row.orderStatus===2'>已发出</div>
                <div v-if='row.orderStatus===3'>已完成</div>
                <div v-if='row.orderStatus===4'>已关闭</div>
                <div v-if='row.orderStatus===5'>无效订单</div>
            </template>
            <template slot-scope="{ row }" slot="action">
                <Button v-if='row.orderStatus===1' type="primary" size="small" style="margin-right: 5px">确认配送</Button>
                <Button type="info" size="small" style="margin-right: 5px" @click="goDetail(row)">详情</Button>
                <!-- <Button type="error" size="small">Delete</Button> -->
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
    import { getList } from '@/api/order'
    export default {
        data(){
            return{
                tableColumns:[
                    {
                        title:'编号',
                        key: 'orderSn'
                    },
                    {
                        title:'状态',
                        key: 'orderStatus',
                        slot: 'orderStatus'
                    },
                    {
                        title:'类型',
                        key: 'orderType',
                        render: (h,params)=>{
                            return h('div',params.row.orderType===0?'配送订单':'自取订单')
                        }
                    },
                    {
                        title:'收货人',
                        key: 'consignee'
                    },
                    {
                        title:'手机号',
                        key: 'mobile'
                    },
                    {
                        title:'收货地址',
                        key: 'address'
                    },
                    {
                        title:'用户留言',
                        key: 'message'
                    },
                    {
                        title:'订单金额',
                        key: 'orderPrice'
                    },
                    {
                        title:'配送人',
                        key: 'shipChannel'
                    },
                    {
                        title:'创建时间',
                        key: 'createTime'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
                tableData:[],
                total:0,
                current:1,
            }
        },
        created(){
            this.changePage();
        },
        methods: {
            changePage (current) {
                getList({
                    pageNum: current
                }).then(res=>{
                    this.tableData = res.data.data.content;
                    this.total = res.data.data.totalElements;
                })
            },
            goDetail (orderInfo){
                console.log(orderInfo)
                this.$router.push({ name: 'orderInfo', params: orderInfo});
            }
        },
    }
</script>