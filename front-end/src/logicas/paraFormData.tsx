/**
 * Converte um objeto em FormData (multipart/form-data).
 * - File vira arquivo
 * - objetos aninhados viram chave[sub] (ex: tempo[meses]), que o Laravel lê como array
 * - null/undefined são ignorados (FormData não tem null)
 */
export const paraFormData = (
    obj: Record<string, any>,
    form = new FormData(),
    prefixo = ''
): FormData => {
    Object.entries(obj).forEach(([chave, valor]) => {
        if (valor === null || valor === undefined) return

        const nome = prefixo ? `${prefixo}[${chave}]` : chave

        if (valor instanceof File) form.append(nome, valor)
        else if (typeof valor === 'object') paraFormData(valor, form, nome)
        else form.append(nome, String(valor))
    })

    return form
}