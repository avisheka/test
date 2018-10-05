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

	private completedTasksItems : any = null;
    private _completedItem: BehaviorSubject<any> = new BehaviorSubject<any>(this.completedTasksItems);
  	public readonly completedItem: Observable<any> = this._completedItem.asObservable();

	private pendingTasksItems : any = null;
    private _pendingItem: BehaviorSubject<any> = new BehaviorSubject<any>(this.pendingTasksItems);
  	public readonly pendingItem: Observable<any> = this._pendingItem.asObservable();

    getItems(){
      return this._http.get(this.baseUrl+'/').map((response:Response)=>response.json())
      .catch(this.errorHandler);
    }

    getItemById(id:Number){
    return this._http.get(this.baseUrl+'/id/'+id).map((response:Response)=>response.json())
      .catch(this.errorHandler);
    }

    getItemsByType(type:boolean){
    return this._http.get(this.baseUrl+'/type/'+type).map((response:Response)=>response.json())
      .catch(this.errorHandler);
    }

    deleteItem(id:Number){
      return this._http.delete(this.baseUrl+'/id/'+id).map((response:Response)=>response.json())
      .catch(this.errorHandler);
    }

    createItem(item:Item){
      return this._http.post(this.baseUrl+'/',JSON.stringify(item)).map((response:Response)=>response.json())
      .catch(this.errorHandler);
    }

    updateItem(item:Item,id:Number){
      return this._http.put(this.baseUrl+'/id/'+id,JSON.stringify(item)).map((response:Response)=>response.json())
      .catch(this.errorHandler);
    }

    errorHandler(error:Response){
      return Observable.throw(error||"SERVER ERROR");
    }
}
