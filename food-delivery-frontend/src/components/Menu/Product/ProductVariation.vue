<template>
  <!-- 餐點額外項目 -->
  <v-card>
    <v-img
      v-if="showImg"
      max-height="250"
      :src="img"
    />
    <v-img
      v-else
      max-height="250"
      src="@/assets/butter.jpg"
    />
    <v-card-title>
      <div> {{ item_extra.product.name }} </div>
      <v-spacer />
      <div> NT{{ temporary_item.subtotal * temporary_item.quantity }}$ </div>
    </v-card-title>
    <v-divider />

    <!-- Variations -->
    <v-list>
      <v-list-item-group
        v-model="product_variation"
        :mandatory="product_variation !== null"
      >
        <v-card-title>選擇種類</v-card-title>
        <template
          v-for="(variation, index) in item_extra.product.product_variations"
        >
          <v-list-item
            :key="index"
          >
            <template v-slot:default="{ active,toggle }">
              <v-list-item-icon>
                <v-icon v-if="product_variation !== index">mdi-radiobox-blank</v-icon>
                <v-icon v-else>mdi-radiobox-marked</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ variation.name }}</v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text class="title">NT{{ variation.price }}$</v-list-item-action-text>
              </v-list-item-action>
            </template>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>

    <!-- Toppings -->
    <v-list 
      v-if="item_extra.toppings"
    >
      <template
        v-for="(topping, top_index) in item_extra.toppings"
      >
        <v-list-item-group
          v-model="toppings[top_index]"
          :key="topping.id"
          :mandatory="topping.quantity_min > 0 && toppings[top_index] !== null"
          :multiple="topping.quantity_max > 1"
        >
          <v-divider />
          <v-card-title> {{ topping.name }} </v-card-title>
          <template
            v-for="(option, op_index) in topping.options"
          >
            <v-list-item
              v-if="topping.quantity_max === 1"
              :key="option.id"
            >
              <template 
                v-slot:default="{ active,toggle }"
              >
                <v-list-item-icon>
                  <v-icon v-if="toppings[top_index] !== op_index">mdi-radiobox-blank</v-icon>
                  <v-icon v-else>mdi-radiobox-marked</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ option.name }}</v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <v-list-item-action-text class="title">+NT{{ option.price }}$</v-list-item-action-text>
                </v-list-item-action>
              </template>
            </v-list-item>
          </template>
        </v-list-item-group>
      </template>
    </v-list>

    <v-divider />

    <!-- 備註 -->
    <v-card-title>備註</v-card-title>
    <v-textarea
      v-model="item_extra.remarks"
      auto-grow 
      outlined
      class="pa-3"
      placeholder="例如：不要香菜"
    />

    <!-- 數量調整及送出 -->
    <v-card-actions>
      <v-row justify="center">
        <v-col cols="1">
          <v-btn 
            icon
            color="red accent-3"
            :disabled="temporary_item.quantity === 1"
            @click="changeQuantity(temporary_item, '-')"
          >
            <v-icon>mdi-minus</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="2">
          <div class="text-end font-weight-bold"> {{ temporary_item.quantity }} </div>
        </v-col>
        <v-col cols="1">
          <v-btn 
            icon
            color="green accent-3"
            @click="changeQuantity(temporary_item, '+')"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
        <v-col>
          <v-btn 
            block
            color="green accent-3"
            :disabled="!check_shopping_car"
            @click="addToCart()"
          >
            加入購物車
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'ProductVariation',
  props: {
    product_detail: {
      type: Boolean,
      default: false,
      require: true
    },
    restaurant_data: {
      type: Object,
      require: true
    },
    item_extra: {
      type: Object,
      require: true
    },
    temporary_item: {
      type: Object,
      require: true
    },
    toppings: {
      type: Array,
      require: true
    },
    unsetToppings: {
      type: Function,
      require: true
    },
    addToCart: {
      type: Function,
      require: true
    },
    backToCart: {
      type: Function,
      require: true
    },
    showImg: {
      type: Boolean
    }
  },
  data: () => ({
    img: "https://img2.secretchina.com/pic/2019/8-3/p2483812a213645788-ss.jpg",
    product_variation: null,
    check_shopping_car: false
  }),
  methods: {
    getUnit( item ) {
      let unit = {
        id: null,
        name: null
      };
      unit.id = item.id;
      unit.name = item.name;

      return unit
    },
    changeQuantity( item , state ) {
      this.$emit('changeQuantity', item, state);
    }
  },
  watch: {
    product_detail( now_status ) {
      if ( !now_status ) {
        this.product_variation = null;
      }
    },
    product_variation( variation_index ) {
      this.check_shopping_car = false;
      this.unsetToppings();

      if ( variation_index !== null ) {
        let variation = this._.get(this.item_extra, ['product', 'product_variations', variation_index]);
        this.temporary_item.variation = this.getUnit(variation);
        this.temporary_item.price = variation.price;
        this.temporary_item.subtotal = this.temporary_item.price;

        let topping_ids = this._.get(variation, 'topping_ids');

        // 有 toppings 才新增
        if ( topping_ids !== undefined && topping_ids.length !== 0 ) {
          this._.set(this.item_extra, 'toppings', []);
          this._.forEach(topping_ids, topping_id => {
            let topping = this._.get(this.restaurant_data, ['toppings', topping_id]);
            this.item_extra.toppings.push( topping );
          });
        } else {
          this.check_shopping_car = true;
        }
      }
    },
    toppings( now_status ) {
      // console.log( now_status );
      if ( this.item_extra.toppings !== null ) {
        this.temporary_item.subtotal = this.temporary_item.price;

        // 檢查每一個 Topping 是否符合
        let canCheckout = true;
        this._.forEach(this.item_extra.toppings, (topping, index) => {
          let choice_index = now_status[index];
          
          if ( typeof( choice_index ) === "object" ) {
            if ( choice_index === null ) {
              canCheckout = canCheckout && (topping.quantity_min === 0 );
            } else {
              this._.forEach(choice_index, option_index => {
                this.temporary_item.subtotal += this._.get(topping , ['options', option_index, 'price']);
              });
              canCheckout = canCheckout && (topping.quantity_max >= choice_index.length);
            }
          } else {
            this.temporary_item.subtotal += this._.get(topping , ['options', choice_index, 'price']);
            canCheckout = canCheckout && true
          }
        });
        this.check_shopping_car = canCheckout;
      }
    }
  },
  created() {
    console.log( this.$router.params );
  }
}
</script>

<style>

</style>