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
                            <a class="active" href="/people/87858/?index=1">文章({{userInfo.artNum}})</a>
                        </li>
                        <li>
                            <a class="" href="/people/87858/?index=2">关注({{userInfo.follows}})</a>
                        </li>
                        <li>
                            <a class="" href="/people/87858/?index=3">粉丝({{userInfo.fans}})</a>
                        </li>
                    </ul>
                    <div class="article-list">
                        <ul>
                            <li v-for="item in userArticleList" :key="item.id">
                                <div class="img-outer">
                                    <img :src="'https://oss02.bihu.com/' + item.snapimage | formatImgUrl" alt="">
                                </div>
                                <router-link :to="'/article/' + item.id" class="title">
                                    <h3>{{item.title}}</h3>
                                </router-link>
                                <p class="summary" v-html="item.snapcontent + '...'"></p>
                                <p class="thumbs">
                                    <span><i class="glyphicon glyphicon-yen"></i>{{item.money}}</span>
                                    <span><i class="glyphicon glyphicon-thumbs-up"></i>{{item.ups}}</span>
                                    <span><i class="glyphicon glyphicon-thumbs-down"></i>{{item.downs}}</span>
                                    <span><i class="glyphicon glyphicon-comment"></i>{{item.cmts}}</span>
                                </p>
                            </li>
                        </ul>
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
export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      userId: this.$route.params.userId,
      userInfo: {},
      userArticleList: []
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
  methods: {
    getUserInfo() {
      this.$axios
        .post("https://be02.bihu.com/bihube-pc/api/content/show/userHomePage", {
          queryUserId: this.userId
        })
        .then(res => {
          if (res.data.resMsg === "success") {
            this.userInfo = res.data.data;
          }
        });
    },
    getUserArticleList() {
      this.$axios
        .post(
          "https://be02.bihu.com/bihube-pc/api/content/show/getUserArtList",
          {
            challenge: "",
            crash: 1,
            pageNum: 1,
            queryUserId: this.userId
          }
        )
        .then(res => {
          if (res.data.resMsg === "success") {
            this.userArticleList = res.data.data.list;
          }
        });
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
    padding: 20px 0 5px 0;
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
    ul {
      padding: 0;
      li {
        position: relative;
        list-style: none;
        height: auto;
        overflow: hidden;
        padding: 15px 0;
        border-top: 1px solid #e6e6e6;
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
            height: 97px;
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
      }
    }
  }
}
</style>
