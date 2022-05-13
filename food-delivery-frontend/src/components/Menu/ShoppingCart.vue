<template>
  <v-sheet
    id="cart"
    height="650px"
    elevation="2"
    color="green accent-4"
    class="pa-1"
    v-scroll="onScroll"
  >
    <!-- height="100%" -->
    <v-card
      height="100%"
    >
      <v-card-title class="justify-center font-weight-black">購物車列表</v-card-title>
      <v-divider />
      <v-sheet
        v-if="cart_list.length === 0"
        height="15%"
        class="pa-1 text-center font-weight-medium"
      >
        你尚未放入任何產品到購物車中。
      </v-sheet>
      <v-list
        max-height="70%"
        v-else
        class="overflow-y-auto"
      >
        <v-list-item
          v-for="(item, index) in cart_list"
          :key="index"
        >
          <v-row>
            <!-- 項目描述 -->
            <v-col cols="9">
              <v-row>
                <div class="pl-4 font-weight-bold headline">{{ item.name }}</div>
              </v-row>
              <template v-if="item.remarks">
                <v-row>
                  <div class="pl-4 subtitle-1">備註：</div>
                </v-row>
                <v-row>
                  <div class="pl-12 subtitle-1">{{ item.remarks }}</div>
                </v-row>
              </template>
            </v-col>
            <!-- 數量調整 -->
            <v-col 
              cols="3"
              class="pa-0 pr-3"
            >
              <v-row class="justify-center">
                <v-btn 
                  icon
                  color="red accent-3"
                  @click.stop="changeQuantity(index, -1)"
                >
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
              </v-row>
              <v-row class="justify-center">
                <div class="font-weight-bold"> {{ item.quantity }} </div>
              </v-row>
              <v-row class="justify-center">
                <v-btn 
                  icon
                  color="green accent-4"
                  @click.stop="changeQuantity(index, 1)"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-row>
            </v-col>
            <!-- 小計 -->
            <v-col cols="9">
              <v-row class="justify-end">
                <div class="ont-weight-bold title">價錢：</div>
              </v-row>
            </v-col>
            <v-col cols="3">
              <v-row class="justify-start">
                <div class="ont-weight-bold title">NT{{ item.subtotal }}$</div>
              </v-row>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list>
      <v-divider />
      <!-- 總計 -->
      <v-container>
        <v-row no-gutters>
          <v-col cols="5">
            餐點總價：
          </v-col>
          <v-col>
            NT{{ total_price }} $
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions class="px-2">
        <v-btn
          block
          large
          color="green accent-4"
          class="headline"
          @click="checkout()"
        >
          結帳
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-sheet>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'ShoppingCart',
  data: () => ({
    shopping_cart_edit: false,
    offsetTop: 0
  }), 
  methods: {
    changeQuantity( index , amount ) {
      this.$store.dispatch('cart/changeQuantity', {index , amount});
    },
    onScroll( e ) {
      // console.log( e );
      this.offsetTop = e.target.scrollTop;
    },
    checkout() {
      if ( this.cart_list.length !== 0 ) {
        if ( !this.isUserSet ) {
          alert('使用者尚未登入，請先登入');
          return;
        }
        this.$router.push({ name: 'cashout' });
      }
    }
  },
  computed: {
    ...mapGetters('user', {
      isUserSet: 'isUserSet'
    }),
    ...mapState({
      cart_list: state => state.cart.list,
      total_price: state => state.cart.total
    })
  }
}
</script>

<style>
#cart {
  font-size: 25px;
}
</style>