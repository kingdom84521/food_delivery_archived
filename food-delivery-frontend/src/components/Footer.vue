<template>
  <v-card 
    color="transparent"
    height="auto"
    flat
  >
    <v-footer
      padless
    >  
    <v-row
      cols="12"
      justify="center"
    >
      <v-col 
        v-for="(feature,i) in features"
        :key="i"
        cols="auto"
      >
        <router-link tag="ul" class="px-0" :to="feature.link"> {{ feature.name }} </router-link>
      </v-col>
      <v-col cols="auto">
        &copy;{{ new Date().getFullYear() }} — 食載有你
      </v-col>
    </v-row>
    </v-footer>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      features: [
        {
          name: 'Help & Support',
          link: '/Support'
        },
        {
          name: 'Terms',
          link: '/about'
        },
        {
          name: 'Privacy',
          link: '/privacy'
        },
      ],
    }),
  }
</script>