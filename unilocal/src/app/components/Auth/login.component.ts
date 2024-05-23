import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RegisterDto } from '../../class/dto/register-dto';
import { AuthServiceService } from '../../services/auth-service.service';
import { LoginDto } from '../../class/dto/login-dto';


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
  loginDto : LoginDto

  constructor(private authService: AuthServiceService) {
    this.registerDto = new RegisterDto();
    this.loginDto = new LoginDto()
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
    }}
  login() {
    this.authService.obtenerUsuarios().then((response) => {
      // Buscar el usuario por correo
      const email = this.loginDto.email;
      const usuario = response.data.find((u: { email: string; }) => u.email === email);
      console.log(usuario)
      if (usuario) {
        // Verificar el rol y llamar al método correspondiente
        if (usuario.role === 'USER') {
          this.authService.loginUsuario(this.loginDto)
        } else if (usuario.role === 'MOD') {
          this.authService.loginMod(this.loginDto);
        } else {
          console.log('Rol no reconocido:', usuario.role);
        }
      } else {
        console.log('Usuario no encontrado con el correo:', email);
      }
    });

  }

}
