const { conectar } = require("./db/MongoClient");
const Livro = require("./repositories/Livro");
const Emprestimo = require("./repositories/Emprestimo");

async function main() {
  try {
    await conectar();

    const livroRepository = new Livro();
    const emprestimoRepository = new Emprestimo();

    // =========================
    //  LIVRO
    // =========================

    /* COMANDO PARA CADASTRAR LIVRO
     await livroRepository.cadastrarLivro({
      titulo: "Dom Casmurro",
      autor: "Machado de Assis",
      ano: 1899,
      disponivel: true,
    });*/

    /* COMANDO PARA LISTAR LIVRO
    await livroRepository.listarLivros();*/

    /*COMANDO PARA BUSCAR POR TITULO LIVRO
    wait livroRepository.buscarLivroPorTitulo("A Troca");*/

    /* COMANDO PARA ATUALIZAR LIVRO
    await livroRepository.atualizarLivro("6a033382b96d56d18fc31f34", {
      titulo: "A Troca",
    });*/

    /* COMANDO PARA REMOVER LIVRO
    await livroRepository.removerLivro("6a033382b96d56d18fc31f34");*/

    // =========================
    //  EMPRESTIMO
    // =========================

    /*await emprestimoRepository.cadastrarEmprestimo({
      livro_id: "69f15300406d4ad379eb507b",
      nome_aluno: "Aninha",
      data_emprestimo: "2026-05-12",
      data_devolucao: "2026-05-20",
    });*/

    /* COMANDO PARA LISTAR EMPRESTIMO
      await emprestimoRepository.listarEmprestimos();*/

    /* COMANDO PARA DEVOLVER EMPRESTIMO
    await emprestimoRepository.devolverLivro("6a0340f9034810080001db9e");*/

    /* COMANDO PARA REMOVER EMPRESTIMO
    await emprestimoRepository.removerEmprestimo("6a0340f9034810080001db9e");*/
  } catch (error) {
    console.log("Erro na aplicação:", error.message);
  }
}

main();
