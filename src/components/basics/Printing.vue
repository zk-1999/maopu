<template>
    <div class="min1500">
       <!-- 面包屑导航区域 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>基础资料</el-breadcrumb-item>
        <el-breadcrumb-item>印刷参数</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
        <el-row :gutter="20" class="row">
          <el-col :span="24">
             <el-row :gutter="20">
                <el-form :inline="true" class="demo-form-inline" :model="chaPrintingForm" ref="chaPrintingRef">
                    <el-form-item label="编号：" prop="parametersId">
                    <el-input placeholder="请输入编号" v-model="chaPrintingForm.parametersId"></el-input>
                    </el-form-item>
                    <el-form-item label="类型：" prop="productType">
                    <el-select v-model="chaPrintingForm.productType" placeholder="请选择">
                  <el-option
                    v-for="item in chanpingleixing"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicRetainone">
                  </el-option>
                </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="getPrintingList">查询</el-button>
                        <el-button type="primary" @click="chaPrintingResetForm">重置</el-button>
                    </el-form-item>
                </el-form>
        </el-row>
          <el-button type="success" @click="addyonghuDialogVisible = true">新增</el-button>
          <el-button
            type="warning"
            @click="selectedqi"
            :disabled="selectedList.length == 0"
          >批量启用/禁用</el-button>
          <el-button type="danger" @click="selected" :disabled="selectedList.length == 0">批量删除</el-button>
          <el-table border stripe :data="PrintingList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="35" fixed="left"></el-table-column>
            <el-table-column type="index" width="55" align="center" label="序号" fixed="left"></el-table-column>
            <el-table-column prop="parametersId" label="编号" ></el-table-column>
            <el-table-column prop="parametersName" label="型号"></el-table-column>
            <el-table-column prop="productType" label="类型"></el-table-column>
            <el-table-column prop="parametersSingle" label="单齿长"></el-table-column>
            <el-table-column prop="parametersSinglenum" label="齿数"></el-table-column>
            <el-table-column prop="parametersPaperwidth" label="纸宽"  width="90px"></el-table-column>
            <el-table-column prop="parametersTeethnum" label="片数" ></el-table-column>
            <el-table-column prop="parametersDoorwidth" label="纸张"  width="90px"></el-table-column>
            <el-table-column prop="parametersDoornum" label="片数" ></el-table-column>
            <el-table-column prop="parametersUsablepaper" label="可用纸长"></el-table-column>
            <el-table-column prop="parametersPlanpaper" label="计划纸长"></el-table-column>
            <el-table-column prop="parametersVolume" label="放量"></el-table-column>
            <el-table-column prop="parametersNumber" label="片数"></el-table-column>
            <el-table-column prop="parametersMetre" label="印刷米数"></el-table-column>
            <el-table-column prop="parametersWeight" label="印刷重量"></el-table-column>
            <el-table-column prop="parametersMachine" label="机台号"></el-table-column>
            <el-table-column prop="parametersMould" label="模具号"></el-table-column>
            <el-table-column prop="parametersCapacity" label="产能"></el-table-column>
            <el-table-column label="状态" width="60px" fixed="right">
              <template slot-scope="scope">
                <!-- {{scope.row}} -->
                <el-switch
                  v-model="scope.row.parametersState"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                  @change="userStateChanged(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="180px" fixed="right">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditPrinting(scope.row.pId)">修改</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletebumen(scope.row.pId)"
                  size="mini"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table></el-col>
        </el-row>
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10]"
        :page-size="100"
        layout="total, sizes, prev, pager, next"
        :total=total
      ></el-pagination>
      </el-card>
      <el-dialog
        title="新增印刷参数"
        :visible.sync="addyonghuDialogVisible"
        width="50%"
        :before-close="handleClose"
        @closed="dialogClosed">
        <el-form :label-position="labelPosition" label-width="120px" 
        :model="addPrintingForm"
        ref="addPrintingRef"
        :rules="addPrintingRules">
            <el-row>
                <el-col :span="12">
                <el-form-item label="产品编号：" prop="parametersId"><el-input placeholder="请输入产品编号" v-model="addPrintingForm.parametersId"></el-input></el-form-item>
                <el-form-item label="产品型号：" prop="parametersName"><el-input placeholder="请输入产品型号" v-model="addPrintingForm.parametersName"></el-input></el-form-item>
                <el-form-item label="产品类型：" prop="productType">
                <el-select v-model="addPrintingForm.productType" placeholder="请选择">
                  <el-option
                    v-for="item in chanpingleixing"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicRetainone">
                  </el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="单齿长/尺数：" prop="parametersSingle"><el-input placeholder="单齿长/尺数" v-model="addPrintingForm.parametersSingle"></el-input></el-form-item>
                <el-form-item label="齿数/尺数：" prop="parametersSinglenum"><el-input placeholder="齿数/尺数" v-model="addPrintingForm.parametersSinglenum"></el-input></el-form-item>          
                <el-form-item label="纸宽/尺数：" prop="parametersPaperwidth"><el-input placeholder="纸宽/尺数" v-model="addPrintingForm.parametersPaperwidth"></el-input></el-form-item>
                <el-form-item label="片数/尺数：" prop="parametersTeethnum"><el-input placeholder="片数/尺数" v-model="addPrintingForm.parametersTeethnum"></el-input></el-form-item>          
                <el-form-item label="纸张/净门幅：" prop="parametersDoorwidth"><el-input placeholder="纸张/净门幅" v-model="addPrintingForm.parametersDoorwidth"></el-input></el-form-item>
                <el-form-item label="片数/净门幅：" prop="parametersDoornum"><el-input placeholder="片数/净门幅" v-model="addPrintingForm.parametersDoornum"></el-input></el-form-item>
                </el-col>
                <el-col :span="12"> 
                <el-form-item label="可用纸长：" prop="parametersUsablepaper"><el-input placeholder="请输入可用纸长" v-model="addPrintingForm.parametersUsablepaper"></el-input></el-form-item>
                <el-form-item label="计划纸长：" prop="parametersPlanpaper"><el-input placeholder="请输入计划纸长" v-model="addPrintingForm.parametersPlanpaper"></el-input></el-form-item>
                <el-form-item label="放量：" prop="parametersVolume"><el-input placeholder="请输入放量" v-model="addPrintingForm.parametersVolume"></el-input></el-form-item>          
                <el-form-item label="片数：" prop="parametersNumber"><el-input placeholder="请输入片数" v-model="addPrintingForm.parametersNumber"></el-input></el-form-item>
                <el-form-item label="单个米数：" prop="parametersMetre"><el-input placeholder="请输入单个米数" v-model="addPrintingForm.parametersMetre"></el-input></el-form-item>
                <el-form-item label="单个重量：" prop="parametersWeight"><el-input placeholder="请输入单个重量" v-model="addPrintingForm.parametersWeight"></el-input></el-form-item>
                <el-form-item label="机台号：" prop="parametersMachine"><el-input placeholder="请输入机台号" v-model="addPrintingForm.parametersMachine"></el-input></el-form-item>
                <el-form-item label="模具号：" prop="parametersMould"><el-input placeholder="请输入模具号" v-model="addPrintingForm.parametersMould"></el-input></el-form-item>          
                <el-form-item label="产能：" prop="parametersCapacity"><el-input placeholder="请输入产能" v-model="addPrintingForm.parametersCapacity"></el-input></el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addyonghuDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addPrinting">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="编辑印刷参数"
        :visible.sync="edityonghuDialogVisible"
        width="48%"
        :before-close="handleClose"
        @closed="dialogClosed">
       <el-form :label-position="labelPosition" label-width="120px" :model="editPrintingForm" ref="addPrintingRef" :rules="addPrintingRules">
            <el-row>
                <el-col :span="12">
                <el-form-item label="产品编号：" prop="parametersId"><el-input placeholder="请输入产品编号" v-model="editPrintingForm.parametersId"></el-input></el-form-item>
                <el-form-item label="产品型号：" prop="parametersName"><el-input placeholder="请输入产品型号" v-model="editPrintingForm.parametersName"></el-input></el-form-item>
                <el-form-item label="产品类型：" prop="productType">
                <el-select v-model="editPrintingForm.productType" placeholder="请选择">
                  <el-option
                    v-for="item in chanpingleixing"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicRetainone">
                  </el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="单齿长/尺数：" prop="parametersSingle"><el-input placeholder="单齿长/尺数" v-model="editPrintingForm.parametersSingle"></el-input></el-form-item>
                <el-form-item label="齿数/尺数：" prop="parametersSinglenum"><el-input placeholder="齿数/尺数" v-model="editPrintingForm.parametersSinglenum"></el-input></el-form-item>          
                <el-form-item label="纸宽/尺数：" prop="parametersPaperwidth"><el-input placeholder="纸宽/尺数" v-model="editPrintingForm.parametersPaperwidth"></el-input></el-form-item>
                <el-form-item label="片数/尺数：" prop="parametersTeethnum"><el-input placeholder="片数/尺数" v-model="editPrintingForm.parametersTeethnum"></el-input></el-form-item>          
                <el-form-item label="纸张/净门幅：" prop="parametersDoorwidth"><el-input placeholder="纸张/净门幅" v-model="editPrintingForm.parametersDoorwidth"></el-input></el-form-item>
                <el-form-item label="片数/净门幅：" prop="parametersDoornum"><el-input placeholder="片数/净门幅" v-model="editPrintingForm.parametersDoornum"></el-input></el-form-item>
                </el-col>
                <el-col :span="12"> 
                <el-form-item label="可用纸长：" prop="parametersUsablepaper"><el-input placeholder="请输入可用纸长" v-model="editPrintingForm.parametersUsablepaper"></el-input></el-form-item>
                <el-form-item label="计划纸长：" prop="parametersPlanpaper"><el-input placeholder="请输入计划纸长" v-model="editPrintingForm.parametersPlanpaper"></el-input></el-form-item>
                <el-form-item label="放量：" prop="parametersVolume"><el-input placeholder="请输入放量" v-model="editPrintingForm.parametersVolume"></el-input></el-form-item>          
                <el-form-item label="片数：" prop="parametersNumber"><el-input placeholder="请输入片数" v-model="editPrintingForm.parametersNumber"></el-input></el-form-item>
                <el-form-item label="单个米数：" prop="parametersMetre"><el-input placeholder="请输入单个米数" v-model="editPrintingForm.parametersMetre"></el-input></el-form-item>
                <el-form-item label="单个重量：" prop="parametersWeight"><el-input placeholder="请输入单个重量" v-model="editPrintingForm.parametersWeight"></el-input></el-form-item>
                <el-form-item label="机台号：" prop="parametersMachine"><el-input placeholder="请输入机台号" v-model="editPrintingForm.parametersMachine"></el-input></el-form-item>
                <el-form-item label="模具号：" prop="parametersMould"><el-input placeholder="请输入模具号" v-model="editPrintingForm.parametersMould"></el-input></el-form-item>          
                <el-form-item label="产能：" prop="parametersCapacity"><el-input placeholder="请输入产能" v-model="editPrintingForm.parametersCapacity"></el-input></el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="edityonghuDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editPrinting">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="提示" :visible.sync="delVisible" width="300px">
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="delVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteRow" >确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="delVisibleqi" width="300px">
      <div class="del-dialog-cnt">此操作将批量启用, 是否继续？</div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="delVisibleqi = false">取 消</el-button>
          <el-button type="primary" @click="deleteRowqi" >确 定</el-button>
      </span>
    </el-dialog>
    </div>
</template>
<script>
export default {
  data () {
    return {
      labelPosition: 'right',
      addyonghuDialogVisible: false,
      edityonghuDialogVisible:false,
      resetPassdialogVisible:false,
      delVisible:false,
      delVisibleqi:false,
      currentPage: 0,
      selectedList: [],
      PrintingList:[],
      delarr:[],
      addPrintingForm:{
        parametersId:'',
        parametersName:'',
        productType:'',
        parametersSingle:'',
        parametersSinglenum:'',
        parametersPaperwidth:'',
        parametersTeethnum:'',
        parametersDoorwidth:'',
        parametersDoornum:'',
        parametersUsablepaper:'',
        parametersPlanpaper:'',
        parametersVolume:'',
        parametersNumber:'',
        parametersMetre:'',
        parametersWeight:'',
        parametersMachine:'',
        parametersMould:'',
        parametersCapacity:'',
      },
      editPrintingForm:{
        parametersId:'',
        parametersName:'',
        productType:'',
        parametersSingle:'',
        parametersSinglenum:'',
        parametersPaperwidth:'',
        parametersTeethnum:'',
        parametersDoorwidth:'',
        parametersDoornum:'',
        parametersUsablepaper:'',
        parametersPlanpaper:'',
        parametersVolume:'',
        parametersNumber:'',
        parametersMetre:'',
        parametersWeight:'',
        parametersMachine:'',
        parametersMould:'',
        parametersCapacity:'',
      },
      chaPrintingForm:{
        parametersId:'',
        productType:'',
        pageCode: 1, //当前页
        pageSize: 10,//每页显示的记录数
      },
      total:0,
      chanpingleixing:[],
      addPrintingRules: {
          parametersId:[
          { required: true, message: '请输入内容', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],},
    }
  },
  created () {
    this.getPrintingList();
    this.getPrintingList1();
  },
  methods:{
    async getPrintingList() {
      const { data: res } = await this.$http.post("jc/Parameters/selectParameter",this.chaPrintingForm);
      this.total=res.body.total;
      this.PrintingList = res.body.rows;
    },
    async getPrintingList1() {
      const { data: res } = await this.$http.post("jc/Basic/selectProducttype");
      this.chanpingleixing = res;
    },
    async userStateChanged(userInfo) {
      const { data: res } = await this.$http.post("jc/Parameters/updateparameterstate",userInfo);
      this.getPrintingList();
      if (res.body.respCode==500) {
          this.$message({
            type: "info",
            message: res.body.msg
          }); 
        }else{
          this.$message({
            type: "success",
            message: res.body.msg
          });
        }
    },
    addPrinting() {
      this.$refs.addPrintingRef.validate(async valid => {
        if (!valid) return;    
        const { data: res } = await this.$http.post("jc/Parameters/addParameters",this.addPrintingForm);
        this.$message.success("用户创建成功！");
        this.getPrintingList();
        this.addyonghuDialogVisible = false;
        if (res.body.respCode==500) {
          this.$message({
            type: "info",
            message: res.body.msg
          }); 
        }else{
          this.$message({
            type: "success",
            message: res.body.msg
          });
        }
      });
    },
    async showEditPrinting(pId){
      let param = new URLSearchParams();
      param.append("pId", pId);
      const {data:res} = await this.$http.post('jc/Parameters/selectParameterbyid',param);
      this.editPrintingForm=res;
      this.edityonghuDialogVisible=true;
    },
    async editPrinting(){
       const {data:res} = await this.$http.post('jc/Parameters/updateParameter',this.editPrintingForm);
       this.getPrintingList();
       this.edityonghuDialogVisible=false;
       if (res.body.respCode==500) {
          this.$message({
            type: "info",
            message: res.body.msg
          }); 
        }else{
          this.$message({
            type: "success",
            message: res.body.msg
          });
        }
    },
     chaPrintingResetForm(formName){
        this.$refs.chaPrintingRef.resetFields();
        this.getPrintingList();
    },
    dialogClosed(){
        this.$refs.addPrintingRef.resetFields();
      },
    selectedqi(){
      this.delarr=[];
      this.delVisibleqi = true;
      for (let i = 0; i < this.selectedList.length; i++) {
        this.delarr.push({pId:this.selectedList[i].pId,parametersState:this.selectedList[i].parametersState==1?0:1})
      }
    },
    selected(){
      this.delarr=[];
      this.delVisible = true;
      for (let i = 0; i < this.selectedList.length; i++) {
        this.delarr.push(this.selectedList[i].pId)
      }
    },
    async deleteRow(){
         const {data:res} = await this.$http.post('jc/Parameters/deleteParametermore',this.delarr);
         this.delVisible = false;
         this.getPrintingList();
         if (res.body.respCode==500) {
          this.$message({
            type: "info",
            message: res.body.msg
          }); 
        }else{
          this.$message({
            type: "success",
            message: res.body.msg
          });
        }
      },
      async deleteRowqi(){
         const {data:res} = await this.$http.post('jc/Parameters/updateparameterstatemore',this.delarr);
         this.delVisibleqi = false;
         this.getPrintingList();
         if (res.body.respCode==500) {
          this.$message({
            type: "info",
            message: res.body.msg
          }); 
        }else{
          this.$message({
            type: "success",
            message: res.body.msg
          });
        }
      },
    handleSelectionChange(val) {
      this.selectedList = val;
    },
     handleSizeChange(val) {
      this.chaPrintingForm.pageSize=val;
      this.getPrintingList();
    },
    handleCurrentChange(val) {
      this.chaPrintingForm.pageCode=val;
      this.currentPage=val;
      this.getPrintingList();
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    deletebumen(pId){
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let param = new URLSearchParams();
          param.append("pId", pId);
          const { data: res } = await this.$http.post(
            "jc/Parameters/deleteParameter",
            param
          );
          this.getPrintingList();
          if (res.body.respCode==500) {
          this.$message({
            type: "info",
            message: res.body.msg
          }); 
        }else{
          this.$message({
            type: "success",
            message: res.body.msg
          });
        }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
     handleNodeClick(data) {
        console.log(data);
     }
  }
}
</script>
<style lang='less' scoped>
    .el-card{
        margin-top: 15px;
    }
    .el-row{
        align-items: center;
        display: flex;
    }
    .el-table{
        margin-top: 15px;
    }
    .demo-form-inline .el-input{
      width: 170px;
    }
    .el-select{
      width: 230px;
    }
    .xiang{
      width: 400px;
    }
    .hu{
      width: 133px;
    }
    .el-col{
        .el-input{
            width: 200px;
        }
        .el-form-item{
          .el-select{
            width: 200px;
          }
        }
    }
</style>