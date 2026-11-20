import { useEffect, useMemo, useRef, useState } from 'react'
import type { ChangeEvent, DragEvent } from 'react'
import { motion } from 'motion/react'
import { ImagePlus, Trash2 } from 'lucide-react'
import Texto from '../organizacao/Texto'
import WrapperIcone from '../organizacao/WrapperIcone'

interface InputImagemProps {
  /** arquivo escolhido pelo usuário (controlado pelo pai) */
  valor?: File | null
  /** imagem que já existe no servidor (URL), mostrada enquanto não houver arquivo novo */
  urlAtual?: string | null
  onChange?: (arquivo: File | null) => void
  name?: string
  /** tamanho máximo em MB */
  maximoMB?: number
  redondo?: boolean
  placeholder?: string
  /** erro vindo do back (ex: errosCampo.foto?.[0]) */
  erro?: string | null
  classeAdicional?: string
  disabled?: boolean
}

const TIPOS_ACEITOS = ['image/jpeg', 'image/png', 'image/webp']

const InputImagem = ({
  valor = null,
  urlAtual = null,
  onChange,
  name,
  maximoMB = 2,
  redondo = false,
  placeholder = 'Clique ou arraste uma imagem',
  erro,
  classeAdicional = '',
  disabled = false,
}: InputImagemProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [arrastando, setArrastando] = useState(false)
  const [erroLocal, setErroLocal] = useState<string | null>(null)
  const [removida, setRemovida] = useState(false)

  // preview do arquivo novo; senão, a imagem que já está salva
  const previewArquivo = useMemo(
    () => (valor ? URL.createObjectURL(valor) : null),
    [valor]
  )

  // libera a memória do blob quando o arquivo muda ou o componente sai da tela
  useEffect(() => {
    return () => {
      if (previewArquivo) URL.revokeObjectURL(previewArquivo)
    }
  }, [previewArquivo])

  const preview = previewArquivo ?? (removida ? null : urlAtual)
  const mensagemErro = erroLocal ?? erro

  const processar = (arquivo?: File) => {
    if (!arquivo) return

    if (!TIPOS_ACEITOS.includes(arquivo.type)) {
      setErroLocal('Use uma imagem JPG, PNG ou WEBP')
      return
    }

    if (arquivo.size > maximoMB * 1024 * 1024) {
      setErroLocal(`A imagem deve ter no máximo ${maximoMB} MB`)
      return
    }

    setErroLocal(null)
    setRemovida(false)
    onChange?.(arquivo)
  }

  const aoEscolher = (e: ChangeEvent<HTMLInputElement>) => {
    processar(e.target.files?.[0])
    e.target.value = '' // permite escolher o mesmo arquivo de novo
  }

  const aoSoltar = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setArrastando(false)
    if (disabled) return
    processar(e.dataTransfer.files?.[0])
  }

  const remover = (e: React.MouseEvent) => {
    e.stopPropagation() // não abre o seletor de arquivos
    setErroLocal(null)
    setRemovida(true)
    onChange?.(null)
  }

  const classeBase = `
    relative flex items-center justify-center overflow-hidden
    bg-base-terciaria border-2 border-dashed border-base-quaternaria
    transition-colors duration-200
    ${disabled
      ? 'cursor-default'
      : 'cursor-pointer hover:bg-base-secundaria hover:border-contraste-principal/50'}
    ${arrastando ? 'border-destaque-s-medio bg-base-secundaria' : ''}
    ${mensagemErro ? 'border-red-500' : ''}
    ${redondo ? 'rounded-full size-32' : 'rounded-xl w-full aspect-video'}
  `

  return (
    <div className="flex flex-col gap-1 items-center w-full">
      <motion.div
        whileHover={disabled ? undefined : { scale: 1.02 }}
        whileTap={disabled ? undefined : { scale: 0.98 }}
        role="button"
        tabIndex={disabled ? -1 : 0}
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(e: React.KeyboardEvent) => {
          if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
            e.preventDefault()
            inputRef.current?.click()
          }
        }}
        onDragOver={(e: DragEvent) => { e.preventDefault(); if (!disabled) setArrastando(true) }}
        onDragLeave={() => setArrastando(false)}
        onDrop={aoSoltar}
        className={`${classeBase} ${classeAdicional}`}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="Pré-visualização"
              className="size-full object-cover"
            />

            {!disabled && (
              <button
                type="button"
                onClick={remover}
                aria-label="Remover imagem"
                className="absolute top-1 right-1 p-1 rounded-full
                  bg-base-secundaria/80 text-red-500 hover:bg-base-secundaria
                  transition-colors cursor-pointer"
              >
                <WrapperIcone tamanho="sm">
                  <Trash2 className="size-full" />
                </WrapperIcone>
              </button>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center gap-1 p-2 text-center">
            <WrapperIcone tamanho="md">
              <ImagePlus className="size-full" />
            </WrapperIcone>
            {!redondo && (
              <Texto tipo="subtexto">{placeholder}</Texto>
            )}
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          name={name}
          accept={TIPOS_ACEITOS.join(',')}
          onChange={aoEscolher}
          disabled={disabled}
          className="hidden"
        />
      </motion.div>

      {mensagemErro ? (
        <span className="text-red-500 text-xs">{mensagemErro}</span>
      ) : (
        <Texto tipo="subtexto" className="text-xs">
          JPG, PNG ou WEBP · até {maximoMB} MB
        </Texto>
      )}
    </div>
  )
}

export default InputImagem