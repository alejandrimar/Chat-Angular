import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  texto = '';
  mensajeSubscription: Subscription | any;
  elemento: HTMLElement | any;


  mensajes: any[] = [];

  constructor(
    public chatService: ChatService
  ) { }

  ngOnInit(): void {

    this.elemento = document.getElementById('chat-mensajes');

    this.mensajeSubscription = this.chatService.getMessages().subscribe( msg => {
      //console.log( msg );
      this.mensajes.push( msg );

      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);
    });
  }

  ngOnDestroy() {
    this.mensajeSubscription?.unsubscribe();
  }

  enviar() {

    if ( this.texto.trim().length ===0 ) {
      return;
    }
    //console.log( this.texto );
    this.chatService.sendMessage( this.texto );
    this.texto = '';
  }

}
