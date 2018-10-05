import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Item } from '../../model/Item';

@Component({
  selector: 'app-listtasks',
  templateUrl: './listtasks.component.html',
  styleUrls: ['./listtasks.component.css']
})
export class ListtasksComponent implements OnInit {
  private pendingItems:any;
  constructor(private _itemService: TodoService) { }

  ngOnInit() {
    this.pendingItems=this._itemService.getItemsByType(false);
    /*.subscribe((pendingItems)=>{
      pendingItems;
    });*/
  }


    markItemComplete(item){
      console.log('deleteItem'+item);
    }

    updateItem(item){
      console.log('updateItem'+item);
    }

}
