import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,

                tabBarStyle: {
                    backgroundColor: '#121214',
                    borderTopColor: '#1c1c1e',
                    height: 65,
                    paddingTop: 5,
                    paddingBottom: 8,
                },

                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '600',
                },

                tabBarActiveTintColor: '#ff5b5b',
                tabBarInactiveTintColor: '#8e8e93',
            }}
        >

            <Tabs.Screen
                name="index"
                options={{
                    title: 'Treinos',

                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="weight-lifter"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />



            <Tabs.Screen
                name="exercicios"
                options={{
                    title: 'Exercícios',

                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="arm-flex"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="dietas"
                options={{
                    title: 'Dietas',

                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="food-apple"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="progresso"
                options={{
                    title: 'Progresso',

                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="chart-line"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="perfil"
                options={{
                    title: 'Perfil',

                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="account"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

        </Tabs>
    );
}