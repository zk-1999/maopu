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
                    <!-- <el-form-item label="编号：" prop="parametersId">
                    <el-input placeholder="请输入编号" v-model="chaPrintingForm.parametersId"></el-input>
                    </el-form-item> -->
                    <el-form-item label="产品规格与名称：" prop="parametersName">
                    <el-select v-model="chaPrintingForm.parametersName" placeholder="请选择">
                  <el-option
                    v-for="item in chanpinguigeyumingcheng"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicId">
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
            <!-- <el-table-column prop="parametersId" label="编号" ></el-table-column>
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
            <el-table-column prop="parametersCapacity" label="产能"></el-table-column> -->
            <!-- <el-table-column prop="parametersName" label="纸张"  width="90px"></el-table-column> -->
            <el-table-column prop="parametersName" label="产品规格与名称" ></el-table-column>
            <el-table-column prop="parametersSingle" label="版辊齿数"></el-table-column>
            <el-table-column prop="parametersSinglenum" label="版辊周长"></el-table-column>
            <el-table-column prop="parametersTeethnum" label="周长片数"></el-table-column>
            <el-table-column prop="parametersDoorwidth" label="纸张门幅"></el-table-column>
            <el-table-column prop="parametersDoornum" label="门幅片数"></el-table-column>
            <el-table-column prop="parametersNumber" label="总片数"></el-table-column>
            <el-table-column label="状态" width="65px" fixed="right">
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
        
        :page-size="10"
        layout="total,  prev, pager, next"
        :total=total
      ></el-pagination>
      </el-card>
      <el-dialog
        title="新增印刷参数"
        :visible.sync="addyonghuDialogVisible"
        width="30%"
        :before-close="handleClose"
        @closed="dialogClosed">
        <el-form :label-position="labelPosition" label-width="150px" 
        :model="addPrintingForm" 
        ref="addPrintingRef" 
        :rules="addPrintingRules">
                <el-form-item label="产品规格与名称：" prop="parametersName">
                  <!-- <el-input placeholder="请输入产品名称与类型" v-model="addPrintingForm.parametersName"></el-input> -->
                  <el-select v-model="addPrintingForm.parametersName" placeholder="请选择">
                  <el-option
                    v-for="item in chanpinguigeyumingcheng"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicId">
                  </el-option>
                </el-select>
                  </el-form-item>
                <el-form-item label="版辊齿数：" prop="parametersSingle">
                  <!-- <el-input placeholder="请输入版辊齿数" v-model="addPrintingForm.parametersSingle"></el-input> -->
                  <el-select v-model="addPrintingForm.parametersSingle" placeholder="请选择">
                  <el-option
                    v-for="item in bangunchishu"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicId">
                  </el-option>
                </el-select>
                  </el-form-item>          
                <el-form-item label="版辊周长：" prop="parametersSinglenum">
                  <el-input placeholder="请输入版辊周长" v-model="addPrintingForm.parametersSingle*3.175" :disabled="true"></el-input>
                  </el-form-item>
                <el-form-item label="周长片数：" prop="parametersTeethnum">
                  <el-input placeholder="请输入周长片数" v-model="addPrintingForm.parametersTeethnum"></el-input>
                </el-form-item>
                <el-form-item label="纸张门幅：" prop="parametersDoorwidth">
                  <!-- <el-input placeholder="请输入纸张门幅" v-model="addPrintingForm.parametersDoorwidth"></el-input> -->
                  <el-select v-model="addPrintingForm.parametersDoorwidth" placeholder="请选择">
                  <el-option
                    v-for="item in zhizhangmenfu"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicId">
                  </el-option>
                </el-select>
                  </el-form-item>          
                <el-form-item label="门幅片数：" prop="parametersDoornum">
                  <el-input placeholder="请输入门幅片数" v-model="addPrintingForm.parametersDoornum"></el-input>
                
                </el-form-item>
                <el-form-item label="总片数：" prop="parametersNumber">
                  <el-input placeholder="请输入总片数" v-model="addPrintingForm.parametersTeethnum*addPrintingForm.parametersDoornum" :disabled="true"></el-input>
                  </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addyonghuDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addPrinting">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="编辑印刷参数"
        :visible.sync="edityonghuDialogVisible"
        width="30%"
        :before-close="handleClose"
        @closed="dialogClosed">
       <el-form :label-position="labelPosition" label-width="140px" :model="editPrintingForm" ref="addPrintingRef" :rules="addPrintingRules">
          <el-form-item label="产品规格与名称：" prop="parametersName">
                  <!-- <el-input placeholder="请输入产品名称与类型" v-model="addPrintingForm.parametersName"></el-input> -->
                  <el-select v-model="editPrintingForm.parametersName" placeholder="请选择">
                  <el-option
                    v-for="item in chanpinguigeyumingcheng"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicId">
                  </el-option>
                </el-select>
                  </el-form-item>
                <el-form-item label="版辊齿数：" prop="parametersSingle">
                  <!-- <el-input placeholder="请输入版辊齿数" v-model="addPrintingForm.parametersSingle"></el-input> -->
                  <el-select v-model="editPrintingForm.parametersSingle" placeholder="请选择">
                  <el-option
                    v-for="item in bangunchishu"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicId">
                  </el-option>
                </el-select>
                  </el-form-item>          
                <el-form-item label="版辊周长：" prop="parametersSinglenum">
                  <el-input placeholder="请输入版辊周长" v-model="editPrintingForm.parametersSingle*3.175" :disabled="true"></el-input>
                  </el-form-item>
                <el-form-item label="周长片数：" prop="parametersTeethnum">
                  <el-input placeholder="请输入周长片数" v-model="editPrintingForm.parametersTeethnum"></el-input>
                </el-form-item>
                <el-form-item label="纸张门幅：" prop="parametersDoorwidth">
                  <!-- <el-input placeholder="请输入纸张门幅" v-model="addPrintingForm.parametersDoorwidth"></el-input> -->
                  <el-select v-model="editPrintingForm.parametersDoorwidth" placeholder="请选择">
                  <el-option
                    v-for="item in zhizhangmenfu"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicId">
                  </el-option>
                </el-select>
                  </el-form-item>          
                <el-form-item label="门幅片数：" prop="parametersDoornum">
                  <el-input placeholder="请输入门幅片数" v-model="editPrintingForm.parametersDoornum"></el-input>
                
                </el-form-item>
                <el-form-item label="总片数：" prop="parametersNumber">
                  <el-input placeholder="请输入总片数" v-model="editPrintingForm.parametersTeethnum*editPrintingForm.parametersDoornum" :disabled="true"></el-input>
                  </el-form-item>
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
        // parametersName:'',
        // productType:'',
        // parametersSingle:'',
        // parametersSinglenum:'',
        // parametersPaperwidth:'',
        // parametersTeethnum:'',
        // parametersDoorwidth:'',
        // parametersDoornum:'',
        // parametersUsablepaper:'',
        // parametersPlanpaper:'',
        // parametersVolume:'',
        // parametersNueditPrintingFormmber:'',
        // parametersMetre:'',
        // parametersWeight:'',
        // parametersMachine:'',
        // parametersMould:'',
        // parametersCapacity:'',
        parametersName:'',
        parametersDoorwidth:'',
        parametersDoornum:'',
        parametersSingle:'',
        parametersSinglenum:'',
        parametersNumber:'',
        parametersTeethnum:'',
      },
      editPrintingForm:{
        parametersId:'',
        // parametersName:'',
        // productType:'',
        // parametersSingle:'',
        // parametersSinglenum:'',
        // parametersPaperwidth:'',
        // parametersTeethnum:'',
        // parametersDoorwidth:'',
        // parametersDoornum:'',
        // parametersUsablepaper:'',
        // parametersPlanpaper:'',
        // parametersVolume:'',
        // parametersNumber:'',
        // parametersMetre:'',
        // parametersWeight:'',
        // parametersMachine:'',
        // parametersMould:'',
        // parametersCapacity:'',
        parametersName:'',
        parametersDoorwidth:'',
        parametersDoornum:'',
        parametersSingle:'',
        parametersSinglenum:'',
        parametersNumber:'',
        parametersTeethnum:'',
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
          chanpinguigeyumingcheng:[],
          bangunchishu:[],
          zhizhangmenfu:[],
    }
    
  },
  created () {
    this.getPrintingList();
    this.list();
  },
  methods:{
    async list(){
      const { data: res } = await this.$http.post("jc/Basic/selectspecificationsname");
      const { data: res1 } = await this.$http.post("jc/Basic/selectsinglenum");
      const { data: res2 } = await this.$http.post("jc/Basic/selectparperdoor");
      for (let index = 0; index < res.length; index++) {
      if(res[index].basicRetainone.indexOf("*")!=-1){
       res[index].basicRetainone=res[index].basicRetainone.substr(0, res[index].basicRetainone.indexOf("*"))
    }
      }
      this.chanpinguigeyumingcheng=res;
      this.bangunchishu=res1;
      this.zhizhangmenfu=res2;
    },
    async getPrintingList() {
      const { data: res } = await this.$http.post("jc/Parameters/selectParameter",this.chaPrintingForm);
      for (let index = 0; index < res.body.rows.length; index++) {
      if(res.body.rows[index].parametersName.indexOf("*")!=-1){
       res.body.rows[index].parametersName=res.body.rows[index].parametersName.substr(0, res.body.rows[index].parametersName.indexOf("*"))
    }
      }
      this.total=res.body.total;
      this.PrintingList = res.body.rows;
      
    },
    // async getPrintingList1() {
    //   const { data: res } = await this.$http.post("jc/Basic/selectspecificationsname");
    //   for (let index = 0; index < res.length; index++) {
    //   if(res[index].basicRetainone.indexOf("*")!=-1){
    //    res[index].basicRetainone=res[index].basicRetainone.substr(0, res[index].basicRetainone.indexOf("*"))
    // }
    //   }
    //   this.chanpingleixing = res;
      
    // },
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
        this.addPrintingForm.parametersSinglenum=this.addPrintingForm.parametersSingle*3.175;
        this.addPrintingForm.parametersNumber=this.addPrintingForm.parametersTeethnum*this.addPrintingForm.parametersDoornum;
        const { data: res } = await this.$http.post("jc/Parameters/addParameters",this.addPrintingForm);
        // this.$message.success("用户创建成功！");
        this.addyonghuDialogVisible = false;
        this.getPrintingList();
        // this.getPrintingList1();
        
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
         this.editPrintingForm.parametersName=Number(res.parametersName);
         this.editPrintingForm.parametersDoorwidth=Number(res.parametersDoorwidth);
         this.editPrintingForm.parametersDoornum=res.parametersDoornum;
         this.editPrintingForm.parametersSingle=Number(res.parametersSingle);
         this.editPrintingForm.parametersSinglenum=res.parametersSinglenum;
         this.editPrintingForm.parametersNumber=res.parametersNumber;
         this.editPrintingForm.parametersTeethnum=res.parametersTeethnum;
         this.editPrintingForm.parametersId=res.parametersId;
         this.editPrintingForm.pId=res.pId;
      this.edityonghuDialogVisible=true;
    },
    async editPrinting(){
      this.editPrintingForm.parametersSinglenum=this.editPrintingForm.parametersSingle*3.175;
        this.editPrintingForm.parametersNumber=this.editPrintingForm.parametersTeethnum*this.editPrintingForm.parametersDoornum;
       const {data:res} = await this.$http.post('jc/Parameters/updateParameter',this.editPrintingForm);
       this.edityonghuDialogVisible=false;
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
      width: 300px;
    }
    .xiang{
      width: 400px;
    }
    .hu{
      width: 133px;
    }
  
        .el-input{
            width: 300px;
        }
        // .el-form-item{
        //   .el-select{
        //     width: 200px;
        //   }
        // }
    // }
</style>