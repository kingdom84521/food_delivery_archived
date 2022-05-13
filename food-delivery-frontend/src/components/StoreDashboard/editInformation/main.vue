<template>
  <v-container>
    <v-row class="display-2">店家資訊</v-row>
    <v-row class="title"> 在這裡瀏覽並編輯您的店家資訊</v-row>
    <v-row>
      <v-col cols="10">
        <v-row>
          <v-col cols="4">店名：</v-col>
          <v-col cols="5">
            <v-text-field dense single-line outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">店址：</v-col>
          <v-col cols="5">
            <v-text-field dense single-line outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">營業時間：</v-col>
          <v-col cols="3">
            <v-text-field type="time" dense single-line outlined v-model="open"></v-text-field>
          </v-col>
          <span>～</span>
          <v-col cols="3">
            <v-text-field type="time" dense single-line outlined v-model="close"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">店家簡介</v-col>
          <v-col cols="7">
            <v-textarea outlined></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">封面</v-col>
          <v-col cols="3">
            <v-img contain src="https://via.placeholder.com/100" />
          </v-col>
          <v-col cols="4">
            <v-row>
              <v-btn>Change photo</v-btn>
            </v-row>
            <v-row>File size:1MB at most</v-row>
            <v-row>File stint:JPEG、PNG</v-row>
          </v-col>
        </v-row>
        <v-row align="end" justify="end">
          <v-btn>編輯儲存</v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    open: "",
    close: ""
  }),
  computed: {
    
  },
  methods: {

  }
}
</script>