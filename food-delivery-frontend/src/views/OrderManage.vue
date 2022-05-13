<template>
    <v-container>
        <v-card>
            <v-toolbar class="green darken-4" dark flat prominent>
                <v-text-field 
                    class="mt-5 mx-4" label="搜尋..."
                    prepend-inner-icon="mdi-magnify"
                    solo-inverted flat clearable
                ></v-text-field>
            </v-toolbar>

            <v-tabs background-color="green darken-1" fixed-tabs>
                    <v-tab class="white--text title" v-for="(i,index) in tabname" :key="index">{{i}}</v-tab>

                    <v-tabs-slider color="white"></v-tabs-slider>
                    
                    <v-tab-item v-for="(item, index) in tabname" :key="index">
                        <v-expansion-panels>
                            <v-expansion-panel v-for="i in list" :key="i">
                                <v-expansion-panel-header>
                                    <v-row>
                                        <v-col class="title">
                                           訂單編號：{{i.no}}
                                        </v-col>
                                        <v-col class="subtitle-1 text-end">檢視</v-col> 
                                    </v-row>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <v-row>
                                        <v-col cols="2" class="subtitle-1">商品清單：</v-col>
                                        <v-col>
                                            <v-list-item v-for="(obj, k) in i.menu" :key="k" disabled>
                                                <v-row>
                                                    <v-col>{{obj.name}}</v-col>
                                                    <v-col>x{{obj.amount}}</v-col>
                                                    <v-col>單價：{{obj.price}}</v-col>
                                                    <v-col>小計：{{obj.price*obj.amount}}</v-col>
                                                </v-row>
                                            </v-list-item>
                                        </v-col>
                                        <v-col cols="2" class="text-end">總計：{{i.total}}</v-col>
                                    </v-row>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-tab-item>
            </v-tabs>

        </v-card>
    </v-container>
</template>
<script>
export default {
    data: () => ({
        tabname: ["所有", "製作中", "運送中", "已完成"],
        order: [],
        list: [
            {
                status: 0,
                no: "2019-11-17-0001",
                menu: [
                    {
                        name: "xxxx",
                        price: 0,
                        amount: 1
                    },
                    {
                        name: "xxxx",
                        price: 0,
                        amount: 2
                    },
                    {
                        name: "xxxx",
                        price: 0,
                        amount: 3
                    }
                ],
                total: ".....",
                time: ""
            },
            {
                status: 1,
                no: "2019-11-17-0002",
                menu: [
                    {
                        name: "xxxx",
                        price: 0,
                    },
                    {
                        name: "xxxx",
                        price: 0,
                    },
                    {
                        name: "xxxx",
                        price: 0,
                    }
                ],
                total: ".....",
                time: ""
            },
            {
                status: 2,
                no: "2019-11-17-0003",
                menu: [
                    {
                        name: "xxxx",
                        price: 0,
                    },
                    {
                        name: "xxxx",
                        price: 0,
                    },
                    {
                        name: "xxxx",
                        price: 0,
                    }
                ],
                total: ".....",
                time: ""
            }
        ]
    }),
    methods: {
        
    },
    async created(){
        
    }
}
</script>