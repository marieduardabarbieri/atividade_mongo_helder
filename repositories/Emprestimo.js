const { getDatabase } = require("../db/MongoClient");
const { ObjectId } = require("mongodb");

class Emprestimos {
  constructor() {
    this.colecao = getDatabase("biblioteca_digital").collection("emprestimos");
  }

  async cadastrarEmprestimo(emprestimo) {
    try {
      const resultado = await this.colecao.insertOne({
        livro_id: new ObjectId(emprestimo.livro_id),
        nome_aluno: emprestimo.nome_aluno,
        data_emprestimo: new Date(emprestimo.data_emprestimo),
        data_devolucao: new Date(emprestimo.data_devolucao),
        devolvido: false,
      });

      console.log("Empréstimo cadastrado com sucesso.");

      return resultado;
    } catch (error) {
      console.log("Erro ao cadastrar empréstimo:", error.message);
    }
  }

  async listarEmprestimos() {
    try {
      const emprestimos = await this.colecao.find().toArray();

      console.log(emprestimos);

      return emprestimos;
    } catch (error) {
      console.log("Erro ao listar empréstimos:", error.message);
    }
  }

  async devolverLivro(id) {
    try {
      const resultado = await this.colecao.updateOne(
        {
          _id: new ObjectId(id),
        },
        {
          $set: {
            devolvido: true,
          },
        },
      );

      console.log("Livro devolvido com sucesso.");

      return resultado;
    } catch (error) {
      console.log("Erro ao devolver livro:", error.message);
    }
  }

  async removerEmprestimo(id) {
    try {
      const resultado = await this.colecao.deleteOne({
        _id: new ObjectId(id),
      });

      console.log("Empréstimo removido com sucesso.");

      return resultado;
    } catch (error) {
      console.log("Erro ao remover empréstimo:", error.message);
    }
  }
}

module.exports = Emprestimos;
