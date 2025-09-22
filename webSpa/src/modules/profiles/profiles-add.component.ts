import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthGuardService } from '../../core/services/auth-guard.service';
import { FooterComponent } from '../../shared/components/footer/footer-component';
import { CONSTANT_VARIABLES } from '../../core/constants/variables.constant';
import { hasErrorFormControl } from '../../core/functions/shared-string.functions';

@Component({
  selector: 'app-profile-add',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSelectModule,
    CommonModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatTooltipModule,
    MatCheckboxModule,
    FooterComponent,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './profiles-add.component.html',
  providers: [AuthGuardService],
})
export class ProfilesAddComponent implements OnInit {
  public textPage: string = 'Cadastro de Perfil de Acesso';
  public subTextPage: string =
    'Por meio do cadastro de perfil de acesso, você pode definir as funcionalidades e permissões que o perfil irá possuir.';
  public constant_variables = CONSTANT_VARIABLES;
  perfilForm!: FormGroup;

  funcionalidadesMock = [
    {
      nome: 'Financeiro',
      permissoes: ['Cadastrar', 'Consultar', 'Excluir'],
      desabilitarPermissoes: false,
    },
    { nome: 'Configuração de Email', permissoes: ['Consultar'], desabilitarPermissoes: true },
    {
      nome: 'Perfil de acesso',
      permissoes: ['Cadastrar', 'Consultar', 'Editar'],
      desabilitarPermissoes: false,
    },
    {
      nome: 'Usuários',
      permissoes: ['Cadastrar', 'Consultar', 'Editar'],
      desabilitarPermissoes: false,
    },
  ];

  displayedColumns: string[] = ['funcionalidade', 'permissoes', 'todos'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nomePerfil: ['', Validators.required, Validators.maxLength(80)],
      funcionalidades: this.fb.array([]),
    });

    this.funcionalidadesMock.forEach((f) => {
      const permissoesArray = this.fb.array(
        f.permissoes.map(() =>
          this.fb.control({ value: false, disabled: f.desabilitarPermissoes })
        )
      );

      const funcionalidadeGroup = this.fb.group({
        nome: [f.nome],
        permissoes: permissoesArray,
        todosSelecionado: [{ value: false, disabled: f.desabilitarPermissoes }],
      });

      (this.perfilForm.get('funcionalidades') as FormArray).push(
        funcionalidadeGroup
      );
    });
  }

  get funcionalidadesFormArray(): FormArray {
    return this.perfilForm.get('funcionalidades') as FormArray;
  }

  getPermissoesArray(index: number): FormArray {
    return this.funcionalidadesFormArray
      .at(index)
      .get('permissoes') as FormArray;
  }

  toggleTodos(index: number) {
    const funcionalidade = this.funcionalidadesFormArray.at(index) as FormGroup;
    const permissoes = funcionalidade.get('permissoes') as FormArray;
    const todosSelecionado = funcionalidade.get('todosSelecionado')?.value;

    permissoes.controls.forEach((control) =>
      control.setValue(todosSelecionado)
    );
  }

  verificarTodos(index: number) {
    const funcionalidade = this.funcionalidadesFormArray.at(index) as FormGroup;
    const permissoes = funcionalidade.get('permissoes') as FormArray;
    const todosSelecionado = permissoes.controls.every((c) => c.value === true);

    funcionalidade
      .get('todosSelecionado')
      ?.setValue(todosSelecionado, { emitEvent: false });
  }

  salvar() {
    if (this.perfilForm.valid) {
      console.log('Perfil salvo', this.perfilForm.value);
    } else {
      this.perfilForm.markAllAsTouched();
    }
  }

  hasErrorFormControl(formControl: AbstractControl): string {
    return hasErrorFormControl(formControl);
  }

  cleanForm(): void {
    this.perfilForm.get('nomePerfil')?.reset('', { emitEvent: false });
    for (let index = 0; index < this.funcionalidadesMock.length; index++) {
      const funcionalidade = this.funcionalidadesFormArray.at(index) as FormGroup;
      const permissoes = funcionalidade.get('permissoes') as FormArray;
      permissoes.controls.forEach((control) =>
        control.setValue(false)
      );

      funcionalidade
      .get('todosSelecionado')
      ?.setValue(false, { emitEvent: false });
    }
  }
}
