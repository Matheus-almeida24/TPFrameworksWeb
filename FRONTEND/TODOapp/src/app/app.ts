import { Component, signal } from '@angular/core';
import { Tarefa } from "./tarefa";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('TODOapp');
  arrayDeTarefas = signal<Tarefa[]>([]);
  apiURL: string;

  constructor(private http: HttpClient) {
    // 1. Colocamos o /api aqui UMA VEZ SÓ
    this.apiURL = 'https://tpframeworksweb.onrender.com/api';
    this.READ_tarefas();
  }

  CREATE_tarefa(descricaoNovaTarefa: string) {
    const novaTarefa = new Tarefa(descricaoNovaTarefa, false);
    // 2. Agora usamos apenas o caminho final (/post, /getAll, etc)
    this.http.post<Tarefa>(`${this.apiURL}/post`, novaTarefa).subscribe(
      resultado => { this.READ_tarefas(); }
    );
  }

  READ_tarefas() {
    // Corrigido: agora vai chamar .../api/getAll
    this.http.get<Tarefa[]>(`${this.apiURL}/getAll`).subscribe(
      resultado => this.arrayDeTarefas.set(resultado)
    );
  }

  DELETE_tarefa(tarefaAserRemovida: Tarefa) {
    const indice = this.arrayDeTarefas().indexOf(tarefaAserRemovida);
    if (indice !== -1) {
      const id = this.arrayDeTarefas()[indice]._id;
      // Corrigido: agora vai chamar .../api/delete/ID
      this.http.delete<Tarefa>(`${this.apiURL}/delete/${id}`).subscribe(
        resultado => { this.READ_tarefas(); }
      );
    }
  }

  UPDATE_tarefa(tarefaAserModificada: Tarefa) {
    const indice = this.arrayDeTarefas().indexOf(tarefaAserModificada);
    if (indice !== -1) {
       const id = this.arrayDeTarefas()[indice]._id;
       // Corrigido: agora vai chamar .../api/update/ID
       this.http.patch<Tarefa>(`${this.apiURL}/update/${id}`, tarefaAserModificada).subscribe(
         resultado => { this.READ_tarefas(); }
       );
    }
  }
}