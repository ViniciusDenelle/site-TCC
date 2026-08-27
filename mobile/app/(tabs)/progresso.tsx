import NutritionCard from '@/componentes/graficos/NutriCard';
import { useState } from 'react';
import { View, Text, Button } from 'react-native';



export default function Progresso() {

    const [BalancoCalorico, setBalancoCalorico] = useState(0);

   
    return (
       <View>

       <NutritionCard protein={{current: 50, goal: 100}} carb={{current: 150, goal: 200}} fat={{current: 70, goal: 80}} />

        </View>
    );
}




        
    
