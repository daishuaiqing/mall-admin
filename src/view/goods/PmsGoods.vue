<!--suppress ALL -->
<style>
.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.upload-item {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.upload-img {
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
}
.upload-item:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
<template>
  <Card class="card">
    <p slot="title">创建商品</p>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
      <FormItem label="商品名称" prop="name">
        <Input v-model="formValidate.name" placeholder="请输入商品名称" style="width: 200px" />
      </FormItem>
      <FormItem label="所属分类" prop="categoryId">
        <Select v-model="formValidate.categoryId" placeholder="请选择商品所属分类" style="width: 200px">
          <Option v-for="item in categoryList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="是否上架" prop="isOnSale">
        <RadioGroup v-model="formValidate.isOnSale">
          <Radio :label='1'>是</Radio>
          <Radio :label='0'>否</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="排序" prop="sortOrder">
        <InputNumber placeholder="请选择排序" v-model="formValidate.sortOrder" style="width: 200px" />
      </FormItem>
      <FormItem label="商品图片" prop="picUrl">
        <!-- <Input v-model="formValidate.picUrl" placeholder="请输入商品页面商品图片" style="width: 200px"/> -->
        <template v-if="formValidate.picUrl != ''">
          <div class="upload-item">
            <img class="upload-img" :src="formValidate.picUrl" />
            <div class="demo-upload-list-cover">
              <Icon type="ios-eye-outline" @click.native="handleView()"></Icon>
              <Icon type="ios-trash-outline" @click.native="handleRemove()"></Icon>
            </div>
          </div>
        </template>
        <template v-if="formValidate.picUrl === ''">
          <Upload
            :action="actionUrl"
            name="image"
            style="width: 60px;height: 60px;text-align: center;line-height: 60px;border: 1px dashed #dcdee2;"
            :max-size="2048"
            :format="['jpg','jpeg','png']"
            :on-success="handleSuccess"
          >
            <div style="width: 58px;height:58px;line-height: 58px;">
              <Icon type="ios-camera" size="20"></Icon>
            </div>
          </Upload>
        </template>
      </FormItem>
      <FormItem label="单位" prop="unit">
        <Input v-model="formValidate.unit" placeholder="请输入商品单位，例如件、盒" style="width: 200px" />
      </FormItem>
      <FormItem label="市场价格" prop="originalPrice">
        <InputNumber
          v-model="formValidate.originalPrice"
          :formatter="value => `￥ ${value}`.replace(/B(?=(d{3})+(?!d))/g, ',')"
          :parser="value => value.replace(/￥s?|(,*)/g, '')"
          style="width: 200px"
        />
      </FormItem>
      <FormItem label="价格" prop="price">
        <InputNumber
          v-model="formValidate.price"
          :formatter="value => `￥ ${value}`.replace(/B(?=(d{3})+(?!d))/g, ',')"
          :parser="value => value.replace(/￥s?|(,*)/g, '')"
          style="width: 200px"
        />
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
        <Button @click="handleReset('formValidate')" style="margin-left: 8px">清空</Button>
      </FormItem>
    </Form>
    <Modal title="View Image" v-model="visible">
      <img :src="formValidate.picUrl" v-if="visible" style="width: 100%" />
    </Modal>
  </Card>
</template>
<script>
import { create } from "@/api/goods";
import { getCatgoryAll } from "@/api/category";
import config from '@/config'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
export default {
  data() {
    return {
      actionUrl: baseUrl+'/upload/image',
      visible: false,
      categoryList: [],
      formValidate: {
        name: "",
        categoryId: 0,
        isOnSale: 1,
        sortOrder: 0,
        picUrl: "",
        unit: "",
        originalPrice: 0.0,
        price: 0.0
      },
      ruleValidate: {
        name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        categoryId: [
          {
            required: true,
            type: "number",
            message: "请选择商品所属类目",
            trigger: "change"
          }
        ],
        isOnSale: [
          { required: true, type: "number", message: "请输入是否上架", trigger: "blur" }
        ],
        picUrl: [
          { required: true, message: "请输入商品页面商品图片", trigger: "blur" }
        ],
        unit: [
          {
            required: true,
            message: "请输入商品单位，例如件、盒",
            trigger: "blur"
          }
        ],
        originalPrice: [
          {
            required: true,
            type: "number",
            message: "请输入市场价格",
            trigger: "blur"
          }
        ],
        price: [
          {
            required: true,
            type: "number",
            message: "请输入价格",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    getCatgoryAll().then(res => {
      this.categoryList = res.data.data;
    });
  },
  methods: {
    handleView() {
      this.visible = true;
    },
    handleRemove() {
      this.formValidate.picUrl = "";
    },
    handleSuccess(res, file) {
      console.log(res);
      console.log(file);
      this.formValidate.picUrl = res.url;
      //formValidate.picUrl =
    },
    /**
     * 提交表单数据
     */
    handleSubmit(name) {
      console.log(this.formValidate);
      this.$refs[name].validate(valid => {
        if (valid) {
          create(this.formValidate).then(res => {
            if (res.status === 200) {
              this.$Message.success("成功!");
              console.log(res);
              this.handleReset(name);
            }
          });
        } else {
          this.$Message.error("失败!");
        }
      });
    },
    /**
     * 清空表单数据
     */
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>