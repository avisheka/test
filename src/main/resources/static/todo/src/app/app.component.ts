import { Component } from '@angular/core';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoService]
})
export class AppComponent {
  title = 'Avishek\'s Todo App';

  constructor(private _itemService: TodoService) { }

  ngOnInit() {
    
  }
}
