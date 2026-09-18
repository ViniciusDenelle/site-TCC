import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useTema from '@/contextos/TemaContexto';

export default function TabsLayout() {
    const { tema, temaAtual, formatarCor } = useTema()

    return (
        <Tabs
            key={tema}
            screenOptions={{
                headerShown: false,

                tabBarStyle: {
                    backgroundColor: formatarCor(temaAtual['--color-base-secundaria'], 1),
                    borderTopColor: formatarCor(temaAtual['--color-base-quaternaria'], 1),
                    height: 65,
                    paddingTop: 5,
                    paddingBottom: 8,
                },

                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '600',
                },

                tabBarActiveTintColor: formatarCor(temaAtual['--color-destaque-p-medio'], 1),
                tabBarInactiveTintColor: formatarCor(temaAtual['--color-contraste-secundaria'], 1),
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