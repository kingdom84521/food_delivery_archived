<template>
  <v-row class="mt-n4 pb-0">
    <v-col cols="2" class="pr-0 title">
      營養成分：
    </v-col>
    <template
      v-for="(item, name, index) in nutritionList"
    >
      <v-col
        v-if="index%nutrition_one_line === 0  && index !== 0"
        :key="index+'_pre_space'"
        class="pa-0 title"
        cols="2"
      />
      <v-col 
        :key="index+'_item'"
        :cols="nutrition_space"
        class = "title"
      >
        <v-row no-gutters>
          <v-col cols="6">
            {{ nutrition_name.nutrition[name].chinese_name }}
          </v-col>
          <v-col class="text-end">
            {{ `${ typeof(item) === 'object' ? item.total : item }` }}
          </v-col>
          <v-col>
            {{ getNutritionUnitName( name ) }}
          </v-col>
        </v-row>
      </v-col>
      <v-col
        v-if="index%nutrition_one_line === nutrition_one_line - 1"
        :key="index+'_last_space'"
        :cols="lastSpace()"
        class="pa-0"
      />
    </template>
  </v-row>
</template>

<script>
import NutritionName from '@/assets/temp/nutrition_name.json';

export default {
  props: {
    nutritionList: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    nutrition_name: {},
    nutrition_space: 4,
    nutrition_one_line: 3
  }),
  methods: {
    lowestPrice( variations ) {
      return this._.minBy( variations, variation => { return variation.price } );
    },
    lastSpace() {
      let one_line = this.nutrition_one_line;
      let one_space = this.nutrition_space;

      let last_extra_space = 10 - (one_line * one_space);
      if ( last_extra_space < 0 ) {
        this.nutrition_space = Math.floor(10 / one_line);
        last_extra_space = 10 - (one_line * one_space);
      }
      return last_extra_space;
    },
    nutritionClass( index ) {
      let class_type = 'title ';
      if ( index%this.nutrition_one_line === 0 ) {
        class_type += 'ml-n9';
      } else {
        class_type += 'ml-n7';
      }
      if ( index > this.nutrition_one_line-1 ) {
        class_type += ' ' + 'mt-n4';
      }
      return class_type;
    },
    getNutritionUnitName( name ) {
      let unit = this.nutrition_name.unit;
      let unit_index = this.nutrition_name.nutrition[name].unit_index;
      return unit[ unit_index ];
    }
  },
  created() {
    this.nutrition_name = NutritionName;
  }
}
</script>