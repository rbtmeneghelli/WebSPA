export const CONSTANT_HTTP_STATUS_CODE = {
    UNAUTHORIZED: 401,
    FORBIDDEN: 403
};

export const CONSTANT_MESSAGES = {
    FORM_REQUIRED: 'O campo é obrigatório',
    FORM_MINLENGTH: 'O campo deve ter no minimo 1 ou mais caracteres preenchido',
    FORM_MAXLENGTH: 'O campo está com seu tamanho máximo ultrapassado',
    FORM_PATTERN: 'Formato Padrão ABC1234 ou Formato Mercosul ABC1B34',
    FORM_EMAIL: 'O campo está com email invalido',
    FORM_VALID: 'Para salvar os campos devem estar preenchidos da forma correta, revise o formulário e tente novamente!',
    FORM_TOKEN: 'Token renovado com sucesso',
    FORM_TOKEN_ERROR: 'Token não renovado com sucesso',
    FORM_TOKEN_EXPIRED: 'Requisição não autorizada! por favor efetue a renovação de seu token de acesso',
    BTN_NEW: 'Cadastro efetuado com sucesso',
    BTN_EDIT: 'Edição efetuado com sucesso',
    BTN_DELETE: 'Exclusão efetuada com sucesso',
    BTN_EXPORT: 'Exportação do arquivo efetuada com sucesso',
    BTN_LOGIN: 'Login efetuado com sucesso'
}

export const CONSTANT_VARIABLES = {
    REGEX_DATE: '\^((0[1-9]|[12][0-9]|3[01])[/]?(0[1-9]|1[0-2])[/]?[12][0-9]{3})',
    REGEX_HOUR: '\^([0-1]{1}[0-9]{1}|[2][0-3]{1})[:]?([0-5]{1}[0-9]{1})',
    REGEX_SAFRA: '\^[A-Z]{2}[0-9]{2}',
    REGEX_LOTERW: '\[a-zA-Z]{2}[0-9]{7}',
    REGEX_SCORE_BOARD: '\[A-Z a-z]{3}[0-9][0-9A-Z a-z][0-9]{2}',
    REGEX_HEXADECIMAL_COLOR: /^#([0-9A-F]{3}){1,2}$/i,
    REQUIRED: '*',
    FORM_FIELD_APPEARANCE: 'outline',
    FORM_FIELD_FLOAT_LABEL: 'always',
    ICON_BARCODE_FIELD: 'fa fa-barcode fa-1x btnIcon',
    CURRENT_DATE: new Date(),
    REGEX_ONLY_NUMBER: new RegExp(/[^0-9]+/g),
    REGEX_ONLY_ALPHANUMERIC: new RegExp(/[^a-zA-Z0-9]+/g),
    REGEX_NOT_REPEATED_SPACE: new RegExp(/\s+/g),
    REGEX_NOT_SPECIAL_CHARACTER: new RegExp(/[^a-zA-Záàãâäéèêëíìîïóòõôöúùûü0-9-çÇ\p{P}\s]+/gu),
    /* Variaveis para as telas de consulta */
    PAGE_SIZE_OPTION: [5, 10, 25, 50, 100, 500],
    FIRST_PAGE_LABEL: 'Primeira pagina',
    LAST_PAGE_LABEL: 'Ultima pagina',
    ITEMS_PAGE_LABEL: 'Itens por pagina',
    NEXT_PAGE_LABEL: 'Próxima pagina',
    PREVIOUS_PAGE_LABEL: 'Voltar pagina',
    ICON_ACTION_VIEW: 'visibility',
    ICON_ACTION_VIEW_LABEL: 'Visualizar ',
    ICON_ACTION_EDIT: 'edit',
    ICON_ACTION_EDIT_LABEL: 'Editar ',
    ICON_ACTION_DELETE: 'delete',
    ICON_ACTION_DELETE_LABEL: 'Deletar ',
    ICON_ACTION_INACTIVE: 'close_small',
    ICON_ACTION_INACTIVE_LABEL: 'Inativar ',
    ICON_ACTION_ACTIVE: 'check',
    ICON_ACTION_ACTIVE_LABEL: 'Ativar ',
    ICON_ACTION_LIST: 'more_horiz',
    ICON_ACTION_LIST_LABEL: 'Exibir ações',
    ICON_ACTIVE_LABEL: 'Ativo',
    ICON_INACTIVE_LABEL: 'Inativo',
    ICON_FIELDS: 'mode_edit',
    ICON_INFORMATION: 'information',
    ICON_ACTION_EXPORT: 'download',
    ICON_ACTION_EXPORT_LABEL: 'Exportar dados'
}