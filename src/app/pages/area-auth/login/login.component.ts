import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/pages/area-auth/login/login.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { slideInAnimation } from 'src/app/shared/animations/animation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class LoginComponent implements OnInit {

  @ViewChild('loginInput') loginInput: ElementRef | undefined;
  @ViewChild('senhaInput') senhaInput: ElementRef | undefined;

  loginForm: FormGroup = this.formBuilder.group({
    login: ['', [Validators.required, Validators.maxLength(20)]],
    senha: ['', Validators.required],
  });

  estaCarregando: boolean = false;
  erroNoLogin: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.erroNoLogin = false;

    if (!this.loginForm.valid) {
      this.validarCamposDoFormulario(this.loginForm);
      this.focarNoPrimeiroInputInvalido(this.loginForm);
      return;
    }

    this.login();
  }

  private validarCamposDoFormulario(form: FormGroup) {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field) as FormControl;
      control.markAsTouched();
    });
  }

  private focarNoPrimeiroInputInvalido(form: FormGroup) {
    for (let control of Object.keys(form.controls)) {
      if (form.controls[control].invalid) {
        const input = `${control}Input` as keyof LoginComponent;
        (this[input] as ElementRef).nativeElement.focus();
        break;
      }
    }
  }

  exibeErro(nomeControle: string) {
    if (!this.loginForm.controls[nomeControle]) {
      return false;
    }
    return this.loginForm.controls[nomeControle].invalid && this.loginForm.controls[nomeControle].touched;
  }

  login() {
    this.estaCarregando = true;

    this.loginService.logar(this.loginForm.value).subscribe(
      response => this.onSuccessLogin(),
      error => this.onErrorLogin(error)
    );

    this.onSuccessLogin();
  }

  onSuccessLogin() {
    this.router.navigate(['dashboard']);
  }

  onErrorLogin(error: any) {
    this.erroNoLogin = true;
    this.estaCarregando = false;
  }

}
