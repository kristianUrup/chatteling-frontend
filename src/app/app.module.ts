import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { MessageComponent } from './message/message.component';

const config: SocketIoConfig = { url: 'http://localhost:5000', options: {} };
@NgModule({
  declarations: [AppComponent, HomeComponent, ChatroomComponent, MessageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
