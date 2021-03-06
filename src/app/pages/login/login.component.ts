import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  nombre = '';

  constructor(
    public wsServices: WebsocketService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ingresar() {
    //console.log( this.nombre );
    this.wsServices.loginWS( this.nombre )
        .then( () => {
          this.router.navigateByUrl('/mensajes');
        });
  }

}
