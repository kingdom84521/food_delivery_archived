<template>
    <v-container>
        <!-- Title -->
        <v-row>
            <v-col class="display-1">
                菜單列表
            </v-col>
            <v-spacer></v-spacer>
            <v-col justify-self="end">
                <v-row justify="end">
                    <v-dialog v-model="dialog" persistent max-width="70%">
                        <template v-slot:activator="{on}">
                            <v-btn class="subtitle-1 green darken-1 white--text mr-5" v-on="on">新增菜單</v-btn>
                        </template>
                        <!-- add new dish dialog -->
                        <v-card class="px-2 pb-3 pt-1" elevation="24">
                            <v-container>
                                <v-row>
                                    <v-img max-width="100" height="100" src="https://via.placeholder.com/100"></v-img>
                                    <input id="input" type="file" accept="image/*" style="display: none">
                                    <v-chip label class="ml-2 green lighten-1 white--text">
                                        <v-icon left>mdi-image-area</v-icon>
                                        選擇圖片
                                    </v-chip>
                                </v-row>
                                <v-row>
                                    <v-col cols="6">
                                        <v-row>
                                            <label for="dishname">餐點名稱:</label>
                                            <v-text-field id="dishname" outlined hide-details></v-text-field>
                                        </v-row>
                                        <v-row>
                                            <label for="dishmemo">餐點備註:</label>
                                            <v-textarea id="dishmemp" outlined hide-details></v-textarea>
                                        </v-row>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-row>
                                            <label for="dishtag">餐點標籤:</label>
                                            <v-text-field id="dishtag" outlined hide-details></v-text-field>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="4" class="text-center" align-self="center">營養標示：</v-col>
                                            <v-divider dark vertical></v-divider>
                                            <v-col class="d-inline">
                                                <v-row v-for="(item, index) in nutritionList" :key="index">
                                                    <v-col class="mt-4 text-end" cols="5"><label for="nutrition">{{item.name}}</label></v-col>
                                                    <v-col cols="4"><v-text-field id="nutrition" outlined hide-details v-model="item.calculate"></v-text-field></v-col>
                                                    <v-col class="mt-4 text-center" cols="3"><span>{{item.unit}}</span></v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                        <v-row></v-row>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <v-card-actions>
                                <v-btn class="red darken-1 white--text" @click="dialog = false">取消</v-btn>
                                <v-btn class="green darken-1 white--text" @click="addDish()">確定</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    

                    <v-btn class="subtitle-1 red darken-1 white--text mr-5" @click="deleteDish()">刪除菜單</v-btn>
                </v-row>
            </v-col>
        </v-row>

        <v-divider></v-divider>

        <!--Dish list  -->
        <v-card>    
            <v-toolbar class="green darken-4" dark flat prominent>
                <!-- search bar -->
                <v-text-field 
                    class="mt-5 mx-4" label="搜尋..."
                    prepend-inner-icon="mdi-magnify"
                    solo-inverted flat clearable
                    v-model="search"
                ></v-text-field>
            </v-toolbar>

            <!-- tabs -->
                <v-tabs background-color="green darken-1" fixed-tabs>
                    <!-- category tabs -->
                    <v-tab class="white--text title" v-for="(item, index) in dish" :key="index">{{item.category}}</v-tab>
                    <v-tabs-slider color="white"></v-tabs-slider>

                    <!-- menu list -->
                    <v-tab-item v-for="(item, index) in dish" :key="index">
                        <v-list class="list" max-height="380">
                            <v-list-item class="d-block" v-for="(menu, i) in item.list" :key="i">
                                <v-card class="mb-2" outlined>
                                    <v-row>
                                        <v-col cols="3">
                                            <v-img class="ml-2" min-width="100" min-height="100" src="https://via.placeholder.com/100"></v-img>
                                        </v-col>
                                        <v-col cols="9">
                                            <v-row justify="start" align="center">
                                                <v-col class="headline">{{menu.name}}</v-col>
                                                <v-col class="subtitle-2">餐點標籤:{{menu.tag}}</v-col>
                                                <v-col cols="1">
                                                    <v-checkbox v-model="menu.check" color="teal"></v-checkbox>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col class="text-center" cols="2">營養表:</v-col>
                                                <v-col>
                                                    <v-row>
                                                        <v-col class="text-left" v-for="(obj,k) in nutritionList" :key="k" cols="6">{{obj.lable}}-{{menu.nutrition}}{{obj.unit}}</v-col>
                                                    </v-row>
                                                </v-col>
                                                <v-col>$NT{{menu.price}}</v-col>
                                            </v-row>
                                            <v-row>
                                                
                                            </v-row>
                                        </v-col>
                                    </v-row>
                                </v-card>
                            </v-list-item>
                        </v-list>
                    </v-tab-item>
                </v-tabs>        
        </v-card>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        dialog: false,
        search: "",
        nutritionList: [
            {
                lable: "熱量",
                calculate: 0,
                unit: "kcal"
            },
            {
                lable: "碳水化合物",
                calculate: 0,
                unit: "gram"
            },
            {
                lable: "蛋白質",
                calculate: 0,
                unit: "gram"
            },
            {
                lable: "脂肪",
                calculate: 0,
                unit: "gram"
            },
            {
                lable: "鈉",
                calculate: 0,
                unit: "gram"
            }
        ],
        dish: [
            {
                category: "主菜",
                list: [
                    {
                        name: "咖哩飯",
                        price: 80,
                        nutrition: 1800,
                        tag: "tag info",
                        check: false
                    },
                    {
                        name: "義大利麵",
                        price: 65,
                        nutrition: 1500,
                        tag: "tag info",
                        check: false
                    },
                    {
                        name: "排骨便當",
                        price: 70,
                        nutrition: 1600,
                        tag: "tag info",
                        check: false
                    },
                    {
                        name: "排骨便當",
                        price: 70,
                        nutrition: 1600,
                        tag: "tag info",
                        check: false
                    },
                    {
                        name: "排骨便當",
                        price: 70,
                        nutrition: 1600,
                        tag: "tag info",
                        check: false
                    },
                    {
                        name: "排骨便當",
                        price: 70,
                        nutrition: 1600,
                        tag: "tag info",
                        check: false
                    },
                    {
                        name: "排骨便當",
                        price: 70,
                        nutrition: 1600,
                        tag: "tag info",
                        check: false
                    }
                ]
            },
            {
                category: "小菜",
                list: [
                    {
                        name: "皮蛋豆腐",
                        price: 35,
                        nutrition: 350,
                        tag: "tag info",
                        check: false
                    },
                    {
                        name: "雞肉凱薩沙拉",
                        price: 50,
                        nutrition: 400,
                        tag: "tag info",
                        check: false
                    },
                    {
                        name: "燙青菜",
                        price: 30,
                        nutrition: 200,
                        tag: "tag info",
                        check: false
                    }
                ]
            },
            {
                category: "飲料",
                list: [
                    {
                        name: "冬瓜茶",
                        price: 20,
                        nutrition: 250,
                        tag: "tag info",
                        check: false
                    },
                    {
                        name: "日式綠茶",
                        price: 25,
                        nutrition: 150,
                        tag: "tag info",
                        check: false
                    },
                    {
                        name: "現打果汁",
                        price: 30,
                        nutrition: 300,
                        tag: "tag info",
                        check: false
                    }
                ]
            }
        ]
    }),
    methods: {
        deleteDish(){
            console.log("deleteDish function Test");
            
            for ( var i in this.dish ){
                this._.remove(this.dish[i].list, n =>{
                    return n.check;
                });
                console.log( this.dish[0].list );
            }
            this.$forceUpdate();
            return;
        },
        addDish(){

        }
    }
}
</script>

<style>
    .list{
        overflow: auto
    }
</style>