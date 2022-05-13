<template>
  <v-sheet>
    <!-- 餐點分類 -->
    <v-tabs 
      background-color="green accent-3" 
      color="grey darken-2"
      center-active 
      v-model="menu_tab"
    >
      <v-tab 
        v-for="(category, index) in categories"
        :key="index"
        class="font-weight-bold headline"
      >
        {{ category.name }}
      </v-tab>
      <v-tabs-slider color="orange darken-2"/>
    </v-tabs>

    <!-- 餐點項目 -->
    <v-tabs-items v-model="menu_tab">
      <v-tab-item
        v-for="(category, index) in categories"
        :key="index"
      >
        <v-card
          v-for="(product, index) in category.products"
          :key="index"
          @click="addToCart(product)"
        >
          <v-container fluid class="pa-0">
            <v-row class="pa-0 pl-3">
              <v-col cols="2" class="pr-0">
                  <v-img  
                    height="100" 
                    width="100" 
                    src="https://fakeimg.pl/100x100" 
                  />
                  <v-img
                    height="50"
                    width="50"
                    src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/search-512.png"
                    @mouseover="show($event)"
                    @mouseout="closeShow()"
                  />
                  <v-menu v-model="showNu" :position-x="x" :position-y="y" >
                    <template>
                        <v-sheet class ="mx-auto" max-width="360" outlined>
                            <div v-for="(element, index ) in NutritionList" :key="index">
                              <p class="display-1">
                                {{element.NutritionType}} : {{element.NutritionValue}} 份,
                              </p>
                            </div>
                        </v-sheet>
                    </template>
                  </v-menu>
              </v-col>
              <v-col cols="9" class="ml-n12">
                <v-row>
                  <v-col cols="4">
                    <div class="font-weight-bold headline"> {{ product.name }} </div>
                  </v-col>
                  <v-col class="title">
                    餐點標籤：
                  </v-col>
                  <v-col>
                    <OrderListTag :product="product"/>
                  </v-col>
                </v-row>
                <Nutrition :nutritionList="getNutrition( product )"/>
              </v-col>
              <v-col align-self="end" class="text-end pr-8">
                <v-btn
                  icon
                  class="mb-5 mr-n2"
                >
                  <v-icon color="green accent-4">
                    mdi-plus-box-outline
                  </v-icon>
                </v-btn>
                <div class="font-weight-medium title">
                  NT{{ product.price }}$
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-sheet>
</template>

<script>
import Nutrition from '@/components/Menu/Product/Nutrition';
import OrderListTag from  '@/components/Menu/Product/OrderListTag';

export default {
  name: "ProductList",
  components: {
    Nutrition,
    OrderListTag,
  },
  props: {
    categories: {
      type: Array,
      require: true
    },
  },
  data: () => ({
    menu_tab: null,

    showNu:false,
    x:0,
    y:0,
    NutritionList:[]
  }),
  methods: {
    addToCart( product ) {
      this.$emit('addToCart', product);
    },
    isItemExtra( product ) {
      return (product.product_variations.length !== 1 || product.product_variations[0].topping_ids.length !== 0);
    },
    checkItemExtra( category , product ) {
      this.$emit('checkItemExtra', category, product);
    },

    show(e){
      setTimeout(()=>{
        e.preventDefault();
              this.x = e.clientX;
              this.y = e.clientY;
              this.$nextTick(()=>{
                  this.showNu = true;
              })

        console.log('show');
      },2000)
    },
    closeShow(){
      this.showNu = false;
    },
    getNutrition( product ) {
      return this._.pick( product, ["grains", "greens", "protiens", "dairies", "fruits", "nuts"] );
    }
  },
  mounted(){
    //this.order = axios.get();
    this.NutritionList = [{NutritionType:"五穀根莖類",NutritionValue:"2"},
                          {NutritionType:"蛋豆魚肉類",NutritionValue:"3"},
                          {NutritionType:"油與堅果類",NutritionValue:"2"},]
  },
  
}
</script>

<style>

</style>