import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, ReplaySubject} from 'rxjs';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Item } from '../model/Item';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
    private baseUrl:string='http://localhost:8080/api/items';
    private httpOptions = {
     headers: new HttpHeaders({
       'Content-Type':  'application/json'
     })
    };
    constructor(private _http:HttpClient) { }

	  private completedTasksItems: Item[] = [];
    private _completedItemsEmitter: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>(this.completedTasksItems);
  	public readonly completedItemsUpdater: Observable<Item[]> = this._completedItemsEmitter.asObservable();

	  private pendingTasksItems: Item[] = [];
    private _pendingItemsEmitter: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>(this.pendingTasksItems);
  	public readonly pendingItemsUpdater: Observable<Item[]> = this._pendingItemsEmitter.asObservable();

    getItems(){
      this._http.get(this.baseUrl+'/').subscribe((response:Response)=>{
		      this.pendingTasksItems = JSON.parse(JSON.stringify(response));
          this._pendingItemsEmitter.next(this.pendingTasksItems);
	    })
    }

    getItemById(id:Number){
      return this._http.get(this.baseUrl+'/id/'+id).subscribe((response:Response)=>response);
    }

    getItemsByType(type:boolean){
      return this._http.get(this.baseUrl+'/type/'+type).subscribe((response:Response)=>{
    		if(type){
    			this.completedTasksItems = JSON.parse(JSON.stringify(response));
          this._completedItemsEmitter.next(this.completedTasksItems);
    		} else {
    			this.pendingTasksItems = JSON.parse(JSON.stringify(response));
          this._pendingItemsEmitter.next(this.pendingTasksItems);
    		}
      });
    }

    deleteItemById(id:Number, type: boolean){
      return this._http.delete(this.baseUrl+'/id/'+id).subscribe((response:Response)=>{
        if(type){
    			this.completedTasksItems = JSON.parse(JSON.stringify(response));
          this._completedItemsEmitter.next(this.completedTasksItems);
    		} else {
    			this.pendingTasksItems = JSON.parse(JSON.stringify(response));
          this._pendingItemsEmitter.next(this.pendingTasksItems);
    		}
      });
    }

    addItem(item:Item){
      return this._http.post(this.baseUrl+'/',JSON.stringify(item),this.httpOptions).subscribe((response:Response)=>{
  		  //console.log("add item to pending: "+response);
  		  //this._pendingItemsEmitter.next(response);
	    });
    }

    updateItem(item:Item,id:Number){
      return this._http.put(this.baseUrl+'/id/'+id,JSON.stringify(item),this.httpOptions).subscribe((response:Response)=>{
        this.getItemsByType(true);
      });
    }

}
