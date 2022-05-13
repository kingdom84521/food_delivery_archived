<template>
  <v-container id="cashout">
    <v-stepper 
      vertical
      v-model="step_status"
    >
      <v-stepper-step 
        step="1"
        :complete="step_status > 1"
      >
        餐點確認
      </v-stepper-step>

      <v-stepper-content step="1">
        <v-card
          height="300px"
          flat
        >
          <v-list
            max-height="80%"
            class="overflow-y-auto"
            color="grey lighten-3"
          >
            <v-list-item
              v-for="(item, index) in cart_list"
              :key="index"
            >
              <v-container class="pa-0">
                <v-row>
                  <v-col cols="8">
                    <v-row>
                      <v-col cols="5">
                        <div class="font-weight-bold headline">{{ item.name }}</div>
                      </v-col>
                    </v-row>
                    <v-row v-if="item.remarks">
                      <div class="pl-3 pb-3 title">備註：{{ item.remarks }}</div>
                    </v-row>
                  </v-col>
                  <!-- 數量和價錢 -->
                  <v-col align-self="center" cols="4">
                    <v-row justify="center" class="pa-0" no-gutters>
                      <v-col>
                        <div class="ont-weight-bold title">NT{{ item.price }}</div>
                      </v-col>
                      <v-col>
                        <div class="headline">X{{ item.quantity }} </div>
                      </v-col>
                      <v-col>
                        <div class="ont-weight-bold title">NT{{ item.subtotal }}</div>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </v-list-item>
          </v-list>
          <v-card-text>
            <div class="headline font-weight-black">
              總價：{{ total_price }}
            </div>
          </v-card-text>
        </v-card>
        <v-btn 
          large 
          class="mr-1 green darken-2 white--text title" 
          @click="step_status = 2"
        >
          確認無誤
        </v-btn>
        <v-btn 
          text 
          large 
          class="ml-1 red darken-2 white--text title" 
          :to="{ name: 'restaurant', params: {restaurantId: order_list_item.store_id} }"
        >
          返回上頁
        </v-btn>
      </v-stepper-content>

      <v-stepper-step 
        step="2"
        :complete="step_status > 2"
      >
        送餐地址
      </v-stepper-step>

      <v-stepper-content step="2">
        <v-card
          height="400px"
          flat
        >
          <v-container>
            <v-row>
              <v-radio-group v-model="receiver_choice" row>
                <v-radio label="自己"/>
                <v-radio label="親友"/>
              </v-radio-group>
            </v-row>
            <template v-if="receiver_choice === 1">
              <v-row>
                <v-select v-model="relatives_choice" :items="relatives_list"/>
              </v-row>
            </template>
            <v-row>
              <v-col cols="2" class="pt-5">
                收餐人：
              </v-col>
              <v-col>
                <v-text-field 
                  v-model="receiver.name"
                  outlined
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2" class="pt-5">
                電話：
              </v-col>
              <v-col>
                <v-text-field 
                  v-model="receiver.phone"
                  outlined
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2" class="pt-5">
                地址：
              </v-col>
              <v-col>
                <v-text-field 
                  v-model="receiver.address"
                  outlined
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <v-btn 
          large 
          class="mr-1 green darken-2 white--text title" 
          @click="step_status = 3"
        >
          確認無誤
        </v-btn>
        <v-btn 
          text 
          large 
          class="ml-1 red darken-2 white--text title" 
          @click="step_status = 1"
        >
          回上一步
        </v-btn>
      </v-stepper-content>

      <v-stepper-step 
        step="3"
        :complete="step_status > 3"
      >
        付款方式
      </v-stepper-step>

      <v-stepper-content step="3">
        <v-card
          height="200px"
          flat
        >
          <v-container>
            <v-select v-model="cashout_choice" :items="cashout_methods"/>
          </v-container>
        </v-card>
        <v-btn 
          large 
          class="mr-1 green darken-2 white--text title"
          :loading="wait_submit"
          :disabled="wait_submit || !can_submit"
          @click="submit()"
        >
          付款
        </v-btn>
        <v-btn 
          text 
          large 
          class="ml-1 red darken-2 white--text title" 
          :disabled="wait_submit"
          @click="step_status = 2"
        >
          回上一步
        </v-btn>
      </v-stepper-content>
    </v-stepper>
  </v-container>
</template>

<script>
import FakeRelatives from '@/assets/temp/relatives_list.js'

import { mapGetters, mapState } from 'vuex'

export default {
  data: () => ({
    step_status: 0,
    receiver_choice: 0,
    receiver: {},
    relatives_choice: null,
    relatives_index: 0,
    relatives:[
      {
        id: "f00001",
        name: "黃爸爸",
        nickName: "爸爸",
        phone: "0910475594",
        address: "300新竹市香山區浸水街406巷66弄11號"
      },
      {
        id: "f00002",
        name: "黃媽媽",
        nickName: "媽媽",
        phone: "0912123111",
        address: "300新竹市香山區浸水街406巷66弄11號"
      }
    ],
    cashout_choice: null,
    cashout_methods: ['信用卡', 'Apple Pay', 'Google Pay'],
    order_list_item : {
      user_id: "",
      store_id: "",
      subtotal: 0,
      service_fee: 10,
      dishes: [],
    },
    can_submit: false,
    wait_submit: false
  }),
  methods: {
    addCartToOrder() {
      this.order_list_item.user_id = this.user.id;

      let cart = this.$store.state.cart;
      this.order_list_item.store_id = cart.restaurantId;
      this.order_list_item.subtotal = cart.total;
      this._.forEach(this.cart_list, dish => {
        this.order_list_item.dishes.push( dish._id );
      });
    },
    submit() {
      let submitOrder = async () => {
        this.wait_submit = true;
        try {
          await this.$axios({
            method: 'post',
            url: '/api/v1/orders/create',
            'Content-Type': 'application/json',
            data: this.order_list_item
          });
          alert("訂餐成功");
          this.$store.commit('cart/clearShoppingCart');
          this.$router.push({ name: 'dashboard' });
        } catch (error) {
          console.log( error );
          console.log( JSON.stringify(this.order_list_item) );
          alert("訂餐失敗");
        }
        this.wait_submit = false;
      }

      submitOrder();
    }
  },
  computed: {
    ...mapGetters('user', {
      user: 'getOrderData'
    }),
    ...mapState({
      cart_list: state => state.cart.list,
      total_price: state => state.cart.total,
    }),
    relatives_list() {
      return this._.map(this.relatives, person => { return person.name });
    }
  },
  watch: {
    receiver_choice( choice ) {
      this.receiver = {};
      if ( choice === 0 ) {
        this.receiver = this.user;
      }
    },
    relatives_choice( name ) {
      this.relatives_index = this._.findIndex(this.relatives, person => {
        return person.name === name;
      });
      this.receiver = { ...this.relatives[ this.relatives_index ] };
    },
    cashout_choice() {
      this.can_submit = true;
    }
  },
  created() {
    this.relatives = FakeRelatives.read();
    this.receiver = this.user;
    if ( this.$store.state.cart.list.length === 0 ) {
      this.$router.push({ name: 'home' });
    }
    this.addCartToOrder();
  }
};
</script>

<style>
#cashout {
  font-size: 25px;
}

.v-label {
  font-size: 25px;
}
</style>