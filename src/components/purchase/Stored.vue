<template>
    <div class="min1500">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>采购订单</el-breadcrumb-item>
            <el-breadcrumb-item>采购进度</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-form :inline="true" class="demo-form-inline search" :model="search" ref="search">
                <el-row :gutter="20" class="row">
                    <el-col :span="24">
                        <el-form-item label="订单编号：">
                            <el-input placeholder="请输入订单编号" class="_small"></el-input>
                        </el-form-item>
                        <el-form-item prop="rylx">
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
                        
                        <el-form-item label="入库仓库：" prop="ddzt">
                            <el-select v-model="search.ddzt" placeholder="请选择" class="_small">
                                <el-option
                                        v-for="item in ddzt"
                                        :key="item.Id"
                                        :label="item.Name"
                                        :value="item.Name">
                                </el-option>
                            </el-select>
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
                        <el-form-item prop="rylx1">
                            <el-input placeholder="请输入时间" class="input-with-select" style="width: 250px">
                                <el-select v-model="search.rylx1" slot="prepend" placeholder="请选择"  style="width: 110px">
                                <el-option
                                    v-for="item in rylx1"
                                    :key="item.Id"
                                    :label="item.Name"
                                    :value="item.Name">
                                </el-option>
                                </el-select>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="ry">
                            
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="getList">查询</el-button>
                            <el-button type="primary" @click="ResetForm('search')">重置</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-table border :data="orderList" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="40"></el-table-column>
                <el-table-column type="index" width="40"></el-table-column>
                <el-table-column prop="aaa" label="采购订单编号" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="x" label="供应商" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="x" label="预付款金额"></el-table-column>
                <el-table-column prop="x" label="订单总金额"></el-table-column>
                <el-table-column prop="x" label="采购总数量"></el-table-column>
                <el-table-column prop="x" label="到货数量"></el-table-column>
                <el-table-column prop="x" label="差异数量"></el-table-column>
                <el-table-column prop="x" label="入库仓库"></el-table-column>
                <el-table-column prop="x" label="到货情况"></el-table-column>
                <el-table-column prop="x" label="采购员"></el-table-column>
                <el-table-column prop="x" label="制单时间"></el-table-column>
                <el-table-column prop="x" label="订单状态"></el-table-column>
                <el-table-column prop="x" label="审核时间"></el-table-column>
                <el-table-column label="操作" width="190px">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="look(scope.row)">查看</el-button>
                        <el-button type="danger" icon="el-icon-circle-close" size="mini" @click="stopOrder(scope.row)">终止</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog
                title="查看"
                :visible.sync="lookVisible"
                width="50%"
                :before-close="handleClose"
                @close="$refs.delivery.resetFields();"
        >
            <el-tabs  type="border-card" @tab-click="handleClick" value="first">
                <el-tab-pane label="基础信息" name="first">
                    <el-form label-width="100px">
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="采购订单编号: ">
                                    <span class="content">{{order.Id}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="制单人: ">
                                    <span class="content">{{order.zdr}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="采购订单编号: ">
                                    <span class="content">{{order.rkck}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="采购人员: ">
                                    <el-select  v-model="orderCgry">
                                        <el-option v-for="item in order.cgry" :key="item.Id" :label="item.Name" :value="item.Name"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="供应商: ">
                                    <span class="content">{{order.rkck}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="供应商: ">
                                    <span class="content">{{order.ddzt}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-form-item label="采购描述">
                                <el-input
                                        type="textarea"
                                        :rows="2"
                                        :readonly="true"
                                        :value="order.cgms"
                                ></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row class="title">
                            采购商品信息
                        </el-row>
                        <el-row>
                            <el-table :data="order.goods" border>
                                <el-table-column prop="id" label="商品大类型"></el-table-column>
                                <el-table-column prop="id" label="商品小类型" width="100px"></el-table-column>
                                <el-table-column prop="id" label="品牌"></el-table-column>
                                <el-table-column prop="id" label="克重"></el-table-column>
                                <el-table-column prop="id" label="门幅"></el-table-column>
                                <el-table-column prop="id" label="淋膜类型"></el-table-column>
                                <el-table-column prop="id" label="采购单价"></el-table-column>
                                <el-table-column prop="id" label="预计采购数量(KG)" width="160px"></el-table-column>
                                <el-table-column prop="id" label="金额"></el-table-column>
                            </el-table>
                        </el-row>
                        <el-row>
                            <el-col :span="10" style="float: right;margin: 15px 0">
                                <el-col :span="10">
                                    总金额：{{order.allMoney}}
                                </el-col>
                                <el-col :span="10">
                                    总数量：{{order.allCount}}
                                </el-col>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="订单金额">
                                    <el-input :value="order.Money" :readonly="true"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="订单金额">
                                    <el-input :value="order.Money" :readonly="true"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="20">
                                <el-form-item label="付款说明">
                                    <el-input :rows="2" type="textarea" :value="order.Money" :readonly="true"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                    <el-row class="title">
                        采购审核(初审)
                    </el-row>
                    <el-form label-position="left" label-width="0px" ref="chushen" :model="order">
                        <el-row style="text-align: center">
                            <el-col :span="6">
                                <el-row class="top">
                                    审核人
                                </el-row>
                            </el-col>
                            <el-col :span="6">
                                <el-row class="top">
                                    审核结果
                                </el-row>
                            </el-col>
                            <el-col :span="6">
                                <el-row  class="top">
                                    审核时间
                                </el-row>
                            </el-col>
                            <el-col :span="6">
                                <el-row  class="top">
                                    备注
                                </el-row>
                            </el-col>
                        </el-row>
                        <el-row style="text-align: center" type="flex" align="middle">
                            <el-col :span="6">
                                <el-row>
                                    <el-form-item>
                                        <span class="content look">{{order.shenheren}}</span>
                                    </el-form-item>
                                </el-row>
                            </el-col>
                            <el-col :span="6">
                                <el-row>
                                    <el-form-item>
                                        <span class="content">{{order.jieguo}}</span>
                                    </el-form-item>
                                </el-row>
                            </el-col>
                            <el-col :span="6">
                                <el-row>
                                    <el-form-item>
                                        <span class="content">{{order.sjian}}</span>
                                    </el-form-item>
                                </el-row>
                            </el-col>
                            <el-col :span="6">
                                <el-row>
                                    <el-form-item prop="beizhu1">
                                        <el-input type="textarea" :rows="2" :readonly="true" v-model="order.beizhu1"></el-input>
                                    </el-form-item>
                                </el-row>
                            </el-col>
                        </el-row>
                        <el-row style="margin-top: 15px">
                            <el-form-item label="审核描述" label-width="70px" prop="miaoshu">
                                <el-input type="textarea" :rows="2" :readonly="true" v-model="order.miaoshu"></el-input>
                            </el-form-item>
                        </el-row>

                    </el-form>
                    <el-row class="title">
                        财务审核(复审)
                    </el-row>
                    <el-form label-position="left" label-width="90px" ref="ershen" :model="ershen">
                        <el-row style="text-align: center">
                            <el-col :span="6">
                                <el-row class="top">
                                    审核人
                                </el-row>
                            </el-col>
                            <el-col :span="6">
                                <el-row class="top">
                                    审核结果
                                </el-row>
                            </el-col>
                            <el-col :span="6">
                                <el-row  class="top">
                                    审核时间
                                </el-row>
                            </el-col>
                            <el-col :span="6">
                                <el-row  class="top">
                                    备注
                                </el-row>
                            </el-col>
                        </el-row>
                        <el-row style="text-align: center" type="flex" align="middle">
                            <el-col :span="6">
                                <el-row>
                                    <el-form-item label-width="0">
                                        <span class="content look">{{ershen.user}}</span>
                                    </el-form-item>
                                </el-row>
                            </el-col>
                            <el-col :span="6">
                                <el-row>
                                    <el-form-item label-width="0">
                                        <span class="content">{{ershen.jieguo}}</span>
                                    </el-form-item>
                                </el-row>
                            </el-col>
                            <el-col :span="6">
                                <el-row>
                                    <el-form-item label-width="0">
                                        <span class="content">{{ershen.date}}</span>
                                    </el-form-item>
                                </el-row>
                            </el-col>
                            <el-col :span="6">
                                <el-row>
                                    <el-form-item prop="beizhu" label-width="0">
                                        <el-input type="textarea" :readonly="true" :rows="2"  v-model="ershen.beizhu"></el-input>
                                    </el-form-item>
                                </el-row>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="关联付款单" prop="guanlian">
                                    <el-input :readonly="true" v-model="ershen.guanlian"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row style="margin-top: 15px">
                            <el-form-item label="审核描述" prop="shenhemiaoshu">
                                <el-input type="textarea" :rows="2" :readonly="true" v-model="ershen.shenhemiaoshu"></el-input>
                            </el-form-item>
                        </el-row>

                    </el-form>
                    <el-row class="title">
                        到货情况（未到货、部分到货、已到货）
                    </el-row>
                    <el-form :model="delivery" ref="delivery" label-position="right" label-width="90px" style="margin-top: 15px">
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="到货数量" prop="dhsl">
                                    <el-input v-model="delivery.dhsl"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="差异数量" prop="cysl">
                                    <el-input v-model="delivery.cysl"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="到货情况">
                                    <el-input :value="dhqk" :readonly="true"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                    <el-row>
                        <el-col :span="7" style="float: right">
                            <el-button @click="Save" type="primary">保存</el-button>
                            <el-button @click="lookVisible=false">取消</el-button>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="操作日志" name="second">

                </el-tab-pane>
            </el-tabs>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                search:{
                    id:"",
                    ck:"",
                    rylx:"制单人员",
                    rylx1:"创建时间",

                    shsj:"",
                    zdsj:""
                },
                ck:[
                    {Id:1,Name:"原材料仓库"},
                    {Id:2,Name:"半成品仓库"},
                    {Id:3,Name:"成品仓库"}
                ],
                type:[
                    {Id:1,Name:"全部"},
                    {Id:2,Name:"待审核"},
                    {Id:3,Name:"以审核"}
                ],
                rylx:[
                    {Id:1,Name:"制单人员"},
                    {Id:2,Name:"审核人员"}
                ],
                rylx1:[
                    {Id:1,Name:"创建时间"},
                    {Id:2,Name:"审批时间"}
                ],
                state:[
                    {select:"primary",Name:"采购中"},
                    {select:"primary",Name:"待入库"},
                    {select:"primary",Name:"已入库"}
                ],
                orderList:[{x:""}],
                selectedList:[],
                lookVisible:false,
                order:{
                    Id:"反显",
                    zdr:"反显",
                    rkck:"反显",
                    cgry:[{Id:1,Name:1},{Id:2,Name:2}],
                    ddzt:"待采购审核",
                    cgms:"aaaaaaa",
                    allMoney: 0,
                    allCount: 0,
                    Money:0,
                    shenheren:"反显",
                    jieguo:"通过",
                    sjian:"2017-8-9 5:5:40",
                    beizhu1:"备注1",
                    miaoshu:"描述",
                    beizhu2:"备注2",
                    miaoshu2:"描述2",
                    pass:"",
                },
                ershen:{
                    pass:"通过",
                    beizhu:"",
                    shenhemiaoshu:"",
                    guanlian:"",
                    user:"用户",
                    date:"2019-9-9 5:4:3",
                    jieguo:"通过"
                },
                orderCgry:1,
                lookVisible:false,
                delivery:{
                    dhsl:"",
                    cysl:""
                }
            }
        },
        methods:{
            stateChange(val){
                this.state[val].select = this.state[val].select == "" ? "primary" :""
                console.log(this.state[val])
            },
            handleSelectionChange(val) {
                this.selectedList = val
            },
            look(){
                this.lookVisible = true
            },
            stopOrder(val){

            },
            handleClose(done) {
                this.$confirm("确认关闭？")
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            handleClick(tab) {
                console.log(tab.label);
            },
            Save(){

            },
        },
        computed: {
            'dhqk': function(){
                if(this.delivery.cysl == "" || this.delivery.dhsl == "")
                    return
                return this.delivery.cysl == 0 ? "已到货" : this.delivery.dhsl == 0 ? "未到货" : "部分到货"
            }
        }
    }
</script>

<style>
    .title{
        background: #eeeeee;
        padding: 10px 5px;
    }
</style>
