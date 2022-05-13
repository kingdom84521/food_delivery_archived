<template>
    <v-container fluid>
        <v-row>
            <v-col cols="2">
                <v-sheet class="">
                    <v-row class="text-center">
                        <v-col>
                            <v-avatar class="avatar" size="150" >
                                <v-img src="../assets/logo.png"></v-img>
                            </v-avatar>
                        </v-col>
                    </v-row>
                    <v-row  class="text-center">
                        <v-col>
                            <v-list-item-subtitle>
                                Store Name
                            </v-list-item-subtitle>
                        </v-col>
                    </v-row>

                    <v-divider></v-divider>

                    <v-list dense nav>
                        <v-list-item v-for="item in items" :key="item.title" link :to="`/store/${item.route}`">
                            <v-list-item-icon>
                                <v-icon>{{ item.icon }}</v-icon>
                            </v-list-item-icon>

                            <v-list-item-content>
                                <v-list-item-title class="body-1">{{ item.title }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-sheet>
            </v-col>
            <v-col cols="10">
                <router-view/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        items: [
          { title: '帳戶編輯', icon: 'mdi-store', route: 'account' },
          { title: '菜單管理', icon: 'mdi-noodles', route: 'dish' },
          { title: '訂單管理', icon: 'mdi-format-list-bulleted', route: 'ordermanage' }
        //   { title: '通知', icon: 'mdi-bell', route: 'notify'}
        ]
    }),
    methods:{
        
    }
}

/* menu: {
    id: "",
    category: {
        name: "",
        special: [],
        item: [
            {
                name: "",
                price: "",
                nutrition: "",
                sp: ""
            }
        ]
    },
},
*/

</script>

<style>
    .avatar{
        border: thin solid darkgray;
    }
</style>