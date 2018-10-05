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

  ngOnInit() {
  }

    addTodo(item) {
      let newItem: Item = new Item();
      newItem.id = item.id;
      newItem.description = item.description;
  	  this.todoService.addItem(newItem);
	}
}
