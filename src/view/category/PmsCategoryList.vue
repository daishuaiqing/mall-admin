<template>
    <Card>
        <div><Input search enter-button="查询" placeholder="请输入分类名称..." style="width: 350px;margin-bottom:15px;"/></div>
        <Table :data="tableData" :columns="tableColumns" stripe></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="total" :current="current" @on-change="changePage"></Page>
            </div>
        </div>
    </Card>
</template>

<script>
import { getList } from '@/api/category'
const tableColumns = [
  {
    title: '编号',
    key: 'id'
  },
  {
    title: '类目名称',
    key: 'name'
  },
  {
    title: '排序',
    key: 'sortOrder'
  },
  {
    title: '更新时间',
    key: 'updateTime'
  }
]
export default {
  data () {
    return {
      tableColumns,
      tableData: [],
      total: 0,
      current: 1
    }
  },
  created () {
    this.changePage()
  },
  methods: {
    changePage (current) {
      getList({
        pageNum: current
      }).then(res => {
        this.tableData = res.data.data.content
        this.total = res.data.data.totalElements
      })
    }
  }
}
</script>
