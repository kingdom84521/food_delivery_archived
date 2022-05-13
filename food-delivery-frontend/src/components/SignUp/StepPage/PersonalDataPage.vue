<template>
  <v-container fluid>
    <v-row>
      <v-card outlined class="col-12">
        <v-row
         justify="center"
        >
          <v-card class="col-6">
            <v-list
              dense
            >
              <v-list-item>
                <v-row no-gutters>
                  <v-list-item-content>
                    <v-col
                      cols="4"
                    >
                      <v-list-item-title
                        class="noto-family"
                      >
                        <v-row
                          justify="center"
                        >
                          <v-icon
                            left
                          >
                            mdi-account-tie
                          </v-icon>
                          <span
                            class="title"
                          >
                            真實姓名
                          </span>
                        </v-row>
                      </v-list-item-title>
                    </v-col>
                    <v-col
                      cols="7"
                    >
                      <v-text-field
                        label="請輸入您的姓氏"
                        filled
                        v-model="partUser.lastName"
                        @blur="dataPush()"
                      />
                      <v-text-field
                        label="請輸入您的名字"
                        filled
                        v-model="partUser.firstName"
                        @blur="dataPush()"
                      />
                    </v-col>
                  </v-list-item-content>
                </v-row>
              </v-list-item>
              <v-divider />
              <v-list-item>
                <v-row no-gutters>
                  <v-list-item-content>
                    <v-col
                      cols="4"
                    >
                      <v-list-item-title
                        class="noto-family"
                      >
                        <v-row
                          justify="center"
                        >
                          <v-icon
                            left
                          >
                            mdi-cake
                          </v-icon>
                          <span
                            class="title"
                          >
                            生日
                          </span>
                        </v-row>
                      </v-list-item-title>
                    </v-col>
                    <v-col
                      cols="7"
                      class="mt-3"
                    >
                      <v-row
                        class="pt-1"
                      >
                        <v-col
                          cols="5"
                        >
                          <v-sheet
                            class="title text-center pt-2"
                            height="45"
                            color="grey lighten-1 white--text"
                          >
                            <div class="">
                              {{ birthdayDisplay }}
                            </div>
                          </v-sheet>
                        </v-col>
                        <v-col
                          cols="7"
                        >
                          <v-menu
                            ref="birthdayPopup"
                            v-model="menuDisplay"
                            right
                            offset-x
                            nudge-right="5"
                            :close-on-content-click="false"
                            :return-value.sync="partUser.birth"
                          >
                            <template v-slot:activator="{ on }">
                              <v-btn
                                color="primary darken-2 subtitle-1"
                                v-on="on"
                                block
                                large
                              >
                                點擊按鈕選擇日期
                              </v-btn>
                            </template>
                            <v-date-picker
                              ref="birthdayPicker"
                              no-title
                              scrollable
                              locale="zh-tw"
                              :first-day-of-week="0"
                              :max="new Date().toISOString().substr( 0, 10 )"
                              v-model="partUser.birth"
                              @change="birthdayUpdate"
                            />
                          </v-menu>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-list-item-content>
                </v-row>
              </v-list-item>
              <v-divider />
              <v-list-item>
                <v-row no-gutters>
                  <v-list-item-content>
                    <v-col
                      cols="4"
                    >
                      <v-list-item-title>
                        <v-row
                          justify="center"
                        >
                          <v-icon
                            left
                          >
                            mdi-home-city
                          </v-icon>
                          <span
                            class="title"
                          >
                            地址
                          </span>
                        </v-row>
                      </v-list-item-title>
                    </v-col>
                    <v-col
                      cols="7"
                    >
                      <v-text-field
                        label="請輸入您的地址"
                        filled
                        v-model="partUser.address"
                        @blur="dataPush()"
                      />
                    </v-col>
                  </v-list-item-content>
                </v-row>
              </v-list-item>
              <v-divider />
              <v-list-item>
                <v-row no-gutters>
                  <v-list-item-content>
                    <v-col
                      cols="4"
                    >
                      <v-list-item-title>
                        <v-row
                          justify="center"
                        >
                          <v-icon
                            left
                          >
                            mdi-cellphone-text
                          </v-icon>
                          <span
                            class="title"
                          >
                            電話號碼
                          </span>
                        </v-row>
                      </v-list-item-title>
                    </v-col>
                    <v-col
                      cols="7"
                    >
                      <v-text-field
                        label="請輸入您的電話號碼"
                        filled
                        v-model="partUser.phone"
                        @blur="dataPush()"
                      />
                    </v-col>
                  </v-list-item-content>
                </v-row>
              </v-list-item>
              <v-divider />
              <v-list-item>
                <v-row no-gutters>
                  <v-list-item-content>
                    <v-col
                      cols="4"
                    >
                      <v-list-item-title>
                        <v-row
                          justify="center"
                        >
                          <v-icon
                            left
                          >
                            mdi-email-multiple
                          </v-icon>
                          <span
                            class="title"
                          >
                            電子信箱
                          </span>
                        </v-row>
                      </v-list-item-title>
                    </v-col>
                    <v-col
                      cols="7"
                    >
                      <v-text-field
                        label="請輸入您的電子信箱"
                        filled
                        v-model="partUser.email"
                        @blur="dataPush()"
                      />
                    </v-col>
                  </v-list-item-content>
                </v-row>
              </v-list-item>
            </v-list>
          </v-card>
        </v-row>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => {
      return {
        partUser: {
          lastName: undefined,
          firstName: undefined,
          birth: undefined,
          address: undefined,
          phone: undefined,
          email: undefined
        },
        menuDisplay: false
      }
    },
    methods: {
      dataPush() {
        this.partUser = this._.assign( this.partUser, this.fullName )
        console.log(this.partUser);
        this.$emit( "data-change", this.partUser )
        
      },
      async birthdayUpdate( birthday ) {
        await this.$refs.birthdayPopup.save( birthday )

        this.menuDisplay = false
      }
    },
    computed: {
      fullName() {
        var answer = {
          name: this.partUser.lastName + this.partUser.firstName
        }
        return answer
      },
      birthdayDisplay() {
        return this._.isUndefined( this.partUser.birthday ) ? "尚未選擇" : this.partUser.birthday
      }
    },
    watch: {
      async menuDisplay( value ) {
        if ( await value ) {
          this.$refs.birthdayPicker.activePicker = "YEAR"
        }
      }
    }
  }
</script>