import { useEffect, useState } from "react";
import { listarTarefas, alterarStatusTarefa } from "../services/tarefaService";

export default function AlterarTarefa() {
    const [tarefas, setTarefas] = useState<any[]>([]);


    async function carregarTarefas() {
        try {
            const dados = await listarTarefas();
            console.log(dados);
            setTarefas(
                Array.isArray(dados)
                    ? dados.map((tarefa: any) => ({
                        id: tarefa.TarefaId,
                        titulo: tarefa.Titulo,
                        status: tarefa.Status,
                    }))
                    : []
            );
        } catch (erro) {
            alert("Erro ao carregar tarefas.");
        }
    }

    async function alterarStatus(tarefa: any) {
        try {
            const id = tarefa?.id;
            if (!id) {
                alert("ID da tarefa inválido.");
                return;
            }
            await alterarStatusTarefa(id);
            await carregarTarefas();
        } catch (erro) {
            console.error(erro);
            alert("Erro ao alterar status.");
        }
    }

    useEffect(() => {
        carregarTarefas();
    }, []);

    return (
        <div className="container">
            <h1>Alterar Tarefa</h1>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {tarefas.map((tarefa) => (
                        <tr key={tarefa.id}>
                            <td>{tarefa.titulo}</td>
                            <td>{tarefa.status}</td>
                            <td>
                                <button onClick={() => alterarStatus(tarefa)}>
                                    Alterar status
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}