const { conectar } = require("./db/MongoClient");
const Livro = require("./repositories/Livro");

async function main() {
  try {
    await conectar();

    const livroRepository = new Livro();

    /* COMANDO PARA CADASTRAR
     await livroRepository.cadastrarLivro({
      titulo: "Dom Casmurro",
      autor: "Machado de Assis",
      ano: 1899,
      disponivel: true,
    });*/

    /* COMANDO PARA LISTAR
    await livroRepository.listarLivros();*/

    /*COMANDO PARA BUSCAR POR TITULO
    wait livroRepository.buscarLivroPorTitulo("A Troca");*/

    /* COMANDO PARA ATUALIZAR
    await livroRepository.atualizarLivro("6a033382b96d56d18fc31f34", {
      titulo: "A Troca",
    });*/

    /* COMANDO PARA REMOVER
    await livroRepository.removerLivro("6a033382b96d56d18fc31f34");*/
  } catch (error) {
    console.log("Erro na aplicação:", error.message);
  }
}

main();
