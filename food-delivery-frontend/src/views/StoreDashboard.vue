<template>
  <v-container fluid>
    <v-sheet color="#FCFCFC">
      <v-row>
        <v-col justify-self="center" class="text-center" cols="3">
          <v-row>
            <v-col>
              <v-avatar size="175" color="grey" class="mt-3">
                <img :src="account.avatarSource" alt="alt" />
              </v-avatar>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
              <div>{{ account.name }}</div>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn small>
                <v-icon small left>mdi-pencil</v-icon>
                <div>編輯用戶頭像</div>
              </v-btn>
            </v-col>
          </v-row>
          <v-row class="ma-3">
            <v-col>
              <storeFeatureList />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="9">
          <router-view class="mr-5" />
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script>
import storeFeatureList from "@/components/StoreDashboard/StoreFeatureList";

export default {
  name: "StoreDashboard",
  components: {
    storeFeatureList
  },
  data: () => {
    return {
      account: {
        name: "store name",
        avatarSource: "https://ui-avatars.com/api/?name=John+Doe&size=175"
      }
    };
  }
};
</script>

<style>
.border--black {
  border: 1px #d8d8d8 solid;
  border-radius: 5px;
}
</style>
