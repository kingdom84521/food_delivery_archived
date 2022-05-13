<template>
  <v-app>
    <Header 
      :user="user" 
      @user-signout="signoutHandler" 
      @user-signin="signinHandler"
    />

    <v-content>
      <router-view/>
    </v-content>

    <Footer></Footer>
  </v-app>
</template>

<script>
  import Header from './components/Header'
  import Footer from './components/Footer'
  import { mapGetters } from 'vuex';

  export default {
   name: 'App',
   components: {
     Header,
     Footer
   },
   data:() => ({
     user: null,
   }),
   methods: {
    signinHandler( account ) {
      this.getUserToken( account );

      // if ( this.$router.currentRoute.fullPath !== "/home" )
      // {
      //   this.$router.push( "/home" )
      // }
    },
    signoutHandler() {
      this.user = null ;
      this.$store.dispatch('user/signout');
      window.localStorage.removeItem("token");

      if ( this.$router.currentRoute.fullPath !== "/home" )
      {
        this.$router.push( "/home" )
      }
    },
    checkUserState() {
      var tokenTaker = window.localStorage.getItem("token");
      // console.log( tokenTaker );
      if ( tokenTaker ) {
        this.getUserData( tokenTaker );
      } else {
        this.signoutHandler();
      }
    },
    callBackEnd( url, data ) {
      return this.$axios({
        method: 'POST',
        url,
        data
      });
    },
    async getUserToken( account ) {
      try {
        const result = await this.callBackEnd('/api/v1/session/login', account);
        let response = result.data;
        if ( response.success ) {
          window.localStorage.setItem("token", response.payload);
          this.getUserData( response.payload, true );
        } else {
          alert("帳號不存在或密碼錯誤");
          // alert( response.payload );
        }
      } catch ( err ) {
        alert("伺服器出現錯誤:" + err);
      }
    },
    async getUserData( token, showSuccess = false ) {
      try {
        const result = await this.callBackEnd('/api/v1/users/', { token });
        let response = result.data;
        if ( response.success ) {
          this.$store.dispatch('user/signin', response.payload);
          if ( showSuccess ) {
            alert("歡迎回來 : " + response.payload.name);
          }
          this.user = this.userData;
        } else {
          alert( response.payload );
        }
      } catch ( err ) {
        let response = err.response.data;
        if ( !response.success && response.error == "authentication_failed" ) {
          // console.log( response );
          alert("授權已過期，請重新登入");
          this.signoutHandler();
          return;
        }
        alert("伺服器出現錯誤:" + err);
      }
    }
  },
  computed: {
    ...mapGetters('user', {
      userData: 'getUserData'
    }),
  },
  created() {
    this.checkUserState();
  }
  };
</script>

<style>
  * {
    font-family: 'Noto Sans TC', sans-serif ;
  }
</style>
