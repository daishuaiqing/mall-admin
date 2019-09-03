<!--suppress ALL -->
<template>
    <Card>
        <div><Input search enter-button="查询" placeholder="请输入名称..." style="width: 350px;margin-bottom:15px;"/></div>
        <Table :data="tableData" :columns="tableColumns" stripe></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="total" :current="current" @on-change="changePage"></Page>
            </div>
        </div>
    </Card>
</template>

<script>
    import { getList } from '@/api/goods'
    const tableColumns = [
        {
            title:'编号',
            key: 'id'
        },
        {
            title:'商品名称',
            key: 'name'
        },
        {
            title:'所属分类',
            key: 'categoryId'
        },
        {
            title:'是否上架',
            key: 'isOnSale'
        },
        {
            title:'排序',
            key: 'sortOrder'
        },
        {
            title:'商品图片',
            key: 'picUrl',
            render: (h, params) => {
                return h('img', {
                    attrs: {
                        src: params.row.picUrl
                    },
                    style: {
                        width:'50px',
                        height:'50px'
                    }
                });
            }
        },
        {
            title:'单位',
            key: 'unit'
        },
        {
            title:'市场价格',
            key: 'originalPrice'
        },
        {
            title:'价格',
            key: 'price'
        },
        {
            title:'创建时间',
            key: 'createTime'
        },
        {
            title:'更新时间',
            key: 'updateTime'
        }
    ]
    export default {
        data(){
            return{
                tableColumns,
                tableData:[],
                total:0,
                current:1,
            }
        },
        created(){
            this.changePage();
        },
        methods: {
            changePage () {
                getList({
                    pageNum: this.current
                }).then(res=>{
                    console.log(res)
                this.tableData = res.data.data.content;
                this.total = res.data.data.totalElements;
            })
            }
        },
    }
</script>