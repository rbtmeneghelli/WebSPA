import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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
import { RouterOutlet, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthGuardService } from '../../core/services/auth-guard.service';
import { FooterComponent } from '../../shared/components/footer/footer-component';
import { CONSTANT_VARIABLES } from '../../core/constants/variables.constant';
import { hasErrorFormControl } from '../../core/functions/shared-string.functions';
import { FunctionalityList } from '../../core/models/functionalitys/functionality.model';
import { DetailsRecordComponent } from '../../shared/components/details-record/details-record.component';

@Component({
  selector: 'app-profile-edit',
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
    ReactiveFormsModule,
    RouterLink,
    DetailsRecordComponent,
  ],
  templateUrl: './profiles-view.component.html',
  providers: [AuthGuardService],
})
export class ProfilesViewComponent implements OnInit {
  private _ActivatedRoute: ActivatedRoute = inject(ActivatedRoute);

  public textPage: string = 'Visualização do perfil de acesso';
  public subTextPage: string =
    'Por meio da visualização, você será capaz de analisar os dados do perfil de acesso, sem possibilidade de editar os dados.';
  public constant_variables = CONSTANT_VARIABLES;
  perfilForm!: FormGroup;

  funcionalidadesMock: FunctionalityList[] = [
    {
      nome: 'Financeiro',
      permissoes: ['Cadastrar', 'Consultar', 'Excluir', 'Editar'],
      desabilitarPermissoes: false,
    },
    {
      nome: 'Configuração de Email',
      permissoes: ['Consultar'],
      desabilitarPermissoes: true,
    },
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

  funcionalidadesBackEndMock: FunctionalityList[] = [
    {
      nome: 'Financeiro',
      permissoes: ['Cadastrar', 'Consultar', 'Excluir'],
      desabilitarPermissoes: true,
    },
    {
      nome: 'Configuração de Email',
      permissoes: ['Consultar'],
      desabilitarPermissoes: true,
    },
    {
      nome: 'Perfil de acesso',
      permissoes: ['Cadastrar', 'Consultar', 'Editar'],
      desabilitarPermissoes: true,
    },
    {
      nome: 'Usuários',
      permissoes: ['Cadastrar', 'Consultar', 'Editar'],
      desabilitarPermissoes: true,
    },
  ];

  displayedColumns: string[] = ['funcionalidade', 'permissoes', 'todos'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      id: [],
      nomePerfil: [
        { value: '', disabled: true },
        [Validators.required, Validators.maxLength(80)],
      ],
      funcionalidades: this.fb.array([]),
    });

    this._ActivatedRoute.params.subscribe((params) => {
      if (!!params['id']) {
        this.perfilForm.controls['id'].setValue((params['id'] as number) ?? 0);
      }
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

    this.loadData();
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
      const funcionalidade = this.funcionalidadesFormArray.at(
        index
      ) as FormGroup;
      const permissoes = funcionalidade.get('permissoes') as FormArray;
      permissoes.controls.forEach((control) => control.setValue(false));

      funcionalidade
        .get('todosSelecionado')
        ?.setValue(false, { emitEvent: false });
    }
  }

  loadData() {
    this.perfilForm.get('nomePerfil')?.setValue('Administrador');

    for (let index = 0; index < this.funcionalidadesMock.length; index++) {
      const funcionalidadeMock = this.funcionalidadesMock.at(index) ?? {
        nome: '',
        permissoes: [],
        desabilitarPermissoes: true,
      };

      const nomePermissoes = funcionalidadeMock?.permissoes.map((x) => {
        return x;
      });

      if (this.funcionalidadesBackEndMock.length > 0) {
        const bancoDados = this.funcionalidadesBackEndMock.find(
          (x) => x.nome === funcionalidadeMock.nome
        );

        const funcionalidade = this.funcionalidadesFormArray.at(
          index
        ) as FormGroup;

        const permissoes = funcionalidade.get('permissoes') as FormArray;

        let index2 = 0;

        if (!!bancoDados) {
          for (const item of nomePermissoes) {
            if (bancoDados?.permissoes?.find((x) => x === item)) {
              permissoes.controls[index2].setValue(true);
              if (bancoDados.desabilitarPermissoes) {
                permissoes.controls[index2].disable();
              } else {
                permissoes.controls[index2].enable();
              }
            } else {
              permissoes.controls[index2].setValue(false);
              if (bancoDados.desabilitarPermissoes) {
                permissoes.controls[index2].disable();
              } else {
                permissoes.controls[index2].enable();
              }
            }
            index2++;
          }

          const todosSelecionado = permissoes.controls.every(
            (c) => c.value === true
          );

          if (todosSelecionado) {
            funcionalidade
              .get('todosSelecionado')
              ?.setValue(true, { emitEvent: false });
            if (bancoDados.desabilitarPermissoes) {
              funcionalidade.get('todosSelecionado')?.disable();
            } else {
              funcionalidade.get('todosSelecionado')?.enable();
            }
          } else {
            funcionalidade
              .get('todosSelecionado')
              ?.setValue(false, { emitEvent: false });
            if (bancoDados.desabilitarPermissoes) {
              funcionalidade.get('todosSelecionado')?.disable();
            } else {
              funcionalidade.get('todosSelecionado')?.enable();
            }
          }
        }
      }
    }
  }
}
