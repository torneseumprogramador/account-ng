import Typewriter from 'typewriter-effect/dist/core';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/pages/area-auth/register/register.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/pages/area-auth/login/login.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = this.formBuilder.group({
    cpf:   ['', [Validators.required, Validators.maxLength(11)]],
    nome:  ['', Validators.required],
    login: ['', [Validators.required, Validators.maxLength(20)]],
    senha: ['', Validators.required]
  })

  erroNoCadastro: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private loginService: LoginService,
    private router: Router
    ) { }

  ngOnInit(): void {
    var target = document.getElementById('typed');

    var typewriter = new Typewriter(target, {
      loop: false,
      delay: 35,
      deleteSpeed: 20
    });

    typewriter
      .pauseFor(1000)
      .typeString('Prepare-se para ver seu dinheiro rendendo ')
      .pauseFor(500)
      .typeString('<strong>mais</strong> que a poupança. ')
      .pauseFor(500)
      .deleteChars(21)
      .pauseFor(500)
      .typeString('<strong>24h</strong>, sete dias na semana.')
      .pauseFor(500)
      .deleteChars(25)
      .typeString('com toda <strong>segurança</strong>.')
      .pauseFor(500)
      .deleteChars(19)
      .typeString('com todo <strong>conforto</strong>.')
      .pauseFor(500)
      .deleteChars(18)
      .pauseFor(500)
      .typeString('bem aí na palma da sua mão.')
      .start();
    }

  registerUser() {
    this.registerService.cadastrar(this.registerForm.value)
    .subscribe(
      response => this.onSuccessRegister(response),
      error => this.erroNoCadastro = true
    );
  }

  onSuccessRegister(response: any) {
    this.router.navigate(['dashboard']);
  }
}
