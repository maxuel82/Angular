import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CommonModule} from '@angular/common';

import { Tarefa } from '../model/tarefa.model';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  //public title: string = 'Minhas tarefas';
  public tarefas: Tarefa[] = []; //=[] esta colocando a lista vazia.  se não fizer isso vai ficaar undefined.
  public form: FormGroup;
  public mode: String = 'list';
  /**
   *
   */
  constructor(private fb: FormBuilder) {
  
    this.form = this.fb.group({
      descricaoTarefa: ['', Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(60),
          Validators.required,
        ])]
      });
  
     //adiconar itens no array tarefas. this.tarefas.push
/*      this.tarefas.push(new Tarefa(1,'passear com cachorro', false));
     this.tarefas.push(new Tarefa(2,'cortar o cabelo', false));
     this.tarefas.push(new Tarefa(3,'colocar filha para dormir', true));      
 */
   this.CarregarDoLocalStorage();
  }

  
  adicionarTarefa(){
    const descricaoTarefa = this.form.controls['descricaoTarefa'].value;
    const id = this.tarefas.length + 1;
    this.tarefas.push(new Tarefa(id, descricaoTarefa, false));
    this.salvarNoLocalStorage();
    this.form.reset();
    this.AlterarModoListaOuTarefa('list');    
  }

  removerTarefa(tarefa : Tarefa){
      const index = this.tarefas.indexOf(tarefa);
      if (index !== -1){             ///esse teste é quando não encontrar o item na lista o metodo indexof retorna -1
        //remover item da lista
        this.tarefas.splice(index, 1);  // esse 1 e a quantidade de itens que vai deletar
        this.salvarNoLocalStorage();
      }
  }

  concluirTarefa(tarefa : Tarefa){
    tarefa.concluida = true;  //=atribuiçao   ==comparação
    this.salvarNoLocalStorage();
  }

  reabrirTarefa(tarefa : Tarefa){
    tarefa.concluida = false;
    this.salvarNoLocalStorage();
  }

  salvarNoLocalStorage() {
    const data = JSON.stringify(this.tarefas);
    localStorage.setItem('tarefas', data);
  }

  CarregarDoLocalStorage() {
    const data = localStorage.getItem('tarefas');
    if (data) {
      this.tarefas = JSON.parse(data);
    } else {
      this.tarefas = [];
    }
  }

  AlterarModoListaOuTarefa(mode: string){
    this.mode =mode;
  }
}


