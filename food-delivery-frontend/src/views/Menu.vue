<template>
  <v-container fluid>
    <v-row>
      <!-- 菜單 -->
      <v-col
        lg="9"
        md="9"
        cols="12"
        class="pl-md-0"
      >
        <!-- 餐廳招牌 -->
        <v-card>
          <v-img 
            max-height="250"
            :src="restaurant_data.image"
            v-if="restaurant_data.image"
          />
          <v-img 
            max-height="250"
            src="../assets/italy.jpg"
            v-else
          />
          <v-card-actions
            @click.stop="restaurant_detail = true"
          >
            <!-- 店名 -->
            <v-card-title class="display-2">
              {{ restaurant_data.name }}
            </v-card-title>
            <v-spacer />
            <v-btn icon>
              <v-icon color="green accent-4">mdi-alert-circle-outline</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>

        <!-- 餐廳詳細資料 -->
        <v-dialog 
          v-model="restaurant_detail" 
          max-width="1000"
        >
          <v-card>
            <v-img
              max-height="250"
              src="../assets/garlic.jpg"
            >
              <v-btn
                fab
                absolute
                x-small
                color="white"
                @click="restaurant_detail=false"
              >
                <v-icon color="green accent-4">
                  mdi-close
                </v-icon>
              </v-btn>
            </v-img>
            <v-card-title>
              {{ restaurant_data.name }}
            </v-card-title>
            <v-container>

            </v-container>
          </v-card>
        </v-dialog>

        <!-- 餐點列表 -->
        <product-list 
          v-if="show_product"
          :categories="categories"
          @addToCart="addToCart"
        />
      </v-col>

      <!-- 購物車 -->
      <v-col
        lg="3"
        md="3"
        cols="12"
        class="pl-md-0"
      >
        <shopping-cart/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProductList from '@/components/Menu/Product/ProductList';
import ShoppingCart from '@/components/Menu/ShoppingCart';

export default {
  name: 'Menu',
  components: {
    ProductList,
    ShoppingCart
  },
  props: {
    restaurantId: {
      type: String,
      require: true
    }
  },
  data: () => ({
    restaurant_data: {},
    categories: [],
    restaurant_detail: false,
    show_product: false
  }),
  methods: {
    getNewListItem( product ) {
      let temp_product = this._.pick( product, [ "_id", "name", "price" ] );
      let item_template = { 
        ...temp_product,
        quantity: 1,
        subtotal: 0,
        remarks: null 
      };
      item_template.subtotal = item_template.price;
      
      return item_template;
    },
    addToCart( product ) {
      let list_item_template = this.getNewListItem( product );
      this.$store.dispatch('cart/addProductToCart', list_item_template);
      // console.log( this.$store.state.cart );
    },
    setMenuData( payload ) {
      this.restaurant_data = payload.info;
      let dishes = payload.menus[0].dishes;

      for ( var index in dishes ) {
        let tag = dishes[index].tag[0];
        let category_index = this.categories.findIndex( e => e.name == tag );
        if ( category_index == -1 ) {
          let category = {
            name: tag,
            products: []
          };
          this.categories.push( {...category} );
          category_index = this.categories.length - 1;
        }
        this.categories[category_index].products.push( dishes[index] );
      }
      this.show_product = true;

      this.$store.dispatch('cart/setCartInit', {
        restaurantId: this.restaurantId,
        restaurantName: this.restaurant_data.name,
      }); 
    },
    async getRestaurantInfo() {
      try {
          const result = await this.$axios({
            method: 'GET',
            baseURL: "http://localhost:1234/api/v1",
            url: "/restaurant",
            'Cotent-type': 'application/json',
            headers: {
              restaurant_id: this.restaurantId
            }
          }); 
          this.setMenuData( result.data.payload );
          // console.log( result.data );
        } catch( error ) {
          console.log( error );
        }
    }
  },
  computed: {
    have_img() {
      return this.restaurant_data.image !== "";
    }
  },
  created() {
    this.getRestaurantInfo();
  }
};
</script>