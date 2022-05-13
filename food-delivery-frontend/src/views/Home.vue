<template>
  <div
    :style="`width: 100%`"
  >
    <v-row 
      no-gutters
      justify="center"
    >
      <v-col
        cols="11"
      >
        <v-row no-gutters>
          <v-col
            cols="4"
          >
            <v-sheet
              class="d-flex justify-center align-center"
              color="transparent"
              height="580"
            >
              <v-img
                src="@/assets/logo.png"
                max-height="75%"
                max-width="75%"
                contain
              >
              </v-img>
            </v-sheet>

          </v-col>
          <v-col
            cols="8"
            align-self="center"
          >
            <v-sheet
              color="transparent"
              height="300"
            >
              <v-row>
                <v-col>
                  <div class="display-1">您的健康飲食，我們幫您送達。</div>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="11"
                >
                  <v-sheet
                    class="d-flex border--grey pa-2"
                    height="65"
                    elevation="5"
                  >
                    <v-text-field 
                      solo
                      clearable
                      v-model="keyword"
                      class="mr-3"
                      placeholder="找到你所想要的美食"
                      clear-icon="mdi-close-circle"
                    >
                    </v-text-field>
                    <v-btn 
                      height="48" 
                      width="150"
                      color="success"
                      class="white--text"
                      elevation="4"
                      @click="searchResult()"
                    >
                      <div class="title">
                        搜尋
                      </div>
                    </v-btn>
                  </v-sheet>
                </v-col>
              </v-row>
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row no-gutters justify="center">
      <v-col
        cols="10"
      >
        <v-sheet color="transparent">
          <div 
            class="display-3 grey--text"
            style="line-height: 3.24rem"
          >
            Introduction
          </div>
        </v-sheet>
      </v-col>
      <v-col
        cols="12"
      >
        <v-sheet
          color="green"
          width="100%"
          class="d-flex justify-center"
        >
          <v-sheet
            width="85%"
            color="transparent"
            class="py-4"
          >
            <v-row>
              <v-col
                cols="6"
              >
                <div>
                  <div class="display-1 font-weight-bold">
                    均衡營養
                  </div>
                  <div 
                    class="headline ml-2 pa-5"
                    style="line-height: 3.5rem; width: 85%"
                  >
                    我們不只幫您找出餐點，為了各位不同的需求，食載有你會將每個餐點的營養也標示出來，讓您有更完善的飲食均衡，也使您的生活更加多采多姿。
                  </div>
                </div>
              </v-col>
              <v-col
                cols="6"
              >
                <div>
                  <div class="display-1 font-weight-bold">
                    美味快遞
                  </div>
                  <div 
                    class="headline ml-2 pa-5"
                    style="line-height: 3.5rem; width: 85%"
                  >
                    美食當前卻困擾於無法外出嗎？交給食載有你，保證將熱騰騰的飯菜，準時送到您的門前。  
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-sheet>
        </v-sheet>
      </v-col>
    </v-row>
    <v-spacer class="py-4"/>
    <v-row 
      justify="center"
      no-gutters
    >
      <v-col
        cols="10"
      >
        <v-sheet color="transparent">
          <div 
            class="display-3 grey--text"
            style="line-height: 4.5rem"
          >
            Easier, Faster
          </div>  
        </v-sheet>
      </v-col>
      <v-col
        cols="10"
        class="mr-8"
      >
        <v-sheet color="transparent">
          <div class="headline mt-2">
            為了您能更方便的點餐，我們將流程做了優化：
          </div>
        </v-sheet>
      </v-col>
      <v-col
        cols="11"
        class="mt-5"
      >
        <v-row no-gutters justify="space-around">
          <v-col
            v-for="( title, index ) in stepInfo"
            :key="index"
          >            
            <div class="d-flex flex-row justify-center align-center">
              <div
                class="success circle text-center mr-3 white--text"
              >
                {{ index + 1 }}
              </div>
              <div class="title">
                {{ title }}
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row no-gutters justify="space-around" class="mt-5 mx-10">
          <v-col
            cols="12"
          >
            <div 
              class="grey black--text d-flex justify-center align-center"
              style="height: 202.13px"
            >
              Picture
              <br>
                ( 8 : 1 )
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-spacer class="py-4"/>
    <v-row
      justify="center"
      no-gutters
    >
      <v-col
        cols="10"
      >
        <v-sheet color="transparent">
          <div 
            class="display-3 grey--text"
            style="line-height: 4.5rem"
          >
            Other Choice
          </div>  
        </v-sheet>
      </v-col>
      <v-col
        cols="10"
      >
        <v-row>
          <v-col
            cols="6"
            class="px-5"
          >
            <v-sheet 
              class="border-bold-grey d-flex flex-column align-center"
              height="430"
            >
              <div 
                class="headline pa-5"
                style="width: 98%"
              >
                <p>
                  想要讓其他顧客品嘗你的美食嗎？ 您可以選擇成為其中一個店家！
                  <br>
                  <br>
                  食載有你也有提供店家上傳自己菜單的服務。填寫好相關的資料後，
                  <br>
                  您就可以成為我們的其中一個店家了！
                  <br>
                  <br>
                  有興趣成為我們的一份子嗎？
                  <br>
                  快點擊下面加入我們吧！
                </p>
              </div>
              <v-btn
                x-large
                depressed
                width="60%"
                height="80"
                color="success"
                class="white--text text-weight-bold my-3"
                style="border-radius: 40px"
              >
                <div class="display-2">
                  Join Us
                </div>
              </v-btn>
            </v-sheet>
          </v-col>
          <v-col
            cols="6"
            class="px-5"
          >
            <v-sheet 
              class="border-bold-grey d-flex flex-column align-center"
              height="430"
            >
              <div 
                class="headline px-5 pt-5"
                style="width: 98%"
              >
                <p>
                  歡迎使用我們的APP！
                  <br>
                  <br>
                  點擊下面的按鈕，前往下載頁面吧！
                </p>
              </div>
              <v-spacer class="py-2"/>
              <v-row no-gutters class="mb-3">
                <v-col
                  cols="8"
                  justify-self="center"
                >
                  <download-button type="google" class="mb-2" />
                  <download-button type="appstore" />
                </v-col>
                <v-col
                  cols="4"
                  align-self="center"
                  class="pb-2"
                >
                  <v-img max-width="90%" max-height="90%" src="@/assets/phone.png"/>
                </v-col>
              </v-row>
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import downloadButton from "@/components/Home/downloadButton"
  //import UserOrder from "../store/modules/UserOrder"

  export default {
    components: {
      downloadButton
    },
    data: () => ({
      keyword: "",
      stepInfo: [
        "輸入你想吃的美食",
        "搜尋到附近的相關店家",
        "點餐後選擇結帳",
        "靜待熱騰騰的美食上門"
      ]
    }),
    methods: {
      searchResult() {
        
        
        this.$router.push({ path: `/search?keyword=${ this.keyword }` });
      }
    }
  }
</script>

<style>
  .border--grey {
    border: 1px #A4A4A4 solid !important ;
    border-radius: 5px
  }

  .border-bold-grey {
    border: 2px #A4A4A4 solid !important ;
    border-radius: 10px
  }

  .circle {
    height: 25px ;
    width: 25px ;
    border-radius: 25% ;
  }
</style>