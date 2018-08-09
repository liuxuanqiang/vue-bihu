<template>
    <div :class="['category-menu', hide ? '' : 'hide']">
        <ul>
            <li v-for="item in data" :key="item.id">
                <router-link :to="{path:'/', query: {code: item.code}}">
                    {{item.code}}
                </router-link>
            </li>
        </ul>
    </div>    
</template>
<script>
export default {
  props: {
    hide: Boolean,
    data: Array
  }
};
</script>
<style lang="less">
.category-menu {
  position: absolute;
  top: 61px;
  left: -45px;
  width: 620px;
  padding: 20px 0 5px;
  background: #fff;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  &:before {
    position: absolute;
    top: -10px;
    left: 65px;
    content: "";
    width: 20px;
    height: 20px;
    transform: rotate(45deg);
    background: #fff;
    border: solid #fff;
    border-width: 1px 0px 0 1px;
  }
  ul {
    padding: 0;
    li {
      float: left;
      margin: 0 0 15px 20px;
      text-align: center;
      list-style: none;
      a {
        display: block;
        width: 100px;
        height: 35px;
        line-height: 35px;
        background: #ebf3fb;
        text-decoration: none;
        color: #95b5d7 !important;
        font-size: 14px !important;
        &:hover {
          color: #fff !important;
        }
        &.router-link-exact-active {
          background: #444;
          color: #fff !important;
        }
      }
    }
  }
}
</style>