<template>
    <div class="navbar navbar-fixed-top">
        <div class="navbar-inner">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" @click="toggleNavbar">
                      <span class="sr-only">Toggle navigation</span>
                      <span class="icon-bar"></span>
                      <span class="icon-bar"></span>
                      <span class="icon-bar"></span>
                    </button>
                    <router-link :to="{name:'index'}" class="brand">
                        <img src="https://bihu.com/static/media/logo.81b9b93e.png">
                    </router-link>
                </div>
                <div id="navbar" :class="['navbar-collapse', 'collapse', collapseIsShow ? 'in' : '']">
                    <ul class="nav navbar-nav">
                        <li><router-link :to="{name:'index'}">推荐</router-link></li>
                        <li @mouseover="showCategoryMenu" @mouseout="hideCategoryMenu">
                          <a href="javascript:;" :class="$route.query.code ? 'active' : ''">更多</a>
                          <category-menu :hide="hide" :data="categoryList"></category-menu>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="">登录</a></li>
                        <li><a href="">注册</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import CategoryMenu from "../components/category";
export default {
  components: {
    CategoryMenu
  },
  data() {
    return {
      hide: false,
      collapseIsShow: false,
      categoryList: []
    };
  },
  created() {
    this.queryBoardList();
  },
  methods: {
    queryBoardList() {
      this.$axios
        .post("https://be02.bihu.com/bihube-pc/api/content/queryBoardList")
        .then(res => {
          if (res.data.resMsg === "success") {
            this.categoryList = res.data.data.noSubList;
          }
        });
    },
    showCategoryMenu() {
      this.hide = true;
    },
    hideCategoryMenu() {
      this.hide = false;
    },
    toggleNavbar() {
      this.collapseIsShow = !this.collapseIsShow;
    }
  }
};
</script>
<style lang="less">
.navbar {
  width: 100%;
  background: #444;
  .navbar-toggle {
    margin-right: -15px;
    .icon-bar {
      background: #fff;
    }
  }
  .navbar-inner {
    background: 0 0;
    border-radius: 0;
    border: none;
    box-shadow: none;
    width: 90%;
    margin: auto;
    padding: 5px;
    .brand {
      display: inline-block;
      width: 110px;
      padding: 5px 0;
      img {
        width: 100%;
      }
    }
    .nav {
      padding-left: 35px;
      li {
        position: relative;
        a {
          color: #ccc;
          font-size: 16px;
          &:hover {
            background: #444;
            color: #fff;
          }
          &.active {
            color: #fff;
          }
        }
        .avatar {
          width: 30px;
          height: 30px;
          margin-top: 5px;
          padding: 0;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .navbar-collapse {
    position: fixed;
    top: 60px;
    right: 0;
    width: calc(35% + 15px);
    height: calc(100vh - 60px);
    max-height: 100vh !important;
    background: #444;
  }
}
</style>
