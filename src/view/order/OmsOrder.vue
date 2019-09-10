<!--suppress ALL -->
<style>
    .card{
        display: flex;
        flex-direction: column;;
        justify-content: center;
    }

</style>
<template>
    <div>
        <Card class="card">
            <p slot="title">收货信息</p>
        </Card>
        <Card class="card">
            <p slot="title">商品清单</p>
        </Card>
    </div>
</template>
<script>
    import { create } from '@/api/order'
    export default {
        data () {
            return {
                orderInfo:{}
            }
        },
        created() {
            this.orderInfo = this.$route.params;
        },
        methods: {
            
        }
    }
</script>