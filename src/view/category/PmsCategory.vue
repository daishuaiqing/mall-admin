<!--suppress ALL -->
<style>
    .card{
        display: flex;
        flex-direction: column;;
        justify-content: center;
    }
</style>
<template>
    <Card class="card">
        <p slot="title">表单提交</p>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <FormItem label="类目名称" prop="name">
                    <Input v-model="formValidate.name" placeholder="请输入类目名称" style="width: 200px"/>
                </FormItem>
                <FormItem label="排序" prop="sortOrder">
                    <InputNumber v-model="formValidate.sortOrder" placeholder="请选择排序" style="width: 200px"/>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                    <Button @click="handleReset('formValidate')" style="margin-left: 8px">清空</Button>
                </FormItem>
        </Form>
    </Card>

</template>
<script>
    import { create } from '@/api/category'
    export default {
        data () {
            return {
                formValidate: {
                    name: '',
                    sortOrder: 0,
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '请输入类目名称', trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            /**
             * 提交表单数据
             */
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        create(this.formValidate).then(res=>{
                            if(res.status === 200){
                                this.$Message.success('成功!');
                                console.log(res)
                                this.handleReset(name);
                            }
                        })
                        
                    } else {
                        this.$Message.error('失败!');
                    }
                })
            },
            /**
             * 清空表单数据
             */
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>