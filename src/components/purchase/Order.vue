<template>
    <div class="min1500">
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>进货管理</el-breadcrumb-item>
            <el-breadcrumb-item>采购订单</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-form :inline="true" class="demo-form-inline search" :model="search" ref="search">
                <el-row :gutter="20" class="row">
                    <el-col :span="24">
                        <el-form-item label="订单编号：">
                            <el-input placeholder="请输入订单编号" class="_small"></el-input>
                        </el-form-item>
                        <el-form-item prop="rylx" >
                            <el-input placeholder="请输入人员" v-model="search.ry" class="input-with-select" style="width: 250px">
                                <el-select v-model="search.rylx" slot="prepend" placeholder="请选择"  style="width: 110px">
                                <el-option
                                    v-for="item in rylx"
                                    :key="item.Id"
                                    :label="item.Name"
                                    :value="item.Name">
                                </el-option>
                                </el-select>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="订单状态：" prop="ddzt">
                            <el-select v-model="search.ddzt" placeholder="请选择" class="_small">
                                <el-option
                                    v-for="item in ddzt"
                                    :key="item.Id"
                                    :label="item.Name"
                                    :value="item.Name">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="制单时间："  prop="zdsj" >
                            <el-date-picker
                                v-model="search.zdsj"
                                type="date"
                                format="yyyy年MM月dd日"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期时间" >
                            </el-date-picker>
                        </el-form-item >
                        <el-form-item label="采购周期" >
                            <el-date-picker
                            v-model="value1"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="getList">查询</el-button>
                            <el-button type="primary" @click="ResetForm('search')">重置</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-button type="success" @click="addOrderVisible = true;editOrde  = false">新增</el-button>
            <el-button @click="edit" :disabled="selectedList.length == 0">编辑</el-button>
            <el-button @click="del" :disabled="selectedList.length == 0">删除</el-button>
            <el-button @click="getList">提审</el-button>
            <!-- <el-button @click="stop">终止采购</el-button> -->
            <el-table border :data="orderList" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="40"></el-table-column>
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="porderCode" label="订单编号"></el-table-column>
                <el-table-column prop="porderProducer" label="制单人员"></el-table-column>
                <el-table-column prop="porderTotalnum" label="采购总数量"></el-table-column>
                <el-table-column prop="porderCompletenum" label="已采购数量"></el-table-column>
                <el-table-column prop="porderTotalmoney" label="采购总价"></el-table-column>
                <el-table-column prop="porderPalnmoney" label="预付款"></el-table-column>
                <el-table-column prop="porderStarttime" label="采购周期" width="200">
                    <template slot-scope="scope">
                        {{scope.row.porderStarttime+"-"+scope.row.porderStoptime}}
                    </template>
                </el-table-column>
                <el-table-column prop="supplierDOs.supName" label="供应商" :show-overflow-tooltip='true'></el-table-column>
                <el-table-column prop="porderTime" label="制单时间"></el-table-column>
                <el-table-column prop="porderState" label="订单状态"></el-table-column>
                <el-table-column label="操作" width="190px">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="editOneOrder">修改</el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deletebumen(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="800"
            ></el-pagination>
        </el-card>
        <el-dialog
            :title="editOrde ? '修改订单':'新增订单'"
            :visible.sync="addOrderVisible"
            width="58%"
            :before-close="handleClose"
            @closed="dialogClosed"
        >
            <el-form
            :label-position="labelPosition"
            :model="addOrderForm"
            ref="addOrderRef"
            :rules="addOrderRules"
            :inline="true"
            >
                <el-row>
                    <!-- <el-form-item label="订单编号 ：" prop="Id">
                        <el-input v-model="addOrderForm.Id" placeholder="订单编号" class="_small"></el-input>
                    </el-form-item> -->
                    <el-form-item label="制单人员：" prop="porderProducer">
                        <el-input v-model="addOrderForm.porderProducer" :disabled="true" class="_small"></el-input>
                    </el-form-item>
                    <el-form-item label="选择仓库：" prop="porderWarehouse">
                        <el-select v-model="addOrderForm.porderWarehouse" placeholder="请选择" class="_small">
                            <el-option
                            v-for="item in cangku"
                            :key="item.basicId"
                            :label="item.basicRetainone"
                            :value="item.basicId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                        <el-form-item label="选择供应商：" prop="supplierId">
                        <el-select v-model="addOrderForm.supplierId" placeholder="请选择" class="_small">
                            <el-option
                            v-for="item in gongyinshang"
                            :key="item.supplierId"
                            :label="item.supName"
                            :value="item.supplierId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选购周期：" prop="time">
                        <el-date-picker
                        v-model="addOrderForm.time"
                        type="daterange"
                        format="yyyy年MM月dd日"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                </el-row>
                <hr>
                <el-button type="primary" @click="gongyingshangpi">添加商品</el-button>
                <el-button type="dange" :disabled="addSelectedList.length == 0 && addSelectedList_two == 0" @click="deleteAddbumen">删除商品</el-button>
                <el-table border :data="addOrderForm.pcommodityDos" @selection-change="addSelectionChange">
                    
                    <el-table-column type="selection" width="40" align="center"></el-table-column>
                    <el-table-column type="index" width="40" align="center"></el-table-column>
                    <el-table-column prop="supgoolsBigType" label="商品名称" align="center"></el-table-column>
                    <el-table-column prop="supgoolsId" label="商品编码" align="center"></el-table-column>
                    <el-table-column prop="supgoolsWeight" label="克重" align="center"></el-table-column>
                    <el-table-column prop="supgoolsBrand" label="品牌" align="center"></el-table-column>
                    <el-table-column prop="supName" label="供应商" align="center"></el-table-column>
                    
                    <el-table-column prop="pcommodityStock" label="当前库存" align="center">
                        <template scope="scope">
                           <!-- <el-input v-model="scope.row.pcommodityStock"></el-input> -->
                        </template>                    
                    </el-table-column>
                    <el-table-column prop="pcommodityUnit" label="单位" align="center">
                        <template scope="scope">
                           <!-- <el-input v-model="scope.row.pcommodityUnit"></el-input> -->
                        </template>
                    </el-table-column>
                    <el-table-column prop="pcommodityPrice" label="采购价" align="center">  
                        <template scope="scope">
                           <el-input v-model="scope.row.pcommodityPrice" @blur="jisuan"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="pcommodityPalnnum" label="采购数量" align="center">
                        <template scope="scope">
                           <el-input v-model="scope.row.pcommodityPalnnum" @blur="jisuan"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="spmc" label="采购金额" align="center">
                        <template scope="scope">
                           {{scope.row.pcommodityPalnnum*scope.row.pcommodityPrice}}
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="800"
            ></el-pagination>
                <el-row style="margin: 15px 0">
                    <el-col :span="10" style="float: right">
                        <el-row>
                            <el-col :span="12">
                                采购总数量: {{addOrderForm.porderTotalnum}}
                            </el-col>
                            <el-col :span="12">
                                总金额: {{addOrderForm.porderTotalmoney}}
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <hr>
                <el-form-item label="采购描述：" class="w500">
                    <el-input
                    type="textarea"
                        placeholder="请输入内容"
                        v-model="addOrderForm.porderBuyexplain" style="width: 600px" >
                    </el-input>
                </el-form-item>
                <el-form-item label="付款说明：">
                    <el-input
                        placeholder="请输入内容"
                        v-model="addOrderForm.porderExplain" class="fukuan">
                    </el-input>
                </el-form-item>
                <el-form-item label="订单金额：">
                    <el-input v-model="addOrderForm.porderTotalmoney" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="预付款金额：">
                    <el-input v-model="addOrderForm.porderPalnmoney"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addOrderVisible=false">取消</el-button>
                <el-button @click="addSave" type="primary">保存</el-button>
            </span>
        </el-dialog>
        <el-dialog title="新增商品" :visible.sync="addOrder_addgoods" width="58%" :before-close="handleClose" @closed="closeAddGoods">
            <el-form
                :model="addOrderFormGoods"
                ref="addOrderFormGoods"
                :rules="addOrderGoodsRules"
                :inline="true" 
            >

            <el-form-item label="商品名称" prop="Name">
                <el-input v-model="addOrderFormGoods.Name"></el-input>
            </el-form-item>
            <el-form-item label="商品编号" prop="Id">
                <el-input v-model="addOrderFormGoods.Id"></el-input>
            </el-form-item>
            <el-button @click="gongyingshangpi">查询</el-button>
            <el-button type="primary" @click="ResetFormaddOrderFormGoods">重置</el-button>
            </el-form>
            <hr>
            <el-table border stripe :data="shangpi" @selection-change="handleSelectionChange">

                <el-table-column type="selection" width="40"></el-table-column>
                <el-table-column type="index" width="40"></el-table-column>
                <el-table-column prop="supgoolsBigType" label="商品名称"></el-table-column>
                <el-table-column prop="supgoolsId" label="商品编码"></el-table-column>
                <el-table-column prop="supgoolsWeight" label="克重"></el-table-column>
                <el-table-column prop="supgoolsBradth" label="品牌"></el-table-column>
                <el-table-column prop="supName" label="供应商"></el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="800"
            ></el-pagination>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addOrder_addgoods=false">取消</el-button>
                <el-button @click="deleteRow" type="primary">保存</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                search:{
                    ddbh:"",
                    rylx:"制单人员",
                    ry:"",
                    ddzt:"",
                    zdsj:"",
                    timelx:"",
                    date:[]
                },
                rylx:[{Id:"1",Name:"制单人员"},{Id:"2",Name:"审核人员"}],
                ddzt:[{Id:"1",Name:"全部"},{Id:"2",Name:"待审核"},{Id:"3",Name:"审核通过"},{Id:"4",Name:"审核不通过"}],
                timelx:[{Id:"1",Name:"制单时间"},{Id:"2",Name:"采购周期"}],
                orderList:[],
                selectedList: [],
                currentPage4:1,
                editOrde:false,
                addOrderVisible:false,
                labelPosition: "right",
            
                addOrderForm:{
                    porderProducer:'',
                    porderWarehouse:'',
                    supplierId:'',
                    time:'',
                    suppliergoolsId:'',
                 
                   
                    porderTotalnum:0,
                    porderTotalmoney:0,
                    porderBuyexplain:'',
                    porderExplain:'',
                    pcommodityDos:[],
                },
                chaSupplierForm:{
                    a:''
                },
                gongyinshang:[],
                cangku:[],
                addOrderRules:{
                        Id:[],
                        zdry:[]
                },
                ck:[{Id:1,Name:"A仓库"},{Id:2,Name:"B仓库"}],
                gys:[{Id:1,Name:"A供应商"},{Id:2,Name:"B供应商"}],
                addSelectedList:[],
                addSelectedList_two:[],
                goods:[{},{}],
                allCount:0,
                allMoney:0,
                preMoney:0,
                addOrder_addgoods:false,
                addOrderFormGoods:{
                    Id:"",
                    Name:"",
                    gys:""
                },
                delarr:[],
                shangpi:[],
                
                
                addOrderGoodsRules:{
                },
                goods_two:[],
                AddGoods:[],
                value1:''
            }
        },
        created () {
            this.getList();
            this.getCha();
            this.getCookie();
        },
        methods:{
            jisuan(){
                this.addOrderForm.porderTotalnum =0;
                this.addOrderForm.porderTotalmoney=0;
            for (let index = 0; index < this.addOrderForm.pcommodityDos.length; index++) {
                
                if (isNaN(this.addOrderForm.pcommodityDos[index].pcommodityPrice)||isNaN(this.addOrderForm.pcommodityDos[index].pcommodityPalnnum)) { 
                    continue;
                }
                this.addOrderForm.porderTotalnum += parseInt(this.addOrderForm.pcommodityDos[index].pcommodityPalnnum);
                this.addOrderForm.porderTotalmoney += parseInt(this.addOrderForm.pcommodityDos[index].pcommodityPrice) * parseInt(this.addOrderForm.pcommodityDos[index].pcommodityPalnnum);
            }
            console.log(this.addOrderForm.porderTotalnum);
            
            },
            //读取cookie
      getCookie: function() {
          if (document.cookie.length > 0) {
              var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
              for (var i = 0; i < arr.length; i++) {
                  var arr2 = arr[i].split('='); //再次切割
                  //判断查找相对应的值
                  if (arr2[0] == 'userName') {
                    //  console.log(arr2[1])
                      this.addOrderForm.porderProducer = arr2[1]; //保存到保存数据的地方
                  } 
              }
               this.checked = true;
          }
      },
            ResetForm(formName){
                this.$refs.formName.resetFields();
                this.getList()
            },
            async getCha(){
            const { data: res } = await this.$http.post("jc/supplier/selectSupplier",{params:this.chaSupplierForm});
            const { data: res1 } = await this.$http.post("jc/Basic/selectwarehousing");
            this.gongyinshang = res.body.rows;
            this.cangku = res1;
            
            },
            async gongyingshangpi(){
                if(this.addOrderForm.supplierId==""){
                    this.$message({
                            type: "info",
                            message: "请选择供应商"
                        });
                }else{
            const { data: res } = await this.$http.post("jc/suppliergoods/selectSuppliergoolslist",{params:this.addOrderForm});
            console.log(res);
            this.shangpi=res.body.rows;
            this.addOrder_addgoods=true;
                }
            },
            handleSelectionChange(val) {
            
            this.selectedList = val;
            console.log(val);
            },
            // selected(){
            // this.delVisible = true;
            // this.delarr=[];
            // for (let i = 0; i < this.selectedList.length; i++) {
            //     this.delarr.push(this.selectedList[i].customerId)
            // }
            // console.log(this.delarr);
            // },
            async deleteRow(){
                
                this.delarr=[];
                for (let i = 0; i < this.selectedList.length; i++) {
                    this.delarr.push(this.selectedList[i].suppliergoolsId)
                }
                console.log(this.delarr);
                
                const {data:res} = await this.$http.post('jc/suppliergoods/selectSuppliergoolslistmore',this.delarr);
                this.addOrderForm.pcommodityDos=res;
                this.addOrder_addgoods=false;
            },
            async getList() {
                const { data: res1 } = await this.$http.post("jh/purchase/dtjresultMap");
                const { data: res } = await this.$http.post("jh/purchase/selectpurc");
                console.log(res1);
                this.orderList = res;
            },
            async del(){

            },
            async edit(){

            },
            async stop(){

            },
            a(value){
                alert(value)
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            handleClose(done) {
                this.$confirm("确认关闭？")
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            dialogClosed(){
                this.$refs.addOrderRef.resetFields();
            },
            closeAddGoods(){
                this.$refs.addOrderFormGoods.resetFields();
            },
           
            addSelectionChange(val) {
                this.addSelectedList = val
                console.log(val)
            },
            addSelectionChange_two(val){
                this.addSelectedList_two = val
                console.log(val)
            },
            deleteAddbumen(supplierId) {
                this.$confirm("此操作将移除商品, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(async () => {
                        // let param = new URLSearchParams();
                        // param.append("supplierId", supplierId);
                        // const { data: res } = await this.$http.post(
                        //     "/jc/supplier/deleteSupplier",
                        //     param
                        // );
                        console.log(supplierId);
                        // this.getSupplierList();

                        this.$message({
                            type: "success",
                            message: "删除成功!"
                        });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消删除"
                        });
                    });
            },
            addSave(){//保存采购订单
               this.$refs.addOrderRef.validate(async valid => {
                if (!valid) return;    
                const { data: res } = await this.$http.post("jh/purchase/createorder",this.addOrderForm);
                this.addOrderVisible = false;
                this.getList();
            });
               
            },
            chooseGoodsgys(){//选择供应商

            },
            getGoodsList(){//获取商品

            },
            ResetFormaddOrderFormGoods(){
                this.$refs.addOrderFormGoods.resetFields();
            },
            addGoodsToAddOrder(val){//添加商品到订单

            },
            editOneOrder(val){
                this.editOrde = true;
                this.addOrderVisible = true;
                // this.addOrderForm = this.list[0]//ajax请求后赋值
            },
            deletebumen(val) {
                this.$confirm("此操作将删除订单, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(async () => {
                        // let param = new URLSearchParams();
                        // param.append("supplierId", supplierId);
                        // const { data: res } = await this.$http.post(
                        //     "/jc/supplier/deleteSupplier",
                        //     param
                        // );
                        console.log(val);
                        // this.getSupplierList();

                        this.$message({
                            type: "success",
                            message: "删除成功!"
                        });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消删除"
                        });
                    });
            },
        }

    }
</script>

<style lang="less">
    .el-form-item{
        ._small{
            width: 150px;
        }
    }
    .w110{
        width: 110px;
        
    
    }
    .w500{
        width: 800px;
    }
    .el-table ,.el-pagination{
        margin-top: 15px;
    }
    .el-date-picker .el-input{
    width: 150px;
    }
    .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner{
        width: 300px;
    }
    .el-textarea {
    width: 225%;
    
}
hr{
    margin-bottom: 15px;
    
}
</style>
