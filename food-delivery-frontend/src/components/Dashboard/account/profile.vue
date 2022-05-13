<template>
    <v-sheet
        class="ma-2 mt-3 pa-3 rounded"
        color="white"
        elevation="2"
    >
        <v-row justify="space-between">
            <v-col cols="2" class="ml-2">
                <div class="display-1">
                    個人簡介
                </div>
                <div class="grey--text text--lighten-2 mt-1">
                    在這裡編輯您的個人資訊
                </div>
            </v-col>
            <v-col
                cols="1"
                align-self="center"
                class="mr-5"
            >
                <v-btn 
                    x-large
                    rounded
                    color="#FAFAFA"
                    @click="updateInformation"
                >
                    儲存資訊
                </v-btn>
            </v-col>
        </v-row>
        <v-divider />
        <v-row class="pl-2">
            <v-col cols="7">
                <v-row v-for="( element, index ) in textFieldData" :key="index">
                    <v-col cols="2" align-self="center">
                        <div class="title">
                            {{ element.label }}：
                        </div>
                    </v-col>
                    <v-col cols="9">
                        <v-text-field
                            outlined
                            hide-details
                            v-model="element.data"
                        />
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-sheet>
</template>

<script>
export default {
    data: () => {
        return {
            textFieldData: [
                {
                    label: "姓名",
                    data: "黃耑霖"
                },
                {
                    label: "電子信箱",
                    data: ""
                },
                {
                    label: "手機號碼",
                    data: "0910809449"
                },
                {
                    label: "生日",
                    data: "87/8/7"
                },
                {
                    label: "地址",
                    data: "360苗栗縣苗栗市天雲街1巷1號"
                }
            ]
        }
    },
    methods: {
      setUserData() {
        const data = {
          name: "姓名",
          email: "電子信箱",
          phone: "手機號碼",
          birth: "生日",
          address: "地址"
        };

        let data_template = {
          label: "",
          data: ""
        };

        this.textFieldData = [];
        const user = this.$store.state.user;
        this._.forEach(data, (value, key) => {
          data_template.label = value;
          if ( key === "birth" ) {
            data_template.data = user[ key ].split("T")[0].split("-").join("/");
          } else {
            data_template.data = user[ key ];
          }
          this.textFieldData.push({ ...data_template });
        });
         
      },
      updateInformation() {
          let confirmed = confirm("確定儲存嗎？")
          if ( confirmed ) {
              console.log( "upload" )
          }
      }
    },
    created() {
      this.setUserData();
    }
}
</script>

<style>
    .rounded {
        border-radius: 5px
    }
</style>