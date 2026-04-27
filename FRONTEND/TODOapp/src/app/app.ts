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
    // Definimos apenas a base aqui
    this.apiURL = 'https://tpframeworksweb.onrender.com/api';
    this.READ_tarefas();
  }

  CREATE_tarefa(descricaoNovaTarefa: string) {
    const novaTarefa = new Tarefa(descricaoNovaTarefa, false);
    // Como a apiURL já tem "/api", aqui usamos apenas "/post"
    this.http.post<Tarefa>(`${this.apiURL}/post`, novaTarefa).subscribe(
      resultado => { this.READ_tarefas(); }
    );
  }

  READ_tarefas() {
    this.http.get<Tarefa[]>(`${this.apiURL}/getAll`).subscribe(
      resultado => this.arrayDeTarefas.set(resultado)
    );
  }

  DELETE_tarefa(tarefaAserRemovida: Tarefa) {
    // ATENÇÃO: É indexOf com "O" maiúsculo
    const indice = this.arrayDeTarefas().indexOf(tarefaAserRemovida);
    
    if (indice !== -1) {
      const id = this.arrayDeTarefas()[indice]._id;
      this.http.delete<Tarefa>(`${this.apiURL}/delete/${id}`).subscribe(
        resultado => { this.READ_tarefas(); }
      );
    }
  }

  UPDATE_tarefa(tarefaAserModificada: Tarefa) {
    const indice = this.arrayDeTarefas().indexOf(tarefaAserModificada);
    if (indice !== -1) {
       const id = this.arrayDeTarefas()[indice]._id;
       this.http.patch<Tarefa>(`${this.apiURL}/update/${id}`, tarefaAserModificada).subscribe(
         resultado => { this.READ_tarefas(); }
       );
    }
  }
}