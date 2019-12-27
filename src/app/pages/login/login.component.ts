import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../service/auth.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    usuario: UsuarioModel = new UsuarioModel;
    recordarme = false;

    constructor(private auth: AuthService){}

    ngOnInit() {
        if( localStorage.getItem('email') ){
            this.recordarme = true;
            this.usuario.email = localStorage.getItem('email');
        }
    }

    login( form: NgForm){
        if(form.invalid){
            return;
        }

        Swal.fire({

            allowOutsideClick: false,
            type: 'info',
            text: 'Espere por favor..'
        });

        Swal.showLoading();

        this.auth.login(this.usuario).subscribe(user => {
            console.log( user );
            Swal.close();
            if( this.recordarme ){
                localStorage.setItem('email',this.usuario.email);
            }
        }, (error) =>{
            
            Swal.fire({

                type: 'error',
                title: 'Error al autenticar',
                text: error.error.error.message
            });
        });
    }
}