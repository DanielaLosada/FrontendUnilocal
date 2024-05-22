import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RegisterDto } from '../../class/dto/register-dto';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  haveAccount = true
  registerDto: RegisterDto

  constructor(private authService: AuthServiceService) {
    this.registerDto = new RegisterDto();
  }
  
  toggleAuth(){
    this.haveAccount = !this.haveAccount;

  }

  registrarUsuario() {
    this.authService.registrarUsuario(this.registerDto).then((response) => {
      console.log('Cliente registrado')
    }).catch((error) => {
      console.log('Error al registrar cliente', error)
    })
  }

    handleFotoSeleccionada(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      this.registerDto.fotoPerfil = file;
    }
  }

}
