using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();

var app = builder.Build();

app.MapGet("/", () => "Leandro Bosco");

//ENDPOINTS DE TAREFA
//GET: http://localhost:5273/api/tarefas/listar
app.MapGet("/api/tarefas/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Tarefas.Any())
    {
        return Results.Ok(ctx.Tarefas.ToList());
    }
    return Results.NotFound("Nenhuma tarefa encontrada");
});

//POST: http://localhost:5273/api/tarefas/cadastrar
app.MapPost("/api/tarefas/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Tarefa tarefa) =>
{
    ctx.Tarefas.Add(tarefa);
    ctx.SaveChanges();
    return Results.Created("", tarefa);
});

//PUT: http://localhost:5273/tarefas/alterar/{id}
app.MapPut("/api/tarefas/alterar/{id}", ([FromServices] AppDataContext ctx, [FromRoute] string id) =>
{
    Tarefa? tarefaEncontrada = ctx.Tarefas.Find(id);
        if (tarefaEncontrada is null)        
            return Results.NotFound("Tarefa não encontrada");
        if (tarefaEncontrada.Status == "Não iniciada")
            tarefaEncontrada.Status = "Em andamento";
        else if (tarefaEncontrada.Status == "Em andamento")
            tarefaEncontrada.Status = "Concluída";
            
    ctx.Tarefas.Update(tarefaEncontrada);
    ctx.SaveChanges();
    return Results.Ok(ctx.Tarefas.ToList());
});

//GET: http://localhost:5273/tarefas/naoconcluidas
app.MapGet("/api/tarefas/naoconcluidas", ([FromServices] AppDataContext ctx) =>
{
    try
    {
        List<Tarefa> tarefasNaoConcluidas = ctx.Tarefas
            .Where(tarefa => tarefa.Status == "Não iniciada" || tarefa.Status == "Em andamento")
            .ToList();
    return Results.Ok(tarefasNaoConcluidas);
    }
    catch (Exception erro)
    {
        return Results.Problem(erro.Message);
    }
});

//GET: http://localhost:5273/tarefas/concluidas
app.MapGet("/api/tarefas/concluidas", ([FromServices] AppDataContext ctx) =>
{
    try
    {
        List<Tarefa> tarefasConcluidas = ctx.Tarefas
            .Where(tarefa => tarefa.Status == "Concluída")
            .ToList();

    return Results.Ok(tarefasConcluidas);
    }
    catch (Exception erro)
    {
        return Results.Problem(erro.Message);
    }
});

app.Run();
