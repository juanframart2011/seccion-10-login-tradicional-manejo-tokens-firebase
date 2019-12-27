import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
    selector: 'app-registro',
    templateUrl: './registro.component.html',
    styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

    usuario: UsuarioModel;
    recordarme = false;

    constructor(private auth: AuthService){}

    ngOnInit() {
        this.usuario = new UsuarioModel;
    }

    onSubmit( form: NgForm ){

        if(form.invalid){
            return;
        }
        
        this.auth.nuevoUsuario(this.usuario).subscribe(user => {
            console.log( user );
            if( this.recordarme ){
                localStorage.setItem('email',this.usuario.email);
            }
        }, (error) =>{
            console.warn( error.error.error.message );
        });
    }
}