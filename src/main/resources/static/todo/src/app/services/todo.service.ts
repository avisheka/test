import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import {Observable, ReplaySubject} from 'rxjs';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Item } from '../model/Item';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
    private baseUrl:string='http://localhost:8080/api/items';
    private headers = new Headers({'Content-Type':'application/json'});
    private options = new RequestOptions({headers:this.headers});
    constructor(private _http:HttpClient) { }

	  private completedTasksItems: Item[] = [];
    private _completedItem: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>(this.completedTasksItems);
  	public readonly completedItem: Observable<Item[]> = this._completedItem.asObservable();

	  private pendingTasksItems: Item[] = [];
    private _pendingItem: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>(this.pendingTasksItems);
  	public readonly pendingItem: Observable<Item[]> = this._pendingItem.asObservable();

    getItems(){
      this._http.get(this.baseUrl+'/').map((response:Response)=>{
		      this.pendingTasksItems = JSON.parse(JSON.stringify(response.json()));
          return this.pendingTasksItems;
	    })
      .catch(this.errorHandler);
    }

    getItemById(id:Number){
    return this._http.get(this.baseUrl+'/id/'+id).map((response:Response)=>response.json())
      .catch(this.errorHandler);
    }

    getItemsByType(type:boolean){
    return this._http.get(this.baseUrl+'/type/'+type).map((response:Response)=>{
		if(type){
			this.completedTasksItems = JSON.parse(JSON.stringify(response.json()));
		} else {
			this.pendingTasksItems = JSON.parse(JSON.stringify(response.json()));
		}
	  })
      .catch(this.errorHandler);
    }

    deleteItemById(id:Number){
      return this._http.delete(this.baseUrl+'/id/'+id).map((response:Response)=>response.json())
      .catch(this.errorHandler);
    }

    addItem(item:Item){
      return this._http.post(this.baseUrl+'/',JSON.stringify(item)).map((response:Response)=>{
		  console.log("add item to pending: "+response.json());
		  this._pendingItem.next(response.json());
	  })
      .catch(this.errorHandler);
    }

    updateItem(item:Item,id:Number){
      return this._http.put(this.baseUrl+'/id/'+id,JSON.stringify(item)).map((response:Response)=>{
        console.log("update item to complete: "+response.json());
        this._completedItem.next(response.json());
      })
      .catch(this.errorHandler);
    }

    errorHandler(error:Response){
      return Observable.throw(error||"SERVER ERROR");
    }
}
