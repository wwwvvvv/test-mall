<template>
  <div class="goods-list-ctn">
    <nav-header></nav-header>
    <nav-bread>
      <span>Goods</span>
    </nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <!--<a href="javascript:void(0)" class="default" :class="{'cur': curSortBy === 'default'}">Default</a>-->
          <a v-for="item in sortBy" href="javascript:void(0)" @click.prevent="setSortBy(item)" :class="[{'cur': curSortBy === item}, item.toLowerCase()]">{{item}}
            <span v-if="item.toLowerCase() !== 'default'" v-show="curSortBy.toLowerCase() !== 'default'" class="iconfont iconarrowdown sort-arrow" :class="[sortFlag > 0? 'up': 'down']"></span>
            <!--<svg class="icon icon-arrow-short ">-->
              <!--<use xlink:href="#icon-arrow-short"></use>-->
            <!--</svg>-->
          </a>
          <a href="javascript:void(0)" class="filterby stopPop" @click.stop="showFilterPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" :class="{'filterby-show':showFilterBy}" id="filter">
            <dl class="filter-price">
              <dt>Price:</dt>
              <!--<dd><a :class="{'cur': curPriceFilter === 'ALL'}" href="javascript:void(0)">All</a></dd>-->
              <dd v-for="item in priceFilter" @click="setPriceFilter(item)">
                <a :class="[{'cur': curPriceFilter.start === item.start && curPriceFilter.end === item.end}]" href="javascript:void(0)">
                  <span v-if="item.end">{{item.start}} - {{item.end}}</span>
                  <span v-else>All</span>
                </a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(item, index) in goodsList">
                  <div class="pic">
                    <a href="#"><img v-lazy="'static/' + item.productImage" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.salePrice | money}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m" @click="addCard(item.productId)">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="load-more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="50">
              <!--<span>加载中...</span>-->
              <img v-show="isLoading" src="../../static/loading-svg/loading-spinning-bubbles.svg" alt="">
            </div>
            <!--<div class="view-more-normal"-->
            <!--v-infinite-scroll="loadMore"-->
            <!--infinite-scroll-disabled="busy"-->
            <!--infinite-scroll-distance="20">-->
            <!--<img src="./../assets/loading-spinning-bubbles.svg" v-show="loading">-->
            <!--</div>-->
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-show="showOverLay" @click.stop="closePop"></div>
    <page-footer></page-footer>
  </div>
</template>

<script>
  import NavHeader from '@/components/NavHeader';
  import PageFooter from '@/components/PageFooter';
  import NavBread from '@/components/NavBread';

  import API from './../api/index';
  export default {
    name: "GoodsList",
    components: {
      NavHeader,
      PageFooter,
      NavBread
    },
    data() {
      return {//不允许组件之间的数据共享
        goodsList: [],
        showFilterBy: false,
        showOverLay: false,
        curPriceFilter: {start: '', end: ''},
        curSortBy: 'Default',
        isLoading: false,
        sortBy: [
          'Default',
          'Price'
        ],
        busy: true,
        pageNum: 1,
        pageSize: 8,
        sort: {},
        sortFlag: 1, //升序 -1：降序
        priceFilter: [
          {
            start: '',
            end: ''
          },
          {
            start: '0.00',
            end: '100.00'
          }, {
            start: '100.00',
            end: '500.00'
          }, {
            start: '500.00',
            end: '1000.00'
          }, {
            start: '1000.00',
            end: '5000.00'
          }
        ]
      }
    },
    methods: {
      async getGoodsList(flag) { // flag 有值——分页
        let params = {
          page: {
            pageSize: this.pageSize,
            sort: this.sort,
            pageNum: this.pageNum,
            priceRange: this.curPriceFilter
          }
        };
        let rs = await API.goods.getGoods(params);
        this.isLoading = false;
        let goods = rs.data;
        if (flag) {
          this.busy = goods.length < this.pageSize;
          this.goodsList = [...this.goodsList, ...goods];
        } else {
          this.goodsList = goods;
          this.busy = false;
        }
      },
      showFilterPop() {
        this.showFilterBy = true;
        this.showOverLay = true;
      },
      closePop() {
        this.showOverLay = false;
        this.showFilterBy = false;
      },
      async setPriceFilter(priceFilter) {
        this.curPriceFilter = priceFilter;
        this.pageNum = 1;
        this.getGoodsList();
      },
      setSortBy(sortBy) {
        this.curSortBy = sortBy;
        if (sortBy.toLowerCase() === 'price') {
          this.sortFlag = this.sortFlag > 0 ? -1 : 1;
          this.sort = {
            salePrice: this.sortFlag
          };
        } else {
          this.sort = {};
          this.sortFlag = -1;
        }
        this.pageNum = 1;
        this.getGoodsList();
      },
      loadMore() {
        this.busy = true;
        this.isLoading = true;
        setTimeout(() => {
          this.pageNum++;
          this.getGoodsList(true);
        }, 500);
      },
      async addCard(productId) {
        let rs = await API.goods.addCart({productId});
        if (rs.code !== 0) {
          alert(rs.msg);
        }
        console.log(rs);
      }
    },
    mounted() {
      this.getGoodsList();
    }
  }
</script>
<style scoped>
  @import "../assets/product.css";
  .sort-arrow{
    display: inline-block;
    transition: all .3s ease-out 0s;
  }
  .sort-arrow.up{
    transform: rotate(180deg);
    transform-origin: 50% 50%;
  }
  .load-more{
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
</style>
