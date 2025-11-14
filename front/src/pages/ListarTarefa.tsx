import { useEffect, useState } from "react";
import { listarTarefas, alterarStatusTarefa } from "../services/tarefaService";

export default function ListarTarefas() {
    const [tarefas, setTarefas] = useState<any[]>([]);

    async function carregarTarefas() {
        try {
            const dados = await listarTarefas();
            setTarefas(dados);
        } catch (erro) {
            alert("Erro ao carregar tarefas.");
        }
    }

    async function alterarStatus(tarefa: any) {
        try {
            await alterarStatusTarefa(tarefa.TarefaId);
            carregarTarefas();
        } catch {
            alert("Erro ao alterar status.");
        }
    }

    useEffect(() => {
        carregarTarefas();
    }, []);

    return (
        <div className="container">
            <h1>Lista de Tarefas</h1>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {tarefas.map((tarefa) => (
                        <tr key={tarefa.TarefaId}>
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