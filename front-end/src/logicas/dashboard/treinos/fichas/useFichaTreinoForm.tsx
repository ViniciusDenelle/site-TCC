// hooks/forms/useFichaTreinoForm.ts
import { useState } from 'react';
import { DiaSemana } from './FichaProps';

const diasDaSemana: DiaSemana[] = [ 'domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado',];

type DivisaoBase = {
    id: string;
    nome: string;
};

const useFichaTreinoForm = () => {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [imagem, setImagem] = useState<File | null>(null);
    const [imagemAtual, setImagemAtual] = useState<string | File | null>(null);
    const [removerImagem, setRemoverImagem] = useState(false);
    const [divisoes, setDivisoes] = useState<DivisaoBase[]>([]);
    const [treinosPorDivisao, setTreinosPorDivisao] = useState<Record<string, { id: number; nome: string }[]>>({});
    const [dias, setDias] = useState<Record<DiaSemana, number | null>>({
        segunda: null, terca: null, quarta: null, quinta: null, sexta: null, sabado: null, domingo: null,
    });

    function adicionarDivisao(nomeDivisao: string) {
        const id = crypto.randomUUID();
        setDivisoes(prev => [...prev, { id, nome: nomeDivisao }]);
        setTreinosPorDivisao(prev => ({ ...prev, [id]: [] }));
    }

    function removerDivisao(idDivisao: string) {
        setDivisoes(prev => prev.filter(d => d.id !== idDivisao));
        setTreinosPorDivisao(prev => {
            const copia = { ...prev };
            delete copia[idDivisao];
            return copia;
        });
    }

    function atualizarTreinosDaDivisao(idDivisao: string, treinos: { id: number; nome: string }[]) {
        setTreinosPorDivisao(prev => ({ ...prev, [idDivisao]: treinos }));
    }

    function definirTreinoNoDia(dia: DiaSemana, treinoId: number | null) {
        setDias(prev => ({ ...prev, [dia]: treinoId }));
    }

    const todosOsTreinosSelecionados = Object.values(treinosPorDivisao).flat();

    function montarPayload() {
        return {
            nome,
            descricao,
            divisoes: divisoes.map(d => ({
                nome: d.nome,
                treino_ids: (treinosPorDivisao[d.id] ?? []).map(t => t.id),
            })),
            dias,
            imagem,                                
            remover_imagem: removerImagem ? 1 : 0
        };
    }

    const NUMERO_PARA_DIA: Record<number, DiaSemana> = {
        0: 'domingo',
        1: 'segunda',
        2: 'terca',
        3: 'quarta',
        4: 'quinta',
        5: 'sexta',
        6: 'sabado',
    };

    function preencherFormulario(ficha: {
        nome: string;
        descricao: string;
        imagem: File | null;
        imagemAtual: string | null;
        removerImagem: boolean;
        divisoes: { id: number; nome: string; treinos: { id: number; nome: string }[] }[];
        dias: Record<number, { id: number; nome: string } | null>;
    }) {
        setNome(ficha.nome);
        setDescricao(ficha.descricao ?? '');
        setImagemAtual(ficha.imagem);
        setImagem(null);
        setRemoverImagem(ficha.removerImagem ?? false);

        const novasDivisoes: DivisaoBase[] = [];
        const novosTreinosPorDivisao: Record<string, { id: number; nome: string }[]> = {};

        ficha.divisoes.forEach(divisao => {
            const idTemp = crypto.randomUUID();
            novasDivisoes.push({ id: idTemp, nome: divisao.nome });
            novosTreinosPorDivisao[idTemp] = divisao.treinos;
        });

        setDivisoes(novasDivisoes);
        setTreinosPorDivisao(novosTreinosPorDivisao);

        const novosDias: Record<DiaSemana, number | null> = {
            segunda: null, terca: null, quarta: null, quinta: null, sexta: null, sabado: null, domingo: null,
        };

        Object.entries(ficha.dias).forEach(([indice, treino]) => {
            const diaNome = NUMERO_PARA_DIA[Number(indice)];
            if (diaNome) {
                novosDias[diaNome] = treino?.id ?? null;
            }
        });

        setDias(novosDias);
    }

    const trocarImagem = (arquivo: File | null) => {
        setImagem(arquivo);
        // lixeira sem arquivo novo = apagar a imagem que já estava salva
        setRemoverImagem(arquivo === null && !!imagemAtual);
    };

    return {
        nome, setNome,
        descricao, setDescricao,
        divisoes, adicionarDivisao, removerDivisao,
        treinosPorDivisao, atualizarTreinosDaDivisao,
        dias, definirTreinoNoDia, diasDaSemana,
        todosOsTreinosSelecionados,
        montarPayload, preencherFormulario,
        imagem, setImagem,
        imagemAtual, setImagemAtual,
        removerImagem, setRemoverImagem,
        trocarImagem
    };
};

export default useFichaTreinoForm;