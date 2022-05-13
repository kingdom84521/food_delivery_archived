<template>
  <v-container>
    <v-row>
      <v-text-field
        label="運送地址"
        prepend-icon="mdi-map-marker"
        append-icon="mdi-crosshairs-gps"
        placeholder="請輸入運送地址"
        v-model="address"
        @click:append="getAddress()"
        @blur="getCoordinates()"
      />
    </v-row>
    <v-row class="mt-3">
      <v-text-field 
        append-icon="mdi-magnify" 
        outlined placeholder="搜尋店家..."
      />
    </v-row>
    <!-- 店家列表 --><!--work:切區塊去做all res 與 recommend res -->
    <div>

      <v-row justify="space-around" class="overflow-block overflow-y-auto">
        <v-col
          v-for="(restaurant, i) in searchRestaurants"
          :key="i"
          md="3"
          sm="4"
          cols="12"
        >
          <v-card
            :to="{ name: 'restaurant', params: { restaurantId: restaurant.restaurant_id } }"
            class="mb-7"
            height="310"
          >
            <v-img :src="restaurant.image" v-if="restaurant.image" height="155"/>
            <v-img src="@/assets/italy.jpg" v-else height="155"/>
            <v-card-title> {{ restaurant.name }} </v-card-title>
            <!-- <v-card-text> 預估{{ restaurant.distance }}分鐘 </v-card-text> -->
            <v-card-text> 預估20分鐘 </v-card-text>
          </v-card>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </div>

    <v-divider class="mt-5" />

    <div class="mt-5">
      <div class="display-2 my-3">所有菜單選擇</div>
      <v-row justify="space-around" class="overflow-block overflow-y-auto">
        <v-col
          v-for="(restaurant, i) in restaurants"
          :key="i"
          md="3"
          sm="4"
          cols="12"
        >
          <v-card
            :to="{ name: 'restaurant', params: { restaurantId: restaurant.restaurant_id } }"
            class="mb-7"
            height="310"
          >
            <v-img :src="restaurant.image" v-if="restaurant.image" height="155"/>
            <v-img src="@/assets/italy.jpg" v-else height="155"/>
            <v-card-title> {{ restaurant.name }} </v-card-title>
            <!-- <v-card-text> 預估{{ restaurant.distance }}分鐘 </v-card-text> -->
            <v-card-text> 預估20分鐘 </v-card-text>
          </v-card>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </div>

    <!-- 至頂按鈕 -->
    <v-fade-transition>
      <v-btn color="primary" fab fixed right bottom v-show="scrolling" @click="ScrollTop()">
        <v-icon>mdi-arrow-up-bold-outline</v-icon>
      </v-btn>
    </v-fade-transition>
  </v-container>
</template>>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    keyword: {
      type: String
    }
  },
  data: () => ({
    scrolling: false,
    searchRestaurants: [],
    restaurants: [],
    // address: "360台灣苗栗縣苗栗市聯合大學八甲校區1",
    address: null,
    latlng: ""
  }),
  methods: {
    handleScroll() {
      this.scrolling = window.pageYOffset > 0;
    },
    ScrollTop() {
      window.scroll({ top: 0, behavior: "smooth" });
    },
    updateUserAddress() {
      this.$store.dispatch('user/setAddress', this.address);
    },
    callGoogleAPI( callType ) {
      let params = {
        key: 'AIzaSyDWAvWMT0ZxoBnAsYZgrqp9LgLvxA-yABE'
      };

      if ( callType === 'address' ) {
        params['language'] = 'zh-TW';
        params['latlng'] = this.latlng;
      } 
      else if ( callType === 'coordinates' ) {
        params['address'] = this.address;
      }
      
      return this.$axios({
        method: 'GET',
        baseURL: 'https://maps.googleapis.com/maps/api/geocode/json',
        'Cotent-type': 'application/json',
        params
      });
    },
    getAddress() {
      var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };

      let success = async pos => {
        var crd = pos.coords;
        try {
          this.latlng = crd.latitude.toString() + "," + crd.longitude.toString();
          // console.log( "Position: ", this.latlng );
          const result = await this.callGoogleAPI('address');
          this.address = this._.get(result, ['data', 'results', 0, 'formatted_address']);
        } catch( error ) {
          console.log( error );
        }

        this.updateUserAddress();
        this.searchRestaurantsData();
      };

      let error = err => {
        console.warn('ERROR(' + err.code + '): ' + err.message);
      };

      navigator.geolocation.getCurrentPosition(success, error, options);
      // this.address = "360台灣苗栗縣苗栗市恭敬路43號";
      console.log("Get adress by Google API");
    },
    getCoordinates( updateAddress = true ) {
      const callAPI = async () => {
        try {
          const result = await this.callGoogleAPI('coordinates');

          let location = this._.get(result, ['data', 'results', 0, 'geometry', 'location']);
          this.latlng = this._.values( location ).join(',');
        } catch( err ) {
          console.log( err );
        }
        if ( updateAddress ) {
          this.updateUserAddress();
        }
        this.searchRestaurantsData();
      };

      callAPI();
    },
    async searchRestaurantsData() {
      try {
        const result = await this.$axios({
          method: 'GET',
          url: "/api/v1/session/search/restaurants",
          'Cotent-type': 'application/json',
          params : {
              latlng: this.latlng,
              keyword: this.keyword
          }
        }); 

        this.searchRestaurants = result.data.payload.target;
        this.restaurants = result.data.payload.all;
        // console.log( result.data );
      } catch( error ) {
        console.log( error );
      }
    }
  },
  computed: {
    ...mapState({
      user_address: state => state.user.address
    })
  },
  created() {
    if ( this.user_address == null ) {
      this.getAddress();
    }
    else {
      this.address = this.user_address;
      this.getCoordinates(false);
    }
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style>
  .overflow-block {
    width: 100% ;
    max-height: 800px;
  }
</style>