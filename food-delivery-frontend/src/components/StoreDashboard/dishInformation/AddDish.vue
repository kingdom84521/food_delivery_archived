<template>
  <v-container>
    <v-row>
      <v-col cols="2">
        <v-img contain src="https://via.placeholder.com/100" />
      </v-col>
      <v-col>
        <v-row>
          <v-btn>Change photo</v-btn>
        </v-row>
        <v-row>File size:1MB at most</v-row>
        <v-row>File stint:JPEG、PNG</v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="5">
        <v-row>
          Dish name：
          <v-text-field dense single-line outlined></v-text-field>
        </v-row>
        <v-row>
          Dish information：
          <v-textarea outlined></v-textarea>
        </v-row>
        <v-row>
          Dish tag：
          <v-text-field dense single-line outlined></v-text-field>
        </v-row>
      </v-col>
      <v-col cols="1"></v-col>
      <!-- <v-spacer></v-spacer> -->
      <v-col cols="5">
        <v-row>
          Nutrient：
          <v-col>
            <v-row>
              <v-col>全穀根莖類</v-col>
              <v-col>
                <v-text-field dense single-line outlined></v-text-field>
              </v-col>
              <v-col>碗</v-col>
            </v-row>
            <v-row>
              <v-col>蔬菜類</v-col>
              <v-col>
                <v-text-field dense single-line outlined></v-text-field>
              </v-col>
              <v-col>份</v-col>
            </v-row>
            <v-row>
              <v-col>蛋豆魚肉類</v-col>
              <v-col>
                <v-text-field dense single-line outlined></v-text-field>
              </v-col>
              <v-col>份</v-col>
            </v-row>
            <v-row>
              <v-col>油脂與堅果</v-col>
              <v-col>
                <v-text-field dense single-line outlined></v-text-field>
              </v-col>
              <v-col>茶匙</v-col>
            </v-row>
            <v-row>
              <v-col>水果類</v-col>
              <v-col>
                <v-text-field dense single-line outlined></v-text-field>
              </v-col>
              <v-col>份</v-col>
            </v-row>
            <v-row>
              <v-col>乳製品</v-col>
              <v-col>
                <v-text-field dense single-line outlined></v-text-field>
              </v-col>
              <v-col>杯</v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="btn-menu">
      <v-btn>新增菜單資訊</v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
.btn-menu {
  float: right;
}
</style>