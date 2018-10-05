import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Item } from '../../model/Item';

@Component({
  selector: 'app-listcompletedtasks',
  templateUrl: './listcompletedtasks.component.html',
  styleUrls: ['./listcompletedtasks.component.css'],
  providers: [TodoService]
})
export class ListcompletedtasksComponent implements OnInit {
  private completedItems: Item = new Item();
  constructor(private _itemService: TodoService) { }

  ngOnInit() {
    //this.completedItems=this._itemService.getItemsByType(true);    
  }

  deleteItem(item){
    console.log('deleteItem'+item);
    this._itemService.deleteItemById(item.id);
  }

  updateItem(item){
    console.log('updateItem'+item);
  }

}
