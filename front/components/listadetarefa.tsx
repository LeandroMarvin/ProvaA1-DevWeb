import { useEffect, useState } from "react";
import { listarTarefas, alterarStatusTarefa, } from "../src/services/tarefaService";

export default function ListarTarefas() {
const [tarefas, setTarefas] = useState<any[]>([]);

async function carregarTarefas() {
try {
    const dados = await listarTarefas();
    console.log(dados);  
    setTarefas(dados.map((tarefa: any) => ({
    id: tarefa.id,
    status: tarefa.status,
    titulo: tarefa.titulo,
    })));
} catch (erro) {
    alert("Erro ao carregar tarefas.");
}
}

async function alterarStatus(tarefa: any) {
try {
    await alterarStatusTarefa(tarefa);
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
        <th>Nome</th>
        <th>Descrição</th>
        <th>Status</th>
        <th>Ações</th>
        </tr>
    </thead>
    <tbody>
        {tarefas.map((tarefa) => (
        <tr key={tarefa.id}>
            <td>{tarefa.nome}</td>
            <td>{tarefa.descricao}</td>
            <td>{tarefa.status}</td>
            <td>
            <button onClick={() => alterarStatus(tarefa)}>Alterar status</button>            
            </td>
        </tr>
        ))}
    </tbody>
    </table>
</div>
);
}