const { conectar } = require("./db/MongoClient");
const Livro = require("./repositories/Livro");

async function main() {
  try {
    await conectar();

    const livroRepository = new Livro();

    await livroRepository.cadastrarLivro({
      titulo: "Dom Casmurro",
      autor: "Machado de Assis",
      ano: 1899,
      disponivel: true,
    });
  } catch (error) {
    console.log("Erro na aplicação:", error.message);
  }
}

main();
