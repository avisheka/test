import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Item } from '../../model/Item';

@Component({
  selector: 'app-createtask',
  templateUrl: './createtask.component.html',
  styleUrls: ['./createtask.component.css'],
  providers: [TodoService]
})
export class CreatetaskComponent implements OnInit {
  constructor(private todoService: TodoService) { }
  private newItem: Item = new Item();

  ngOnInit() {
  }

    addTodo() {
  	  this.todoService.addItem(this.newItem);
	}
}
