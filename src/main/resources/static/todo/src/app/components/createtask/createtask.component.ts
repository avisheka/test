import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Item } from '../model/Item';

@Component({
  selector: 'app-createtask',
  templateUrl: './createtask.component.html',
  styleUrls: ['./createtask.component.css'],
  providers: [TodoService]
})
export class CreatetaskComponent implements OnInit {

	newItem: Item = new Item();
	
  constructor(private todoService: TodoServices) { }

  ngOnInit() {
  }

    addTodo() {
		this.todoService.addTodo(this.newItem);
		this.newItem = new Item();
	}
}
