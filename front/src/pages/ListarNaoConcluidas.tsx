import { useEffect, useState } from "react";
import { listarTarefas } from "../services/tarefaService";

export default function ListarNaoConcluidas() {
    const [tarefas, setTarefas] = useState<any[]>([]);

    useEffect(() => {
        carregarTarefas();
    }, []);

    async function carregarTarefas() {
        try {
            const dados = await listarTarefas();
            setTarefas(
                dados.filter(
                    (tarefa: any) =>
                        tarefa.status === "Não iniciada" || tarefa.status === "Em andamento"
                )
            );
        } catch (erro) {
            alert("Erro ao carregar tarefas.");
        }
    }

    return (
        <div className="container">
            <h1>Tarefas Não Concluídas</h1>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {tarefas.map((tarefa) => (
                        <tr key={tarefa.id}>
                            <td>{tarefa.titulo}</td>
                            <td>{tarefa.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
