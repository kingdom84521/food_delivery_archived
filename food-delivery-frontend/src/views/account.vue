<template>
    <v-container>
            <!-- TITLE -->
            <v-row>
                <v-col class="display-1">
                    店家資訊
                </v-col>
            </v-row>

            <v-divider></v-divider>

            <!-- form -->
<!-- v2 -->
            <v-row class="title">
                    <v-col cols="12">
                        <!-- store name -->
                        <v-row class="" align="center" justify="center">
                            <v-col class="text-center" cols="2">
                                <label for="storename">店家名稱</label>
                            </v-col>
                            <v-col cols="10">
                                <v-text-field id="storename" outlined hide-details></v-text-field>
                            </v-col>
                        </v-row>
                        <!-- address -->
                        <v-row class="" align="center" justify="center">
                            <v-col class="text-center" cols="2">
                                <label for="storeaddress">店家位址</label>
                            </v-col>
                            <v-col cols="10">
                                <v-text-field id="storaddress" outlined hide-details></v-text-field>
                            </v-col>
                        </v-row>
                        <!-- work time -->
                        <v-row class="" align="center" justify="center">
                            <v-col class="text-center" cols="2">
                                <label for="worktime">營業時間</label>
                            </v-col>
                            <v-col cols="10">
                                <v-row align="center">
                                    <v-col cols="5">
                                        <v-menu
                                          ref="omenu" v-model="opentimepicker"
                                          :close-on-content-click="false"
                                          :return-value.sync="open"
                                          transition="scale-transition"
                                          max-width="300px" max-height="500px"
                                        >
                                            <template v-slot:activator="{ on }">
                                                <v-text-field
                                                  v-model="open" outlined hide-details
                                                  class="mt-8" label="開店時間" readonly
                                                  v-on="on"
                                                ></v-text-field>
                                            </template>
                                            <v-time-picker
                                              v-if="opentimepicker"
                                              v-model="open"
                                              full-width
                                              @click:minute="$refs.omenu.save(open)"
                                            ></v-time-picker>
                                        </v-menu>
                                    </v-col>
                                    <v-col class="display-2 text-center" cols="1">~</v-col>
                                    <v-col cols="5">
                                        <v-menu
                                          ref="cmenu" v-model="closetimepicker"
                                          :close-on-content-click="false"
                                          :return-value.sync="close"
                                          transition="scale-transition"
                                          max-width="300px" max-height="500px"
                                        >
                                            <template v-slot:activator="{ on }">
                                                <v-text-field
                                                  v-model="close" outlined hide-details
                                                  class="mt-8" label="打烊時間" readonly
                                                  v-on="on"
                                                ></v-text-field>
                                            </template>
                                            <v-time-picker
                                              v-if="closetimepicker"
                                              v-model="close"
                                              full-width
                                              @click:minute="$refs.cmenu.save(close)"
                                            ></v-time-picker>
                                        </v-menu>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                        <!-- contact -->
                        <v-row align="center" justify="center">
                            <v-col class="text-center" cols="2">
                                <label for="contact">聯絡方式</label>
                            </v-col>
                            <v-col cols="10">
                                <v-text-field id="contact" outlined hide-details></v-text-field>
                            </v-col>
                        </v-row>
                        <!-- manager -->
                        <v-row align="center" justify="center">
                            <v-col class="text-center" cols="2">
                                <label for="manager">管理人</label>
                            </v-col>
                            <v-col cols="10">
                                <v-text-field id="manager" outlined hide-details></v-text-field>
                            </v-col>
                        </v-row>
                        <!-- memo -->
                        <v-row align="center" justify="center">
                            <v-col class="text-center" cols="2">
                                <label for="memo">備註資訊</label>
                            </v-col>
                            <v-col cols="10">
                                <v-textarea id="memo" outlined hide-details></v-textarea>
                            </v-col>
                        </v-row>
                        <!-- img upload -->
                        <v-row align="center" justify="center">
                            <v-col class="text-center" align-self="start" cols="2">
                                <span>店家封面</span>
                            </v-col>
                            <v-col cols="10">
                                <v-row class="mb-5">
                                    <input id="input" type="file" accept="image/*" style="display: none" @change="getImage()">
                                    <v-chip label class="green lighten-1 white--text">
                                        <v-icon left>mdi-image-area</v-icon>
                                        選擇圖片
                                    </v-chip>
                                </v-row>
                                <v-row>
                                    <v-img src="../assets/logo.png" max-widht="300" max-height="180"></v-img>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-col>
            </v-row>

<!-- v1 -->
            <!-- <v-row>
                <v-col class="subtitle-1 text-center" cols="2">
                    <v-row class="mb-2">
                        <v-col>店家名稱:</v-col>
                    </v-row>
                    <v-row class="mb-2">
                        <v-col>店家位址:</v-col>
                    </v-row>
                    <v-row class="mb-2">
                        <v-col>聯絡方式:</v-col>
                    </v-row>
                    <v-row class="mb-2">
                        <v-col>管理人:</v-col>
                    </v-row>
                    <v-row class="mb-2">
                        <v-col>
                            備註資訊:
                            <v-sheet elevation="0" :height="height-56"></v-sheet>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>店家封面:</v-col>
                    </v-row>
                </v-col>
                <v-col cols="9">
                    <v-row class="mb-2">
                        <v-text-field outlined hide-details></v-text-field>
                    </v-row>
                    <v-row class="mb-2">
                        <v-text-field outlined hide-details></v-text-field>
                    </v-row>
                    <v-row class="mb-2">
                        <v-text-field outlined hide-details></v-text-field>
                    </v-row>
                    <v-row class="mb-2">
                        <v-text-field outlined hide-details></v-text-field>
                    </v-row>
                    <v-row class="mb-2" ref="textarea">
                        <v-textarea outlined hide-details></v-textarea>
                    </v-row>
                    <v-row>
                        <v-col>
                            <label>
                                <input id="input" type="file" accept="image/*" style="display: none" @change="getImage()">
                                <v-chip label class="green lighten-1 white--text">
                                    <v-icon left>mdi-image-area</v-icon>
                                    選擇圖片
                                </v-chip>
                            </label>
                        </v-col>
                        <v-col>
                            <v-img class="img"></v-img>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row> -->
    </v-container>
</template>

<script>
export default {
    data: () => ({
        // height: 0
        open: null,
        close: null,
        opentimepicker: false,
        closetimepicker: false,
        storeinformation: []
    }),
    methods: {
        // getTextareaHeight(){
        //     this.height = this.$refs.textarea.clientHeight;
        //     console.log(this.height);
        // },
        getImage(){
            let file = document.getElementById("input").files[0];
            var typecheck = /image.*/
            if ( !file.type.match(typecheck) ){
                return;
            }

            let image = document.getElementsByClassName("img");
            image.file = file;

            // let reader = new FileReader();
            // reader.onload()
            // reader.readAsDataURL(file);

        },
        showTime(){
            console.log(this.open);
        }
    },
    mounted() {
        //this.getTextareaHeight();
    },
    async created(){
        try {
            const res = await this.$axios.get("http://localhost:3000/restaurants");
            this.storeinformation = res.data;
            
        } catch (error) {
            console.error(error);
        }
    }
}
</script>

<style>

</style>