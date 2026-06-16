import { Tabs } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#121214',
          borderTopColor: '#1c1c1e',
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: '#ff5b5b', // Cor coral/rosa ativa
        tabBarInactiveTintColor: '#8e8e93',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Treinos',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="weight-lifter" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="biblioteca"
        options={{
          title: 'Biblioteca',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="library-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="exercicios"
        options={{
          title: 'Exercícios',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="arm-flex" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}