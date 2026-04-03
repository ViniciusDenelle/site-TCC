import React, { useEffect, useState } from 'react'
import LinkSimples from '../../componentes/LinkSimples'
import Informações from './passos/informações'
import NivelAtividade from './passos/NivelAtividade'
import BotaoSimples from '../../componentes/BotaoSimples'
import { ArrowLeft, PenLine } from 'lucide-react'
import BotaoPrimario from '../../componentes/BotaoPrimario'
import { AnimatePresence } from 'motion/react'
import Objetivo from './passos/Objetivo'
import Metas from './passos/Metas'

const Cadastro = () => {
    // dados do cadastro
    const [dados, setDados] = useState({
        genero: '',
        peso: '20',
        tipoPeso: 'kilos',
        pesoFinal: '',
        altura: '80',
        dataDeNascimento: '',
        idade: '',
        nivelAtividade: '',
        objetivo: '',
        experiencia: '',
        TMB: '',
        GET: '',
        calDiaria: '',
        tempoEstimado: '',
        veloPerda: '',
    })
    
    const validacoes = {
        1: () => (
            // dados.genero !== '' 
            // && dados.peso > 0       
            // && dados.altura !== ''
            // && dados.dataDeNascimento !== ''
            true
        ),
        2: () => (
            dados.nivelAtividade !== ''
        ),
        3: () => (
            dados.objetivo !== '' &&
            dados.experiencia !== ''
        )
    }
    
    const [passo, setPasso] = useState(1)

    // validar passo
    const podeProximo = validacoes[passo]?.() ?? false

    function proximoPasso()
    {
        if (!podeProximo) return
        setPasso(prev => prev+1)
    }

    function voltarPasso()
    {
        setPasso(prev => prev-1)
    }

    // data binding
    function mudarDados(campo, valor)
    {
        setDados(prev => ({
            ...prev, [campo]: valor
        }))
    }

    function calcularIdade(dataDeNascimento) {
        const hoje = new Date()
        const nascimento = new Date(dataDeNascimento)

        let idade = hoje.getFullYear() - nascimento.getFullYear()

        const mesAtual = hoje.getMonth()
        const mesNascimento = nascimento.getMonth()

        const diaAtual = hoje.getDate()
        const diaNascimento = nascimento.getDate()

        // verifica se ainda não fez aniversário esse ano
        if ( 
            mesAtual < mesNascimento || 
            (mesAtual === mesNascimento && diaAtual < diaNascimento)
        ) {
            idade-- 
        }
        return idade
    }

    useEffect(() => {
        let novaIdade = calcularIdade(dados.dataDeNascimento)
        mudarDados('idade', novaIdade ? novaIdade : 0)
    }, [dados.dataDeNascimento])

    useEffect(() => {

        if (!dados.idade || !dados.genero || !dados.altura || !dados.peso ) return
        
        function calcularTMB() {
            let pesoKG = dados.tipoPeso === 'kilos' ? dados.peso : dados.peso / 2.20462

            if (dados.genero === 'feminino') {
                let tmb = 447.593
                    + (9.247 * pesoKG)
                    + (3.098 * dados.altura)
                    - (4.330 * dados.idade)
                return tmb
            } else {
                let tmb = 88.362
                    + (13.397 * pesoKG)
                    + (4.799 * dados.altura)
                    - (5.677 * dados.idade)
                return tmb
            }
        }

        const novaTMB = Math.round(calcularTMB())
        mudarDados('TMB', novaTMB)
    }, [dados.idade, dados.genero, dados.altura, dados.peso])

    useEffect(() => {
        if (!dados.nivelAtividade) return 

        const novoGet = Math.round(dados.TMB * dados.nivelAtividade)
        
        mudarDados('GET', novoGet)

    }, [dados.nivelAtividade])

    function renderizarPasso()
    {
        switch (passo) {
            case 1:
                return (
                <Informações 
                mudarDados={mudarDados}
                info={dados}/>
                )
            case 2:
                return (
                    <NivelAtividade 
                    mudarDados={mudarDados}
                    info={dados}
                    />
                )
            case 3:
                return (
                    <Objetivo 
                    mudarDados={mudarDados}
                    info={dados}
                    />
                )
                case 4:
                return (
                    <Metas 
                    mudarDados={mudarDados}
                    info={dados}
                    />
                )
            default:
                break;
        }
    }

    // pilulas progresso
    const passoPilula = [1, 2, 3, 4, 5]
  return (
    <main className='pt-20 relative min-h-screen w-full bg-base-primaria'>
        
        <div className="absolute top-0 left-0 w-full h-full 
        bg-linear-to-t from-destaque-p-escuro/25 
        to-base-primaria to-75%"/>

        <div className="container mx-auto h-full w-full">

            <div className="w-full h-full flex flex-col 
            items-center">

                <div className="flex gap-2">

                    {passoPilula.map(pilula => (

                        <div 
                        key={pilula}
                        className={`relative rounded-full w-6 h-3 ring-1 ring-contraste-primaria overflow-hidden
                        after:absolute after:left-0 after:top-0 after:h-3 bg-base-secundaria 
                        after:bg-destaque-p-escuro after:w-0 after:transition-all after:duration-500
                        ${passo >= pilula ? `after:w-full` : ``}`}
                        />
                            
                    ))}

                </div>

                <div className="flex items-center justify-center w-full p-1 z-10">
                    <h1 className="text-xl font-semibold text-t-primaria">
                        crie sua conta
                    </h1>
                </div>

                <div className="p-5 rounded-xl
                 bg-base-terciaria/40 backdrop-blur-md ring-1 ring-base-quaternaria 
                 w-9/10 md:w-120 md:px-10 shadow-md shadow-base-quaternaria/50">
                    

                    {passo > 1 ? (
                        <BotaoSimples 
                        classeAdcional="absolute top-2 left-2 ring-transparent 
                        hover:ring-transparent"
                        onClick={voltarPasso}>
                            <ArrowLeft/>    
                        </BotaoSimples>
                    ) : ""}

                    

                    <div className="flex w-full h-full flex-col gap-2 mt-5">
                        
                        {/* passos */}
                        <AnimatePresence mode='wait'>
                            {renderizarPasso()}
                        </AnimatePresence>


                        <BotaoPrimario
                        onClick={proximoPasso}
                        disabled={!podeProximo}
                        tipo="cheio"
                        >
                            proximo    
                        </BotaoPrimario>

                        <div className='flex gap-1 justify-center'>
                            já possui uma conta?
                            <LinkSimples
                            to="/login"
                            classeAdcional="text-destaque-s-escuro">
                                login
                            </LinkSimples>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </main>
  )
}

export default Cadastro