<template>
    <v-container>
        <v-form ref="form" v-model="valid">
            <v-sheet class="display-1 mb-5 text-center green accent-2">餐廳資料</v-sheet>
            <v-text-field clearable outlined label="餐廳名稱" v-model="restaurant" :rules="[rules.require]"></v-text-field>
            <v-row>
                <v-select outlined label="所在城市" v-model="city" :items="item" :rules="[rules.require]"></v-select>
                <v-text-field outlined label="郵遞區號" v-model="postno" :rules="[rules.require, rules.num]"></v-text-field>
            </v-row>
            <v-text-field clearable outlined label="餐廳地址" v-model="address" :rules="[rules.require]"></v-text-field>
            <v-row>
                <v-text-field outlined v-model="open" label="開店時間" :rules="[rules.require, rules.time]" placeholder="例: 08:30"></v-text-field>
                <v-text-field outlined v-model="close" label="打烊時間" :rules="[rules.require, rules.time]" placeholder="例: 17:00"></v-text-field>
            </v-row>
            

            <v-sheet class="display-1 mt-10 mb-5 text-center green accent-2">聯絡人資料</v-sheet>
            <v-row>
                <v-text-field outlined label="姓氏" :rules="[rules.require]"></v-text-field>
                <v-text-field outlined label="名字" :rules="[rules.require]"></v-text-field>
            </v-row>
            <v-text-field clearable outlined label="連絡電話" v-model="phone" :rules="[rules.require, rules.num]"></v-text-field>
            <v-text-field clearable outlined label="電子郵件" v-model="email" :rules="[rules.require, rules.email]"></v-text-field>

            <v-divider class="mb-5 mt-10"></v-divider>
            <v-row justify="center">
                <v-btn class="green accen-3 white--text title" @click="Submit()">送 出</v-btn>
            </v-row>
        </v-form>
    </v-container>
</template>
<script>
export default {
    data: () =>({
        restaurant: "",
        address: "",
        postno: "",
        phone: "",
        email: "",
        open: "",
        close: "",
        city: "",
        item: ["新北市", "台北市", "台中市", "高雄市"],
        valid: true,
        rules: { require: value => !!value || "此欄位不可為空!",
                 num: value => /\d/.test(value) || "填寫錯誤!",
                 email: value => /.+@.+/.test(value) || "填寫錯誤!",
                 time: value => /\d{2}\:{1}\d{2}/.test(value) || "填寫錯誤!"
               }
    }),
    methods:{
        Submit(){
            if (this.valid){
                console.log(this.restaurant, this.address, this.address, this.postno, this.phone, this.email, this.open, this.close);
                console.log(this.city)
            }
            else{
                console.log("Valid Error:", this.valid)
            }
        }
    }
}
</script>