import { Alimento } from "./DietaProps";


function usecalcularMacros(alimento: Alimento, quantidadeGramas: number) {
    const fator = alimento.porcao_gramas ? quantidadeGramas / alimento.porcao_gramas : 0;

    return {
        calorias: Math.round(alimento.calorias * fator),
        proteinas: Math.round(alimento.proteinas * fator * 10) / 10,
        carboidratos: Math.round(alimento.carboidratos * fator * 10) / 10,
        gorduras: Math.round(alimento.gorduras * fator * 10) / 10,
    };
}

export default usecalcularMacros;