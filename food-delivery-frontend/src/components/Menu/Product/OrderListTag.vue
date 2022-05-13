<template>
    <!--<span v-for="TagElement in TagList">
        {{TagElement.Tag}}
    </span> -->
    <p>店家未給予標籤</p>
</template>

<script>
export default {
    data:()=>({
        TagList:[{Tag:"店家未給標籤"}],
    }),

    methouds:{

    },

    mounted(){
        //this.order = axios.get();
        this.TagList =[{Tag:"義式"},
                       {Tag:"義大利麵"}] ;
    },
}
</script>