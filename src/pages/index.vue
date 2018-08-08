<template>
    <div>
        <Header></Header>
        <main class="page container">
            <div class="list">
              <ul class="head-list">
                <li>
                  <a :class="tabIndex == 1 ? 'active' : ''" href="javascript:;" @click="changeTabs(1)">热门</a>
                </li>
                <li v-if="$route.query.code">
                  <a :class="tabIndex == 2 ? 'active' : ''" href="javascript:;" @click="changeTabs(2)">最新</a>
                </li>
              </ul>
              <ul class="article-list">
                <li v-for="item in articleList" :key="item.id">
                  <div class="avatar">
                    <router-link :to="'/user/' + item.userId">
                      <img :src="'https://oss02.bihu.com/' + item.userIcon" alt="">
                      <h5 class="nick">{{item.userName}}</h5>
                    </router-link>
                    <time class="time">{{$utils.timeFormat(item.createTime)}}</time>
                  </div>
                  <div class="info">
                    <div class="img-outer">
                      <img :src="'https://oss02.bihu.com/' + item.snapimage | formatImgUrl" alt="">
                    </div>
                    <router-link :to="'/article/' + item.id" class="title">
                      <h3>{{item.title}}</h3>
                      <p class="summary">{{item.snapcontent}} ...</p>
                    </router-link>
                    <p class="thumbs">
                        <span><i class="glyphicon glyphicon-yen"></i>{{item.money}}</span>
                        <span><i class="glyphicon glyphicon-thumbs-up"></i>{{item.ups}}</span>
                        <span><i class="glyphicon glyphicon-thumbs-down"></i>{{item.downs}}</span>
                        <span><i class="glyphicon glyphicon-comment"></i>{{item.cmts}}</span>
                    </p>
                  </div>
                </li>
              </ul>
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
      articleList: [],
      tabIndex: 1
    };
  },
  filters: {
    formatImgUrl(url) {
      var newUrl = url.split(",")[0];
      return newUrl;
    }
  },
  created() {
    this.getHotArtList();
  },
  watch: {
    $route(to, from) {
      this.getHotArtList();
    }
  },
  methods: {
    getHotArtList() {
      this.$axios
        .post("https://be02.bihu.com/bihube-pc/api/content/show/hotArtList", {
          category: "recommend",
          code: this.$route.query.code || ""
        })
        .then(res => {
          if (res.data.resMsg === "success") {
            this.articleList = res.data.data.list;
          }
        });
    },
    getNewestArtList() {
      this.$axios
        .post(
          "https://be02.bihu.com/bihube-pc/api/content/show/newestArtList",
          {
            category: "news",
            code: this.$route.query.code || ""
          }
        )
        .then(res => {
          if (res.data.resMsg === "success") {
            this.articleList = res.data.data.list;
          }
        });
    },
    changeTabs(index) {
      switch (index) {
        case 1:
          this.getHotArtList();
          this.tabIndex = 1;
          break;
        case 2:
          this.getNewestArtList();
          this.tabIndex = 2;
          break;
        default:
          break;
      }
    }
  }
};
</script>
<style lang="less">
.list {
  background: #fff;
  .head-list {
    margin-bottom: 0;
    padding: 20px 0 15px 10px;
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
    padding: 0;
    li {
      position: relative;
      list-style: none;
      height: auto;
      overflow: hidden;
      padding: 10px;
      border-top: 1px solid #e6e6e6;
      .avatar {
        a {
          text-decoration: none;
          color: #333;
          img {
            width: 45px;
            height: 45px;
            border-radius: 50%;
          }
          .nick {
            display: inline-block;
            font-size: 14px;
            font-weight: bold;
          }
        }
        .time {
          margin-left: 10px;
          color: #a5a5a5;
        }
      }
      .info {
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
          margin-top: 10px;
          padding-top: 2px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          color: #333;
          h3 {
            margin-top: 15px;
          }
          .summary {
            color: #777;
          }
        }
        .thumbs {
          position: absolute;
          bottom: 8px;
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
