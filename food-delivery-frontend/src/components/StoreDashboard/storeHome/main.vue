<template>
  <v-container>
    <v-row class="todolist-container">
      <v-col cols="8" class="todolist-left-container">
        <v-row>To-do List</v-row>
        <v-row class="todolist-status">
          <v-col>Pending order</v-col>
          <v-col>Transport-Waiting</v-col>
          <v-col>Total order</v-col>
        </v-row>
        <v-row class="todolist-status">
          <v-col>Wait cancle order</v-col>
          <v-col>Cook-waiting</v-col>
          <v-col></v-col>
        </v-row>
        <v-row>Suggested feedback</v-row>
      </v-col>
      <v-col cols="4" class="todolist-right-container">
        <v-row>Order List</v-row>
      </v-col>
    </v-row>
    <v-row round class="btn-startmaking">
      <v-btn>開始製作餐點</v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
.todolist-container {
  min-height: 600px;
}
.btn-startmaking {
  float: right;
}
.todolist-status {
  margin: 2em;
}
</style>