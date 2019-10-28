<template>
    <div class="min1500">
       <!-- 面包屑导航区域 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>基础资料</el-breadcrumb-item>
        <el-breadcrumb-item>基础数据维护</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
            <el-tabs :tab-position="tabPosition" @tab-click="handleClick" >
            <el-tab-pane label="客户类型">
              <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入供应商名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
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
        layout="total, sizes, prev, pager, next"
        :total=total
      ></el-pagination>
            </el-tab-pane>  
            <el-tab-pane label="产品类型">
              <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入供应商名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
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
        layout="total, sizes, prev, pager, next"
        :total=total
      ></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="产品规格">
             <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入供应商名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
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
        layout="total, sizes, prev, pager, next"
        :total=total
      ></el-pagination>
            </el-tab-pane>
            
            
            
            <el-tab-pane label="纸张品牌">
             <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入供应商名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
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
        layout="total, sizes, prev, pager, next"
        :total=total
      ></el-pagination>
            </el-tab-pane>
            <el-tab-pane label="产品名称">
              <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入供应商名称" v-model="chaMaintenanceForm.basicRetainone" clearable ></el-input>
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
        layout="total, sizes, prev, pager, next"
        :total=total
      ></el-pagination>
            </el-tab-pane>
            <el-tab-pane label="纸张克重">
             <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入供应商名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
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
        layout="total, sizes, prev, pager, next"
        :total=total
      ></el-pagination>
            </el-tab-pane>
            <el-tab-pane label="PE类型">
              <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入供应商名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
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
        layout="total, sizes, prev, pager, next"
        :total=total
      ></el-pagination>
            </el-tab-pane>
            <el-tab-pane label="PE克重">
              <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入供应商名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
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
        layout="total, sizes, prev, pager, next"
        :total=total
      ></el-pagination>
            </el-tab-pane>
            
            
            <el-tab-pane label="配盖">
              <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入供应商名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
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
        layout="total, sizes, prev, pager, next"
        :total=total
      ></el-pagination>
            </el-tab-pane>
            <el-tab-pane label="印刷方式">
              <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入供应商名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
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
        layout="total, sizes, prev, pager, next"
        :total=total
      ></el-pagination>
            </el-tab-pane>
            <el-tab-pane label="内包装" >
              <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入供应商名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
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
        :page-sizes="[10]"
        :page-size="100"
        layout="total, sizes, prev, pager, next"
        :total=total
      ></el-pagination>
             
            </el-tab-pane>
            <el-tab-pane label="外包装" >
              <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入供应商名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
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
        :page-sizes="[10]"
        :page-size="100"
        layout="total, sizes, prev, pager, next"
        :total=total
      ></el-pagination>
             
            </el-tab-pane>
            <el-tab-pane label="箱唛">
              <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入供应商名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
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
        layout="total, sizes, prev, pager, next"
        :total=total
      ></el-pagination>
            </el-tab-pane>
            <el-tab-pane label="标贴">
              <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入供应商名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
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
        layout="total, sizes, prev, pager, next"
        :total=total
      ></el-pagination>
            </el-tab-pane>
            <el-tab-pane label="产品刀模">
              <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入供应商名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
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
        layout="total, sizes, prev, pager, next"
        :total=total
      ></el-pagination>
            </el-tab-pane>
            <el-tab-pane label="库存单位">
              <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入供应商名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
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
        layout="total, sizes, prev, pager, next"
        :total=total
      ></el-pagination>
            </el-tab-pane>
            <el-tab-pane label="仓库类型">
              <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入供应商名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
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
        layout="total, sizes, prev, pager, next"
        :total=total
      ></el-pagination>
            </el-tab-pane>
            <el-tab-pane label="供应商类型">
              <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入供应商名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
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
        layout="total, sizes, prev, pager, next"
        :total=total
      ></el-pagination>
            </el-tab-pane>
            
            <el-tab-pane label="货币类型">
              <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入供应商名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
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
        layout="total, sizes, prev, pager, next"
        :total=total
      ></el-pagination>
            </el-tab-pane>
            <el-tab-pane label="收入类型">
              <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入供应商名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
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
        layout="total, sizes, prev, pager, next"
        :total=total
      ></el-pagination>
            </el-tab-pane>
            <el-tab-pane label="支出类型">
              <el-form :inline="true" class="demo-form-inline" :model="chaMaintenanceForm" ref="chaMaintenanceRef">
                    <el-form-item label="名称：" prop="basicRetainone">
                      <el-input placeholder="请输入供应商名称" v-model="chaMaintenanceForm.basicRetainone" clearable></el-input>
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
        layout="total, sizes, prev, pager, next"
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
        <el-form :label-position="labelPosition" label-width="120px" :model="addMaintenance"
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
        title="编辑基础数据"
        :visible.sync="edityonghuDialogVisible"
        width="30%"
        :before-close="handleClose"
        @closed="dialogClosed">
        <el-form :label-position="labelPosition" label-width="120px" :model="editMaintenance"
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
          { required: true, message: '请输入内容', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' }
          ],},
        ta:{
          label:'产品名称',
          index:0,
        },
        addMaintenance:{
          basicRetainone:'',
        },
        editMaintenance:{
          basicRetainone:'',
        }
    }
  },
  created () {
    this.handleClick(this.ta);
  },
  methods:{
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
     
     this.ta.label=tab.label;
     this.ta.index=tab.index;     
     this.chaMaintenanceForm.basicValue=tab.index;
    const { data: res } = await this.$http.post("jc/Basic/selectBasic",this.chaMaintenanceForm);
    for (let index = 0; index < res.body.rows.length; index++) {
      res.body.rows[index].basicName=tab.label;
    }
    this.total=res.body.total;
      this.maintenanceList = res.body.rows;
      this.chaMaintenanceForm.pageCode=1;
     this.chaMaintenanceForm.pageSize=10;
    },
    addMainte(){
      this.$refs.addMaintenanceRef.validate(async valid => {
        if (!valid) return;    
        this.addMaintenance.basicValue=this.ta.index;
        const { data: res } = await this.$http.post("jc/Basic/addBasic",this.addMaintenance);
        this.addyonghuDialogVisible = false;
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
      });
    },
    async showEditSupplier(basicId){
      let param = new URLSearchParams();
      param.append("basicId", basicId);
      const {data:res} = await this.$http.post('jc/Basic/selectBasicbyid',param);
      this.editMaintenance=res;
      this.edityonghuDialogVisible=true;
    },
    async editMaint(){
       const {data:res} = await this.$http.post('jc/Basic/updateBasic',this.editMaintenance);
       this.edityonghuDialogVisible=false;
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
</style>