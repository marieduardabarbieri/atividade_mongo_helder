const { conectar } = require("./db/MongoClient");
const Livro = require("./repositories/Livro");

async function main() {
  try {
    await conectar();

    const livroRepository = new Livro();
  } catch (error) {
    console.log("Erro na aplicação:", error.message);
  }
}

main();
