<template>
  <v-sheet
        class="ma-2 mt-3 pa-3 rounded"
        color="white"
        elevation="2"
    >
        <v-row justify="start">
            <v-col cols="2" class="ml-2">
                <div class="display-1">
                    親屬列表
                </div>
                <div class="grey--text text--lighten-2 mt-1">
                    在這裡管理您的親屬列表
                </div>
            </v-col>
        </v-row>
        <v-divider />
        <v-row no-gutters>
            <v-col>
                <v-sheet
                    elevation="2"
                    class="ma-2 mt-3 pa-3 rounded"
                >
                    <v-row class="mx-2" justify="space-between">
                        <v-col cols="6">
                            <v-text-field
                                prepend-icon="mdi-magnify"
                                hide-details
                            />
                        </v-col>
                        <v-col cols="6">
                            <div class="d-flex justify-end flex-row">
                                <v-btn text x-large color="success" @click="dialogDisplay = true">
                                    <v-icon left>
                                        mdi-plus
                                    </v-icon>
                                    <div>
                                        新增成員
                                    </div>
                                </v-btn>
                                <v-btn text x-large>
                                    <v-icon left>
                                        mdi-sort-variant
                                    </v-icon>
                                    <div>
                                        排序
                                    </div>
                                </v-btn>
                            </div>
                        </v-col>
                    </v-row>
                    <v-divider class="my-3" />
                    <v-row no-gutters>
                        <v-col 
                            cols="4"
                            :class="{ 'mb-2': !atLastRow() }" 
                            v-for="( person, index ) in relatives" 
                            :key="index"
                        >
                            <relative-block v-bind="person" @delete-self="deleteLocalElement( index )" />
                        </v-col>
                    </v-row>
                </v-sheet>
            </v-col>
        </v-row>
        <v-dialog
            v-model="dialogDisplay"
            max-width="40%"
        >
            <v-sheet>
                <v-row no-gutters>
                    <v-col class="pa-3">
                        <div class="display-1">
                            新增親屬表成員
                        </div>
                        <div class="title success--text text--lighten-2">
                            你可以在這裡為您的親屬關聯表新增成員
                        </div>
                        <v-divider class="my-3" />
                        <div class="mt-5 ml-1">
                            <div class="d-flex flex-row align-center mt-2">
                                <div class="headline" style="width: 18%;">
                                    姓名：
                                </div>
                                <div style="width: 50%;">
                                    <v-text-field
                                        v-model="dialogTextField.name"
                                        outlined
                                        hide-details
                                    />
                                </div>
                            </div>
                            <div class="d-flex flex-row align-center mt-2">
                                <div class="headline" style="width: 18%;">
                                    關係：
                                </div>
                                <div style="width: 50%;">
                                    <v-text-field
                                        v-model="dialogTextField.relationship"
                                        outlined
                                        hide-details
                                    />
                                </div>
                            </div>
                            <div class="d-flex flex-row align-center mt-2">
                                <div class="headline" style="width: 18%;">
                                    手機號碼：
                                </div>
                                <div style="width: 50%;">
                                    <v-text-field
                                        v-model="dialogTextField.phone"
                                        outlined
                                        hide-details
                                    />
                                </div>
                            </div>
                            <div class="d-flex flex-row align-center mt-2">
                                <div class="headline" style="width: 18%;">
                                    地址：
                                </div>
                                <div style="width: 50%;">
                                    <v-text-field
                                        v-model="dialogTextField.address"
                                        outlined
                                        hide-details
                                    />
                                </div>
                            </div>
                            <div class="d-flex flex-row justify-end mt-8">
                                <v-btn 
                                    large 
                                    color="success" 
                                    class="mr-2"
                                    @click="addNewMember"
                                >
                                    <div class="title">
                                        送出
                                    </div>
                                </v-btn>
                                <v-btn 
                                    large 
                                    color="error" 
                                    class="white--text"
                                    @click="dialogDisplay = false"
                                >
                                    <div class="title">
                                        取消
                                    </div>
                                </v-btn>
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </v-sheet>
        </v-dialog>
    </v-sheet>
</template>

<script>
import FakeRelatives from '@/assets/temp/relatives_list'
import RelativeBlock from './relativeBlock'

export default {
    components: {
        RelativeBlock
    },
    data: () => {
        return {
            relatives: [
            ],
            dialogDisplay: false,
            dialogTextField: {
                name: "",
                relationship: "",
                phone: "",
                address: ""
            }
        }
    },
    methods: {
        atLastRow( n ) {
            let length = this.relatives.length
            switch ( length % 3 )
            {
                case 0:
                    return n === length - 1 || n === length - 2 || n === length - 3
                case 1:
                    return n === length - 1 
                case 2:
                    return n === length - 1 || n === length - 2
            }
        },
        atLastColumn( n ) {
            return n % 3 === 2
        },
        deleteLocalElement( index ) {
            // this.relatives.splice( index, 1 )
            FakeRelatives.remove( index )
        },
        addNewMember() {
            // this.relatives.push( this.dialogTextField )
            FakeRelatives.add( this.dialogTextField )
            this.dialogDisplay = false
        }
    },
    watch: {
        dialogDisplay( value ) {
            if ( value ) {
                this.dialogTextField.name = ""
                this.dialogTextField.relationship = ""
                this.dialogTextField.phone = ""
                this.dialogTextField.address = ""
            }
        }
    },
    mounted() {
        this.relatives = FakeRelatives.read()
    }
}
</script>

<style>

</style>