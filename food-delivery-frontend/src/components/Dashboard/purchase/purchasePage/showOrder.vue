<template>
    <v-sheet class ="mx-auto" max-width="360" outlined>
         <div v-for="(element, index) in DishOrder" class="title" :key="index">
            {{element.name}} * {{element.amount}} 份
         </div>
    </v-sheet>
</template>

<script>
export default {
    data:()=>({
        showMenu:false,
        x:0,
        y:0,
        DishOrder:[]
    }),

    methods:{
        show(e){
            e.preventDefault();
            this.x = e.clientX;
            this.y - e.clientY;
            this.$nextTick(()=>{
                this.showMenu = true;
            })
        },
    },

    mounted() {
        //this.order = this.$axios.get();
        this.DishOrder =[{name:"義式奶油義大利麵" , amount:"1"},
                         {name:"綜合莓果飲", amount:"1"}]
    },
}
</script>


