<template>
  <v-card
    tile
    outlined
    width="300"
  >
    <v-container class="pt-0 border border-all">
      <v-row class="border border-bottom">
        <v-col class="text-center pa-0 py-1">
          營養標示
        </v-col>
      </v-row>
      <v-row class="border border-bottom">
        <v-col cols="3" class="pa-0">
          每一份量
        </v-col>
        <v-col cols="2" class="pa-0 px-1 text-end">
          {{ nutrition.serving_size }}
        </v-col>
        <v-col cols="7" class="pa-0">
          {{ `${nutrition.unit_type === "weight" ? "公克" : "毫升" }` }}
        </v-col>
        <v-col cols="3" class="pa-0">
          本產品含
        </v-col>
        <v-col cols="2" class="pa-0 px-1 text-end">
          {{ nutrition.serving_per_container }}
        </v-col>
        <v-col cols="7" class="pa-0">
          份
        </v-col>
      </v-row>
      <v-row class="border border-bottom">
        <v-col cols="5" class="pa-0" />
        <v-col cols="3" class="pa-0 pr-1 text-end">
          每份
        </v-col>
        <v-col cols="4" class="pa-0 pr-3 text-end">
          每100{{ `${nutrition.unit_type === "weight" ? "公克" : "毫升" }` }}
        </v-col>
      </v-row>
      <v-row
        v-for="(item, item_name, item_index) in nutrition.nutrition_facts"
        :key="item_index"
      >
        <template v-if="typeof(item) !== 'object'">
          <v-col cols="4" class="pa-0">
            {{ nutrition_name[ item_name ].name }}
          </v-col>
          <v-col cols="4" class="pa-0 pr-1 text-end">
            {{ item + nutrition_name[ item_name ].unit.ch }}
          </v-col>
          <v-col cols="4" class="pa-0 pr-3 text-end">
            {{ everyHundredGram(nutrition.serving_size, item) + nutrition_name[ item_name ].unit.ch }}
          </v-col>
        </template>
        <template v-else>
          <v-col cols="4" class="pa-0">
            {{ nutrition_name[ item_name ].name }}
          </v-col>
          <v-col cols="4" class="pa-0 pr-1 text-end">
            {{ item.total + nutrition_name[ item_name ].unit.ch }}
          </v-col>
          <v-col cols="4" class="pa-0 pr-3 text-end">
            {{ everyHundredGram(nutrition.serving_size, item.total) + nutrition_name[ item_name ].unit.ch }}
          </v-col>
          <template
            v-for="(item_child, item_child_name, item_child_index) in item"
          >
            <template
              v-if="item_child_name !== 'total'"
            >
              <v-col cols="4" class="pa-0 pl-4" :key="item_child_index+'_name'">
                {{ nutrition_name[ item_child_name ].name }}
              </v-col>
              <v-col cols="4" class="pa-0 pr-1 text-end" :key="item_child_index+'_toal'">
                {{ item_child + nutrition_name[ item_child_name ].unit.ch }}
              </v-col>
              <v-col cols="4" class="pa-0 pr-3 text-end" :key="item_child_index+'_hundred_gram'">
                {{ everyHundredGram(nutrition.serving_size, item_child) + nutrition_name[ item_child_name ].unit.ch }}
              </v-col>
            </template>
          </template>
        </template>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import NutritionName from '@/assets/temp/nutrition_name.json';

export default {
  name: "NutritionTable",
  props: {
    nutrition: {
      type: Object,
      default: () => ({
        id: 800001,
        serving_size: 375,
        serving_per_container: 1,
        unit_type: "weight",
        nutrition_facts: {
          calories: 514,
          protein: 22.1,
          fat: {
            total: 12.0,
            saturated_fat: 3.8,
            trans_fatty_acid: 0.0
          },
          carbohydrates: {
            total: 79.5,
            sugars: 0.0
          },
          sodium: 1065
        }
      })
    }
  },
  data: () => ({
    nutrition_name: {}
  }),
  methods: {
    everyHundredGram( total , item ) {
      return Math.round(item * 1000 / total) / 10;
    }
  },
  created() {
    let unit = NutritionName.unit;
    this._.forEach(NutritionName.nutrition, (value, key) => {
      // console.log( key , value );
      this._.set(this.nutrition_name, [key, 'name'], value.chinese_name);
      let unit_type = unit[value.unit_index];
      this._.set(this.nutrition_name, [key, 'unit', 'ch'], unit_type.chinese_name);
      this._.set(this.nutrition_name, [key, 'unit', 'en'], unit_type.abbreviation);

      if ( this._.size(value.children) !== 0 ) {
        this._.forEach(value.children, (child_value, child_key) => {
          this._.set(this.nutrition_name, [child_key, 'name'], child_value.chinese_name);
          let child_unit_type = unit[child_value.unit_index];
          this._.set(this.nutrition_name, [child_key, 'unit', 'ch'], child_unit_type.chinese_name);
          this._.set(this.nutrition_name, [child_key, 'unit', 'en'], child_unit_type.abbreviation);
        });
      }
    });
  }
}
</script>

<style>
.border {
  border: black 2px solid;
}
.border-all {
  border-style: solid;
}
.border-bottom {
  border-style: none none solid none;
}
</style>