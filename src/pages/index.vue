<template>
    <div>
        <Header></Header>
        <main class="page container">
            <div class="list">
              <ul>
                <li v-for="item in hotArtList" :key="item.id">
                  <div class="avatar">
                    <router-link :to="'/user/' + item.userId">
                      <img :src="'https://oss02.bihu.com/' + item.userIcon" alt="">
                        <h5 class="nick">{{item.userName}}</h5>
                    </router-link>
                    <time class="time">{{$utils.timeFormat(item.createTime)}}</time>
                  </div>
                  <div class="info">
                    <img :src="'https://oss02.bihu.com/' + item.snapimage" alt="">
                    <router-link :to="'/article/' + item.id" class="title">
                      <h3>{{item.title}}</h3>
                    </router-link>
                    <p class="summary">{{item.snapcontent}} ...</p>
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
      hotArtList: []
    };
  },
  created() {
    this.getHotArtList();
  },
  watch: {},
  methods: {
    getHotArtList() {
      this.$axios
        .post("https://be02.bihu.com/bihube-pc/api/content/show/hotArtList", {
          category: "recommend",
          code: ""
        })
        .then(res => {
          if (res.data.resMsg === "success") {
            this.hotArtList = res.data.data.list;
          }
        });
    }
  }
};
</script>
<style lang="less">
.list {
  background: #fff;
  ul {
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
        img {
          float: left;
          width: 150px;
          height: 97px;
          margin-right: 15px;
        }
        .title {
          margin-top: 10px;
          padding-top: 2px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          color: #333;
        }
        .summary {
          color: #777;
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
