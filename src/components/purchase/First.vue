<template>
    <div class="min1500">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>进货管理</el-breadcrumb-item>
            <el-breadcrumb-item>采购审批</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-form :model="search" ref="search" label-position="right" label-width="120px">
                <el-row>
                    <el-col :span='5'>
                        <el-form-item label="采购订单编号" prop="id">
                            <el-input v-model="search.id"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="入库仓库" prop="ck">
                            <el-select v-model="search.ck">
                                <el-option v-for="item in ck" :key="item.Id" :label="item.Name" :value="item.Name"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="订单状态" prop="type">
                            <el-select v-model="search.type">
                                <el-option v-for="item in type" :key="item.Id" :label="item.Name" :value="item.Name"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="2">
                        <el-form-item label-width="0px" prop="rylx">
                            <el-select v-model="search.rylx">
                                <el-option v-for="item in rylx" :key="item.Id" :label="item.Name" :value="item.Name"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item label-width="10px" prop="ry">
                            <el-input v-model="search.ry"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="审核时间" prop="shsj">
                            <el-date-picker
                                    v-model="search.shsj"
                                    type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    format="yyyy年MM月dd日"
                                    value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="制单时间" prop="zdsj">
                            <el-date-picker
                                    v-model="search.zdsj"
                                    type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    format="yyyy年MM月dd日"
                                    value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <div style="float: right">
                            <el-button>查询</el-button>
                            <el-button type="primary" @click="$refs.search.resetFields()">重置</el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-form>
            <el-row>
                <el-col>
                    <el-button type="primary">已审核</el-button>
                    <el-button type="primary">未审核</el-button>
                </el-col>
            </el-row>
            <el-table border :data="orderList" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
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
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="shenhe(scope.row);second=false">一审</el-button>
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="shenhe(scope.row);second=true">二审</el-button>
                        <el-button type="danger" icon="el-icon-circle-close" size="mini" @click="stopOrder(scope.row)">终止</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog
            title="审核订单"
            :visible.sync="shenheType"
            width="50%"
            :before-close="handleClose"
            @closed="$refs.chushen.resetFields();$refs.ershen.resetFields();$refs.chushen.resetFields();NowDate = getDate()"
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
                        <el-row>
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
                    <el-row>
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
                                <el-row v-if="second">
                                    <el-form-item>
                                        <span class="content look">{{order.shenheren}}</span>
                                    </el-form-item>
                                </el-row>
                                <el-row v-else>
                                    <el-form-item>
                                        <span class="content look">{{user}}</span>
                                    </el-form-item>
                                </el-row>
                            </el-col>
                            <el-col :span="6">
                                <el-row v-if="second">
                                    <el-form-item>
                                        <span class="content">{{order.jieguo}}</span>
                                    </el-form-item>
                                </el-row>
                                <el-row v-else>
                                    <el-form-item prop="pass">
                                        <el-radio v-model="order.pass" label="true">通过</el-radio>
                                        <el-radio v-model="order.pass" label="false">不通过</el-radio>
                                    </el-form-item>
                                </el-row>
                            </el-col>
                            <el-col :span="6">
                                <el-row v-if="second">
                                    <el-form-item>
                                        <span class="content">{{order.sjian}}</span>
                                    </el-form-item>
                                </el-row>
                                <el-row v-else>
                                    <el-form-item>
                                        <span class="content">{{NowDate}}</span>
                                    </el-form-item>
                                </el-row>
                            </el-col>
                            <el-col :span="6">
                                <el-row v-if="second">
                                    <el-form-item prop="beizhu1">
                                        <el-input type="textarea" :rows="2" :readonly="true" v-model="order.beizhu1"></el-input>
                                    </el-form-item>
                                </el-row>
                                <el-row v-else>
                                    <el-form-item prop="beizhu1">
                                        <el-input type="textarea" :rows="2"  v-model="order.beizhu1"></el-input>
                                    </el-form-item>
                                </el-row>
                            </el-col>
                        </el-row>
                        <el-row style="margin-top: 15px">
                            <el-form-item v-if="second" label="审核描述" label-width="70px" prop="miaoshu">
                                <el-input type="textarea" :rows="2" :readonly="true" v-model="order.miaoshu"></el-input>
                            </el-form-item>
                            <el-form-item v-else label="审核描述" label-width="70px" prop="miaoshu">
                                <el-input type="textarea" :rows="2" v-model="order.miaoshu"></el-input>
                            </el-form-item>
                        </el-row>

                    </el-form>
                    <el-row v-if="second">
                        财务审核(复审)
                    </el-row>
                    <el-form v-if="second" label-position="left" label-width="90px" ref="ershen" :model="ershen">
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
                                    <span class="content look">{{user}}</span>
                                </el-row>
                            </el-col>
                            <el-col :span="6">
                                <el-row>
                                    <el-form-item prop="pass">
                                        <el-radio v-model="ershen.pass" label="true">通过</el-radio>
                                        <el-radio v-model="ershen.pass" label="false">不通过</el-radio>
                                    </el-form-item>
                                </el-row>
                            </el-col>
                            <el-col :span="6">
                                <el-row>
                                    <span class="content">{{NowDate}}</span>
                                </el-row>
                            </el-col>
                            <el-col :span="6">
                                <el-row>
                                    <el-form-item prop="beizhu">
                                        <el-input type="textarea" :rows="2"  v-model="ershen.beizhu"></el-input>
                                    </el-form-item>
                                </el-row>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="关联付款单" prop="guanlian">
                                    <el-input v-model="ershen.guanlian"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row style="margin-top: 15px">
                            <el-form-item label="审核描述" prop="shenhemiaoshu">
                                <el-input type="textarea" :rows="2" v-model="ershen.shenhemiaoshu"></el-input>
                            </el-form-item>
                        </el-row>

                    </el-form>
                    <el-row>
                        <el-col :span="10" style="float: right">
                            <el-button @click="Save" type="primary">保存</el-button>
                            <el-button @click="shenheType=false">取消</el-button>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="操作日志" name="second">

                </el-tab-pane>
            </el-tabs>
            <el-form>

            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data(){
            function getDate(){
                var date = new Date();
                return date.getFullYear()+'-'+date.getMonth()+"-"+date.getDay()+" "+date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
            }
            return{
                search:{
                    id:"",
                    ck:"",
                    rylx:"制单人员",
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
                orderList:[{x:""}],
                selectedList:[],
                shenheType:false,
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
                orderCgry:1,
                second:true,
                user:1,

                NowDate: getDate(),
                ershen:{
                    pass:"",
                    beizhu:"",
                    shenhemiaoshu:"",
                    guanlian:""
                }
            }
        },
        methods:{
            handleSelectionChange(val) {
                this.selectedList = val
            },
            shenhe(val){
                this.shenheType = true
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
            getDate(){
                var date = new Date();
                return date.getFullYear()+'-'+date.getMonth()+"-"+date.getDay()+" "+date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
            }
        }
    }
</script>

<style>
    .content{
        background: #eeeeee;padding: 5px 10px

    }
    .top{
        margin: 20px 0;
    }
</style>
