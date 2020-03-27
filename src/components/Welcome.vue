<template>
    <div class="min1500">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item >首页</el-breadcrumb-item>
        <el-breadcrumb-item>工作台</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card class="gongzuo">
        <el-tabs :tab-position="tabPosition" style="height: 200px;"> 
        <el-tab-pane label="待我审批">
          <el-tabs  style="height: 200px;">
            <el-tab-pane label="待我审批">
              <el-table :data="tableData" height="185" style="width: 100%">
                <el-table-column prop="a" label="单据编号"></el-table-column>
                <el-table-column prop="b" label="单据类型"></el-table-column>
                <el-table-column prop="c" label="客户/供应商"></el-table-column>
                <el-table-column prop="d" label="提交人"></el-table-column>
                <el-table-column prop="e" label="提交时间"></el-table-column>
                <el-table-column label="操作">
                   <el-button type="success" size="mini">通过</el-button>
                   <el-button type="info" size="mini">驳回</el-button>
                </el-table-column>
            </el-table>
            </el-tab-pane>
            <el-tab-pane label="待我审批">
              <el-table :data="tableData" height="185" style="width: 100%">
                <el-table-column prop="a" label="单据编号"></el-table-column>
                <el-table-column prop="b" label="单据类型"></el-table-column>
                <el-table-column prop="c" label="客户/供应商"></el-table-column>
                <el-table-column prop="d" label="提交人"></el-table-column>
                <el-table-column prop="e" label="提交时间"></el-table-column>
                <el-table-column label="操作">
                   <el-button type="success" size="mini">通过</el-button>
                   <el-button type="info" size="mini">驳回</el-button>
                </el-table-column>
            </el-table>
            </el-tab-pane>
            <el-tab-pane label="待我审批">
              <el-table :data="tableData" height="185" style="width: 100%">
                <el-table-column prop="a" label="单据编号"></el-table-column>
                <el-table-column prop="b" label="单据类型"></el-table-column>
                <el-table-column prop="c" label="客户/供应商"></el-table-column>
                <el-table-column prop="d" label="提交人"></el-table-column>
                <el-table-column prop="e" label="提交时间"></el-table-column>
                <el-table-column label="操作">
                   <el-button type="success" size="mini">通过</el-button>
                   <el-button type="info" size="mini">驳回</el-button>
                </el-table-column>
            </el-table>
            </el-tab-pane>
            <el-tab-pane label="待我审批">
              <el-table :data="tableData" height="185" style="width: 100%">
                <el-table-column prop="a" label="单据编号"></el-table-column>
                <el-table-column prop="b" label="单据类型"></el-table-column>
                <el-table-column prop="c" label="客户/供应商"></el-table-column>
                <el-table-column prop="d" label="提交人"></el-table-column>
                <el-table-column prop="e" label="提交时间"></el-table-column>
                <el-table-column label="操作">
                   <el-button type="success" size="mini">通过</el-button>
                   <el-button type="info" size="mini">驳回</el-button>
                </el-table-column>
            </el-table>
            </el-tab-pane>
            <el-tab-pane label="待我审批">
              <el-table :data="tableData" height="185" style="width: 100%">
                <el-table-column prop="a" label="单据编号"></el-table-column>
                <el-table-column prop="b" label="单据类型"></el-table-column>
                <el-table-column prop="c" label="客户/供应商"></el-table-column>
                <el-table-column prop="d" label="提交人"></el-table-column>
                <el-table-column prop="e" label="提交时间"></el-table-column>
                <el-table-column label="操作">
                   <el-button type="success" size="mini">通过</el-button>
                   <el-button type="info" size="mini">驳回</el-button>
                </el-table-column>
            </el-table>
            </el-tab-pane>
            <el-tab-pane label="待我审批">
              <el-table :data="tableData" height="185" style="width: 100%">
                <el-table-column prop="a" label="单据编号"></el-table-column>
                <el-table-column prop="b" label="单据类型"></el-table-column>
                <el-table-column prop="c" label="客户/供应商"></el-table-column>
                <el-table-column prop="d" label="提交人"></el-table-column>
                <el-table-column prop="e" label="提交时间"></el-table-column>
                <el-table-column label="操作">
                   <el-button type="success" size="mini">通过</el-button>
                   <el-button type="info" size="mini">驳回</el-button>
                </el-table-column>
            </el-table>
            </el-tab-pane>

      </el-tabs>
           
        </el-tab-pane>
        <el-tab-pane label="我已审批">
          <el-table :data="tableData" height="185" style="width: 100%">
                <el-table-column prop="date" label="单据编号"></el-table-column>
                <el-table-column prop="name" label="单据类型"></el-table-column>
                <el-table-column prop="name" label="客户/供应商"></el-table-column>
                <el-table-column prop="name" label="金额"></el-table-column>
                <el-table-column prop="name" label="我的审批时间"></el-table-column>
                <el-table-column prop="name" label="我的审批结果"></el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="审批中">
          <el-table :data="tableData" height="185" style="width: 100%">
                <el-table-column prop="date" label="单据编号"></el-table-column>
                <el-table-column prop="name" label="单据类型"></el-table-column>
                <el-table-column prop="name" label="客户/供应商"></el-table-column>
                <el-table-column prop="name" label="金额"></el-table-column>
                <el-table-column prop="name" label="提交人"></el-table-column>
                <el-table-column prop="name" label="提交时间"></el-table-column>
                <el-table-column prop="name" label="审批状态"></el-table-column>
                <el-table-column prop="name" label="操作"></el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="审批完成">
          <el-table :data="tableData" height="185" style="width: 100%">
                <el-table-column prop="date" label="单据编号"></el-table-column>
                <el-table-column prop="name" label="单据类型"></el-table-column>
                <el-table-column prop="name" label="客户/供应商"></el-table-column>
                <el-table-column prop="name" label="金额"></el-table-column>
                <el-table-column prop="name" label="最后审批人"></el-table-column>
                <el-table-column prop="name" label="审批时间"></el-table-column>
                <el-table-column prop="name" label="审批结果"></el-table-column>
                <el-table-column prop="name" label="操作"></el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="待出库">
          <el-table :data="tableData" height="185" style="width: 100%">
                <el-table-column prop="date" label="单据编号"></el-table-column>
                <el-table-column prop="name" label="客户"></el-table-column>
                <el-table-column prop="name" label="优惠后应收"></el-table-column>
                <el-table-column prop="name" label="销售员"></el-table-column>
                <el-table-column prop="name" label="单据日期"></el-table-column>
                <el-table-column prop="name" label="交货日期"></el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="待入库">
          <el-table :data="tableData" height="185" style="width: 100%">
                <el-table-column prop="date" label="单据编号"></el-table-column>
                <el-table-column prop="name" label="供应商"></el-table-column>
                <el-table-column prop="name" label="优惠后应付"></el-table-column>
                <el-table-column prop="name" label="采购员"></el-table-column>
                <el-table-column prop="name" label="单据日期"></el-table-column>
                <el-table-column prop="name" label="交货日期"></el-table-column>
            </el-table>
        </el-tab-pane>
      </el-tabs>
      </el-card>
      <el-card class="chaxun">
        <div class="cy">查询</div>
        <div class="tian">客户查询：
          <el-input placeholder="请输入查询客户" clearable  class="cor" v-model="cc">
            <el-button slot="append" icon="el-icon-search" @click="a"></el-button>
          </el-input>
        </div>
        <div class="tian">供应商查询：
          <el-input placeholder="请输入查询供应商" clearable  class="cor" v-model="dd">
            <el-button slot="append" icon="el-icon-search" @click="b"></el-button>
          </el-input>
        </div>
        <div class="tian">单据查询：
          <el-input placeholder="请输入查询单据" clearable  class="cor" v-model="aa">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <div class="tian">库存查询：
          <el-input placeholder="请输入查询库存" clearable  class="cor" v-model="bb">
            <el-button slot="append" icon="el-icon-search" ></el-button>
          </el-input>
        </div>
        
      </el-card>
      <el-card class="yujing">
        <div class="cy">库存预警</div>
      </el-card>
     
    </div>
</template>
<script>
export default {
  data () {
    return {
    tabPosition: 'left',
    tableData: [{
          a: 'CG20190404001',
          b: '采购单',
          c: '测试用户',
          d:'张三',
          e:'2019-04-04',
        }],
        aa:'',
        bb:'',
        cc:'',
        dd:'',
        chaManageForm:{}
    };
  },
  created () {
    this.ManageList()
  },
    methods:{
    a(){
      console.log(this.cc);
      
      this.$router.push({path:'/client',query:{id:this.cc}});
    },
    b(){
      this.$router.push('/supplier')

    },
    async ManageList() {
      const { data: res } = await this.$http.post("/WorkBench/select",this.chaManageForm);
      
      this.total=res.body.total;
      // this.manageList = res.body.rows;
    },
     dialogClosed(val) {
      this.$refs[val].resetFields();
    },
    }
}
</script>
<style lang='less' scoped>
  .gongzuo{
    width: 70%;
    height: 660px;
    float: left;
    margin-right: 20px;
  }
  .chaxun{
    width: 28%;
    height: 340px;
  }
  .yujing{
    width: 28%;
    height: 300px;
  }
  .cy{
    width: 100%;
    height: 35px;
    border-bottom: 3px solid #eee;
  }
  .tian{
    text-align: right;

  }
  .cor{
    width: 260px;
    margin: 10px 0px;
    margin-left: 10px;
  }
</style>