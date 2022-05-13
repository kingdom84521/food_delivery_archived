<template>
  <v-app-bar
    app
    dark
    height="80"
    elevate-on-scroll
    :color="dynamicState( 'color' )"
  >
    <!-- Logo -->
    <div
      class="logo cursor-pointer row align-center ml-auto"
      style="max-width: 135px"
    >
      <router-link to="/home">
        <v-img
          :src="require('@/assets/logo.png')"
          max-height="64"
          max-width="40"
          contain
        />
      </router-link>
      <v-toolbar-title 
        @click="backToHome" 
        class="ml-2"
        :class="`${ dynamicState( 'text-color' ) }--text`"
      >
        食載有你
      </v-toolbar-title>
    </div>

    <div class="flex-grow-1"></div>

    <!-- Before sign in -->
    <v-toolbar-items 
      v-if="!isUserSignIn"
    >
      <v-btn text v-blur to="/signup">
        <v-icon
          left
          :class="`${ dynamicState( 'text-color' ) }--text`"
        >
          mdi-account-plus
        </v-icon>
        <div
          class="title"
          :class="`${ dynamicState( 'text-color' ) }--text`"
        >
          註冊
        </div>
      </v-btn>
      <v-btn 
        text 
        v-blur 
        class="d-none d-md-flex"
        @click="signinDialog( 'open' )"
      >
        <v-icon
          left
          :class="`${ dynamicState( 'text-color' ) }--text`"
        >
          mdi-login
        </v-icon>
        <div
          class="title"
          :class="`${ dynamicState( 'text-color' ) }--text`"
        >
          登入
        </div>
      </v-btn>
      <v-dialog
        v-model="signinDialogDisplay"
        max-width="500px"
      >
        <v-card class="px-2 pb-2">
          <v-row justify="space-around" no-gutters>
            <v-col>
              <v-card-title class="success--text">
                登入
              </v-card-title>
              <v-card-subtitle>
                請輸入您的用戶名及密碼
              </v-card-subtitle>
            </v-col>
            <v-col
              align-self="center"
              class="text-end mr-4"
            >
              <v-icon
                @click="signinDialog('close')"
              >
                mdi-close
              </v-icon>
            </v-col>
          </v-row>
          <v-divider class="mb-3"/>
          <v-text-field
            outlined
            hide-details
            label="用戶名"
            placeholder="請輸入您的用戶名或電子信箱"
            v-model="signinData.account"
            class="mb-3"
          />
          <v-text-field
            outlined
            hide-details
            label="密碼"
            placeholder="請輸入您的密碼"
            v-model="signinData.password"
            class="mb-3"
          />
          <v-row no-gutters justify="end" class="mt-6">
            <v-card-actions>
              <v-btn
                color="green"
                @click="signin()"
              >
                <v-icon
                  left
                  color="white"
                >
                  mdi-login
                </v-icon>
                <div
                  class="white--text"
                >
                  登入
                </div>
              </v-btn>
            </v-card-actions>
          </v-row>
        </v-card>
      </v-dialog>
    </v-toolbar-items>
    <!-- After sign in -->
    <v-menu 
      v-else
      bottom
      left
      offset-y
      content-class="dropdown-menu"
      transition="slide-y-transition"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          dark
          icon
          v-on="on"
        >
            <v-avatar
              color="grey lighten-1"
              size="40"
            >
              <img 
                v-if="user.img"
                :src="user.img"
              >
              <v-icon v-else>mdi-account</v-icon>
            </v-avatar>
        </v-btn>
      </template>
      <!-- User dropdown menu -->
      <v-card>
        <v-list
          flat
          nav
        >
          <v-list-item>
            <v-list-item-content class="ml-1">
              <v-list-item-title> {{ user.name }} </v-list-item-title>
              <v-list-item-subtitle class="pb-1"> {{ user.email }} </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider />
          
          <v-list-item-group
            color="green"
            v-model="featureChoose"
          >
            <v-list-item 
              v-for="(item ,i) in features"
              :key="i"
            >
              <v-list-item-icon>
                <v-icon> {{ item.icon }} </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <router-link tag="label" :to="item.link"> {{ item.name }} </router-link>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="signout">
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <div>
                  Sign out
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script>
  export default {

    data:() => ({
      signinDialogDisplay: false,
      featureChoose: null,
      signinData: {
        account: "",
        password: ""
      },
      features: [
        {
          name: '訂單',
          icon: 'mdi-food',
          link: '/cashout',
        },
        {
          name: '歷史紀錄',
          icon: 'mdi-history',
          link: '/dashboard/purchase/all',
        },
        {
          name: '個人資料',
          icon: 'mdi-account-cog',
          link: '/dashboard/account',
        },
        {
          name: "客服中心",
          icon: "mdi-help-circle",
          link: "help"
        }
      ],
    }),
    props: {
      user: {
        type: Object
      }
    },
    methods: {
      signout() {
        alert("使用者登出");
        this.$emit( "user-signout" );
      },
      signin() {
        var loginData = {
          account: this.signinData.account,
          password: this.signinData.password
        }

        // backend communication
        this.$emit( "user-signin", loginData ) // need return user data pack !
        this.signinDialog( "close" );
      },
      signinDialog( action ) {
        if ( action === "close" )
        {
          this.signinDialogDisplay = false
        }
        else {
          this.signinData.account = ""
          this.signinData.password = ""
          this.signinDialogDisplay = true
        }
      },
      backToHome() {
        if ( this.$router.currentRoute.fullPath !== "/home" )
        {
          this.$router.push("/home")
        }
        else {
          return 
        }
      },
      at( position ) {
          return this.$route.fullPath.startsWith( `/${ position }` )
      },
      dynamicState( attr ) {
        switch ( attr ) {
          case "color":
            return this.at( "home" ) ? "#FAFAFA" : "green"
          case "text-color":
            return this.at( "home" ) ? "black" : "white"
        }
      }
    },
    computed: {
      isUserSignIn() {
        return this.user;
      }
    }
  }
</script>

<style>
  .cursor-pointer {
    cursor: pointer
  }
</style>
