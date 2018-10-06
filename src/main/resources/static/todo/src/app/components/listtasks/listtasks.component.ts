import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Item } from '../../model/Item';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-listtasks',
  templateUrl: './listtasks.component.html',
  styleUrls: ['./listtasks.component.css'],
  providers: [TodoService]
})
export class ListtasksComponent implements OnInit {
  private pendingItems: Item[] = [];
  constructor(private _itemService: TodoService) { }

  ngOnInit() {
    this._itemService.getItemsByType(false);
    this._itemService.pendingItemsUpdater.subscribe((data)=>{
      this.pendingItems=data;
    });
  }

    deleteItem(item){
      console.log('deleteItem==>'+item.id);
      this._itemService.deleteItemById(item.id, false);
      this._itemService.getItemsByType(false);
    }

    markItemComplete(item){
      console.log('updateItem==>'+item);
      item.pending = true;
      this._itemService.updateItem(item,item.id);
    }

}
