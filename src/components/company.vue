<template>
    <div style="background: #f5f5f5;">
        <div class="companyBox">
            <div class="companyGroup">
                <div class="searchBox">
                    <el-autocomplete placeholder="请输入内容" v-model="searchKey" @keyup.enter.native="searchCompany"  :fetch-suggestions="getSuggestSearch" @select="handleSelect" :trigger-on-focus="false">
                        <el-button @click="searchCompany" slot="append"><i class="iconfont icon-sousuo"></i></el-button>
                    </el-autocomplete>
                </div>
                <p class="homeBannerP">
                    <span>热门搜索：</span>
                    <a href="https://www.xinxueshuo.cn/data/dist/index.html#/companyDetail?id=100197" target="_blank">英帆国际教育</a>
                    <a href="https://www.xinxueshuo.cn/data/dist/index.html#/companyDetail?id=100198" target="_blank">华樱出国</a>
                    <a href="https://www.xinxueshuo.cn/data/dist/index.html#/companyDetail?id=100201" target="_blank">力翰科学教育集团</a>
                    <a href="https://www.xinxueshuo.cn/data/dist/index.html#/companyDetail?id=100195" target="_blank">赛帆教育</a>
                    <a href="https://www.xinxueshuo.cn/data/dist/index.html#/companyDetail?id=100189" target="_blank">青苗教育集团</a>
                </p>
            </div>
            <div class="companyku">
                <p>加入教育机构库</p> 
                <p @click="enterAdd">马上加入</p>
            </div>
        </div>
        <div class="companyList" v-for="(item,index) in list" :key="index" v-loading="loading" @click="enterCompanyDeatil(item.id)">
            <div class="companyLogo">
                <img :src='item.institutionLogo==0 ||item.institutionLogo==null? "https://data.xinxueshuo.cn/nsi/assets/img/schoolNoPic.png": item.institutionLogo' >
            </div>
            <div class="companyContent">
                <div class="contentLeft">
                    <p>{{item.name}}</p>
                    <p>标签：<span v-for="(everylabel,index) of item.label" :key="index" class="label">{{everylabel | isZero}}</span></p>
                    <p>类型：{{item.type}}</p>
                </div>
                <div class="contentRight">
                    <p><i class="iconfont icon-dingwei1"></i>地址：{{item.areas | isZero}}</p>
                    <p><i class="iconfont icon-chenglishijian"></i>成立时间：{{item.foundTime | isZero}}</p>
                    <p><i class="iconfont icon-dingdantijiaochenggong"></i>提交时间：{{formatDateTime(new Date(Number(item.loadTime)))}}</p>
                </div> 
            </div>
        </div>
        <div v-html="searchNull" class="searchNull"></div>
        <!-- 分页组件 -->
        <div class="block">
            <span class="demonstration"></span>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage1"
                :page-size="pageSize"
                layout="total, prev, pager, next"
                :total="totalNum">
            </el-pagination>
        </div>
        <schoolFooter />
    </div>
</template>

<script>
import schoolFooter from './schoolFooter'
import {companyList,suggestSearch} from "@/api/api";
export default {
    components:{
        schoolFooter
    },
  data() {
    return {
      pageNum:1,
      pageSize:24,
      searchKey:'',
      list:[],
      currentPage1: 1,
      totalNum:0,
      searchNull:'',
      loading:true,
    }
  },
  filters:{
      isZero(obj){
          if(obj=="0" || obj==null){
              return '暂无'
          }else{
              return obj
          }
      },
  },
  created() {
    this.searchKey = this.$route.query.item;
  },
  methods:{
    getList(){
        let that=this
        companyList({
            pageNum:that.pageNum,
            pageSize:that.pageSize,
            searchKey:that.searchKey
        }).then(res=>{
            that.list=res.data
            that.loading=false
            that.totalNum=res.count
            if(that.totalNum==0){
                that.searchNull="未搜索到结果，请重新输入关键字！"
            }else{
                that.searchNull=''
            }
            // 分割机构标签
            for (var i = 0; i < res.data.length; i++) {
                var label = res.data[i].label;
                var labelSplit = label.split(";");
                    labelSplit = labelSplit.slice(0, labelSplit.length - 1);
                    if(labelSplit.length>3){
                        labelSplit= labelSplit.slice(0,3)
                    }
                var labelBox = [];
                for (var j = 0; j < labelSplit.length; j++) {
                    labelBox.push(labelSplit[j]);
                }
                res.data[i].label = labelBox;
            }

        })
    },
      //coolie 读取存在
    getCookie(name) {
      var arr,
      reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
      else return null;
    },
    enterAdd(){
        if(this.getCookie("username") == null){
            this.$message({
                message: '您还没有登录，登陆后即可加入！',
                type: 'warning'
            });
        }else{
           this.$router.push({path:"./companyAdd"})
        }
    },
    enterCompanyDeatil(id){
        if(this.getCookie("username") == null){
            this.$message({
                message: '您还没有登录，登陆后即可查看！',
                type: 'warning'
            });
        }else{
            let routeData= this.$router.resolve({path: '/companyDetail',query:{id:id}})
            window.open(routeData.href, '_blank');
        }
    },
    searchCompany(){
        this.getList()
    },
    // 智能提示搜索
    getSuggestSearch(queryString, cb){
        suggestSearch({
            keyword:this.searchKey
        }).then(res=>{
            var arr = [];
            for (var i = 0; i < res.data.length; i++) {
                let a1 = {}; //创建对象
                a1.value = res.data[i];
                arr.push(a1);
            }
            cb(arr);
        })
    },
    // 时间戳
    formatDateTime(inputTime) {
        var date = new Date(inputTime);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return m + '月' + d + '日'
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
        this.pageNum = val;
        this.getList();
        window.scrollTo(0,0)
    },
    // 搜索提示
    handleSelect(item) {
        console.log(item);
        this.getList()
    }
  },
  
  mounted() {
      this.getList()
  },
}
</script>
<style lang="less" scoped>
.companyBox{
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
    .companyGroup{
        .searchBox{
            display: inline-block;
            margin-top: 50px;
            .el-autocomplete{
                width: 570px;
                i{
                    font-size: 40px;
                    color: #fff;
                }
            }
        }
        .homeBannerP{
            a{
                margin:0 10px;
                cursor: pointer;
            }
        }
        p{
            color: #a19c9c;
            font-size: 14px;
            margin-top: 30px;
        }
    }
    .companyku{
        width: 280px;
        height: 100px;
        border-radius: 10px;
        background-color: #eaf4ff;
        color: #215089;
        font-weight: bold;
        text-align: center;
        margin: 50px 0 0 70px;
        &:hover{
            cursor: pointer;
        }
        p:first-of-type{
            padding-top: 20px;
            font-size: 20px;
            color: #215089;
            font-weight: bold;
            letter-spacing: 1px;
        }
        p:last-of-type{
            border-radius: 20px;
            padding: 8px 25px;
            margin-top: 10px;
            display: inline-block;
            background-color: #215089;
            color: #fff;
            transition: all .3s;
            letter-spacing: 1px;
        }
    }
}

.companyList{
    width: 1000px;
    margin: 20px auto 0;
    border: 1px solid #ddd;
    position: relative;
    border-radius: 10px;
    background: #f9f9f9;
    &:first-of-type{
        margin-top:80px !important;
    }
    &:hover{
        box-shadow: 0px 0px 15px #ccc;
        transition: all 0.5s;
    }
    .companyLogo{
        background: #fff;
        border-radius: 10px;
        img{
            padding: 20px;
            width: 170px;
            height:170px;
        }
    }
    .contentLeft{
        position: absolute;
        top: 25px;
        left: 180px;
        p{
            margin-top: 20px;
            font-size: 14px;
            &:first-of-type{
                font-size: 20px !important;
                font-weight: bold;
                cursor: pointer;
            }
            a{
                &:hover{
                    text-decoration: none;
                }
            }
            span.label{
                background: #337ab7;
                margin-right: 7px;
                color: #fff;
                border-radius: 5px;
                font-size: 14px;
                text-align: center;
                letter-spacing: 1px;
            }
        }
    }
    .contentRight{
        position: absolute;
        top: 25px;
        right: 80px;
        p{
            margin-top: 18px;
            font-size: 14px;
            i{
                color: #337ab7;
                font-size: 20px;
                margin-right: 10px;
            }
        }
    }
}
.block{
    text-align: center;
    margin: 88px 0;
}
.searchNull{
    text-align: center;
    margin: 170px 0;
}
</style>
<style>
    .companyGroup .el-input__inner{
        height: 50px !important;
        border: 2px solid #214f89;
    }
    .companyGroup .el-input-group__append {
        border: 0;
        background: #214f89;
    }
</style>