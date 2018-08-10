<template>
    <div>
        <Header></Header>
        <main class="page container">
            <div class="home-page">
                <div class="user">
                    <img :src="'https://oss02.bihu.com/' + userInfo.userIcon" alt="">
                    <h4>{{userInfo.userName}}</h4>
                    <p>{{userInfo.info}}</p>
                </div>
                <div>
                    <ul class="head-list">
                        <li>
                            <a :class="tabIndex == 1 ? 'active' : ''" href="javascript:;" @click="changeTabs(1)">文章({{userInfo.artNum}})</a>
                        </li>
                        <li>
                            <a :class="tabIndex == 2 ? 'active' : ''" href="javascript:;" @click="changeTabs(2)">关注({{userInfo.follows}})</a>
                        </li>
                        <li>
                            <a :class="tabIndex == 3 ? 'active' : ''" href="javascript:;" @click="changeTabs(3)">粉丝({{userInfo.fans}})</a>
                        </li>
                    </ul>
                    <div>
                      <section :class="['article-list', tabIndex == 1 ? '' : 'hide']">
                        <ul>
                            <li v-for="item in userArticle.list" :key="item.id">
                                <div class="img-outer">
                                    <img :src="'https://oss02.bihu.com/' + item.snapimage | formatImgUrl" alt="">
                                </div>
                                <router-link :to="'/article/' + item.id" class="title">
                                    <h3>{{item.title}}</h3>
                                    <p class="summary" v-html="item.snapcontent + '...'"></p>
                                </router-link>
                                <p class="thumbs">
                                    <span><i class="glyphicon glyphicon-yen"></i>{{item.money}}</span>
                                    <span><i class="glyphicon glyphicon-thumbs-up"></i>{{item.ups}}</span>
                                    <span><i class="glyphicon glyphicon-thumbs-down"></i>{{item.downs}}</span>
                                    <span><i class="glyphicon glyphicon-comment"></i>{{item.cmts}}</span>
                                </p>
                            </li>
                        </ul>
                        <Pagination v-if="isRender && userArticle.pageSize < userArticle.total" :total="userArticle.total" @pagechange="pagechange"></Pagination>
                      </section>
                      <section :class="['follow-list', tabIndex == 2 ? '' : 'hide']">
                          <ul>
                            <li v-for="item in userFollow.list" :key="item.userId">
                                <router-link :to="'/user/' + item.userId" class="title">
                                    <img :src="'https://oss02.bihu.com/' + item.userIcon" alt="">
                                    <span class="user-name">{{item.userName}}</span>
                                </router-link>
                                <span class="fans-num">粉丝：{{item.fans}}</span>
                            </li>
                        </ul>
                        <Pagination v-if="isRender && userFollow.pageSize < userFollow.total" :total="userFollow.total" @pagechange="pagechange"></Pagination>
                      </section>
                      <section :class="['follow-list', tabIndex == 3 ? '' : 'hide']">
                        <ul>
                            <li v-for="item in userFans.list" :key="item.userId">
                                <router-link :to="'/user/' + item.userId" class="title">
                                    <img :src="'https://oss02.bihu.com/' + item.userIcon" alt="">
                                    <span class="user-name">{{item.userName}}</span>
                                </router-link>
                                <span class="fans-num">粉丝：{{item.fans}}</span>
                            </li>
                        </ul>
                        <Pagination v-if="isRender && userFans.pageSize < userFans.total" :total="userFans.total" @pagechange="pagechange"></Pagination>
                      </section>
                    </div>
                </div>
            </div>
        </main>
        <Footer></Footer>
    </div>
</template>
<script>
import Header from "../components/header";
import Footer from "../components/footer";
import Pagination from "../components/pagination";
export default {
  components: {
    Header,
    Footer,
    Pagination
  },
  data() {
    return {
      userInfo: {},
      userArticle: {},
      userFollow: {},
      userFans: {},
      tabIndex: 1,
      isRender: false // 重新渲染分页组件（定位到第一页）
    };
  },
  created() {
    this.getUserInfo();
    this.getUserArticleList();
  },
  filters: {
    formatImgUrl(url) {
      var newUrl = url.split(",")[0];
      return newUrl;
    }
  },
  watch: {
    $route(to, from) {
      this.getUserInfo();
      this.changeTabs(1);
    }
  },
  methods: {
    // 获取用户信息
    getUserInfo() {
      let userId = this.$route.params.userId;
      this.$axios
        .post("https://be02.bihu.com/bihube-pc/api/content/show/userHomePage", {
          queryUserId: userId
        })
        .then(res => {
          if (res.data.resMsg === "success") {
            this.userInfo = res.data.data;
          }
        });
    },

    // 获取用户文章
    getUserArticleList(pageNum = 1) {
      let userId = this.$route.params.userId;
      this.$axios
        .post(
          "https://be02.bihu.com/bihube-pc/api/content/show/getUserArtList",
          {
            challenge: "",
            crash: 1,
            pageNum: pageNum,
            queryUserId: userId
          }
        )
        .then(res => {
          if (res.data.resMsg === "success") {
            this.userArticle = res.data.data;
            this.isRender = true;
          }
        });
    },

    // 获取用户关注
    getUserFollowList(pageNum = 1) {
      let userId = this.$route.params.userId;
      this.$axios
        .post(
          "https://be02.bihu.com/bihube-pc/api/content/show/getUserFollowList",
          {
            pageNum: pageNum,
            queryUserId: userId
          }
        )
        .then(res => {
          if (res.data.resMsg === "success") {
            this.userFollow = res.data.data;
            this.isRender = true;
          }
        });
    },

    // 获取用户粉丝
    getUserFansList(pageNum = 1) {
      let userId = this.$route.params.userId;
      this.$axios
        .post(
          "https://be02.bihu.com/bihube-pc/api/content/show/getUserFansList",
          {
            pageNum: pageNum,
            queryUserId: userId
          }
        )
        .then(res => {
          if (res.data.resMsg === "success") {
            this.userFans = res.data.data;
            this.isRender = true;
          }
        });
    },

    // 文章/关注/粉丝Tab切换
    changeTabs(index) {
      this.isRender = false;
      switch (index) {
        case 1:
          this.getUserArticleList();
          this.tabIndex = 1;
          break;
        case 2:
          this.getUserFollowList();
          this.tabIndex = 2;
          break;
        case 3:
          this.getUserFansList();
          this.tabIndex = 3;
          break;
        default:
          break;
      }
    },

    // 分页
    pagechange(currentPage) {
      if (this.tabIndex == 1) {
        this.getUserArticleList(currentPage);
      } else if (this.tabIndex == 2) {
        this.getUserFollowList(currentPage);
      } else {
        this.getUserFansList(currentPage);
      }
    }
  }
};
</script>
<style lang="less">
.home-page {
  padding: 10px 15px;
  background: #fff;
  .user {
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
    text-align: center;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    h4 {
      font-weight: bold;
    }
    p {
      color: #808080;
    }
  }
  .head-list {
    margin-bottom: 0;
    padding: 20px 0 15px 0;
    border-bottom: 1px solid #e6e6e6;
    li {
      margin-right: 30px;
      display: inline-block;
      list-style: none;
      font-size: 16px;
      a {
        color: #333;
        text-decoration: none;
        &.active {
          padding-bottom: 15px;
          border-bottom: 3px solid #007bff;
          color: #007bff;
        }
      }
    }
  }
  .article-list {
    > ul {
      padding: 0;
      li {
        position: relative;
        list-style: none;
        height: auto;
        overflow: hidden;
        padding: 15px 0;
        border-bottom: 1px solid #e6e6e6;
        .img-outer {
          float: left;
          width: 150px;
          height: 97px;
          margin-right: 15px;
          background-color: #dde6ec;
          background-image: url(https://oss02.bihu.com/img/bihu_user_default_icon.png?x-oss-process=style/size_head);
          background-size: 50px 50px;
          background-position: center center;
          background-repeat: no-repeat;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .title {
          color: #333;
          h3 {
            margin-top: 0;
            padding-top: 2px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            color: #333;
            font-size: 18px;
            font-weight: bold;
          }
        }
        .summary {
          color: #777;
        }
        .thumbs {
          position: absolute;
          bottom: 13px;
          left: 175px;
          margin: 0;
          > span {
            margin-right: 20px;
            color: #777;
            i {
              margin-right: 3px;
              &.glyphicon-comment {
                vertical-align: -1px;
              }
            }
          }
        }
        @media screen and (max-width: 768px) {
          .img-outer {
            width: 120px;
            height: 66px;
            margin-right: 10px;
          }
          .title {
            h3 {
              margin-bottom: 5px;
              font-size: 16px;
              font-weight: bold;
            }
          }
          .summary {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .thumbs {
            left: 130px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            > span {
              margin-right: 6px;
              font-size: 11px;
              i {
                margin-right: 1px;
              }
            }
          }
        }
      }
    }
  }
  .follow-list {
    > ul {
      padding: 0;
      li {
        padding: 10px 0;
        list-style: none;
        a {
          text-decoration: none;
          color: #333;
        }
        img {
          width: 40px;
          height: 40px;
          margin-right: 5px;
          border-radius: 50%;
        }
        .user-name {
          font-size: 14px;
          font-weight: bold;
        }
        .fans-num {
          margin-left: 30px;
          color: #8e8e8e;
        }
      }
    }
  }
}
</style>
