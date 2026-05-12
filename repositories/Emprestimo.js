const { ObjectId } = require("mongodb");
const { conectar, getDatabase } = require("../db/MongoClient.js");

class Emprestimos {
  constructor() {
    this.colecao = getDatabase("biblioteca_digital").collection("emprestimos");
  }

  async cadastrarEmprestimo(emprestimo) {
    try {
      const emprestimo = await this.colecao.insertOne({
        livro_id: new ObjectId(emprestimo.livro_id),
        nome_aluno: emprestimo.nome_aluno,
        data_emprestimo: new Date(emprestimo.data_emprestimo),
        data_devolucao: new Date(emprestimo.data_devolucao),
        devolvido: false,
      });
      console.log(emprestimo);
      return emprestimo;
    } catch (error) {
      console.log("Erro ao cadastrar um emprestimo", error.message);
    }
  }

  async listarEmprestimos() {
    try {
      const emprestimo = await this.colecao.find().toArray();

      console.log(emprestimo);
      return emprestimo;
    } catch (error) {
      console.log("Erro ao listar emprestimos", error.message);
    }
  }

  async devolverLivro(id) {
    try {
      const resultado = await this.colecao.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            devolvido: true,
          },
        },
      );

      console.log(resultado);
      return resultado;
    } catch (error) {
      console.log("erro ao devolver livro", error.message);
    }
  }
}

module.exports = Emprestimos;
