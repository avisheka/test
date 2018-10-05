import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ListtasksComponent } from './components/listtasks/listtasks.component';
import { ListcompletedtasksComponent } from './components/listcompletedtasks/listcompletedtasks.component';
import { TodoService } from './services/todo.service';
import { CreatetaskComponent } from './components/createtask/createtask.component';

@NgModule({
  declarations: [
    AppComponent,
    ListtasksComponent,
    ListcompletedtasksComponent,
    CreatetaskComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
