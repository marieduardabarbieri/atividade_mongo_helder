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
        usuario_nome: emprestimo.usuario_nome,
        data_emprestimo: new Date(emprestimo.data_emprestimo),
        data_devolucao_prevista: new Date(emprestimo.data_devolucao_prevista),
        status: false,
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

  async registrarEmprestimo(livroId, usuarioNome) {
    const livros = getDatabase("biblioteca_digital").collection("livros");

    try {
      // procura o livro

      const livro = await livros.findOne({
        _id: new ObjectId(livroId),
      });

      // verifica disponibilidade

      if (livro.exemplares_disponiveis <= 0) {
        throw new Error("Não há exemplares disponíveis.");
      }

      // diminui exemplar disponível

      await livros.updateOne(
        {
          _id: new ObjectId(livroId),
        },

        {
          $inc: {
            exemplares_disponiveis: -1,
          },
        },
      );

      // cria empréstimo

      await this.colecao.insertOne({
        livro_id: new ObjectId(livroId),

        usuario_nome: usuarioNome,

        data_emprestimo: new Date(),

        data_devolucao_prevista: new Date(),

        status: "ativo",
      });

      console.log("Empréstimo realizado com sucesso.");
    } catch (error) {
      console.log("Erro ao registrar empréstimo:", error.message);
    }
  }
}

module.exports = Emprestimos;
