<template>
    <div>
        <v-row>
            <v-col>
                <v-tabs
                    grow
                    slider-size="3"
                    slider-color="success"
                    height="50"
                    color="success"
                    class="border--black"
                    v-model="nowTab"
                >
                    <v-tab
                        v-for="( title, index ) in [ '全部', '未來', '進行中', '完成', '取消' ]"
                        :key="`title-${ index }`"
                        class="title"
                        @click="toPage( index )"
                    >
                        {{ title }}
                    </v-tab>
                </v-tabs>
            </v-col>
        </v-row>
        <router-view />
    </div>
</template>

<script>
export default {
    data: () => {
        return {
            nowTab: 0
        }
    },
    methods: {
        toPage( index ) {
            if ( this.nowTab === index )
            {
                return ;
            }
            else {
                var type

                switch ( index )
                {
                    case 0:
                        type = "all"
                        break
                    case 1:
                        type = "future"
                        break
                    case 2:
                        type = "ongoing"
                        break
                    case 3:
                        type = "done"
                        break
                    case 4:
                        type = "cancel"
                        break
                }
            }
            this.$router.push( { path: `/dashboard/purchase/${ type }` } )
        }
    },
    mounted() {
        switch ( this.$route.params.type )
        {
            case "all":
                this.nowTab = 0
                break
            case "future":
                this.nowTab = 1
                break
            case "ongoing":
                this.nowTab = 2
                break
            case "done":
                this.nowTab = 3
                break
            case "cancel":
                this.nowTab = 4
                break
        }
    }
}
</script>

<style>

</style>