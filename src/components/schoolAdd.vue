<template>
  <div class="schoolAdd">
    <div v-if="formShow">
      <div class="schAd">
        <h1>新增学校库信息</h1>
        <router-link tag="span" to="/school"><i class="el-icon-close"></i></router-link>
      </div>
      <div class="addsteps">
        <el-steps :active="active" finish-status="success" align-center>
          <el-step title="基本信息"></el-step>
          <el-step title="课程信息"></el-step>
          <el-step title="师资力量"></el-step>
          <el-step title="建设&投资"></el-step>
        </el-steps>
      </div>
    
      <!-- form表单 -->
      <div class="addform">
        <el-form :model="form" ref="form" label-width="110px" class="demo-ruleForm" :rules="rules" :inline="true" >
          <!-- 基本信息 -->
          <div v-if="active == 0" class="first">
            <el-form-item label="学校名字" prop="schoolName" id="addFlex" >
              <el-input v-model.trim="form.schoolName"></el-input>
              <!-- <i>学校名字不能为空</i> -->
            </el-form-item>
            <el-form-item label="学校英文名字" prop="schoolEnglishName">
              <el-input v-model.trim="form.schoolEnglishName" ></el-input>
            </el-form-item>
            <el-form-item label="学校性质" prop="schoolProperties" >
              <el-select v-model="form.schoolProperties" placeholder="请选择学校性质" :value-key="form.schoolProperties">
                <el-option label="公办" value="公办"></el-option>
                <el-option label="民办" value="民办"></el-option>
                <el-option label="外籍" value="外籍"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="运营状态" prop="operationState">
              <el-select v-model="form.operationState" placeholder="请选择运营状态" :value-key="form.operationState">
                <el-option label="运营中" value="运营中"></el-option>
                <el-option label="筹建" value="筹建"></el-option>
                <el-option label="停办" value="停办"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="page-form-item" label="所在地区" prop="province">
                <el-select v-model="form.province" placeholder="请选择" @change="provinceChanged" style="width:130px !important;">
                    <el-option
                    :key="''"
                    :label="'全部'"
                    :value="''">
                    </el-option>
                    <el-option
                    v-for="item in provinces"
                    :key="item.code"
                    :label="item.name"
                    :value="item.name">
                    </el-option>
                </el-select>
                <el-select v-model="city" :loading="loadingCity" placeholder="请选择" style="width:130px !important;">
                    <el-option
                    :key="''"
                    :label="'全部'"
                    :value="''">
                    </el-option>
                    <el-option
                    v-for="item in cities"
                    :key="item.code"
                    :label="item.name"
                    :value="item.name">
                    </el-option>
            </el-select>
            </el-form-item>
             <el-form-item label="地址(街道)" prop="address" id="addFlex">
              <el-input v-model="form.address" ></el-input>
            </el-form-item>
            <el-form-item label="成立时间(年)" prop="foundingTime" id="addFlex">
              <el-input v-model.number="form.foundingTime" ></el-input>
            </el-form-item>
            <el-form-item label="学制" prop="schoolSystem" >
              <el-checkbox-group v-model="inputCheckbox">
                <el-checkbox label="幼儿园;" name="schoolSystem">幼儿园</el-checkbox>
                <el-checkbox label="小学;" name="schoolSystem">小学</el-checkbox>
                <el-checkbox label="初中;" name="schoolSystem">初中</el-checkbox>
                <el-checkbox label="高中;" name="schoolSystem">高中</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="官网" prop="website">
              <el-input v-model="form.website" ></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="telephone">
              <el-input v-model="form.telephone" ></el-input>
            </el-form-item>
          </div>
          <!-- 课程信息 -->
          <div v-else-if="active == 1" class="second">
            <el-form-item label="人数" style="margin: 15px 40px;">
                <div class="tuitionSchool">
                  <div class="tuition">
                    <div class="grade"><span>幼儿园</span><el-input  v-model="form.studentNumOne"></el-input></div>
                    <div class="grade"><span>小学</span><el-input v-model="form.studentNumThird"></el-input></div>
                    <div class="grade"><span>初中</span><el-input  v-model="form.studentNumTwo"></el-input></div>
                    <div class="grade"><span>高中</span><el-input  v-model="form.studentNumFour"></el-input></div>
                  </div>
                </div>
            </el-form-item>
            <el-form-item label="学费(年)" style="margin: 15px 40px;">
                <div class="tuitionSchool">
                  <div class="tuition">
                    <div class="grade"><span>幼儿园</span><el-input v-model="form.oneTuition"></el-input></div>
                    <div class="grade"><span>小学</span><el-input v-model="form.twoTuition"></el-input></div>
                    <div class="grade"><span>初中</span><el-input v-model="form.thirdTuition" ></el-input></div>
                    <div class="grade"><span>高中</span><el-input v-model="form.fourTuition" ></el-input></div>
                  </div>
                </div>
                <p class="tip">学费请填入数字，整数 例：150000</p>
            </el-form-item>
            <el-form-item label="国际课程" prop="course" class="internationCourse">
              <div class="addFlexTwo">
                <el-input v-model="form.course"></el-input>
              </div>
              <el-checkbox-group v-model="inputCheckboxCourse">
                <el-checkbox label="IPC;" name="course">IPC</el-checkbox>
                <el-checkbox label="OMYC;" name="course">OMYC</el-checkbox>
                <el-checkbox label="PGA;" name="course">PGA</el-checkbox>
                <el-checkbox label="AP;" name="course">AP</el-checkbox>
                <el-checkbox label="IBPYP;" name="course">IBPYP</el-checkbox>
                <el-checkbox label="IBMYP;" name="course">IBMYP</el-checkbox>
                <el-checkbox label="IBDP;" name="course">IBDP</el-checkbox>
                <el-checkbox label="A-LEVEL;" name="course">A-LEVEL</el-checkbox>
                <el-checkbox label="IGCSE;" name="course">IGCSE</el-checkbox>
                <br/>
                <el-checkbox label="蒙特梭利;" name="course">蒙特梭利</el-checkbox>
                <el-checkbox label="美国课程;" name="course">美国课程</el-checkbox>
                <el-checkbox label="澳大利亚课程;" name="course">澳大利亚课程</el-checkbox>
                <el-checkbox label="澳洲VCE;" name="course">澳洲VCE</el-checkbox>
                <el-checkbox label="澳洲WACE;" name="course">澳洲WACE</el-checkbox>
                <el-checkbox label="加拿大课程;" name="course">加拿大课程</el-checkbox>
                <br/>
                <el-checkbox label="双语课程;" name="course">双语课程</el-checkbox>
                <el-checkbox label="校本课程;" name="course">校本课程</el-checkbox>
                <el-checkbox label="ESL;" name="course">ESL</el-checkbox>
                <el-checkbox label="其他;" name="course">其他</el-checkbox>
              </el-checkbox-group>
            </el-form-item>

            <el-form-item label="认证&组织" prop="authentication"  class="internationCourse">
                <el-input v-model="form.authentication"></el-input>
              <el-checkbox-group v-model="inputCheckboxauthentication">
                <el-checkbox label="CIE;" name="authentication">CIE</el-checkbox>
                <el-checkbox label="Edexcel;" name="authentication">Edexcel</el-checkbox>
                <el-checkbox label="OxfordAQA;" name="authentication">OxfordAQA</el-checkbox>
                <el-checkbox label="IBO;" name="authentication">IBO</el-checkbox>
                <el-checkbox label="CollegeBoard;" name="authentication">CollegeBoard</el-checkbox>
                <el-checkbox label="CLS;" name="authentication">CLS</el-checkbox>
                <br/>
                <el-checkbox label="WASC;" name="authentication">WASC</el-checkbox>
                <el-checkbox label="NEASC;" name="authentication">NEASC</el-checkbox>
                <el-checkbox label="EARCOS;" name="authentication">EARCOS</el-checkbox>
                <el-checkbox label="AdvancED;" name="authentication">AdvancED</el-checkbox>
                <el-checkbox label="NCCT;" name="authentication">NCCT</el-checkbox>
                <el-checkbox label="ACAMIS;" name="authentication">ACAMIS</el-checkbox>
                <br/>
                <el-checkbox label="ROUND SQUARE;" name="authentication">ROUND SQUARE</el-checkbox>
                <el-checkbox label="FOBISIA;" name="authentication">FOBISIA</el-checkbox>
                <el-checkbox label="ISAC;" name="authentication">ISAC</el-checkbox>
                <el-checkbox label="THE DUKE OF EDINBURGH’S INTERNATIONAL AWARD;" name="authentication">THE DUKE OF EDINBURGH’S INTERNATIONAL AWARD</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </div>
          <!-- 师资力量 -->
          <div v-else-if="active == 2" class="third">
            <el-form-item label="学生总人数" prop="students" class="addFlex">
              <el-input v-model.number="form.students" ></el-input>
              <!-- <i>格式为数字，整数</i> -->
            </el-form-item>
            <el-form-item label="学生容量" prop="studentCapacity" class="addFlex">
              <el-input v-model.number="form.studentCapacity" ></el-input>
              <!-- <i>格式为数字，整数</i> -->
            </el-form-item>
            <el-form-item label="毕业班人数" prop="graduatedStuNum" class="addFlex">
              <el-input v-model.number="form.graduatedStuNum" ></el-input>
              <!-- <i>格式为数字，整数</i> -->
            </el-form-item>
            <el-form-item label="学生主要国籍" prop="stuDominantNationality" class="addFlex">
              <el-input v-model="form.stuDominantNationality" ></el-input>
              <!-- <i>请分号分割 例：中国;美国;英国</i> -->
            </el-form-item>
            <el-form-item label="员工数量" prop="staffNum" class="addFlex">
              <el-input v-model.number="form.staffNum" ></el-input>
              <!-- <i>格式为数字，整数</i> -->
            </el-form-item>
            <el-form-item label="教师数量" prop="teacherNum" class="addFlex">
              <el-input v-model.number="form.teacherNum" ></el-input>
              <!-- <i>格式为数字，整数</i> -->
            </el-form-item>
            <el-form-item label="外籍教师数量" prop="foreignTeacherNum" class="addFlex">
              <el-input v-model.number="form.foreignTeacherNum" ></el-input>
              <!-- <i>格式为数字，整数</i> -->
            </el-form-item>
            <el-form-item label="师生比" prop="teacherStuRatio">
              <el-input v-model="form.teacherStuRatio" ></el-input>
            </el-form-item>
          </div>
          <!-- 建设 -->
          <div v-else-if="active == 3" class="four">
            <el-form-item label="占地面积(亩)" prop="coveredArea" class="addFlex">
              <el-input v-model.number="form.coveredArea" ></el-input>
              <!-- <i>格式为数字，整数</i> -->
            </el-form-item>
            <el-form-item label="建筑面积(㎡)" prop="builtArea" class="addFlex">
              <el-input v-model.number="form.builtArea" ></el-input>
              <!-- <i>格式为数字，整数</i> -->
            </el-form-item>
            <el-form-item label="学校简介"  prop="schoolDesc">
              <el-input type="textarea" placeholder="请输入内容" :rows="4" v-model="form.schoolDesc"></el-input>
            </el-form-item>
            <el-form-item label="硬件设施"  prop="hardware">
              <el-input type="textarea" placeholder="请输入内容" :rows="4" v-model="form.hardware"></el-input>
            </el-form-item>
            <el-form-item label="投资信息" prop="investment">
              <el-input type="textarea" placeholder="请输入内容" :rows="4" v-model="form.investment"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input type="textarea" placeholder="请输入内容" :rows="4" v-model="form.remark"></el-input>
            </el-form-item>
            <el-form-item label="提交人姓名" prop="submitName">
              <el-input  :rows="4" v-model="form.submitName"></el-input>
            </el-form-item>
            <el-form-item label="公司名称" prop="company">
              <el-input  :rows="4" v-model="form.company"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="telphone">
              <el-input  :rows="4" v-model="form.telphone"></el-input>
            </el-form-item>
          </div>
          <!-- 完成 -->
          <!-- <div v-else-if="active == 4">wancheng</div> -->
        </el-form>

      </div>
      <div class="nextButton">
          <el-button :class="active==0?'disabled':''" style="margin-top: 12px;" @click="Previous">上一步</el-button>
          <el-button style="margin-top: 12px;" @click="next('form')">{{completeBtn}}</el-button>
      </div>
    </div>
    <div v-else-if="!formShow" class="Tips">
        <P>提交成功</P>
        <p>审核通过后将会插入数据库</p>
        <ul>
          <li><el-button type="info" round @click="returnBtn(1)">返回学校库</el-button></li>
          <li><el-button type="info" round @click="returnBtn(2)">继续提交</el-button></li>
        </ul>
    </div>
  </div>
</template>

<script>
import {getSchoolAdd,getSchoolCheck_valid} from '@/api/api';
import store from '@/store/store.js';
import provinceCity  from '../../static/area.json'
export default {
    components:{
        provinceCity
    },
  data() {
    //验证成立时间
    var foundingTime = (rele,value,callback) =>{
      if(value == "" || value == null){
        callback()
      }else{
        if(!/^\d+$/.test(value)){
          callback(new Error("格式不正确,请输入四位数字  例：2020"));
        }else{
          let num = value;
          num = num.toString();
          if(num.length == "4"){
            callback()
          }else{
              callback(new Error("请输入成立时间 例：2020"));
          }

        }
      }
    };
    //验证网址头
    var website = (rele,value,callback) =>{
      if(value == "" || value == null){
        callback();
      }else{
        if(value.indexOf("http") == 0 || value.indexOf("https") == 0){
          callback(new Error("禁止出现 http://或https:// 开头 例:www.baidu.com"));
        }else{
          callback()
        }
      }
    };
    //学费  容量
    var twoTuition = (rele,value,callback) =>{
      if(value == "" || value == null){
          console.log("ronliang1111")
          callback()
      }else{
        // if(!/^\d+$/.test(value)){
        if(/^[0-9]*$/.test(value)){
            callback()
          }else{
            console.log("不是整数");
            callback(new Error("必须为数字值 例：25000"));
        }
      }
    };
    //学校名验证
    var schoolName = (rele,value,callback) =>{
      if(value == ""){
        callback(new Error("学校名不能为空"));
      }else{
        getSchoolCheck_valid({
          schoolName : value
        }).then(res => {
          if(res.code == 1){
            callback(new Error("该信息已存在"));
          }else{
            callback()
          }
        })
      }
    }
    return {
      loadingCity: false,
      province: '',
      city: '',
      provinces: [],
      cities: [],
      active:0,
      isEdit:1,
      i:0,
      inputCheckbox:[], //学制
      inputCheckboxCourse:[], //课程
      inputCheckboxauthentication:[], //认证组织
      curshe:0,
      completeBtn:"下一步",//完成 下一步按钮切换
      formShow:true,
      form:{
        schoolName:"",  //学校名字
        schoolEnglishName:"", //学校英文名
        schoolProperties:"",  //学校性质
        province:"",//省
        town:"", //市
        address:"", //地址
        foundingTime:"",  //成立时间
        operationState:"", //运营状态
        schoolSystem:"", //学制
        oneTuition:"", //幼儿园学费
        twoTuition:"",  //小学学费
        thirdTuition:"",  //初中学费
        fourTuition:"", //高中学费
        studentNumOne:"",//幼儿园人数
        studentNumTwo:"",//小学人数
        studentNumThird	:"",//初中人数
        studentNumFour:"",//高中人数
        website:"",  //官网
        telephone:"",  //电话
        interCourseFoundedTime:"", //国际学校成立时间
        course:"",  //课程
        authentication:"",  //认证
        students:"",  //学生总人数
        studentCapacity:"", //学生容量
        graduatedStuNum:"", //毕业班人数
        stuDominantNationality:"", //学生主要国籍
        staffNum:"", //员工数量
        teacherNum:"", //教师数量
        foreignTeacherNum:"", //外籍教师数量
        teacherStuRatio:"", //师生比
        coveredArea:"", //占地面积
        builtArea:"", //建筑面积
        hardware:"",  //硬件设施
        investment:"", //投资信息
        remark:"",  //备注
        schoolLogo:"", //学校logo
        schoolShowOne:"",  //大图1
        schoolShowTwo:"",  //大图2
        schoolShowThird:"",  //大图3
        schoolShowFour:"",  //大图4
        schoolShowFive:"",  //大图5
        schoolDesc:"",  //学校简介
        accommodation:"",  //住宿情况
        studentEnrollment:"", //招生情况
        studeAbroadCountries:"",  //留学生留学国家
        prospects:"", //招生对象
        filingFee:"",  //申请费
        schoolManagement:"",  //办学理念
        schoolCharacteristics:"",  //办学特色
        courseSystem:"",  //课程体系
        nationalityOfStudents:"",  //学生国籍数
        classSize:"",  //班级规模
        teachingForm:"",  //授课形式
        companyAnalysis:"",  //新学说分析
        verifySign:"",  //0：审核中 1：审核通过
        submitName:"", //提交人姓名
        company:"",//公司名称
        telphone:"",//手机号
        yearOfData:2020, //数据年份
      },
      //表单验证
      rules:{
        schoolName:[ //学校名字 schoolCheckValid
          {validator: schoolName,required:true,trigger:'blur'},
        ],
        schoolProperties:[ 
           {required:true,message:"请选择学校性质",trigger:'blur'},
        ],
        operationState:[ 
           {required:true,message:"请选择运营状态",trigger:'blur'},
        ],
        province:[ //地址
          {required:true,message:"请选择城市",trigger:'blur'}
        ],
        address:[ //地址
          {required:true,message:"地址不能为空",trigger:'blur'}
        ],
        foundingTime:[ //成立时间
          {validator: foundingTime,trigger: 'blur' }
        ],
        schoolSystem:[//学制
          {required:true,message:"选项不能为空",trigger:'blur'}
        ],
        oneTuition:[ //幼儿园学费
          {validator: twoTuition,trigger: 'blur' }
        ],
        twoTuition:[ //小学学费
          {validator: twoTuition,trigger: 'blur' }
        ],
        thirdTuition:[ //初中学费
          {validator: twoTuition,trigger: 'blur' }
        ],
        fourTuition:[ //高中学费
          {validator: twoTuition,trigger: 'blur' }
        ],
        website:[ //官网
          {validator: website,trigger: 'blur' }
        ],
        interCourseFoundedTime:[ //国际学校成立时间
          {validator: foundingTime,trigger: 'blur' }
        ],
        course:[//国际课程
          // {required:true,message:"选项不能为空",trigger:'blur'}
        ],
         authentication:[ //认证组织
          // {required:true,message:"选项不能为空",trigger:'blur'}
        ],
        students:[ //学生总人数
           { required: true, message: "学生总人数不能为空", trigger: "blur" }
        ],
        submitName:[ //学生总人数
           { required: true, message: "姓名不能为空", trigger: "blur" }
        ],
        company:[ //学生总人数
           { required: true, message: "公司不能为空", trigger: "blur" }
        ],
        telphone:[ //学生总人数
           { required: true, message: "手机号不能为空", trigger: "blur" }
        ],
        // studentCapacity:[//学生容量
        //   {required:true,validator: twoTuition,trigger: 'blur' }
        // ],
        // graduatedStuNum:[//毕业班人数
        //   {required:true,validator: twoTuition,trigger: 'blur' }
        // ],
        // staffNum:[//员工数量
        //   {required:true,validator: twoTuition,trigger: 'blur' }
        // ],
        // teacherNum:[//教师数量
        //   {required:true,validator: twoTuition,trigger: 'blur' }
        // ],
        // foreignTeacherNum:[//外籍教师数量
        //   {required:true,validator: twoTuition,trigger: 'blur' }
        // ],
        teacherStuRatio:[//师生比
        ],
        // coveredArea:[//占地面积
        //   {required:true,validator: twoTuition,trigger: 'blur' }
        // ],
        // builtArea:[//建筑面积
        //   {required:true,validator: twoTuition,trigger: 'blur' }
        // ],
        hardware:[ //硬件设施
          // {required:true,message:"硬件不能为空",trigger:'blur'},
        ],
        filingFee:[ //申请费
          {required:true,validator: twoTuition,trigger: 'blur' },
        ],
      },
    }
  },
   created() {
      this.provinces = provinceCity.provinces
    },
  methods: {
      provinceChanged(value) {
          console.log(value)
        if (value !== '') {
          this.loadingCity = true
          for (var item of this.provinces) {
            if (item.name === value) {
              this.cities = item.cities
              this.city = ''
              this.loadingCity = false
              break
            } else {
              continue
            }
          }
        } else {
          this.cities = []
          this.city = ''
        }
      },
    next(form) {
      this.form.town=this.city 
      console.log(this.form)
      this.$refs[form].validate((valid) => {
        console.log(valid)
        if (valid) {
          this.active =  this.active + 1;
          console.log(this.active)
          if(this.active == 3 ){
            this.completeBtn = "提交";
          }
          if(this.active == 4){
            getSchoolAdd(
              this.form
            ).then(res => {
              console.log(res)
              if(res.code == "0"){
                this.formShow = false;
                this.$router.push({ path: "schoolUpload",query:{id:res.data}});
              }else{
                this.active =  3;
                this.$message({
                  showClose: true,
                  message: '数据提交失败',
                  type: 'error'
                });
              }
              console.log(res)
            })
          }
          if(this.active > 4  ) this.active = 4;
        } else {
          console.log("chuow")
          this.active = this.active;
          console.log('error submit!!');
          return false;
        }
      });

    },
    Previous(){
      this.active =  this.active - 1;
      if(this.active < 0 ){
        this.active = 0;
      }else if(this.active < 3){
        this.completeBtn = "下一步";
      }
    },
    //提交成功后返回操作
    returnBtn(num){
      if(num == "1"){
          this.$router.push({path:'/school'})
        }else{
          this.formShow = true;
      }
    },
        
},
    mounted(){
        this.province = this.provinceCode
        this.provinceChanged(this.provinceCode)
        this.city = this.cityCode
    },
   watch: {
    //学制多选
    "inputCheckbox":function(val){
      let strInputCheckbox = "";
      for(let i=0;i<val.length;i++){
        strInputCheckbox += val[i]
      }
      this.form.schoolSystem = strInputCheckbox;

      let schoolSystem = this.form.schoolSystem;

    },
    //国际课程多选
    "inputCheckboxCourse":function(val){
      let strCourse = ""
      for(let i=0;i<val.length;i++){
        strCourse += val[i]
      }
      this.form.course = strCourse;
    },
    //认证组织
    "inputCheckboxauthentication":function(val){
      let strCation = ""
      for(let i=0;i<val.length;i++){
        strCation += val[i]
      }
      this.form.authentication = strCation;
    }
  },
}
</script>

<style lang="less" scoped>
  //禁止点击
  .disabled {
    color: #c0c4cc;
    cursor: not-allowed;
    background-image: none;
    background-color: #fff;
    border-color: #ebeef5;
  }
  .schoolAdd{
    min-width:1200px;
    width: 80%;
    margin: 120px auto 0;
    border: 1px solid #ccc;
    .schAd{
      padding-top: 30px;
      h1{
        display: inline-block;
        margin-left: 50%;
        transform: translateX(-50%);
      }
      span{
        display: inline-block;
        float: right;
        width: 30px;
        height: 30px;
        margin-right: 30px;
        i{
          font-size: 30px;
        }
      }
      span:hover{
        background: red;
        color: #eee;
      }
    }
    .Tips{
      // background: skyblue;
      text-align: center;
      height: 500px;
      p:nth-child(1){
        margin-top: 15%;
        font-size: 50px;
        color: #67c23a;
      }
      p:nth-child(2){
        margin-top: 5%;
        font-size: 20px;
        color: steelblue;
      }
      ul{
        margin-top: 20%;
        li{
          float: left;
        }
        li:first-child{
          margin-left: 50%;
          transform: translateX(-155%);
        }
      }
    }
    .tip{
        color:#a9a9a9;
        font-size: 12px;
    }
    .tuitionSchool{
      display: flex;
      
      /deep/.tuition{
        // line-height: 50px;
        // width: 26% !important;
        .grade{
            display:inline-block;
            margin-right:10px;
        }
        span{
          display:inline-block;
          width: 50px;
          text-align:right;
        }
        .el-input{
          margin-left: 10px;
          width: 110px !important;
        }
      }
    }
    //表单样式
    form.el-form.demo-ruleForm{
      .el-checkbox-group{
        // margin-left: 100px;
        .el-checkbox{
            margin-right:12px;
        }
      }
      /deep/.el-form-item__error{
        // margin-left: 100px;
      }
    }
    .addsteps{
      width: 70%;
      margin: 30px auto 0;
    }
    .addform{
        .el-form{
            width: 80%;
            margin: 30px auto;
            .first{
                .el-form-item {
                    margin: 15px 40px;
                    .el-cascader {
                        width: 265px !important;
                    }
                    .el-select {
                        width: 265px !important;
                    }
                    // .el-form-item__content {
                        .el-input {
                            width: 265px !important;
                        }
                    // }
                }
            }
            .second{
                .internationCourse {
                    margin: 15px 40px;
                    .el-select {
                        width: 265px !important;
                    }
                    .el-form-item__content {
                        .el-input {
                            width: 265px !important;
                        }
                    }

                    
                }
            }
            .third{
                .el-form-item {
                    margin: 15px 40px;
                    .el-form-item__content {
                        .el-input {
                            width: 265px !important;
                        }
                    }
                }
            }
            .four{
                .el-form-item {
                    margin: 15px 40px;
                    .el-textarea{
                        width: 265px !important;
                    }
                    .el-form-item__content {
                        .el-input {
                            width: 265px !important;
                        }
                    }
                }
            }
        }
      .el-input {
        position: relative;
        font-size: 14px;
        display: inline-block;
        // width: 43%;
      }
      .upload-demo{
        margin-bottom:30px;
        text-align: center;
      }
    }
    .nextButton{
        text-align:center;
        .el-button{
            margin:20px 30px;
        }
    }
    .el-textarea {
      width: 59%;
    }
    /deep/.el-form-item__label{
    //   width: 200px !important;
    }
    /deep/.TuitionBoxLabel{
      label{
        // width: 100px !important;
      }
    }
    
  }
 
  @media screen and(min-width: 1200px){
    .schoolAdd{
      width: 1200px;
    }
    
  }
</style>
<style>
    .el-form-item.is-success .el-input__inner{
        border:1px solid #ccc !important;
        border-color:#ccc !important;
    }
    .el-form-item.is-success .el-textarea__inner{
        border:1px solid #ccc !important;
        border-color:#ccc !important;
    }
    .el-input.is-active .el-input__inner, .el-input__inner:focus{
        border-color:#409EFF !important;
    }
</style>

