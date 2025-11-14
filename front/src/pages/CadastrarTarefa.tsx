import { useEffect, useState } from "react";
import { cadastrarTarefa} from "../services/tarefaService";

export default function CadastrarTarefa() {
const [titulo, setTitulo] = useState("");
const [descricao, setDescricao] = useState("");
const [categoriaId, setCategoriaId] = useState(0);
const [categorias, setCategorias] = useState<any[]>([]);



useEffect(() => {
}, []);

async function cadastrar() {
try {
    const tarefa = {
    titulo: titulo,
    descricao: descricao,
    categoriaId: categoriaId
    };
    await cadastrarTarefa(tarefa);
    alert("Tarefa cadastrada!");
    setTitulo("");
    setDescricao("");
} catch (erro) {
    alert("Erro ao cadastrar tarefa.");
}
}

return (
<div className="container">
    <h1>Cadastrar Tarefa</h1>
    <form>
    <div>
        <label>Título:</label>
        <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
    </div>
    <div>
        <label>Descrição:</label>
        <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
    </div>
    <div>
        <label>Categoria:</label>
        <select value={categoriaId} onChange={(e) => setCategoriaId(parseInt(e.target.value))}>
        <option value={0}>Selecione</option>
        {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
        ))}
        </select>
    </div>
    <button type="button" onClick={cadastrar}>Cadastrar</button>
    </form>
</div>
);
}