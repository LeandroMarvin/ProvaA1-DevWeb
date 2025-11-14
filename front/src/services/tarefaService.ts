import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5273/api",
});


export async function cadastrarTarefa(tarefa: any) {
  try {
    const resposta = await api.post("/tarefas/cadastrar", {
      Titulo: tarefa.titulo,
      Status: "Não iniciada",
    });
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao cadastrar tarefa:", erro);
    throw erro;
  }
}

export async function listarTarefas() {
  try {
    const resposta = await api.get("/tarefas/listar");
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao listar tarefas:", erro);
    throw erro;
  }
}


export async function alterarStatusTarefa(tarefaId: string) {
  try {
    const resposta = await api.put(`/tarefas/alterar/${tarefaId}`);
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao alterar status:", erro);
    throw erro;
  }
}

export async function listarConcluidas() {
  try {
    const resposta = await api.get("/tarefas/concluidas");
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao listar concluídas:", erro);
    throw erro;
  }
}

export async function listarNaoConcluidas() {
  try {
    const resposta = await api.get("/tarefas/naoconcluidas");
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao listar não concluídas:", erro);
    throw erro;
  }
}
