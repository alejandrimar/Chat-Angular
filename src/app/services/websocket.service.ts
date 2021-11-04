import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../classes/usuario';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;
  public usuario: Usuario | any;

  constructor(
    private socket: Socket,
    private router: Router
  ) { 
    this.cargarSorage();
    this.checkStatus();
  }


  checkStatus() {
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
      this.cargarSorage();
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus = false;
    });

  }


  emit( evento: string, payload?: any, callback?: Function ) {
    
    console.log('Emitiendo', evento);
    
    this.socket.emit( evento, payload, callback );

  }

  listen( evento: string ) {
    return this.socket.fromEvent( evento )
  }

  loginWS( nombre: string ) {
   // console.log('Configurando', nombre );
    /*this.socket.emit( 'configurar-usuario', { nombre }, ( resp:any ) => {
      console.log( resp );
    } );*/

    return new Promise<void>( (resolve, reject) => {
      this.emit( 'configurar-usuario', { nombre }, (resp: any) => {
        //console.log (resp);
        this.usuario = new Usuario( nombre );

          // para guardar el nombre del usuario en el storage cuando se rewcargue el navegador
        this.guardarStorage();

        resolve();

      });

    });    
    
  }

  logoutWS() {
    this.usuario = null;
    localStorage.removeItem('usuario');

    const payload = {
      nombre: 'sin-nombre'
    };

    this.emit('configurar-usuario', payload, () => {} );
    this.router.navigateByUrl('');
  }

  getUsuario() {
    return this.usuario;
  }

  guardarStorage() {

    localStorage.setItem( 'usuario', JSON.stringify( this.usuario ) );

  }

  cargarSorage() {

    if ( localStorage.getItem('usuario')) {

      this.usuario = JSON.parse( localStorage.getItem('usuario') || '{}' );
      this.loginWS( this.usuario.nombre );

    }

  }



}
