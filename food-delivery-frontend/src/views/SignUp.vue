<template>
    <v-container fluid>
        <step :now="now" @step-change="goToPage( $event )" />
        <step-page :now="now" @finish="finishHandler($event)" @next-step="goToPage( $event )" @previous-step="goToPage( $event )" />
    </v-container>
</template>

<script>
import step from '@/components/SignUp/Step/main.vue'
import stepPage from '@/components/SignUp/StepPage/main.vue'

export default {
    components: {
        step,
        stepPage
    },
    data: () => ({
        now: null
    }),
    created() {
        // Data Initialize
        this.now = 0
    },
    methods: {
        goToPage( now ) {
            if ( now <= 0 )
            {
                this.now = 0
            }
            else if ( now >= 3 )
            {
                this.now = 3
            }
            else
            {
                this.now = now
            }
        },
        finishHandler( data ) {
            const field = [ 
                "account",
                "password",
                "name",
                "email",
                "phone",
                "birth"
            ]
            data = this._.pick( data, field );
            console.log(data);
            this.$axios.post( "/api/v1/users/register", data )
                .then((result)=>{
                    //
                    console.log(result);
                    this.$router.push("/home")
                })
                .catch((err)=>{console.log(err);})
        }
    }
}
</script>