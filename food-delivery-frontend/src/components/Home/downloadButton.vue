<template>
  <v-container fluid>
    <div class="d-flex justify-center">
        <v-btn
            v-if="isType( type ) === 'google'"
            height="90"
            width="350"
            class="px-3"
        >
            <div
                class="mr-2 d-flex justify-center align-center"
                style="width: 75px; height: 75px;"
            >
                <v-img
                    src="@/assets/google.png"
                    contain 
                />
            </div>
            <div 
                class="d-flex flex-column justify-center"
                style="width: 158px; height: 75px ;"
            >
                <div class="caption font-weight-black">
                    GET ANDROID APP AT
                </div>
                <div class="headline">
                    Google Play
                </div>
            </div>
        </v-btn>
        <v-btn
            v-else-if="isType( type ) === 'appstore'"
            color="black"
            height="90"
            width="350"
            class="px-3"
        >
            <div
                class="mr-2 pb-1 d-flex justify-center align-center"
                style="width: 75px; height: 75px;"
            >
                <v-img
                    src="@/assets/appstore.png"
                    contain 
                />
            </div>
            <div 
                class="d-flex flex-column justify-center"
                style="width: 158px; height: 75px;"
            >
                <div class="caption font-weight-black white--text">
                    GET IOS APP AT
                </div>
                <div class="headline white--text">
                    App Store
                </div>
            </div>
        </v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
    props: {
        type: String,
        link: String
    },
    methods: {
        isType( keyword ) {
             switch ( keyword ) {
                case "google":
                case "Google":
                    return "google"
                case "AppStore":
                case "Apple":
                case "appstore":
                    return "appstore" 
             }
        }
    }
}
</script>

<style>

</style>