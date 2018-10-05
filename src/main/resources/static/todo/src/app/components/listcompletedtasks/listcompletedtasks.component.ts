import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Item } from '../../model/Item';

@Component({
  selector: 'app-listcompletedtasks',
  templateUrl: './listcompletedtasks.component.html',
  styleUrls: ['./listcompletedtasks.component.css']
})
export class ListcompletedtasksComponent implements OnInit {
  private completedItems:any;
  constructor(private _itemService: TodoService) { }

  ngOnInit() {
    this.completedItems=this._itemService.getItemsByType(true);
    /*.subscribe((completedItems)=>{
      this.completedItems=completedItems;
    });*/
  }

  deleteItem(item){
    console.log('deleteItem'+item);
      this.todoService.deleteItemById(item.id);
  }

  updateItem(item){
    console.log('updateItem'+item);
  }

}
