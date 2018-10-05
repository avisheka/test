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
  private completedItems: Item[] = [];
  constructor(private _itemService: TodoService) { }

  ngOnInit() {
    this._itemService.getItemsByType(true);
    this._itemService.completedItemsUpdater.subscribe((data)=>{
      this.completedItems=data;
    });
  }

  deleteItem(item){
    console.log('deleteItem==>'+item.id);
    this._itemService.deleteItemById(item.id, true);
  }


}
