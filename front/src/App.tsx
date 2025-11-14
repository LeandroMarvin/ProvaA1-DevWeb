import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import ListarTarefas from "./pages/ListarTarefa";
import CadastrarTarefa from "./pages/CadastrarTarefa";
import AlterarTarefa from "./pages/AlterarTarefa";
import ListarConcluidas from "./pages/ListarConcluidas";
import ListarNaoConcluidas from "./pages/ListarNaoConcluidas";

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li><Link to="/tarefa/listar">Listar Tarefas</Link></li>
          <li><Link to="/tarefa/cadastrar">Cadastrar Tarefa</Link></li>
          <li><Link to="/tarefa/alterar">Alterar Tarefa</Link></li>
          <li><Link to="/tarefa/concluidas">Listar Concluídas</Link></li>
          <li><Link to="/tarefa/naoconcluidas">Listar Não Concluídas</Link></li>
        </ul>
      </nav>
      <Switch>
        <Route path="/" exact component={ListarTarefas} />
        <Route path="/tarefa/listar" component={ListarTarefas} />
        <Route path="/tarefa/cadastrar" component={CadastrarTarefa} />
        <Route path="/tarefa/alterar" component={AlterarTarefa} />
        <Route path="/tarefa/concluidas" component={ListarConcluidas} />
        <Route path="/tarefa/naoconcluidas" component={ListarNaoConcluidas} />
      </Switch>
    </BrowserRouter>
  );
}