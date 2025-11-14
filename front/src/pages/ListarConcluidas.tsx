import { useEffect, useState } from "react";
import { listarConcluidas } from "../services/tarefaService";

export default function ListarConcluidas() {
const [tarefas, setTarefas] = useState<any[]>([]);

async function carregarTarefas() {
try {
    const dados = await listarConcluidas();
    setTarefas(dados.map((tarefa: any) => ({
    id: tarefa.id,
    titulo: tarefa.titulo,
    status: tarefa.status,
    })));
} catch (erro) {
    alert("Erro ao carregar tarefas concluídas.");
}
}

useEffect(() => {
carregarTarefas();
}, []);


return (
<div className="container">
    <h1>Lista de Tarefas Concluídas</h1>
    <table>
    <thead>
        <tr>
        <th>Nome</th>
        <th>Descrição</th>
        <th>Status</th>
        <th>Ações</th>
        </tr>
    </thead>
    <tbody>
        {tarefas.map((tarefa) => (
        <tr key={tarefa.id}>
            <td>{tarefa.titulo}</td>
            <td>{tarefa.status}</td>
                        <td>{tarefa.status}</td>
                        <td>
                        </td>
        </tr>
        ))}
    </tbody>
    </table>
</div>
);
}