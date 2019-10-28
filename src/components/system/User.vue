<template>
    <div class="min1500">
       <!-- 面包屑导航区域 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- <el-card class="quan">
        <div class="shu">
          <div class="togglr-button">全部部门</div>  
          <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </div>
      </el-card> -->
      <el-card>
        <el-row :gutter="20" class="row">
          <el-col :span="24">
             <el-row :gutter="20">
                <el-form :inline="true" class="demo-form-inline" :model="chaUserForm" ref="chaUserRef">
                    <el-form-item label="所属部门：" prop="deptId">
                    <el-select v-model="chaUserForm.deptId" placeholder="请选择">
                <el-option
                  v-for="item in departmentList"
                  :key="item.deptId"
                  :label="item.name"
                  :value="item.deptId">
                </el-option>
              </el-select>
                    </el-form-item>
                    <el-form-item label="姓名：" prop="name">
                    <el-input placeholder="请输入姓名" v-model="chaUserForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="工号：" prop="employeeId">
                    <el-input placeholder="工号" v-model="chaUserForm.employeeId"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="出生日期：" prop="birth">
                    <el-date-picker
                      v-model="chaUserForm.birth"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                    </el-form-item>
                    <el-form-item label="入职时间：" prop="rzDate">
            <el-date-picker
              v-model="chaUserForm.rzDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
            </el-form-item>
          <el-form-item label="离职时间：" prop="lzDate">
            <el-date-picker
              v-model="chaUserForm.lzDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
            </el-form-item> -->
                    <el-form-item>
                        <el-button @click="getUserList">查询</el-button>
                        <el-button type="primary" @click="chaUserResetForm">重置</el-button>
                    </el-form-item>
                </el-form>
        </el-row>
          <el-button type="success" @click="addyonghuDialogVisible = true">新增</el-button>
          <!-- <el-button type="warning" @click="resetPassdialogVisible=true" :disabled="selectedList.length == 0">密码批量重置</el-button> -->
           <!-- <el-button type="warning" @click="editbumenDialogVisible= true" :disabled="selectedList.length == 0">批量启用</el-button>
           <el-button type="warning" @click="editbumenDialogVisible= true" :disabled="selectedList.length == 0">批量禁用</el-button> -->
          <el-button 
            type="warning"
            @click="selectedqi"
            :disabled="selectedList.length == 0"
          >密码批量重置</el-button>
         <el-button type="danger" @click="selected" :disabled="selectedList.length == 0">批量禁用</el-button>
          <el-table border stripe :data="userList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="35"></el-table-column>
            <el-table-column type="index" width="55" align="center" label="序号"></el-table-column>
            <!-- <el-table-column prop="roleName" label="头像"></el-table-column> -->
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="username" label="登录账号"></el-table-column>
            <el-table-column prop="mobile" label="手机号码" width="125px"></el-table-column>
            <el-table-column prop="deptName" label="部门"></el-table-column>
            <el-table-column prop="roleName" label="职务"></el-table-column>
            <el-table-column prop="sex" label="性别" width="50px" align="center">
              <template slot-scope="scope">
                {{scope.row.sex == 1 ? '男' : '女'}}
              </template>
            </el-table-column>
            <el-table-column prop="employeeId" label="工号"></el-table-column>
            <el-table-column prop="district" label="地区" width="180px">
              <template slot-scope="scope">
                {{scope.row.province+scope.row.city+scope.row.district}}
              </template>
            </el-table-column>
            <el-table-column prop="note" label="备注"></el-table-column>
             <el-table-column label="状态" width="65px">
              <template slot-scope="scope">
                <!-- {{scope.row}} -->
                <el-switch
                  v-model="scope.row.status"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                  @change="userStateChanged(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column  label="操作" width="95px">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditUser(scope.row.userId)">修改</el-button>
                <!-- <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletebumen(scope.row.userId)"
                  size="mini"
                >删除</el-button> -->
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10]"
        :page-size="100"
        layout="total, sizes, prev, pager, next"
        :total="total"
      ></el-pagination>
          </el-col>
        </el-row>
      </el-card>
      <el-dialog
        title="新增用户"
        :visible.sync="addyonghuDialogVisible"
        width="48%"
        :before-close="handleClose"
        @closed="dialogClosed">
        <el-form :label-position="labelPosition" label-width="120px"        
        :model="addUserForm"
        ref="addUserRef"
        :rules="addUserRules">
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名：" prop="name"><el-input placeholder="请输入姓名" v-model="addUserForm.name"></el-input></el-form-item>
              <el-form-item label="登录账号：" prop="username"><el-input placeholder="请输入登录账号" v-model="addUserForm.username"></el-input></el-form-item>
              <el-form-item label="部门：" prop="deptId">
               <el-select v-model="addUserForm.deptId" placeholder="请选择">
                <el-option
                  v-for="item in departmentList"
                  :key="item.deptId"
                  :label="item.name"
                  :value="item.deptId">
                </el-option>
              </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机号：" prop="mobile"><el-input placeholder="请输入手机" v-model="addUserForm.mobile"></el-input></el-form-item>
              <el-form-item label="工号：" prop="employeeId"><el-input placeholder="工号" v-model="addUserForm.employeeId"></el-input></el-form-item>
              <el-form-item label="职务：" prop="roleId">
                <el-select v-model="addUserForm.roleId" placeholder="请选择">
                <el-option
                  v-for="item in DutyList"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId">
                </el-option>
              </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <hr>
          <div class="xiang">详细信息</div>
          <el-form-item label="性别：" prop="sex">
            <el-radio v-model="addUserForm.sex" label="1">男</el-radio>
            <el-radio v-model="addUserForm.sex" label="0">女</el-radio>
          </el-form-item>
          <el-form-item label="岗位：" prop="isGangWei">
            <el-radio v-model="addUserForm.isGangWei" label="1">在岗</el-radio>
            <el-radio v-model="addUserForm.isGangWei" label="0">离职</el-radio>
          </el-form-item>
          <el-form-item label="婚姻：" prop="isMarried">
            <el-radio v-model="addUserForm.isMarried" label="1">已婚</el-radio>
            <el-radio v-model="addUserForm.isMarried" label="0">未婚</el-radio>
          </el-form-item>
          <el-form-item label="民族：" prop="mingZuo"><el-input placeholder="请输入民族" class="xiang" v-model="addUserForm.mingZuo"></el-input></el-form-item>
          <el-form-item label="出生日期：" prop="birth">
            <!-- <el-input placeholder="请输入出生日期" class="xiang" v-model="addUserForm.birth"></el-input> -->
            <el-date-picker
              v-model="addUserForm.birth"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
            </el-form-item>
          <el-form-item label="身份证号码：" prop="sfz"><el-input placeholder="请输入身份证号码" class="xiang" v-model="addUserForm.sfz"></el-input></el-form-item>
          <el-row>
          <el-col :span="8">
          <el-form-item label="户籍：" prop="province">
            <el-select
           v-model="addUserForm.province"
            @change="choseProvince"
            placeholder="省级地区">
            <el-option
              v-for="item in province"
              :key="item.id"
              :label="item.value"
              :value="item.value">
            </el-option>
          </el-select>
           </el-form-item>
          </el-col>
            <el-col :span="8">
            <el-form-item  prop="city" label-width="60px">
          <el-select
           v-model="addUserForm.city"
            @change="choseCity"
            placeholder="市级地区">
            <el-option
              v-for="item in shi1"
              :key="item.id"
              :label="item.value"
              :value="item.value">
            </el-option>
          </el-select>
            </el-form-item>
          </el-col>
            <el-col :span="8">
            <el-form-item  prop="supTown" label-width="0px">
          <el-select
            v-model="addUserForm.district"
            @change="choseBlock"
            placeholder="区级地区">
            <el-option
              v-for="item in qu1"
              :key="item.id"
              :label="item.value"
              :value="item.value">
            </el-option>
          </el-select>
          </el-form-item>
          </el-col>
        </el-row>
          <el-form-item label="详细地址：" prop="liveAddress"><el-input placeholder="请输入详细地址" class="xiang" v-model="addUserForm.liveAddress"></el-input></el-form-item>          
          <el-form-item label="紧急联系人：" prop="urgentPerson"><el-input placeholder="请输入紧急联系人" class="xiang" v-model="addUserForm.urgentPerson"></el-input></el-form-item>
          <el-form-item label="银行卡号：" prop="bankAccount"><el-input placeholder="请输入银行卡号" class="xiang" v-model="addUserForm.bankAccount"></el-input></el-form-item>
          <el-row>
          <el-col :span="8">
          <el-form-item label="通讯地址：" prop="lxProvince">
            <el-select
           v-model="addUserForm.lxProvince"
            @change="choseProvince"
            placeholder="省级地区">
            <el-option
              v-for="item in province"
              :key="item.id"
              :label="item.value"
              :value="item.value">
            </el-option>
          </el-select>
           </el-form-item>
          </el-col>
            <el-col :span="8">
            <el-form-item  prop="lxCity" label-width="60px">
          <el-select
           v-model="addUserForm.lxCity"
            @change="choseCity"
            placeholder="市级地区">
            <el-option
              v-for="item in shi1"
              :key="item.id"
              :label="item.value"
              :value="item.value">
            </el-option>
          </el-select>
            </el-form-item>
          </el-col>
            <el-col :span="8">
            <el-form-item  prop="lxDistrict" label-width="0px">
          <el-select
            v-model="addUserForm.lxDistrict"
            @change="choseBlock"
            placeholder="区级地区">
            <el-option
              v-for="item in qu1"
              :key="item.id"
              :label="item.value"
              :value="item.value">
            </el-option>
          </el-select>
          </el-form-item>
          </el-col>
        </el-row>
          <el-form-item label="通讯详细地址：" prop="lxLiveAddress"><el-input placeholder="请输入通讯地址" class="xiang" v-model="addUserForm.lxLiveAddress"></el-input></el-form-item>
          <el-form-item label="入职时间：" prop="rzDate">
            <!-- <el-input placeholder="请输入入职时间" class="xiang" v-model="addUserForm.rzDate"></el-input> -->
            <el-date-picker
              v-model="addUserForm.rzDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
            </el-form-item>
          <el-form-item label="离职时间：" prop="lzDate">
            <!-- <el-input placeholder="请输入离职时间" class="xiang" v-model="addUserForm.lzDate"></el-input> -->
            <el-date-picker
              v-model="addUserForm.lzDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addyonghuDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="编辑用户"
        :visible.sync="edityonghuDialogVisible"
        width="48%"
        :before-close="handleClose"
        @closed="dialogClosed">
        <el-form :label-position="labelPosition" label-width="120px"        
        :model="editUserForm"
        ref="addUserRef"
        :rules="addUserRules"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名：" prop="name"><el-input placeholder="请输入姓名" v-model="editUserForm.name"></el-input></el-form-item>
              <el-form-item label="登录账号：" prop="username"><el-input placeholder="请输入登录账号" v-model="editUserForm.username"></el-input></el-form-item>
              <el-form-item label="部门：" prop="deptId">
               <el-select v-model="editUserForm.deptId" placeholder="请选择">
                <el-option
                  v-for="item in departmentList"
                  :key="item.deptId"
                  :label="item.name"
                  :value="item.deptId">
                </el-option>
              </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机号：" prop="mobile"><el-input placeholder="请输入手机" v-model="editUserForm.mobile"></el-input></el-form-item>
              <el-form-item label="工号：" prop="employeeId"><el-input placeholder="工号" v-model="editUserForm.employeeId"></el-input></el-form-item>
              <el-form-item label="职务：" prop="roleId">
                <el-select v-model="editUserForm.roleId" placeholder="请选择">
                <el-option
                  v-for="item in DutyList"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId">
                </el-option>
              </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <hr>
          <div class="xiang">详细信息</div>
          <el-form-item label="性别：" prop="sex">
            <el-radio v-model="editUserForm.sex" label="1">男</el-radio>
            <el-radio v-model="editUserForm.sex" label="0">女</el-radio>
          </el-form-item>
          <el-form-item label="岗位：" prop="isGangWei">
            <el-radio v-model="editUserForm.isGangWei" label="1">在岗</el-radio>
            <el-radio v-model="editUserForm.isGangWei" label="0">离职</el-radio>
          </el-form-item>
          <el-form-item label="婚姻：" prop="isMarried">
            <el-radio v-model="editUserForm.isMarried" label="1">已婚</el-radio>
            <el-radio v-model="editUserForm.isMarried" label="0">未婚</el-radio>
          </el-form-item>
          <el-form-item label="民族：" prop="mingZuo"><el-input placeholder="请输入民族" class="xiang" v-model="editUserForm.mingZuo"></el-input></el-form-item>
          <el-form-item label="出生日期：" prop="birth"><el-input placeholder="请输入出生日期" class="xiang" v-model="editUserForm.birth"></el-input></el-form-item>
          <el-form-item label="身份证号码：" prop="sfz"><el-input placeholder="请输入身份证号码" class="xiang" v-model="editUserForm.sfz"></el-input></el-form-item>
          <el-row>
          <el-col :span="8">
          <el-form-item label="户籍：" prop="province">
            <el-select
           v-model="editUserForm.province"
            @change="choseProvince"
            placeholder="省级地区">
            <el-option
              v-for="item in province"
              :key="item.id"
              :label="item.value"
              :value="item.value">
            </el-option>
          </el-select>
           </el-form-item>
          </el-col>
            <el-col :span="8">
            <el-form-item  prop="supCity" label-width="60px">
          <el-select
           v-model="editUserForm.City"
            @change="choseCity"
            placeholder="市级地区">
            <el-option
              v-for="item in shi1"
              :key="item.id"
              :label="item.value"
              :value="item.value">
            </el-option>
          </el-select>
            </el-form-item>
          </el-col>
            <el-col :span="8">
            <el-form-item  prop="supTown" label-width="0px">
          <el-select
            v-model="editUserForm.district"
            @change="choseBlock"
            placeholder="区级地区">
            <el-option
              v-for="item in qu1"
              :key="item.id"
              :label="item.value"
              :value="item.value">
            </el-option>
          </el-select>
          </el-form-item>
          </el-col>
        </el-row>
          <el-form-item label="详细地址：" prop="liveAddress"><el-input placeholder="请输入详细地址" class="xiang" v-model="editUserForm.liveAddress"></el-input></el-form-item>          
          <el-form-item label="紧急联系人：" prop="urgentPerson"><el-input placeholder="请输入紧急联系人" class="xiang" v-model="editUserForm.urgentPerson"></el-input></el-form-item>
          <el-form-item label="银行卡号：" prop="bankAccount"><el-input placeholder="请输入银行卡号" class="xiang" v-model="editUserForm.bankAccount"></el-input></el-form-item>
          <el-row>
          <el-col :span="8">
          <el-form-item label="通讯地址：" prop="lxProvince">
            <el-select
           v-model="editUserForm.lxProvince"
            @change="choseProvince"
            placeholder="省级地区">
            <el-option
              v-for="item in province"
              :key="item.id"
              :label="item.value"
              :value="item.value">
            </el-option>
          </el-select>
           </el-form-item>
          </el-col>
            <el-col :span="8">
            <el-form-item  prop="lxCity" label-width="60px">
          <el-select
           v-model="editUserForm.lxCity"
            @change="choseCity"
            placeholder="市级地区">
            <el-option
              v-for="item in shi1"
              :key="item.id"
              :label="item.value"
              :value="item.value">
            </el-option>
          </el-select>
            </el-form-item>
          </el-col>
            <el-col :span="8">
            <el-form-item  prop="lxDistrict" label-width="0px">
          <el-select
            v-model="editUserForm.lxDistrict"
            @change="choseBlock"
            placeholder="区级地区">
            <el-option
              v-for="item in qu1"
              :key="item.id"
              :label="item.value"
              :value="item.value">
            </el-option>
          </el-select>
          </el-form-item>
          </el-col>
        </el-row>
          <el-form-item label="通讯详细地址：" prop="lxLiveAddress"><el-input placeholder="请输入通讯地址" class="xiang" v-model="editUserForm.lxLiveAddress"></el-input></el-form-item>
          <el-form-item label="入职时间：" prop="rzDate"><el-input placeholder="请输入入职时间" class="xiang" v-model="editUserForm.rzDate"></el-input></el-form-item>
          <el-form-item label="离职时间：" prop="lzDate"><el-input placeholder="请输入离职时间" class="xiang" v-model="editUserForm.lzDate"></el-input></el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="edityonghuDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editUser">确 定</el-button>
        </span>
      </el-dialog>
      
      <el-dialog
        title="密码重置"
        :visible.sync="resetPassdialogVisible"
        width="35%"
        :before-close="handleClose">
        <el-form :label-position="labelPosition" label-width="100px">
          <el-form-item label="登录账号："><el-input placeholder="请输入登录账号"></el-input></el-form-item>
          <el-form-item label="旧密码："><el-input placeholder="请输入旧密码"></el-input></el-form-item>
          <el-form-item label="新密码："><el-input placeholder="请输入新密码"></el-input></el-form-item>
          <el-form-item label="确认新密码："><el-input placeholder="请输入确认新密码"></el-input></el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="resetPassdialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="resetPassdialogVisible = false">保 存</el-button>
        </span>
      </el-dialog>
      <el-dialog title="提示" :visible.sync="delVisible" width="300px">
      <div class="del-dialog-cnt">此操作将批量禁用, 是否继续？</div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="delVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteRow" >确 定</el-button>
      </span>
    </el-dialog>
    </div>
</template>
<script>
export default {
  data () {
    return {
       province:'',
      shi1: [],
      qu1: [],
      city:'',
      block:'',
      selectedList: [],
      labelPosition: 'right',
      addyonghuDialogVisible: false,
      edityonghuDialogVisible:false,
      resetPassdialogVisible:false,
      delVisible:false,
      delarr:'',
      currentPage: 0,
      total:0,
      userList:[],
      departmentList:[],
      addUserForm:{
        name:'',
        username:'',
        deptId:'',
        mobile:'',
        province:'',
        employeeId:'',
        roleId:'',
        sex:'',
        isGangWei:'',
        isMarried:'',
        mingZuo:'',
        birth:'',
        sfz:'',
        city:'',
        liveAddress:'',
        district:'',
        urgentPerson:'',
        bankAccount:'',
        lxProvince:'',
        lxCity:'',
        lxDistrict:'',
        lxLiveAddress:'',
        rzDate:'',
        lzDate:'',
      },
      editUserForm:{
        name:'',
        username:'',
        deptId:'',
        mobile:'',
        province:'',
        employeeId:'',
        roleId:'',
        sex:'',
        isGangWei:'',
        isMarried:'',
        mingZuo:'',
        birth:'',
        sfz:'',
        city:'',
        liveAddress:'',
        district:'',
        urgentPerson:'',
        bankAccount:'',
        lxProvince:'',
        lxCity:'',
        lxDistrict:'',
        lxLiveAddress:'',
        rzDate:'',
        lzDate:'',
      },
      DutyList:[],
      chaUserForm:{
        name:'',
        employeeId:'',
        // birth:'',
        deptId:'',
        // lzDate:'',
        // rzDate:'',
        pageCode: 1, //当前页
        pageSize: 10,//每页显示的记录数
      },
      chaDepartmentForm:{
        a:'',
      },
      chaDutyForm:{
        a:'',
      },
      addUserRules: {
          name:[
          { required: true, message: '请输入内容', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],},
    }
  },
  created () {
    this.getUserList();
    this.getDepartmentList();
    this.getCityData();
    this.getDutyList();
  },
  methods:{
    async getUserList() {
      const { data: res } = await this.$http.post("sys/user/list",{params:this.chaUserForm});
      console.log(res);
      this.total=res.body.total;
      this.userList = res.body.rows;
    },
    addUser() {
      this.$refs.addUserRef.validate(async valid => {
        if (!valid) return;    
        console.log(this.addUserForm);
        const { data: res } = await this.$http.post("sys/user/save",this.addUserForm);
        this.getUserList();
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
    async getDepartmentList() {
      const { data: res } = await this.$http.post("sys/dept/list",{params:this.chaDepartmentForm});
      console.log(res);
      
      this.departmentList = res.body.rows;
    },
    async getDutyList() {
      const { data: res } = await this.$http.post("sys/role/list",{params:this.chaDutyForm});
      console.log(res);
      
      this.DutyList = res.body.rows;
    },
    async userStateChanged(userInfo) {
      const { data: res } = await this.$http.post("sys/user/update",userInfo);
       this.getUserList();
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
    async showEditUser(id){
      let param = new URLSearchParams();
      param.append("id", id);
      const {data:res} = await this.$http.post('sys/user/getInfo',param);
      this.editUserForm=res.body.user;
      console.log(res);
      
      this.edityonghuDialogVisible=true;
    },
    async editUser(){
       const {data:res} = await this.$http.post('sys/user/update',this.editUserForm);
        this.getUserList();
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
    selected(){
      this.delarr=[];
      this.delVisible = true;
      for (let i = 0; i < this.selectedList.length; i++) {
        this.delarr+=this.selectedList[i].userId+','
      }
      console.log(this.delarr);
    },
     selectedqi(){
      this.delarr=[];
      this.delVisibleqi = true;
      for (let i = 0; i < this.selectedList.length; i++) {
        this.delarr+=this.selectedList[i].userId+','
      }
      console.log(this.delarr);
    },
    
     async deleteRowqi(){
         const {data:res} = await this.$http.post('jc/supplier/updatestate',this.delarr);
         this.delVisibleqi = false;
         this.getSupplierList();
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
    async deleteRow(){
      let param = new URLSearchParams();
      param.append("userIds", this.delarr);
         const {data:res} = await this.$http.post('sys/user/batchRemove',param);
         this.delVisible = false;
         this.getUserList();
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
      chaUserResetForm(){
        this.$refs.chaUserRef.resetFields();
        this.getUserList();
    },
    dialogClosed(){
        this.$refs.addUserRef.resetFields();
      },
     handleSizeChange(val) {
      this.chaUserForm.pageSize=val;
      console.log(`每页 ${val} 条`);
       this.getUserList();
    },
    handleCurrentChange(val) {
      this.chaUserForm.pageCode=val;
      console.log(`当前页: ${val}`);
      this.currentPage=val;
       this.getUserList();
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    deletebumen(userId){
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }) .then(async () => {
          let param = new URLSearchParams();
          param.append("userIds", userId);
          const { data: res } = await this.$http.post(
            "sys/user/batchRemove",
            param
          );
           this.getUserList()
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
     },
       handleSelectionChange(val) {
      console.log(val);
      this.selectedList = val;
    },
     // 加载china地点数据，三级
      getCityData:function(){
        var that = this
        var ip=this.ips;
        console.log(ip);
        
        this.$http.get('/'+'map.json').then(function(response){
          if (response.status==200) {
            var data = response.data
            that.province = []
            that.city = []
            that.block = []
            // 省市区数据分类
            for (var item in data) {
              if (item.match(/0000$/)) {//省
                that.province.push({id: item, value: data[item], children: []})
              } else if (item.match(/00$/)) {//市
                that.city.push({id: item, value: data[item], children: []})
              } else {//区
                that.block.push({id: item, value: data[item]})
              }
            }
            // 分类市级
            for (var index in that.province) {
              for (var index1 in that.city) {
                if (that.province[index].id.slice(0, 2) === that.city[index1].id.slice(0, 2)) {
                  that.province[index].children.push(that.city[index1])
                }
              }
            }
            // 分类区级
            for(var item1 in that.city) {
              for(var item2 in that.block) {
                if (that.block[item2].id.slice(0, 4) === that.city[item1].id.slice(0, 4)) {
                  that.city[item1].children.push(that.block[item2])
                }
              }
            }
          }
          else{
            console.log(response.status)
          }
        }).catch(function(error){console.log(typeof+ error)})
      },
      // 选省
      choseProvince:function(e) {
        for (var index2 in this.province) {
          if (e === this.province[index2].value) {
            this.shi1 = this.province[index2].children
            this.shi = this.province[index2].children[0].value
            this.qu1 =this.province[index2].children[0].children
            this.qu = this.province[index2].children[0].children[0].value
            this.E = this.qu1[0].id
          }
        }
      },
      // 选市
      choseCity:function(e) {
        for (var index3 in this.city) {
          if (e === this.city[index3].value) {
            this.qu1 = this.city[index3].children
            this.qu = this.city[index3].children[0].value
            this.E = this.qu1[0].id
            // console.log(this.E)
          }
        }
      },
      // 选区
      choseBlock:function(e) {
        this.E=e;
        // console.log(this.E)
      },
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
    .togglr-button{
      width: 180px;
      height: 30px;
      background: #eee;
      padding-right: -10px;
      text-align: center;
      line-height: 30px;
    }
    .demo-form-inline .el-input{
      width: 240px;
    }
    .el-select{
      width: 225px;
    }
    .quan{
      float: left;
      margin-right: 20px;
    }
    .el-card{
      height: 650px;
    }
    .xiang{
      width: 400px;
    }
    .hu{
      width: 133px;
    }
   .el-icon-close:before {
    position: absolute;
    top: 0px; 
    right: 1px;
}
</style>