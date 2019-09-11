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
                        <FormItem label="性别：0 未知， 1男， 2 女" prop="gender">
                    <RadioGroup v-model="formValidate.gender">
                        <Radio label="male">Male</Radio>
                        <Radio label="female">Female</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="生日" prop="birthday">
                    <DatePicker type="date" placeholder="请选择生日" v-model="formValidate.birthday" tyle="width: 200px"/>
                </FormItem>
                <FormItem label="最近一次登录时间" prop="lastLoginTime">
                    <DatePicker type="datetime" placeholder="请选择最近一次登录时间" v-model="formValidate.lastLoginTime" tyle="width: 200px"/>
                </FormItem>
                <FormItem label="最近一次登录IP地址" prop="lastLoginIp">
                    <Input v-model="formValidate.lastLoginIp" placeholder="请输入最近一次登录IP地址" style="width: 200px"/>
                </FormItem>
                <FormItem label="0 普通用户，1 VIP用户，2 高级VIP用户" prop="userLevel">
                    <RadioGroup v-model="formValidate.userLevel">
                        <Radio label="male">Male</Radio>
                        <Radio label="female">Female</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="用户昵称或网络名称" prop="nick">
                    <Input v-model="formValidate.nick" placeholder="请输入用户昵称或网络名称" style="width: 200px"/>
                </FormItem>
                <FormItem label="用户手机号码" prop="mobile">
                    <Input v-model="formValidate.mobile" placeholder="请输入用户手机号码" style="width: 200px"/>
                </FormItem>
                <FormItem label="用户头像图片" prop="avatar">
                    <Input v-model="formValidate.avatar" placeholder="请输入用户头像图片" style="width: 200px"/>
                </FormItem>
                <FormItem label="微信登录openid" prop="weixinOpenid">
                    <Input v-model="formValidate.weixinOpenid" placeholder="请输入微信登录openid" style="width: 200px"/>
                </FormItem>
                <FormItem label="0 可用, 1 禁用, 2 注销" prop="status">
                    <RadioGroup v-model="formValidate.status">
                        <Radio label="male">Male</Radio>
                        <Radio label="female">Female</Radio>
                    </RadioGroup>
                </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">清空</Button>
            </FormItem>
        </Form>
    </Card>

</template>
<script>
    import { create } from '@/api/UmsUser'
    export default {
        data () {
            return {
                formValidate: {
                    gender:'',
                    birthday:'',
                    lastLoginTime:'',
                    lastLoginIp:'',
                    userLevel:'',
                    nick:'',
                    mobile:'',
                    avatar:'',
                    weixinOpenid:'',
                    status:'',
                },
                ruleValidate: {
                    gender: [
                        { required: true, message: '请输入性别：0 未知， 1男， 2 女', trigger: 'blur' }
                    ],
                    birthday: [
                        { required: true, message: '请输入生日', trigger: 'blur' }
                    ],
                    lastLoginTime: [
                        { required: true, message: '请输入最近一次登录时间', trigger: 'blur' }
                    ],
                    lastLoginIp: [
                        { required: true, message: '请输入最近一次登录IP地址', trigger: 'blur' }
                    ],
                    userLevel: [
                        { required: true, message: '请输入0 普通用户，1 VIP用户，2 高级VIP用户', trigger: 'blur' }
                    ],
                    nick: [
                        { required: true, message: '请输入用户昵称或网络名称', trigger: 'blur' }
                    ],
                    mobile: [
                        { required: true, message: '请输入用户手机号码', trigger: 'blur' }
                    ],
                    avatar: [
                        { required: true, message: '请输入用户头像图片', trigger: 'blur' }
                    ],
                    weixinOpenid: [
                        { required: true, message: '请输入微信登录openid', trigger: 'blur' }
                    ],
                    status: [
                        { required: true, message: '请输入0 可用, 1 禁用, 2 注销', trigger: 'blur' }
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