<template>
    <v-dialog
        v-model="dialogDisplay"
        max-width="35%"
    >
        <template v-slot:activator="{ on }">
            <v-sheet
                elevation="2"
                class="w-100 pa-2"
                width="99%"
                v-on="on"
                v-ripple="{ 'center': true }"
            >
                <v-row no-gutters>
                    <v-col cols="4">
                        <v-img
                            max-height="100"
                            max-width="100"
                            src="https://via.placeholder.com/100"
                        />
                    </v-col>
                    <v-col cols="8">
                        <div class="headline d-flex align-center">
                            {{ name }}
                            <span class="ml-2">
                                <v-chip pill>{{ relationship }}</v-chip>
                            </span>
                        </div>
                    </v-col>
                </v-row>
            </v-sheet>
        </template>
        <v-sheet
            color="white"
            class="pa-3"
        >
            <v-row no-gutters>
                <v-col cols="3">
                    <v-img
                        max-height="100"
                        max-width="100"
                        src="https://via.placeholder.com/100"
                    />
                </v-col>
                <v-col cols="9">
                    <v-row no-gutters justify="space-between">
                        <v-col cols="4">
                            <div class="headline">
                                姓名：{{ name }}
                            </div>
                        </v-col>
                        <v-col cols="1">
                            <v-icon
                                @click="dialogDisplay = false"
                            >
                                mdi-close
                            </v-icon>
                        </v-col>
                    </v-row>
                    <div class="headline">
                        關係：{{ relationship }}
                    </div>
                    <v-divider class="my-2" />
                    <div>
                        電話：{{ phone }}
                    </div>
                    <div>
                        地址：{{ address }}
                    </div>
                    <br>
                    <div class="d-flex justify-end flex-row">
                        <v-icon
                            large
                            color="white"
                            class="error pa-1 rounded"
                            @click="deleteEvent"
                        >
                            mdi-trash-can-outline
                        </v-icon>
                    </div>
                </v-col>
            </v-row>
        </v-sheet>
    </v-dialog>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true
        },
        relationship: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        }
    },
    data: () => {
        return {
            dialogDisplay: false,
        }
    },
    methods: {
        deleteEvent() {
            let confirmed = confirm("確定刪除嗎？\n刪除之後將會無法回復！")
            if ( confirmed ) {
                console.log( "delete element" )
                this.$emit("delete-self")
                this.dialogDisplay = false
            }
        }
    }
}
</script>

<style>
  .rounded {
      border-radius: 5px
  }
</style>