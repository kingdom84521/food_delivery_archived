<template>
    <v-list>
        <v-subheader class="overline">features</v-subheader>
        <v-divider class="mb-2" />
        <template v-for="( element, index ) in features">
            <v-list-group 
                v-if="element.type === 'group'"
                :key="`${ index }-group`"
                :value="childIsActive( element )"
                
            >
                <template v-slot:activator>
                    <v-list-item-icon>
                        <v-icon
                            :color="element.iconColor"
                        >
                            {{ element.icon }}
                        </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content class="text-start headline">
                        <v-list-item-title class="title">
                            {{ element.title }}
                        </v-list-item-title>
                    </v-list-item-content>
                </template>
                <v-list-item 
                    v-for="( child, subindex ) in element.children"
                    :key="`${ index }-${ subindex }-item`"
                    :to="child.route.namespace"
                    active-class="primary--text"
                >
                    <v-list-item-content>
                        <v-list-item-title class="subtitle-1">
                            {{ child.title }} 
                        </v-list-item-title>
                    </v-list-item-content>
                    <v-spacer></v-spacer>
                    <v-list-item-icon>
                        <v-icon
                            color="grey"
                        >
                            {{ child.icon }}
                        </v-icon>
                    </v-list-item-icon>
                </v-list-item>
            </v-list-group>
            <v-list-item 
                v-else
                :key="`${ index }-item`"
                :to="element.route.namespace"
                active-class="primary--text"

            >
                <v-list-item-icon>
                    <v-icon
                        :color="element.iconColor"
                    >
                        {{ element.icon }}
                    </v-icon>
                </v-list-item-icon>
                <v-list-item-content class="text-start">
                    <v-list-item-title class="title">
                        {{ element.title }}
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </template>
    </v-list>
</template>

<script>
export default {
    data: () => {
        return {
            features: [
                {
                    type: "group",
                    icon: "mdi-account-circle",
                    iconColor: "red",
                    title: "我的用戶",
                    baseRoute: {
                        path: "account",
                        namespace: {
                            name: "account"
                        }
                    },
                    children: [
                        {
                            title: "用戶資訊",
                            icon: "mdi-face-outline",
                            route: {
                                path: "/profile",
                                namespace: {
                                    name: "profile"
                                }
                            }
                        },
                        {
                            title: "親人列表",
                            icon: "mdi-face-recognition",
                            route: {
                                path: "/relatives",
                                namespace: {
                                    name: "relatives"
                                }
                            }
                        }
                    ]
                },
                {
                    type: "default",
                    icon: "mdi-clipboard-list",
                    iconColor: "indigo",
                    title: "我的訂單",
                    route: {
                        path: "purchase",
                        namespace: {
                            name: "purchase"
                        }
                    }
                },
                {
                    type: "default",
                    icon: "mdi-bell-circle",
                    iconColor: "green accent-3",
                    title: "通知總覽",
                    route: {
                        path: "notification",
                        namespace: {
                            name: "notification"
                        }
                    }
                }
            ]
        }
    },
    methods: {
        childIsActive( element ) {
            var routeStore = []
            
            for ( var i = 0 ; i < element.children.length ; ++i )
            {
                routeStore.push( `/dashboard/${ element.baseRoute.path }${ element.children[ i ].route.path }` )
            }

            return routeStore.includes( this.$route.fullPath )
        }
    }
}
</script>

<style>

</style>