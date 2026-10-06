import { useState } from 'react';
import { Plus, Apple } from 'lucide-react';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Texto from '../../../../componentes/organizacao/Texto';
import InputSimples from '../../../../componentes/inputs/InputSimples';
import BotaoPrimario from '../../../../componentes/botoes/BotaoPrimario';
import WrapperIcone from '../../../../componentes/organizacao/WrapperIcone';
import CardHorizontal from '../../../../componentes/CardHorizontal';
import useCriarAlimento from '../../../../logicas/dashboard/dieta/alimento/CriarAlimento';

type ErrosValidacao = Partial<Record<
    'nome' | 'porcao_descricao' | 'porcao_gramas' | 'calorias' | 'proteinas' | 'carboidratos' | 'gorduras',
    string[]
>>;

type RespostaErroLaravel = {
    message: string;
    errors: ErrosValidacao;
};

const CriarAlimento = () => {
    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [porcaoDescricao, setPorcaoDescricao] = useState('');
    const [porcaoGramas, setPorcaoGramas] = useState<number | ''>('');
    const [calorias, setCalorias] = useState<number | ''>('');
    const [proteinas, setProteinas] = useState<number | ''>('');
    const [carboidratos, setCarboidratos] = useState<number | ''>('');
    const [gorduras, setGorduras] = useState<number | ''>('');

    const { mutate, isPending, error, isError } = useCriarAlimento();

    const erros: ErrosValidacao = isError
        ? (error as AxiosError<RespostaErroLaravel>).response?.data.errors ?? {}
        : {};

    function salvar() {
        mutate({
            nome,
            porcao_descricao: porcaoDescricao,
            porcao_gramas: Number(porcaoGramas),
            calorias: Number(calorias),
            proteinas: Number(proteinas),
            carboidratos: Number(carboidratos),
            gorduras: Number(gorduras),
        }, {
            onSuccess: () => {
                toast.success('Alimento cadastrado com sucesso!');
                navigate(-1);
            },
            onError: () => {
                toast.error('Erro ao cadastrar alimento');
            },
        });
    }

    return (
        <div className="min-h-screen w-full">
            <div className="container mx-auto flex flex-col gap-3">

                <div className="flex gap-2 items-center">
                    <WrapperIcone><Apple className="size-full" /></WrapperIcone>
                    <Texto tipo="titulo" className="font-thin">Novo alimento</Texto>
                </div>

                <Texto tipo="titulo" className="font-thin">Nome</Texto>
                <div className="flex flex-col">
                    <InputSimples
                        tipo="text"
                        valor={nome}
                        onChange={e => setNome(e.target.value)}
                        placeholder="ex: Peito de frango grelhado"
                    />
                    {erros.nome && (
                        <Texto tipo="subtexto" className="text-red-500">*{erros.nome[0]}</Texto>
                    )}
                </div>

                <CardHorizontal>
                    <div className="flex flex-col gap-3">
                        <Texto tipo="subtitulo" className="opacity-70">Porção de referência</Texto>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col">
                                <Texto tipo="subtexto" className="opacity-60 mb-1">Descrição</Texto>
                                <InputSimples
                                    tipo="text"
                                    valor={porcaoDescricao}
                                    onChange={e => setPorcaoDescricao(e.target.value)}
                                    placeholder='ex: "1 filé médio"'
                                />
                                {erros.porcao_descricao && (
                                    <Texto tipo="subtexto" className="text-red-500">*{erros.porcao_descricao[0]}</Texto>
                                )}
                            </div>

                            <div className="flex flex-col">
                                <Texto tipo="subtexto" className="opacity-60 mb-1">Peso (gramas)</Texto>
                                <InputSimples
                                    tipo="number"
                                    valor={porcaoGramas}
                                    onChange={e => setPorcaoGramas(e.target.value === '' ? '' : Number(e.target.value))}
                                    placeholder="150"
                                />
                                {erros.porcao_gramas && (
                                    <Texto tipo="subtexto" className="text-red-500">*{erros.porcao_gramas[0]}</Texto>
                                )}
                            </div>
                        </div>
                    </div>
                </CardHorizontal>

                <CardHorizontal>
                    <div className="flex flex-col gap-3">
                        <Texto tipo="subtitulo" className="opacity-70">
                            Valores nutricionais (nessa porção)
                        </Texto>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col">
                                <Texto tipo="subtexto" className="opacity-60 mb-1">Calorias (kcal)</Texto>
                                <InputSimples
                                    tipo="number"
                                    valor={calorias}
                                    onChange={e => setCalorias(e.target.value === '' ? '' : Number(e.target.value))}
                                />
                                {erros.calorias && (
                                    <Texto tipo="subtexto" className="text-red-500">*{erros.calorias[0]}</Texto>
                                )}
                            </div>

                            <div className="flex flex-col">
                                <Texto tipo="subtexto" className="opacity-60 mb-1">Proteínas (g)</Texto>
                                <InputSimples
                                    tipo="number"
                                    valor={proteinas}
                                    onChange={e => setProteinas(e.target.value === '' ? '' : Number(e.target.value))}
                                />
                                {erros.proteinas && (
                                    <Texto tipo="subtexto" className="text-red-500">*{erros.proteinas[0]}</Texto>
                                )}
                            </div>

                            <div className="flex flex-col">
                                <Texto tipo="subtexto" className="opacity-60 mb-1">Carboidratos (g)</Texto>
                                <InputSimples
                                    tipo="number"
                                    valor={carboidratos}
                                    onChange={e => setCarboidratos(e.target.value === '' ? '' : Number(e.target.value))}
                                />
                                {erros.carboidratos && (
                                    <Texto tipo="subtexto" className="text-red-500">*{erros.carboidratos[0]}</Texto>
                                )}
                            </div>

                            <div className="flex flex-col">
                                <Texto tipo="subtexto" className="opacity-60 mb-1">Gorduras (g)</Texto>
                                <InputSimples
                                    tipo="number"
                                    valor={gorduras}
                                    onChange={e => setGorduras(e.target.value === '' ? '' : Number(e.target.value))}
                                />
                                {erros.gorduras && (
                                    <Texto tipo="subtexto" className="text-red-500">*{erros.gorduras[0]}</Texto>
                                )}
                            </div>
                        </div>
                    </div>
                </CardHorizontal>

                <BotaoPrimario
                    texto={isPending ? 'salvando...' : 'salvar alimento'}
                    icone={Plus}
                    onClick={salvar}
                />

            </div>
        </div>
    );
};

export default CriarAlimento;