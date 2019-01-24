export const MeusLivros = (meusLivros) => {
    const estandes = new Map();
    estandes.set('currentlyReading', { title: 'Currently Reading', livros: [] })
    estandes.set('wantToRead', { title: 'Want To Read', livros: [] })
    estandes.set('read', { title: 'Read', livros: [] })

    for (let livro of meusLivros) {
        const estande = estandes.get(livro.shelf)
        estande.livros.push(livro)
    }
    return estandes
}  