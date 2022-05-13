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
                    type: "default",
                    icon: "mdi-clipboard-list",
                    iconColor: "indigo",
                    title: "編輯",
                    route: {
                        path: "storeedit",
                        namespace: {
                            name: "storeedit"
                        }
                    }
                },
                {
                    type: "group",
                    icon: "mdi-account-circle",
                    iconColor: "red",
                    title: "餐點",
                    baseRoute: {
                        path: "dish",
                        namespace: {
                            name: "dish"
                        }
                    },
                    children: [
                        {
                            title: "餐點列表",
                            icon: "mdi-face-outline",
                            route: {
                                path: "/dishlist",
                                namespace: {
                                    name: "dishlist"
                                }
                            }
                        },
                        {
                            title: "新增餐點",
                            icon: "mdi-face-recognition",
                            route: {
                                path: "/adddish",
                                namespace: {
                                    name: "adddish"
                                }
                            }
                        }
                    ]
                },
                {
                    type: "group",
                    icon: "mdi-account-circle",
                    iconColor: "red",
                    title: "點餐紀錄",
                    baseRoute: {
                        path: "orderrecord",
                        namespace: {
                            name: "orderrecord"
                        }
                    },
                    children: [
                        {
                            title: "製作中",
                            icon: "mdi-face-outline",
                            route: {
                                path: "/orderwaiting",
                                namespace: {
                                    name: "orderwaiting"
                                }
                            }
                        },
                        {
                            title: "配送中",
                            icon: "mdi-face-recognition",
                            route: {
                                path: "/transportwaiting",
                                namespace: {
                                    name: "transportwaiting"
                                }
                            }
                        }
                    ]
                },
                {
                    type: "default",
                    icon: "mdi-clipboard-list",
                    iconColor: "indigo",
                    title: "提醒列表",
                    route: {
                        path: "noticelist",
                        namespace: {
                            name: "noticelist"
                        }
                    }
                },
                {
                    type: "default",
                    icon: "mdi-clipboard-list",
                    iconColor: "indigo",
                    title: "首頁",
                    route: {
                        path: "storehome",
                        namespace: {
                            name: "storehome"
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