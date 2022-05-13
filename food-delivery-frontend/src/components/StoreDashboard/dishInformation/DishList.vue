<template>
  <v-container>
    <v-row justify="end">
      <v-col cols="5">
        <v-text-field
          outlined
          prepend-inner-icon="mdi-magnify"
          clear-icon="mdi-close"
          clearable
          hide-details
          placeholder="請輸入您要搜尋的關鍵字"
        />
      </v-col>
    </v-row>
    <v-row class="display-2 mb-1">菜單列表</v-row>
    <v-row class="title mb-4">在這裡瀏覽或是編輯您的菜單</v-row>
    <v-row>
      <v-list class="list" max-height="450">
          <v-list-item v-for="(menu, i) in dish" :key="i">
              <v-card class="mb-2" outlined min-width="1000">
                <v-row>
                  <v-col cols="1">
                    <v-img contain src="https://via.placeholder.com/100" />
                  </v-col>
                  <v-col cols="2">
                    <v-row>{{menu.name}}</v-row>
                    <v-row>營養:</v-row>
                  </v-col>
                  <v-col cols="6">
                    <v-row>Dish tag：{{menu.tag}}</v-row>
                    <v-row>
                      <v-col class="text-left" v-for="(obj, k) in nutritionList" :key="k" cols="4">
                        {{nutritionList.lable}} {{menu.nutrition[k]}}份
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="2">價格：{{menu.price}}</v-col>
                  <v-col cols="1">
                    <v-checkbox v-model="menu.check" color="teal"></v-checkbox>
                  </v-col>
                </v-row>
              </v-card>
          </v-list-item>
      </v-list>
    </v-row>
    <!-- <v-row align="end" justify="end">
      <v-btn>Add new dish</v-btn>
    </v-row> -->
  </v-container>
</template>

<script>
export default {
  data: () => ({
    space: " ",
    nutritionList: [
        {
            lable: "穀物",
            calculate: 0
        },
        {
            lable: "蔬菜",
            calculate: 0
        },
        {
            lable: "蛋豆",
            calculate: 0
        },
        {
            lable: "乳品",
            calculate: 0
        },
        {
            lable: "水果",
            calculate: 0
        },
        {
            lable: "堅果",
            calculate: 0
        }
    ],
    dish: [
            {
                name: "咖哩飯",
                price: 80,
                nutrition: [2 , 1 , 1 , 0 , 0 ,0],
                tag: "tag info",
                check: false
            },
            {
                name: "義大利麵",
                price: 65,
                nutrition:[2,2,1,0,0,0],
                tag: "tag info",
                check: false
            },
            {
                name: "排骨便當",
                price: 70,
                nutrition: [2,2,1,0,0,0],
                tag: "tag info",
                check: false
            },
            {
                name: "皮蛋豆腐",
                price: 35,
                nutrition: [0,0,2,0,0,0],
                tag: "tag info",
                check: false
            },
            {
                name: "雞肉凱薩沙拉",
                price: 50,
                nutrition: [0,2,1,0,0,0],
                tag: "tag info",
                check: false
            },
            {
                name: "燙青菜",
                price: 30,
                nutrition: [0,2,0,0,0,0],
                tag: "tag info",
                check: false
            },
            {
                name: "冬瓜茶",
                price: 20,
                nutrition: [0,0,0,0,0,0],
                tag: "tag info",
                check: false
            },
            {
                name: "日式綠茶",
                price: 25,
                nutrition: [0,0,0,0,0,0],
                tag: "tag info",
                check: false
            },
            {
                name: "現打果汁",
                price: 30,
                nutrition: [0,0,0,0,0,0],
                tag: "tag info",
                check: false
            }
    ]
  }),
  methods:{
    // getDish(){
    //   var 
    // }
  },
  computed:{

  }
}
</script>