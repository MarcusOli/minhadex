// pega uma string e retorna ela com a inicial maiúscula
const capitalize = s => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}
