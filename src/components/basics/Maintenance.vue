<template>
    <div class="min1500">
       <!-- 面包屑导航区域 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>基础资料</el-breadcrumb-item>
        <el-breadcrumb-item>基础数据维护</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
            <el-tabs :tab-position="tabPosition" @tab-click="handleClick" type="border-card" >
            <el-tab-pane label="客户类型">
              <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="handleClick(ta)">查询</el-button>
                        <el-button type="success" @click="addyonghuDialogVisible = true">新增</el-button>
                    </el-form-item>
                </el-form>
              <el-table border stripe :data="maintenanceList">
                <el-table-column type="index" align="center" width="55" label="序号"></el-table-column>
                <el-table-column prop="basicRetainone" label="名称"></el-table-column>
                <el-table-column prop="basicName" label="所属基础数据"></el-table-column>
                <el-table-column prop="supState" label="状态" width="65px">
              <template slot-scope="scope">
                <!-- {{scope.row}} -->
                <el-switch
                  v-model="scope.row.basicState"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                  @change="userStateChanged(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="190px">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditSupplier(scope.row.basicId)">修改</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletebumen(scope.row.basicId)"
                  size="mini"
                >删除</el-button>
              </template>
            </el-table-column>
              </el-table>
                <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
   
        :page-size="10"
        layout="total, prev, pager, next"
        :total=total
      ></el-pagination>
            </el-tab-pane>  
            <el-tab-pane label="供应商类型">
              <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="handleClick(ta)">查询</el-button>
                        <el-button type="success" @click="addyonghuDialogVisible = true">新增</el-button>
                    </el-form-item>
                </el-form>
              <el-table border stripe :data="maintenanceList">
                <el-table-column type="index" align="center" width="55" label="序号"></el-table-column>
                <el-table-column prop="basicRetainone" label="名称"></el-table-column>
                <el-table-column prop="basicName" label="所属基础数据"></el-table-column>
                <el-table-column prop="supState" label="状态" width="65px">
              <template slot-scope="scope">
                <!-- {{scope.row}} -->
                <el-switch
                  v-model="scope.row.basicState"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                  @change="userStateChanged(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="190px">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditSupplier(scope.row.basicId)">修改</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletebumen(scope.row.basicId)"
                  size="mini"
                >删除</el-button>
              </template>
            </el-table-column>
              </el-table>
                <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10]"
        :page-size="100"
        layout="total, prev, pager, next"
        :total=total
      ></el-pagination>
            </el-tab-pane>
            <el-tab-pane label="产品类型">
              <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="handleClick(ta)">查询</el-button>
                        <el-button type="success" @click="addyonghuDialogVisible = true">新增</el-button>
                    </el-form-item>
                </el-form>
              <el-table border stripe :data="maintenanceList">
                <el-table-column type="index" align="center" width="55" label="序号"></el-table-column>
                <el-table-column prop="basicRetainone" label="名称"></el-table-column>
                <el-table-column prop="basicName" label="所属基础数据"></el-table-column>
                <el-table-column prop="supState" label="状态" width="65px">
              <template slot-scope="scope">
                <!-- {{scope.row}} -->
                <el-switch
                  v-model="scope.row.basicState"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                  @change="userStateChanged(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="190px">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditSupplier(scope.row.basicId)">修改</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletebumen(scope.row.basicId)"
                  size="mini"
                >删除</el-button>
              </template>
            </el-table-column>
              </el-table>
                <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"

        :page-size="10"
        layout="total, prev, pager, next"
        :total=total
      ></el-pagination>
      </el-tab-pane>
            
            <el-tab-pane label="产品规格">
             <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="handleClick(ta)">查询</el-button>
                        <el-button type="success" @click="addyonghuDialogVisible = true">新增</el-button>
                    </el-form-item>
                </el-form>
              <el-table border stripe :data="maintenanceList">
                <el-table-column type="index" align="center" width="55" label="序号"></el-table-column>
                <el-table-column prop="basicRetainone" label="名称"></el-table-column>
                <el-table-column prop="basicName" label="所属基础数据"></el-table-column>
                <el-table-column prop="supState" label="状态" width="65px">
              <template slot-scope="scope">
                <!-- {{scope.row}} -->
                <el-switch
                  v-model="scope.row.basicState"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                  @change="userStateChanged(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="190px">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditSupplier(scope.row.basicId)">修改</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletebumen(scope.row.basicId)"
                  size="mini"
                >删除</el-button>
              </template>
            </el-table-column>
              </el-table>
               <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"

        :page-size="10"
        layout="total, prev, pager, next"
        :total=total
      ></el-pagination>
            </el-tab-pane>
            
            <el-tab-pane label="产品名称">
              <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入名称" v-model="chaMaintenanceForm.basicRetainone" clearable ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="handleClick(ta)">查询</el-button>
                        <el-button type="success" @click="addyonghuDialogVisible = true">新增</el-button>
                    </el-form-item>
                </el-form>
              <el-table border stripe :data="maintenanceList">
                <el-table-column type="index" align="center" width="55" label="序号"></el-table-column>
                <el-table-column prop="basicRetainone" label="名称"></el-table-column>
                <el-table-column prop="basicName" label="所属基础数据"></el-table-column>
                <el-table-column prop="supState" label="状态" width="65px">
              <template slot-scope="scope">
                <!-- {{scope.row}} -->
                <el-switch
                  v-model="scope.row.basicState"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                  @change="userStateChanged(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="190px">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditSupplier(scope.row.basicId)">修改</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletebumen(scope.row.basicId)"
                  size="mini"
                >删除</el-button>
              </template>
            </el-table-column>
              </el-table>
              <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
    
        :page-size="10"
        layout="total,  prev, pager, next"
        :total=total
      ></el-pagination>
            </el-tab-pane>
      
            
            
            <el-tab-pane label="纸张品牌">
             <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="handleClick(ta)">查询</el-button>
                        <el-button type="success" @click="addyonghuDialogVisible = true">新增</el-button>
                    </el-form-item>
                </el-form>
              <el-table border stripe :data="maintenanceList">
                <el-table-column type="index" align="center" width="55" label="序号"></el-table-column>
                <el-table-column prop="basicRetainone" label="名称"></el-table-column>
                <el-table-column prop="basicName" label="所属基础数据"></el-table-column>
                <el-table-column prop="supState" label="状态" width="65px">
              <template slot-scope="scope">
                <!-- {{scope.row}} -->
                <el-switch
                  v-model="scope.row.basicState"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                  @change="userStateChanged(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="190px">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditSupplier(scope.row.basicId)">修改</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletebumen(scope.row.basicId)"
                  size="mini"
                >删除</el-button>
              </template>
            </el-table-column>
              </el-table>
                <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"

        :page-size="10"
        layout="total, prev, pager, next"
        :total=total
      ></el-pagination>
            </el-tab-pane>
            
            <el-tab-pane label="纸张克重">
             <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="handleClick(ta)">查询</el-button>
                        <el-button type="success" @click="addyonghuDialogVisible = true">新增</el-button>
                    </el-form-item>
                </el-form>
              <el-table border stripe :data="maintenanceList">
                <el-table-column type="index" align="center" width="55" label="序号"></el-table-column>
                <el-table-column prop="basicRetainone" label="名称"></el-table-column>
                <el-table-column prop="basicName" label="所属基础数据"></el-table-column>
                <el-table-column prop="supState" label="状态" width="65px">
              <template slot-scope="scope">
                <!-- {{scope.row}} -->
                <el-switch
                  v-model="scope.row.basicState"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                  @change="userStateChanged(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="190px">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditSupplier(scope.row.basicId)">修改</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletebumen(scope.row.basicId)"
                  size="mini"
                >删除</el-button>
              </template>
            </el-table-column>
              </el-table>
                <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
  
        :page-size="10"
        layout="total,  prev, pager, next"
        :total=total
      ></el-pagination>
            </el-tab-pane>
            <el-tab-pane label="纸张门幅">
             <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="handleClick(ta)">查询</el-button>
                        <el-button type="success" @click="addyonghuDialogVisible = true">新增</el-button>
                    </el-form-item>
                </el-form>
              <el-table border stripe :data="maintenanceList">
                <el-table-column type="index" align="center" width="55" label="序号"></el-table-column>
                <el-table-column prop="basicRetainone" label="名称"></el-table-column>
                <el-table-column prop="basicName" label="所属基础数据"></el-table-column>
                <el-table-column prop="supState" label="状态" width="65px">
              <template slot-scope="scope">
                <!-- {{scope.row}} -->
                <el-switch
                  v-model="scope.row.basicState"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                  @change="userStateChanged(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="190px">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditSupplier(scope.row.basicId)">修改</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletebumen(scope.row.basicId)"
                  size="mini"
                >删除</el-button>
              </template>
            </el-table-column>
              </el-table>
                <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
      
        :page-size="10"
        layout="total,  prev, pager, next"
        :total=total
      ></el-pagination>
            </el-tab-pane>
             
            <el-tab-pane label="淋膜类型">
              <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="handleClick(ta)">查询</el-button>
                        <el-button type="success" @click="addyonghuDialogVisible = true">新增</el-button>
                    </el-form-item>
                </el-form>
              <el-table border stripe :data="maintenanceList">
                <el-table-column type="index" align="center" width="55" label="序号"></el-table-column>
                <el-table-column prop="basicRetainone" label="名称"></el-table-column>
                <el-table-column prop="basicName" label="所属基础数据"></el-table-column>
                <el-table-column prop="supState" label="状态" width="65px">
              <template slot-scope="scope">
                <!-- {{scope.row}} -->
                <el-switch
                  v-model="scope.row.basicState"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                  @change="userStateChanged(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="190px">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditSupplier(scope.row.basicId)">修改</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletebumen(scope.row.basicId)"
                  size="mini"
                >删除</el-button>
              </template>
            </el-table-column>
              </el-table>
                <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        
        :page-size="10"
        layout="total, prev, pager, next"
        :total=total
      ></el-pagination>
            </el-tab-pane>
            <el-tab-pane label="淋膜克重">
              <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="handleClick(ta)">查询</el-button>
                        <el-button type="success" @click="addyonghuDialogVisible = true">新增</el-button>
                    </el-form-item>
                </el-form>
              <el-table border stripe :data="maintenanceList">
                <el-table-column type="index" align="center" width="55" label="序号"></el-table-column>
                <el-table-column prop="basicRetainone" label="名称"></el-table-column>
                <el-table-column prop="basicName" label="所属基础数据"></el-table-column>
                <el-table-column prop="supState" label="状态" width="65px">
              <template slot-scope="scope">
                <!-- {{scope.row}} -->
                <el-switch
                  v-model="scope.row.basicState"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                  @change="userStateChanged(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="190px">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditSupplier(scope.row.basicId)">修改</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletebumen(scope.row.basicId)"
                  size="mini"
                >删除</el-button>
              </template>
            </el-table-column>
              </el-table>
                <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
       
        :page-size="10"
        layout="total,  prev, pager, next"
        :total=total
      ></el-pagination>
            </el-tab-pane>
           
            
            <el-tab-pane label="产品配盖">
              <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="handleClick(ta)">查询</el-button>
                        <el-button type="success" @click="addyonghuDialogVisible = true">新增</el-button>
                    </el-form-item>
                </el-form>
              <el-table border stripe :data="maintenanceList">
                <el-table-column type="index" align="center" width="55" label="序号"></el-table-column>
                <el-table-column prop="basicRetainone" label="名称"></el-table-column>
                <el-table-column prop="basicName" label="所属基础数据"></el-table-column>
                <el-table-column prop="supState" label="状态" width="65px">
              <template slot-scope="scope">
                <!-- {{scope.row}} -->
                <el-switch
                  v-model="scope.row.basicState"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                  @change="userStateChanged(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="190px">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditSupplier(scope.row.basicId)">修改</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletebumen(scope.row.basicId)"
                  size="mini"
                >删除</el-button>
              </template>
            </el-table-column>
              </el-table>
                <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
     
        :page-size="10"
        layout="total,  prev, pager, next"
        :total=total
      ></el-pagination>
            </el-tab-pane>
            <el-tab-pane label="印刷方式">
              <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="handleClick(ta)">查询</el-button>
                        <el-button type="success" @click="addyonghuDialogVisible = true">新增</el-button>
                    </el-form-item>
                </el-form>
              <el-table border stripe :data="maintenanceList">
                <el-table-column type="index" align="center" width="55" label="序号"></el-table-column>
                <el-table-column prop="basicRetainone" label="名称"></el-table-column>
                <el-table-column prop="basicName" label="所属基础数据"></el-table-column>
                <el-table-column prop="supState" label="状态" width="65px">
              <template slot-scope="scope">
                <!-- {{scope.row}} -->
                <el-switch
                  v-model="scope.row.basicState"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                  @change="userStateChanged(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="190px">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditSupplier(scope.row.basicId)">修改</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletebumen(scope.row.basicId)"
                  size="mini"
                >删除</el-button>
              </template>
            </el-table-column>
              </el-table>
                <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"

        :page-size="10"
        layout="total,  prev, pager, next"
        :total=total
      ></el-pagination>
            </el-tab-pane>
            <el-tab-pane label="版辊齿数">
              <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="handleClick(ta)">查询</el-button>
                        <el-button type="success" @click="addyonghuDialogVisible = true">新增</el-button>
                    </el-form-item>
                </el-form>
              <el-table border stripe :data="maintenanceList">
                <el-table-column type="index" align="center" width="55" label="序号"></el-table-column>
                <el-table-column prop="basicRetainone" label="名称"></el-table-column>
                <el-table-column prop="basicName" label="所属基础数据"></el-table-column>
                <el-table-column prop="supState" label="状态" width="65px">
              <template slot-scope="scope">
                <!-- {{scope.row}} -->
                <el-switch
                  v-model="scope.row.basicState"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                  @change="userStateChanged(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="190px">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditSupplier(scope.row.basicId)">修改</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletebumen(scope.row.basicId)"
                  size="mini"
                >删除</el-button>
              </template>
            </el-table-column>
              </el-table>
                <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
      
        :page-size="10"
        layout="total,  prev, pager, next"
        :total=total
      ></el-pagination>
            </el-tab-pane>
            <el-tab-pane label="模具规格">
              <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="handleClick(ta)">查询</el-button>
                        <el-button type="success" @click="addyonghuDialogVisible = true">新增</el-button>
                    </el-form-item>
                </el-form>
              <el-table border stripe :data="maintenanceList">
                <el-table-column type="index" align="center" width="55" label="序号"></el-table-column>
                <el-table-column prop="basicRetainone" label="名称"></el-table-column>
                <el-table-column prop="basicName" label="所属基础数据"></el-table-column>
                <el-table-column prop="supState" label="状态" width="65px">
              <template slot-scope="scope">
                <!-- {{scope.row}} -->
                <el-switch
                  v-model="scope.row.basicState"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                  @change="userStateChanged(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="190px">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditSupplier(scope.row.basicId)">修改</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletebumen(scope.row.basicId)"
                  size="mini"
                >删除</el-button>
              </template>
            </el-table-column>
              </el-table>
                <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"

        :page-size="10"
        layout="total,  prev, pager, next"
        :total=total
      ></el-pagination>
            </el-tab-pane>
            <el-tab-pane label="产品刀模">
              <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="handleClick(ta)">查询</el-button>
                        <el-button type="success" @click="addyonghuDialogVisible = true">新增</el-button>
                    </el-form-item>
                </el-form>
              <el-table border stripe :data="maintenanceList">
                <el-table-column type="index" align="center" width="55" label="序号"></el-table-column>
                <el-table-column prop="basicRetainone" label="名称"></el-table-column>
                <el-table-column prop="basicName" label="所属基础数据"></el-table-column>
                <el-table-column prop="supState" label="状态" width="65px">
              <template slot-scope="scope">
                <!-- {{scope.row}} -->
                <el-switch
                  v-model="scope.row.basicState"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                  @change="userStateChanged(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="190px">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditSupplier(scope.row.basicId)">修改</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletebumen(scope.row.basicId)"
                  size="mini"
                >删除</el-button>
              </template>
            </el-table-column>
              </el-table>
                <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
 
        :page-size="10"
        layout="total,  prev, pager, next"
        :total=total
      ></el-pagination>
            </el-tab-pane>
            <el-tab-pane label="产品内包" >
              <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="handleClick(ta)">查询</el-button>
                        <el-button type="success" @click="addyonghuDialogVisible = true">新增</el-button>
                    </el-form-item>
                </el-form>
              <el-table border stripe :data="maintenanceList">
                <el-table-column type="index" align="center" width="55" label="序号"></el-table-column>
                <el-table-column prop="basicRetainone" label="名称"></el-table-column>
                <el-table-column prop="basicName" label="所属基础数据"></el-table-column>
                <el-table-column prop="supState" label="状态" width="65px">
              <template slot-scope="scope">
         
                <el-switch
                  v-model="scope.row.basicState"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                  @change="userStateChanged(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="190px">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditSupplier(scope.row.basicId)">修改</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletebumen(scope.row.basicId)"
                  size="mini"
                >删除</el-button>
              </template>
            </el-table-column>
              </el-table>
               <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"

        :page-size="10"
        layout="total,  prev, pager, next"
        :total=total
      ></el-pagination>
             
            </el-tab-pane>
            <el-tab-pane label="产品外包" >
              <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="handleClick(ta)">查询</el-button>
                        <el-button type="success" @click="addyonghuDialogVisible = true">新增</el-button>
                    </el-form-item>
                </el-form>
              <el-table border stripe :data="maintenanceList">
                <el-table-column type="index" align="center" width="55" label="序号"></el-table-column>
                <el-table-column prop="basicRetainone" label="名称"></el-table-column>
                <el-table-column prop="basicName" label="所属基础数据"></el-table-column>
                <el-table-column prop="supState" label="状态" width="65px">
              <template slot-scope="scope">
          
                <el-switch
                  v-model="scope.row.basicState"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                  @change="userStateChanged(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="190px">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditSupplier(scope.row.basicId)">修改</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletebumen(scope.row.basicId)"
                  size="mini"
                >删除</el-button>
              </template>
            </el-table-column>
              </el-table>
                <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"

        :page-size="10"
        layout="total,  prev, pager, next"
        :total=total
      ></el-pagination>
             
            </el-tab-pane>
            <el-tab-pane label="设计稿名称">
              <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="handleClick(ta)">查询</el-button>
                        <el-button type="success" @click="addyonghuDialogVisible = true">新增</el-button>
                    </el-form-item>
                </el-form>
              <el-table border stripe :data="maintenanceList">
                <el-table-column type="index" align="center" width="55" label="序号"></el-table-column>
                <el-table-column prop="basicRetainone" label="名称"></el-table-column>
                <el-table-column prop="basicName" label="所属基础数据"></el-table-column>
                <el-table-column prop="supState" label="状态" width="65px">
              <template slot-scope="scope">
                <!-- {{scope.row}} -->
                <el-switch
                  v-model="scope.row.basicState"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                  @change="userStateChanged(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="190px">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditSupplier(scope.row.basicId)">修改</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletebumen(scope.row.basicId)"
                  size="mini"
                >删除</el-button>
              </template>
            </el-table-column>
              </el-table>
                <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"

        :page-size="10"
        layout="total,  prev, pager, next"
        :total=total
      ></el-pagination>
            </el-tab-pane>
            <el-tab-pane label="箱唛标唛">
              <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="handleClick(ta)">查询</el-button>
                        <el-button type="success" @click="addyonghuDialogVisible = true">新增</el-button>
                    </el-form-item>
                </el-form>
              <el-table border stripe :data="maintenanceList">
                <el-table-column type="index" align="center" width="55" label="序号"></el-table-column>
                <el-table-column prop="basicRetainone" label="名称"></el-table-column>
                <el-table-column prop="basicName" label="所属基础数据"></el-table-column>
                <el-table-column prop="supState" label="状态" width="65px">
              <template slot-scope="scope">
                <!-- {{scope.row}} -->
                <el-switch
                  v-model="scope.row.basicState"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                  @change="userStateChanged(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="190px">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditSupplier(scope.row.basicId)">修改</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletebumen(scope.row.basicId)"
                  size="mini"
                >删除</el-button>
              </template>
            </el-table-column>
              </el-table>
                <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
 
        :page-size="10"
        layout="total,  prev, pager, next"
        :total=total
      ></el-pagination>
            </el-tab-pane>
            <el-tab-pane label="纸箱克重">
             <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="handleClick(ta)">查询</el-button>
                        <el-button type="success" @click="addyonghuDialogVisible = true">新增</el-button>
                    </el-form-item>
                </el-form>
              <el-table border stripe :data="maintenanceList">
                <el-table-column type="index" align="center" width="55" label="序号"></el-table-column>
                <el-table-column prop="basicRetainone" label="名称"></el-table-column>
                <el-table-column prop="basicName" label="所属基础数据"></el-table-column>
                <el-table-column prop="supState" label="状态" width="65px">
              <template slot-scope="scope">
                <!-- {{scope.row}} -->
                <el-switch
                  v-model="scope.row.basicState"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                  @change="userStateChanged(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="190px">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditSupplier(scope.row.basicId)">修改</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletebumen(scope.row.basicId)"
                  size="mini"
                >删除</el-button>
              </template>
            </el-table-column>
              </el-table>
                <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
  
        :page-size="10"
        layout="total, prev, pager, next"
        :total=total
      ></el-pagination>
            </el-tab-pane>
             <el-tab-pane label="淋膜类型与克重">
              <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="handleClick(ta)">查询</el-button>
                        <el-button type="success" @click="addyonghuDialogVisible1 = true">新增</el-button>
                    </el-form-item>
                </el-form>
              <el-table border stripe :data="maintenanceList">
                <el-table-column type="index" align="center" width="55" label="序号"></el-table-column>
                <el-table-column prop="basicRetainone" label="名称"></el-table-column>
                <el-table-column prop="basicName" label="所属基础数据"></el-table-column>
                <el-table-column prop="supState" label="状态" width="65px">
              <template slot-scope="scope">
                <!-- {{scope.row}} -->
                <el-switch
                  v-model="scope.row.basicState"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                  @change="userStateChanged(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="190px">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditSupplier(scope.row.basicId,1)">修改</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletebumen(scope.row.basicId)"
                  size="mini"
                >删除</el-button>
              </template>
            </el-table-column>
              </el-table>
                <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        
        :page-size="10"
        layout="total,  prev, pager, next"
        :total=total
      ></el-pagination>
            </el-tab-pane>
            <el-tab-pane label="产品规格与名称">
              <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="handleClick(ta)">查询</el-button>
                        <el-button type="success" @click="addyonghuDialogVisible2 = true">新增</el-button>
                    </el-form-item>
                </el-form>
              <el-table border stripe :data="maintenanceList">
                <el-table-column type="index" align="center" width="55" label="序号"></el-table-column>
                <el-table-column prop="basicRetainone" label="名称"></el-table-column>
                <el-table-column prop="basicName" label="所属基础数据"></el-table-column>
                <el-table-column prop="supState" label="状态" width="65px">
              <template slot-scope="scope">
                <!-- {{scope.row}} -->
                <el-switch
                  v-model="scope.row.basicState"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                  @change="userStateChanged(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="190px">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditSupplier(scope.row.basicId,2)">修改</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletebumen(scope.row.basicId)"
                  size="mini"
                >删除</el-button>
              </template>
            </el-table-column>
              </el-table>
                <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
       
        :page-size="10"
        layout="total,  prev, pager, next"
        :total=total
      ></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="产品规格与模具">
              <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="handleClick(ta)">查询</el-button>
                        <el-button type="success" @click="addyonghuDialogVisible4 = true">新增</el-button>
                    </el-form-item>
                </el-form>
              <el-table border stripe :data="maintenanceList">
                <el-table-column type="index" align="center" width="55" label="序号"></el-table-column>
                <el-table-column prop="basicRetainone" label="名称"></el-table-column>
                <el-table-column prop="basicName" label="所属基础数据"></el-table-column>
                <el-table-column prop="supState" label="状态" width="65px">
              <template slot-scope="scope">
                <!-- {{scope.row}} -->
                <el-switch
                  v-model="scope.row.basicState"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                  @change="userStateChanged(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="190px">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditSupplier(scope.row.basicId,4)">修改</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletebumen(scope.row.basicId)"
                  size="mini"
                >删除</el-button>
              </template>
            </el-table-column>
              </el-table>
                <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
     
        :page-size="10"
        layout="total, prev, pager, next"
        :total=total
      ></el-pagination>
      </el-tab-pane>
            <el-tab-pane label="模具规格与产能">
              <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="handleClick(ta)">查询</el-button>
                        <el-button type="success" @click="addyonghuDialogVisible3 = true">新增</el-button>
                    </el-form-item>
                </el-form>
              <el-table border stripe :data="maintenanceList">
                <el-table-column type="index" align="center" width="55" label="序号"></el-table-column>
                <el-table-column prop="basicRetainone" label="名称"></el-table-column>
                <el-table-column prop="basicName" label="所属基础数据"></el-table-column>
                <el-table-column prop="supState" label="状态" width="65px">
              <template slot-scope="scope">
                <!-- {{scope.row}} -->
                <el-switch
                  v-model="scope.row.basicState"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                  @change="userStateChanged(scope.row,4)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="190px">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditSupplier(scope.row.basicId,3)">修改</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletebumen(scope.row.basicId)"
                  size="mini"
                >删除</el-button>
              </template>
            </el-table-column>
              </el-table>
                <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
      
        :page-size="10"
        layout="total,  prev, pager, next"
        :total=total
      ></el-pagination>
      </el-tab-pane>
            <el-tab-pane label="库存单位">
              <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="handleClick(ta)">查询</el-button>
                        <el-button type="success" @click="addyonghuDialogVisible = true">新增</el-button>
                    </el-form-item>
                </el-form>
              <el-table border stripe :data="maintenanceList">
                <el-table-column type="index" align="center" width="55" label="序号"></el-table-column>
                <el-table-column prop="basicRetainone" label="名称"></el-table-column>
                <el-table-column prop="basicName" label="所属基础数据"></el-table-column>
                <el-table-column prop="supState" label="状态" width="65px">
              <template slot-scope="scope">
                <!-- {{scope.row}} -->
                <el-switch
                  v-model="scope.row.basicState"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                  @change="userStateChanged(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="190px">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditSupplier(scope.row.basicId)">修改</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletebumen(scope.row.basicId)"
                  size="mini"
                >删除</el-button>
              </template>
            </el-table-column>
              </el-table>
                <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
      
        :page-size="10"
        layout="total,  prev, pager, next"
        :total=total
      ></el-pagination>
            </el-tab-pane>
            <el-tab-pane label="仓库类型">
              <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="handleClick(ta)">查询</el-button>
                        <el-button type="success" @click="addyonghuDialogVisible = true">新增</el-button>
                    </el-form-item>
                </el-form>
              <el-table border stripe :data="maintenanceList">
                <el-table-column type="index" align="center" width="55" label="序号"></el-table-column>
                <el-table-column prop="basicRetainone" label="名称"></el-table-column>
                <el-table-column prop="basicName" label="所属基础数据"></el-table-column>
                <el-table-column prop="supState" label="状态" width="65px">
              <template slot-scope="scope">
                <!-- {{scope.row}} -->
                <el-switch
                  v-model="scope.row.basicState"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                  @change="userStateChanged(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="190px">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditSupplier(scope.row.basicId)">修改</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletebumen(scope.row.basicId)"
                  size="mini"
                >删除</el-button>
              </template>
            </el-table-column>
              </el-table>
                <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
       
        :page-size="10"
        layout="total, prev, pager, next"
        :total=total
      ></el-pagination>
            </el-tab-pane>
            
            <el-tab-pane label="收入类型">
              <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="handleClick(ta)">查询</el-button>
                        <el-button type="success" @click="addyonghuDialogVisible = true">新增</el-button>
                    </el-form-item>
                </el-form>
              <el-table border stripe :data="maintenanceList">
                <el-table-column type="index" align="center" width="55" label="序号"></el-table-column>
                <el-table-column prop="basicRetainone" label="名称"></el-table-column>
                <el-table-column prop="basicName" label="所属基础数据"></el-table-column>
                <el-table-column prop="supState" label="状态" width="65px">
              <template slot-scope="scope">
                <!-- {{scope.row}} -->
                <el-switch
                  v-model="scope.row.basicState"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                  @change="userStateChanged(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="190px">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditSupplier(scope.row.basicId)">修改</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletebumen(scope.row.basicId)"
                  size="mini"
                >删除</el-button>
              </template>
            </el-table-column>
              </el-table>
               <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        
        :page-size="10"
        layout="total,  prev, pager, next"
        :total=total
      ></el-pagination>
            </el-tab-pane>
            
            <el-tab-pane label="支出类型">
              <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="handleClick(ta)">查询</el-button>
                        <el-button type="success" @click="addyonghuDialogVisible = true">新增</el-button>
                    </el-form-item>
                </el-form>
              <el-table border stripe :data="maintenanceList">
                <el-table-column type="index" align="center" width="55" label="序号"></el-table-column>
                <el-table-column prop="basicRetainone" label="名称"></el-table-column>
                <el-table-column prop="basicName" label="所属基础数据"></el-table-column>
                <el-table-column prop="supState" label="状态" width="65px">
              <template slot-scope="scope">
                <!-- {{scope.row}} -->
                <el-switch
                  v-model="scope.row.basicState"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                  @change="userStateChanged(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="190px">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditSupplier(scope.row.basicId)">修改</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletebumen(scope.row.basicId)"
                  size="mini"
                >删除</el-button>
              </template>
            </el-table-column>
              </el-table>
                <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
       
        :page-size="10"
        layout="total,  prev, pager, next"
        :total=total
      ></el-pagination>
            </el-tab-pane>
            <el-tab-pane label="货币类型">
              <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="handleClick(ta)">查询</el-button>
                        <el-button type="success" @click="addyonghuDialogVisible = true">新增</el-button>
                    </el-form-item>
                </el-form>
              <el-table border stripe :data="maintenanceList">
                <el-table-column type="index" align="center" width="55" label="序号"></el-table-column>
                <el-table-column prop="basicRetainone" label="名称"></el-table-column>
                <el-table-column prop="basicName" label="所属基础数据"></el-table-column>
                <el-table-column prop="supState" label="状态" width="65px">
              <template slot-scope="scope">
                <!-- {{scope.row}} -->
                <el-switch
                  v-model="scope.row.basicState"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                  @change="userStateChanged(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="190px">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditSupplier(scope.row.basicId)">修改</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletebumen(scope.row.basicId)"
                  size="mini"
                >删除</el-button>
              </template>
            </el-table-column>
              </el-table>
                <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        
        :page-size="10"
        layout="total,  prev, pager, next"
        :total=total
      ></el-pagination>
            </el-tab-pane>
            <el-tab-pane label="瓦楞形状">
              <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="handleClick(ta)">查询</el-button>
                        <el-button type="success" @click="addyonghuDialogVisible = true">新增</el-button>
                    </el-form-item>
                </el-form>
              <el-table border stripe :data="maintenanceList">
                <el-table-column type="index" align="center" width="55" label="序号"></el-table-column>
                <el-table-column prop="basicRetainone" label="名称"></el-table-column>
                <el-table-column prop="basicName" label="所属基础数据"></el-table-column>
                <el-table-column prop="supState" label="状态" width="65px">
              <template slot-scope="scope">
                <!-- {{scope.row}} -->
                <el-switch
                  v-model="scope.row.basicState"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                  @change="userStateChanged(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="190px">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditSupplier(scope.row.basicId)">修改</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletebumen(scope.row.basicId)"
                  size="mini"
                >删除</el-button>
              </template>
            </el-table-column>
              </el-table>
                <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        
        :page-size="10"
        layout="total,  prev, pager, next"
        :total=total
      ></el-pagination>
            </el-tab-pane>
            <el-tab-pane label="手柄形状">
              <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="handleClick(ta)">查询</el-button>
                        <el-button type="success" @click="addyonghuDialogVisible = true">新增</el-button>
                    </el-form-item>
                </el-form>
              <el-table border stripe :data="maintenanceList">
                <el-table-column type="index" align="center" width="55" label="序号"></el-table-column>
                <el-table-column prop="basicRetainone" label="名称"></el-table-column>
                <el-table-column prop="basicName" label="所属基础数据"></el-table-column>
                <el-table-column prop="supState" label="状态" width="65px">
              <template slot-scope="scope">
                <!-- {{scope.row}} -->
                <el-switch
                  v-model="scope.row.basicState"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                  @change="userStateChanged(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="190px">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditSupplier(scope.row.basicId)">修改</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletebumen(scope.row.basicId)"
                  size="mini"
                >删除</el-button>
              </template>
            </el-table-column>
              </el-table>
                <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        
        :page-size="10"
        layout="total,  prev, pager, next"
        :total=total
      ></el-pagination>
            </el-tab-pane>
            <el-tab-pane label="资金账户">
              <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="handleClick(ta)">查询</el-button>
                        <el-button type="success" @click="addyonghuDialogVisible = true">新增</el-button>
                    </el-form-item>
                </el-form>
              <el-table border stripe :data="maintenanceList">
                <el-table-column type="index" align="center" width="55" label="序号"></el-table-column>
                <el-table-column prop="basicRetainone" label="名称"></el-table-column>
                <el-table-column prop="basicName" label="所属基础数据"></el-table-column>
                <el-table-column prop="supState" label="状态" width="65px">
              <template slot-scope="scope">
                <!-- {{scope.row}} -->
                <el-switch
                  v-model="scope.row.basicState"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                  @change="userStateChanged(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="190px">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditSupplier(scope.row.basicId)">修改</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletebumen(scope.row.basicId)"
                  size="mini"
                >删除</el-button>
              </template>
            </el-table-column>
              </el-table>
                <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        
        :page-size="10"
        layout="total,  prev, pager, next"
        :total=total
      ></el-pagination>
            </el-tab-pane>
            <el-tab-pane label="产品设计稿维护">
              <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="handleClick(ta)">查询</el-button>
                        <el-button type="success" @click="addyonghuDialogVisible5 = true">新增</el-button>
                    </el-form-item>
                </el-form>
              <el-table border stripe :data="maintenanceList">
                <el-table-column type="index" align="center" width="55" label="序号"></el-table-column>
                <el-table-column prop="basicRetainone" label="名称"></el-table-column>
                <el-table-column prop="basicName" label="所属基础数据"></el-table-column>
                <el-table-column prop="supState" label="状态" width="65px">
              <template slot-scope="scope">
                <!-- {{scope.row}} -->
                <el-switch
                  v-model="scope.row.basicState"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                  @change="userStateChanged(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="190px">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditSupplier(scope.row.basicId,5)">修改</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletebumen(scope.row.basicId)"
                  size="mini"
                >删除</el-button>
              </template>
            </el-table-column>
              </el-table>
                <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
       
        :page-size="10"
        layout="total,  prev, pager, next"
        :total=total
      ></el-pagination>
      </el-tab-pane>
          </el-tabs>
      </el-card>
      <el-dialog
        title="新增基础数据"
        :visible.sync="addyonghuDialogVisible"
        width="30%"
        :before-close="handleClose"
        @closed="dialogClosed">
        <el-form :label-position="labelPosition" label-width="130px" :model="addMaintenance"
        ref="addMaintenanceRef"
        :rules="addMaintenanceRules">
            <el-form-item label="名称：" prop="basicRetainone"><el-input placeholder="请输入名称" v-model="addMaintenance.basicRetainone"></el-input></el-form-item>
            <el-form-item label="所属基础数据："><el-input placeholder="请输入所属基础数据" v-model="ta.label" :disabled="true"></el-input></el-form-item>
            <!-- <el-form-item label="状态："><el-input placeholder="请输入状态"></el-input></el-form-item> -->
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addyonghuDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addMainte">确 定</el-button>
        </span>
      </el-dialog>
      
      <el-dialog
        title="新增基础数据"
        :visible.sync="addyonghuDialogVisible1"
        width="30%"
        :before-close="handleClose"
        @closed="dialogClosed">
        <el-form :label-position="labelPosition" label-width="130px" :model="addMaintenance1"
        ref="addMaintenanceRef"
        :rules="addMaintenanceRules">
            <el-form-item label="淋膜类型：" prop="limoleixing">
               <el-select class="tiantou" v-model="addMaintenance1.limoleixing" placeholder="请选择类型">
                <el-option
              v-for="item in limoleixing"
              :key="item.basicId"
              :label="item.basicRetainone"
              :value="item.basicRetainone"
            ></el-option>
              </el-select>
             </el-form-item>
    <el-form-item label="淋膜总重：" prop="limozongzhong">
                  <el-select class="tiantou" v-model="addMaintenance1.limozongzhong" placeholder="请选择类型">
                    <el-option
                  v-for="item in limozongzhong"
                  :key="item.basicId"
                  :label="item.basicRetainone"
                  :value="item.basicRetainone"
                ></el-option>
                  </el-select>
             </el-form-item>
           
            <el-form-item label="淋膜类型与克重：" prop="basicRetainone"><el-input placeholder="请输入名称" v-model='addMaintenance1.limoleixing+"-"+addMaintenance1.limozongzhong'></el-input></el-form-item>
            <el-form-item label="所属基础数据："><el-input placeholder="请输入所属基础数据" v-model="ta.label" :disabled="true"></el-input></el-form-item>
           
            <!-- <el-form-item label="状态："><el-input placeholder="请输入状态"></el-input></el-form-item> -->
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addyonghuDialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="addMainte(1)">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="新增基础数据"
        :visible.sync="addyonghuDialogVisible2"
        width="30%"
        :before-close="handleClose"
        @closed="dialogClosed">
        <el-form :label-position="labelPosition" label-width="130px" :model="addMaintenance1"
        ref="addMaintenanceRef"
        :rules="addMaintenanceRules">
            <el-form-item label="产品类型：" prop="limoleixing">
               <el-select class="tiantou" v-model="addMaintenance1.limoleixing" placeholder="请选择类型">
                <el-option
              v-for="item in chanpinleixing"
              :key="item.basicId"
              :label="item.basicRetainone"
              :value="item.basicRetainone"
            ></el-option>
              </el-select>
             </el-form-item>
    <el-form-item label="产品规格：" prop="limozongzhong">
                  <el-select class="tiantou" v-model="addMaintenance1.limozongzhong" placeholder="请选择类型">
                    <el-option
                  v-for="item in chanpinguige"
                  :key="item.basicId"
                  :label="item.basicRetainone"
                  :value="item.basicRetainone"
                ></el-option>
                  </el-select>
             </el-form-item>
                 <el-form-item label="产品名称：" prop="limozongzhong1">
                  <el-select class="tiantou" v-model="addMaintenance1.limozongzhong1" placeholder="请选择类型">
                    <el-option
                  v-for="item in chanpinmingcheng"
                  :key="item.basicId"
                  :label="item.basicRetainone"
                  :value="item.basicRetainone"
                ></el-option>
                  </el-select>
             </el-form-item>
           
            <el-form-item label="产品规格与名称：" prop="basicRetainone"><el-input placeholder="请输入名称" v-model='addMaintenance1.limoleixing+"-"+addMaintenance1.limozongzhong+"-"+addMaintenance1.limozongzhong1'></el-input></el-form-item>
            <el-form-item label="所属基础数据："><el-input placeholder="请输入所属基础数据" v-model="ta.label" :disabled="true"></el-input></el-form-item>
           
            <!-- <el-form-item label="状态："><el-input placeholder="请输入状态"></el-input></el-form-item> -->
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addyonghuDialogVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="addMainte(2)">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="新增基础数据"
        :visible.sync="addyonghuDialogVisible3"
        width="30%"
        :before-close="handleClose"
        @closed="dialogClosed">
        <el-form :label-position="labelPosition" label-width="130px" :model="addMaintenance1"
        ref="addMaintenanceRef"
        :rules="addMaintenanceRules">
            <el-form-item label="模具规格：" prop="limoleixing">
               <el-select class="tiantou" v-model="addMaintenance1.limoleixing" placeholder="请选择类型">
                <el-option
              v-for="item in mojuguige"
              :key="item.basicId"
              :label="item.basicRetainone"
              :value="item.basicRetainone"
            ></el-option>
              </el-select>
             </el-form-item>
    <el-form-item label="产能：" prop="limozongzhong">
                  <el-input placeholder="请输入名称" v-model="addMaintenance1.limozongzhong"></el-input>
             </el-form-item>
           
            <el-form-item label="模具规格与产能：" prop="basicRetainone"><el-input placeholder="请输入名称" v-model='addMaintenance1.limoleixing+"-"+addMaintenance1.limozongzhong'></el-input></el-form-item>
            <el-form-item label="所属基础数据："><el-input placeholder="请输入所属基础数据" v-model="ta.label" :disabled="true"></el-input></el-form-item>
           
            <!-- <el-form-item label="状态："><el-input placeholder="请输入状态"></el-input></el-form-item> -->
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addyonghuDialogVisible3 = false">取 消</el-button>
          <el-button type="primary" @click="addMainte(3)">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="新增基础数据"
        :visible.sync="addyonghuDialogVisible4"
        width="30%"
        :before-close="handleClose"
        @closed="dialogClosed">
        <el-form :label-position="labelPosition" label-width="130px" :model="addMaintenance1"
        ref="addMaintenanceRef"
        :rules="addMaintenanceRules">
            
    <el-form-item label="产品规格：" prop="limoleixing">
                  <el-select class="tiantou" v-model="addMaintenance1.limoleixing" placeholder="请选择类型">
                    <el-option
                  v-for="item in chanpinguige"
                  :key="item.basicId"
                  :label="item.basicRetainone"
                  :value="item.basicRetainone"
                ></el-option>
                  </el-select>
             </el-form-item>
           <el-form-item label="模具规格与产能：" prop="limozongzhong">
               <el-select class="tiantou" v-model="addMaintenance1.limozongzhong" placeholder="请选择类型">
                <el-option
              v-for="item in chanpinguigeyumingcheng"
              :key="item.basicId"
              :label="item.basicRetainone"
              :value="item.basicRetainone"
            ></el-option>
              </el-select>
             </el-form-item>
            <el-form-item label="产品规格与名称：" prop="basicRetainone"><el-input placeholder="请输入名称" v-model='addMaintenance1.limoleixing+"-"+addMaintenance1.limozongzhong'></el-input></el-form-item>
            <el-form-item label="所属基础数据："><el-input placeholder="请输入所属基础数据" v-model="ta.label" :disabled="true"></el-input></el-form-item>
           
            <!-- <el-form-item label="状态："><el-input placeholder="请输入状态"></el-input></el-form-item> -->
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addyonghuDialogVisible4 = false">取 消</el-button>
          <el-button type="primary" @click="addMainte(4)">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="新增基础数据"
        :visible.sync="addyonghuDialogVisible5"
        width="30%"
        :before-close="handleClose"
        @closed="dialogClosed">
        <el-form :label-position="labelPosition" label-width="130px" :model="addMaintenance1"
        ref="addMaintenanceRef"
        :rules="addMaintenanceRules">
            
    <el-form-item label="产品规格：" prop="limoleixing">
                  <el-select class="tiantou" v-model="addMaintenance1.limoleixing" placeholder="请选择类型">
                    <el-option
                  v-for="item in chanpinguige"
                  :key="item.basicId"
                  :label="item.basicRetainone"
                  :value="item.basicRetainone"
                ></el-option>
                  </el-select>
             </el-form-item>
                 <el-form-item label="设计稿名称：" prop="limozongzhong">
                  <el-select class="tiantou" v-model="addMaintenance1.limozongzhong" placeholder="请选择类型">
                    <el-option
                  v-for="item in shejigaomingcheng"
                  :key="item.basicId"
                  :label="item.basicRetainone"
                  :value="item.basicRetainone"
                ></el-option>
                  </el-select>
             </el-form-item>
             <el-form-item label="确定日期：" prop="limozongzhong1">
               <el-input v-model="addMaintenance1.limozongzhong1" placeholder="请输入"></el-input>
              <!-- <el-date-picker
                v-model="addMaintenance1.limozongzhong1"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker> -->
             </el-form-item>
           
            <el-form-item label="产品设计稿名称：" prop="basicRetainone"><el-input placeholder="请输入名称" v-model='addMaintenance1.limoleixing+"-"+addMaintenance1.limozongzhong+"-"+addMaintenance1.limozongzhong1'></el-input></el-form-item>
            <el-form-item label="所属基础数据："><el-input placeholder="请输入所属基础数据" v-model="ta.label" :disabled="true"></el-input></el-form-item>
           
            <!-- <el-form-item label="状态："><el-input placeholder="请输入状态"></el-input></el-form-item> -->
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addyonghuDialogVisible5 = false">取 消</el-button>
          <el-button type="primary" @click="addMainte(5)">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="编辑基础数据"
        :visible.sync="edityonghuDialogVisible"
        width="30%"
        :before-close="handleClose"
        @closed="dialogClosed">
        <el-form :label-position="labelPosition" label-width="130px" :model="editMaintenance"
        ref="addMaintenanceRef"
        :rules="addMaintenanceRules">
          <el-form-item label="名称："><el-input placeholder="请输入名称" v-model="editMaintenance.basicRetainone"></el-input></el-form-item>
          <el-form-item label="所属基础数据"><el-input placeholder="请输入所属基础数据" v-model="ta.label" :disabled="true"></el-input></el-form-item>
          <!-- <el-form-item label="状态："><el-input placeholder="请输入状态"></el-input></el-form-item> -->
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="edityonghuDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editMaint">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="编辑基础数据"
        :visible.sync="edityonghuDialogVisible1"
        width="30%"
        :before-close="handleClose"
        @closed="dialogClosed">
        <el-form :label-position="labelPosition" label-width="130px" :model="editMaintenance"
        ref="addMaintenanceRef"
        :rules="addMaintenanceRules">
        <el-form-item label="淋膜类型：" prop="limoleixing">
               <el-select class="tiantou" v-model="addMaintenance1.limoleixing" placeholder="请选择类型">
                <el-option
              v-for="item in limoleixing"
              :key="item.basicId"
              :label="item.basicRetainone"
              :value="item.basicRetainone"
            ></el-option>
              </el-select>
             </el-form-item>
    <el-form-item label="淋膜总重：" prop="limozongzhong">
                  <el-select class="tiantou" v-model="addMaintenance1.limozongzhong" placeholder="请选择类型">
                    <el-option
                  v-for="item in limozongzhong"
                  :key="item.basicId"
                  :label="item.basicRetainone"
                  :value="item.basicRetainone"
                ></el-option>
                  </el-select>
             </el-form-item>
           
            <el-form-item label="淋膜类型与克重：" prop="basicRetainone"><el-input placeholder="请输入名称" v-model='addMaintenance1.limoleixing+"-"+addMaintenance1.limozongzhong'></el-input></el-form-item>
          <el-form-item label="淋膜类型与克重："><el-input placeholder="请输入名称" v-model="editMaintenance.basicRetainone"></el-input></el-form-item>
          <el-form-item label="所属基础数据"><el-input placeholder="请输入所属基础数据" v-model="ta.label" :disabled="true"></el-input></el-form-item>
          <!-- <el-form-item label="状态："><el-input placeholder="请输入状态"></el-input></el-form-item> -->
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="edityonghuDialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="editMaint(1)">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="编辑基础数据"
        :visible.sync="edityonghuDialogVisible2"
        width="30%"
        :before-close="handleClose"
        @closed="dialogClosed">
        <el-form :label-position="labelPosition" label-width="130px" :model="editMaintenance"
        ref="addMaintenanceRef"
        :rules="addMaintenanceRules">
        <el-form-item label="产品类型：" prop="limoleixing">
               <el-select class="tiantou" v-model="addMaintenance1.limoleixing" placeholder="请选择类型">
                <el-option
              v-for="item in chanpinleixing"
              :key="item.basicId"
              :label="item.basicRetainone"
              :value="item.basicRetainone"
            ></el-option>
              </el-select>
             </el-form-item>
    <el-form-item label="产品规格：" prop="limozongzhong">
                  <el-select class="tiantou" v-model="addMaintenance1.limozongzhong" placeholder="请选择类型">
                    <el-option
                  v-for="item in chanpinguige"
                  :key="item.basicId"
                  :label="item.basicRetainone"
                  :value="item.basicRetainone"
                ></el-option>
                  </el-select>
             </el-form-item>
                 <el-form-item label="产品名称：" prop="limozongzhong1">
                  <el-select class="tiantou" v-model="addMaintenance1.limozongzhong1" placeholder="请选择类型">
                    <el-option
                  v-for="item in chanpinmingcheng"
                  :key="item.basicId"
                  :label="item.basicRetainone"
                  :value="item.basicRetainone"
                ></el-option>
                  </el-select>
             </el-form-item>
           
            <el-form-item label="产品规格与名称：" prop="basicRetainone"><el-input placeholder="请输入名称" v-model='addMaintenance1.limoleixing+"-"+addMaintenance1.limozongzhong+"-"+addMaintenance1.limozongzhong1'></el-input></el-form-item>
          <el-form-item label="产品规格与名称："><el-input placeholder="请输入名称" v-model="editMaintenance.basicRetainone"></el-input></el-form-item>
          <el-form-item label="所属基础数据"><el-input placeholder="请输入所属基础数据" v-model="ta.label" :disabled="true"></el-input></el-form-item>
          <!-- <el-form-item label="状态："><el-input placeholder="请输入状态"></el-input></el-form-item> -->
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="edityonghuDialogVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="editMaint(2)">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="编辑基础数据"
        :visible.sync="edityonghuDialogVisible3"
        width="30%"
        :before-close="handleClose"
        @closed="dialogClosed">
        <el-form :label-position="labelPosition" label-width="130px" :model="editMaintenance"
        ref="addMaintenanceRef"
        :rules="addMaintenanceRules">
        <el-form-item label="模具规格：" prop="limoleixing">
               <el-select class="tiantou" v-model="addMaintenance1.limoleixing" placeholder="请选择类型">
                <el-option
              v-for="item in mojuguige"
              :key="item.basicId"
              :label="item.basicRetainone"
              :value="item.basicRetainone"
            ></el-option>
              </el-select>
             </el-form-item>
    <el-form-item label="产能：" prop="limozongzhong">
                  <el-input placeholder="请输入名称" v-model="addMaintenance1.limozongzhong"></el-input>
             </el-form-item>
             <el-form-item label="模具规格与产能：" prop="basicRetainone"><el-input placeholder="请输入名称" v-model='addMaintenance1.limoleixing+"-"+addMaintenance1.limozongzhong'></el-input></el-form-item>
          <el-form-item label="模具规格与产能："><el-input placeholder="请输入名称" v-model="editMaintenance.basicRetainone"></el-input></el-form-item>
          <el-form-item label="所属基础数据"><el-input placeholder="请输入所属基础数据" v-model="ta.label" :disabled="true"></el-input></el-form-item>
          <!-- <el-form-item label="状态："><el-input placeholder="请输入状态"></el-input></el-form-item> -->
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="edityonghuDialogVisible3 = false">取 消</el-button>
          <el-button type="primary" @click="editMaint(3)">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="编辑基础数据"
        :visible.sync="edityonghuDialogVisible4"
        width="30%"
        :before-close="handleClose"
        @closed="dialogClosed">
        <el-form :label-position="labelPosition" label-width="130px" :model="editMaintenance"
        ref="addMaintenanceRef"
        :rules="addMaintenanceRules">
        <el-form-item label="产品规格：" prop="limoleixing">
                  <el-select class="tiantou" v-model="addMaintenance1.limoleixing" placeholder="请选择类型">
                    <el-option
                  v-for="item in chanpinguige"
                  :key="item.basicId"
                  :label="item.basicRetainone"
                  :value="item.basicRetainone"
                ></el-option>
                  </el-select>
             </el-form-item>
           <el-form-item label="模具规格与产能：" prop="limozongzhong">
               <el-select class="tiantou" v-model="addMaintenance1.limozongzhong" placeholder="请选择类型">
                <el-option
              v-for="item in chanpinguigeyumingcheng"
              :key="item.basicId"
              :label="item.basicRetainone"
              :value="item.basicRetainone"
            ></el-option>
              </el-select>
             </el-form-item>
            <el-form-item label="产品规格与名称：" prop="basicRetainone"><el-input placeholder="请输入名称" v-model='addMaintenance1.limoleixing+"-"+addMaintenance1.limozongzhong'></el-input></el-form-item>
          <el-form-item label="产品规格与名称："><el-input placeholder="请输入名称" v-model="editMaintenance.basicRetainone"></el-input></el-form-item>
          <el-form-item label="所属基础数据"><el-input placeholder="请输入所属基础数据" v-model="ta.label" :disabled="true"></el-input></el-form-item>
          <!-- <el-form-item label="状态："><el-input placeholder="请输入状态"></el-input></el-form-item> -->
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="edityonghuDialogVisible4 = false">取 消</el-button>
          <el-button type="primary" @click="editMaint(4)">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="编辑基础数据"
        :visible.sync="edityonghuDialogVisible5"
        width="30%"
        :before-close="handleClose"
        @closed="dialogClosed">
        <el-form :label-position="labelPosition" label-width="130px" :model="editMaintenance"
        ref="addMaintenanceRef"
        :rules="addMaintenanceRules">
        <el-form-item label="产品规格：" prop="limoleixing">
                  <el-select class="tiantou" v-model="addMaintenance1.limoleixing" placeholder="请选择类型">
                    <el-option
                  v-for="item in chanpinguige"
                  :key="item.basicId"
                  :label="item.basicRetainone"
                  :value="item.basicRetainone"
                ></el-option>
                  </el-select>
             </el-form-item>
                 <el-form-item label="设计稿名称：" prop="limozongzhong">
                  <el-select class="tiantou" v-model="addMaintenance1.limozongzhong" placeholder="请选择类型">
                    <el-option
                  v-for="item in shejigaomingcheng"
                  :key="item.basicId"
                  :label="item.basicRetainone"
                  :value="item.basicRetainone"
                ></el-option>
                  </el-select>
             </el-form-item>
             <el-form-item label="确定日期：" prop="limozongzhong1">
               <el-input v-model="addMaintenance1.limozongzhong1" placeholder="请输入"></el-input>

              <!-- <el-date-picker
                v-model="addMaintenance1.limozongzhong1"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker> -->
             </el-form-item>
           
            <el-form-item label="产品设计稿名称：" prop="basicRetainone"><el-input placeholder="请输入名称" v-model='addMaintenance1.limoleixing+"-"+addMaintenance1.limozongzhong+"-"+addMaintenance1.limozongzhong1'></el-input></el-form-item>
            <el-form-item label="产品设计稿名称："><el-input placeholder="请输入名称" v-model="editMaintenance.basicRetainone"></el-input></el-form-item>
            <el-form-item label="所属基础数据："><el-input placeholder="请输入所属基础数据" v-model="ta.label" :disabled="true"></el-input></el-form-item>
          <!-- <el-form-item label="状态："><el-input placeholder="请输入状态"></el-input></el-form-item> -->
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="edityonghuDialogVisible5 = false">取 消</el-button>
          <el-button type="primary" @click="editMaint(5)">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>
<script>
export default {
  data () {
    return {
        tabPosition: 'left',
        labelPosition: 'right',
        addyonghuDialogVisible: false,
        edityonghuDialogVisible:false,
        resetPassdialogVisible:false,
        addyonghuDialogVisible1:false,
        addyonghuDialogVisible2:false,
        addyonghuDialogVisible3:false,
        addyonghuDialogVisible4:false,
        addyonghuDialogVisible5:false,

        edityonghuDialogVisible1:false,
        edityonghuDialogVisible2:false,
        edityonghuDialogVisible3:false,
        edityonghuDialogVisible4:false,
        edityonghuDialogVisible5:false,


        currentPage: 0,
        maintenanceList:[],
        chaMaintenanceForm:{
          basicValue:'',
          basicRetainone:'',
           pageCode: 1, //当前页
          pageSize: 10,//每页显示的记录数
        },
        total:0,
        addMaintenanceRules: {
          
          basicRetainone:[
          // { required: true, message: '请输入内容', trigger: 'blur' },
          { min: 0, max: 10000, message: '长度在 0 到 10000 个字符', trigger: 'blur' }
          ],},
        ta:{
          label:'产品名称',
          index:0,
        },
        addMaintenance:{
          basicRetainone:'',
         
        },
        addMaintenance1:{
          basicRetainone:'',
          limoleixing:'',
          limozongzhong:'',
          limozongzhong1:'',
          
        },
        activeName:'客户类型',
        editMaintenance:{
          basicRetainone:'',
        },
        limoleixing:[],
        limozongzhong:[],
        chanpinguige:[],
        chanpinguige:[],
        chanpinleixing:[],
        chanpinmingcheng:[],
        mojuguige:[],
        chanpinguigeyumingcheng:[],
        shejigaomingcheng:[],
    }
  },
  created () {
    this.handleClick(this.ta);
    this.list();
  },
  methods:{
   async list(){
       const { data: res } = await this.$http.post("jc/Basic/selectcoated");
       this.limoleixing=res;
       const { data: res1 } = await this.$http.post("jc/Basic/selectcoatedhethigt");
       this.limozongzhong=res1;
       const { data: res2 } = await this.$http.post("jc/Basic/selectProductcode");
       this.chanpinguige=res2;
       const { data: res3 } = await this.$http.post("jc/Basic/selectProducttype");
       this.chanpinleixing=res3;
       const { data: res4 } = await this.$http.post("jc/Basic/selectProductName");
       this.chanpinmingcheng=res4;
       const { data: res5 } = await this.$http.post("jc/Basic/selectspecificationsmodle");
       this.mojuguige=res5;
       const { data: res6 } = await this.$http.post("jc/Basic/selectcapacity");
       const { data: res7 } = await this.$http.post("jc/Basic/selectbox");
       this.shejigaomingcheng=res7;
        for (let index = 0; index < res6.length; index++) {
      if(res6[index].basicRetainone.indexOf("*")!=-1){
       res6[index].basicRetainone=res6[index].basicRetainone.substr(0, res6[index].basicRetainone.indexOf("*"))
    }
      }
       this.chanpinguigeyumingcheng=res6;
       
    },
   async userStateChanged(userInfo) {
      const { data: res } = await this.$http.post("/jc/Basic/updatebasicState",userInfo);
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
    dialogClosed(){
        this.$refs.addMaintenanceRef.resetFields();
      },
   async handleClick(tab){
     this.activeName=tab.label;
     this.ta.label=tab.label;
     this.ta.index=tab.index;     
     this.chaMaintenanceForm.basicValue=tab.index;
    const { data: res } = await this.$http.post("jc/Basic/selectBasic",this.chaMaintenanceForm);
    console.log(res);
    
    for (let index = 0; index < res.body.rows.length; index++) {
      res.body.rows[index].basicName=tab.label;
      if(res.body.rows[index].basicRetainone.indexOf("*")!=-1){
        res.body.rows[index].basicRetainone=res.body.rows[index].basicRetainone.substr(0, res.body.rows[index].basicRetainone.indexOf("*"))
    }
      }
      
    this.total=res.body.total;
      this.maintenanceList = res.body.rows;
      this.chaMaintenanceForm.pageCode=1;
     this.chaMaintenanceForm.pageSize=10;
    },
    addMainte(id){
      this.$refs.addMaintenanceRef.validate(async valid => {
        if (!valid) return;           
        this.addMaintenance.basicValue=this.ta.index;
        // this.addMaintenance1.basicValue=this.ta.index;
        console.log(this.addMaintenance1.limozongzhong1);
        
        if (this.addMaintenance1.limozongzhong1!=''&&this.addMaintenance1.limozongzhong!=''&&this.addMaintenance1.limoleixing!='') {
           this.addMaintenance.basicRetainone=this.addMaintenance1.limoleixing+'-'+this.addMaintenance1.limozongzhong+'-'+this.addMaintenance1.limozongzhong1+"*"+id;
        }else if(this.addMaintenance1.limozongzhong!=''&&this.addMaintenance1.limoleixing!=''){
         this.addMaintenance.basicRetainone=this.addMaintenance1.limoleixing+'-'+this.addMaintenance1.limozongzhong+"*"+id;
        }
          const { data: res } = await this.$http.post("jc/Basic/addBasic",this.addMaintenance);
        
        
        this.addyonghuDialogVisible = false;
        this.addyonghuDialogVisible1 = false;
        this.addyonghuDialogVisible2 = false;
        this.addyonghuDialogVisible3 = false;
        this.addyonghuDialogVisible4 = false;
        this.addyonghuDialogVisible5 = false;

        this.addMaintenance1.limozongzhong1='';
        this.addMaintenance1.limoleixing='';
        this.addMaintenance1.limozongzhong='';
        this.addMaintenance.basicRetainone='';
        this.handleClick(this.ta);
        this.list();
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
    async showEditSupplier(basicId,id){
      let param = new URLSearchParams();
      param.append("basicId", basicId);
      const {data:res} = await this.$http.post('jc/Basic/selectBasicbyid',param);
  
      if(res.basicRetainone.indexOf("*")!=-1){
       res.basicRetainone=res.basicRetainone.substr(0, res.basicRetainone.indexOf("*"))
    }
      
      this.editMaintenance=res;
      if(id==1){
       this.edityonghuDialogVisible1=true;
      }if(id==2){
       this.edityonghuDialogVisible2=true;
      }if(id==3){
       this.edityonghuDialogVisible3=true;
      }if(id==4){
       this.edityonghuDialogVisible4=true;
      }
      if(id==5){
       this.edityonghuDialogVisible5=true;
      }
      else{
      this.edityonghuDialogVisible=true;
      }
      
    },
    async editMaint(id){
      // if (this.addMaintenance1.limozongzhong1!='') {
      //      this.editMaintenance.basicRetainone=this.addMaintenance1.limoleixing+'-'+this.addMaintenance1.limozongzhong+'-'+this.addMaintenance1.limozongzhong1+"*"+id;
      //   }else{
      //    this.editMaintenance.basicRetainone=this.addMaintenance1.limoleixing+'-'+this.addMaintenance1.limozongzhong+"*"+id;
      //   }
        if (this.addMaintenance1.limozongzhong1!=''&&this.addMaintenance1.limozongzhong!=''&&this.addMaintenance1.limoleixing!='') {
           this.editMaintenance.basicRetainone=this.addMaintenance1.limoleixing+'-'+this.addMaintenance1.limozongzhong+'-'+this.addMaintenance1.limozongzhong1+"*"+id;
        }else if(this.addMaintenance1.limozongzhong!=''&&this.addMaintenance1.limoleixing!=''){
         this.editMaintenance.basicRetainone=this.addMaintenance1.limoleixing+'-'+this.addMaintenance1.limozongzhong+"*"+id;
        }
       const {data:res} = await this.$http.post('jc/Basic/updateBasic',this.editMaintenance);
       this.edityonghuDialogVisible1=false;
       this.edityonghuDialogVisible2=false;
       this.edityonghuDialogVisible3=false;
       this.edityonghuDialogVisible4=false;
       this.edityonghuDialogVisible5=false;


       this.edityonghuDialogVisible=false;
       this.handleClick(this.ta);
       this.list();
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
    chaMaintenanceResetForm(formName){
        this.$refs.chaMaintenanceRef.resetFields();
        this.handleClick(this.ta);
    },
    handleSizeChange(val) {
      this.chaMaintenanceForm.pageSize=val;
      this.handleClick(this.ta);
    },
    handleCurrentChange(val) {
      this.chaMaintenanceForm.pageCode=val;
      this.currentPage=val;
      this.handleClick(this.ta);
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    deletebumen(basicId){
      this.$confirm('此操作将永久删除该, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          let param = new URLSearchParams();
          param.append("basicId", basicId);
          const { data: res } = await this.$http.post(
            "jc/Basic/deleteBasic",
            param
          );
          this.handleClick(this.ta);
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
      width: 225px;
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
    .fenge{
        width: 100%;
        height: 20px;
        background: #eee;
        margin-top: 15px;
    }
  
    .el-pagination{
        
        margin-top: 10px;
    }
    // .el-tabs{
    //   height: 760px;
    // }
 

</style>