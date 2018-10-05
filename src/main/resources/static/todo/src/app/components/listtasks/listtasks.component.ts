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
    //this.pendingItems=this._itemService.getItems();
    this._itemService.pendingItemsUpdater.subscribe((data)=>{
      if(null == data){
        data = [{"id":4,"title":"veggies","description":"get veggies","pending":false},{"id":5,"title":"laundry","description":"laundry","pending":false}];
      }
    this.pendingItems=data;
  });
  }

    deleteItem(item){
      console.log('deleteItem==>'+item.id);
      this._itemService.deleteItemById(item.id);
    }

    markItemComplete(item){
      console.log('updateItem==>'+item);
      this._itemService.updateItem(item,item.id);
    }

}
