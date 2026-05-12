const { ObjectId } = require("mongodb");
const { conectar, getDatabase } = require("../db/MongoClient.js");

class Livro {
  constructor() {
    this.colecao = getDatabase("biblioteca_digital").collection("livros");
  }

  async cadastrarLivro(livro) {
    try {
      const resultado = await this.colecao.insertOne(livro);

      console.log("Livro cadastrado com sucesso.");

      return resultado;
    } catch (error) {
      console.log("Erro ao cadastrar livro:", error.message);
    }
  }

  async listarLivros() {
    try {
      const livro_buscado = await this.colecao.find().toArray();

      console.log(livro_buscado);
      return livro_buscado;
    } catch (error) {
      console.log("Erro ao listar livros", error.message);
    }
  }

  async buscarLivroPorTitulo(titulo) {
    try {
      const livro = await this.colecao.findOne({ titulo: titulo });

      console.log(livro);
      return livro;
    } catch (error) {
      console.log("Erro ao buscar livro", error.message);
    }
  }

  async atualizarLivro(id, dados) {
    try {
      const livro = await this.colecao.updateOne(
        { _id: new ObjectId(id) },
        { $set: dados },
      );

      console.log(livro);
      return livro;
    } catch (error) {
      console.log("Erro ao atualizar livro", error.message);
    }
  }

  async removerLivro(id) {
    try {
      const livro = await this.colecao.deleteOne({ _id: new ObjectId(id) });

      console.log(livro);
      return livro;
    } catch (error) {
      console.log("Erro ao deletar livro", error.message);
    }
  }
}

module.exports = Livro;
