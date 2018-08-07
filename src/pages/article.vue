<template>
    <div>
        <Header></Header>
        <main class="page container">
            <div class="article">
                <h3 class="title">{{article.title}}</h3>
                <div class="user">
                    <img :src="'https://oss02.bihu.com/' + article.userIcon" alt="">
                    <span class="user-name">{{article.userName}}</span>
                    <time class="time">{{$utils.timeFormat(article.creatime)}}</time>
                </div>
                <div class="content" v-html="articleContent"></div>
                <div class="comment">
                    <h3>共{{commentList.length}}条评论</h3>
                    <ul>
                        <li v-for="item in commentList" :key="item.commentId">
                            <router-link :to="'/user/' + item.user.userId">
                              <img :src="'https://oss02.bihu.com/' + item.user.userIcon" alt="" class="user-icon">
                              <span class="user-name">{{item.user.userName}}</span>
                            </router-link>
                            <time class="time">{{$utils.timeFormat(item.createTime)}}</time>
                            <p class="text">{{item.content}}</p>
                        </li>
                    </ul>
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
      id: this.$route.params.id,
      article: {},
      articleContent: "",
      commentList: []
    };
  },
  created() {
    this.getHotArtList();
  },
  watch: {},
  methods: {
    getHotArtList() {
      this.$axios
        .post("https://be02.bihu.com/bihube-pc/api/content/show/getArticle2", {
          artId: this.id
        })
        .then(res => {
          if (res.data.resMsg === "success") {
            this.article = res.data.data;
            this.$axios
              .get("https://oss02.bihu.com/" + res.data.data.content)
              .then(res => {
                this.articleContent = decodeURIComponent(res.data);
              });
            this.$axios
              .post(
                "https://be02.bihu.com/bihube-pc/bihu/comment/listrootcomment",
                {
                  articleId: res.data.data.id
                }
              )
              .then(res => {
                this.commentList = res.data.data.list;
              });
          }
        });
    }
  }
};
</script>
<style lang="less">
.article {
  padding: 10px 15px;
  background: #fff;
  .user {
    margin: 20px 0;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 5px;
    }
    .user-name {
      font-size: 14px;
      font-weight: bold;
    }
    .time {
      margin-left: 10px;
      color: #a5a5a5;
    }
  }
  .content {
    img {
      max-width: 100%;
    }
  }
  .comment {
    h3 {
      margin-top: 50px;
      padding-bottom: 10px;
      border-bottom: 1px solid #e2e2e2;
    }
    ul {
      padding: 0;
      li {
        padding: 5px 0;
        list-style: none;
        a {
          color: #5a5a5a;
          text-decoration: none;
        }
        .user-icon {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
        .user-name {
          margin-left: 5px;
          font-size: 14px;
          font-weight: bold;
        }
        .time {
          margin-left: 10px;
          color: #a5a5a5;
        }
        .text {
          padding-left: 40px;
          color: #666;
        }
      }
    }
  }
}
</style>
