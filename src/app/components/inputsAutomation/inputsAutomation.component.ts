import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { MatDialog } from '@angular/material';
import { Constant } from 'src/app/constants/general.constant';
import { BaseComponent } from '../base/base.component';

@Component({ selector: 'app-inputs-automation', templateUrl: './inputsAutomation.component.html' })
export class InputsAutomationComponent extends BaseComponent implements OnInit {

    @ViewChild('inputFile') inputFile: ElementRef;
    public inputsForm: FormGroup;
    public archivoSeleccionado: any;
    public estados = [{id: 1, description: 'Abierto'}, {id: 2, description: 'Cerrado'}, {id: 3, description: 'Anulada'}];
    public placeholderText: string = Constant.FILE_INPUT_PLACEHOLDER;
    public extensions = ['txt' , 'pdf' , 'jpg' , 'jpeg' , 'doc' , 'docx' , 'xls' , 'xlsx', 'zip', 'rar'];
    public selectedFilesList = [];

    constructor(public dialog: MatDialog, public notifierService: NotifierService) { super(dialog, notifierService) }

    ngOnInit() { this.initForm() }

    public initForm() {
        this.inputsForm = new FormGroup({ basicfile: new FormControl(''), estado: new FormControl(''), total: new FormControl('') });
    }

    get estado() { return this.inputsForm.get('estados'); }

    public selectFile = (ev, multiple) => {
        if (this.selectedFilesList.length + Array.from(ev.target.files).length > 10){
            this.notifierService.notify(Constant.ERROR, Constant.MAX_FILES_AMOUNT_ERROR);
            return false;
        }
        if (multiple) {
            let unrepeatedFile = true;
            if(Array.from(ev.target.files).length > 10){
                    this.notifierService.notify(Constant.ERROR, Constant.MAX_FILES_AMOUNT_ERROR);
                    return false;
            }
            Array.from(ev.target.files).forEach(file => {
                for (let selectedFile of this.selectedFilesList) {
                    let actualFile: any = file;
                    if(selectedFile.name == actualFile.name) {
                        unrepeatedFile = false;
                            this.notifierService.notify(Constant.ERROR, `${Constant.FILE_ERROR_START} ${this.acortarTexto(this.normalizeName(actualFile.name), 30, 25)} ${Constant.DUPLICATE_FILE_ERROR}`);
                    };
                }
                if (unrepeatedFile) { if (this.validateFile(file)) { this.selectedFilesList.push(file); } };
            });
            ev.target.value = '';
        } else if (ev.target.files[0]) {
            const file = ev.target.files[0];
            ev.target.value = '';
            if (this.validateFile(file)) this.archivoSeleccionado = file;
        }
    }

    private validateFile = (file) => {
        const validations = [this.validateFileName, this.validateFileSize, this.validateFileExtension];
        return this.validateFunctions(validations, file);
    }

    private validateFileName = (validation: Validation) => {
        this.checkForInvalidCharacters(validation);
        this.checkFirstCharacterPeriod(validation);
        this.checkFileLength(validation);
    }

    private validateFileExtension = (validation: Validation) => {
        const name = validation.data.name;
        const lastDot = name.lastIndexOf('.');
        const ext = (name.substring(lastDot + 1)).toLowerCase();
        if (!this.extensions.find(extension => extension == ext )) {
            this.fileSelectError(`${Constant.FILE_ERROR_START}${this.acortarTexto(name, 25, 20)}${Constant.INVALID_FILE_EXTENSION_END}`);
            validation.result = false;
        }
    }

    private validateFileSize = (validation: Validation) => {
        if (parseFloat((validation.data.size / 1048576).toFixed(2)) >= 25) {
            this.fileSelectError(Constant.FILE_SIZE + `${this.acortarTexto(validation.data.name, 25, 20)}`+ Constant.FILE_SIZECONTINUE + `25MB`);
            validation.result = false;
        }
    }

    private checkFileLength = (validation: Validation) => {
        if (validation.data.name.length > 100) {
            this.fileSelectError(Constant.FILE_UPLOAD_ERROR_LENGTH + `${this.acortarTexto(validation.data.name, 25, 20)}`  +Constant.FILE_UPLOAD_ERROR_LENGTHCONTINUE);
            validation.result = false;
        }
    }

    private checkFirstCharacterPeriod = (validation: Validation) => {
        if (validation.data.name[0] === '.') {
            this.fileSelectError(`${Constant.FILE_ERROR_START}${this.acortarTexto(validation.data.name, 25, 20)}${Constant.INVALID_FILE_NAME_PERIOD}`);
            validation.result = false;
        }
    }

    private checkForInvalidCharacters = (validation: Validation) => {
        if (this.invalidCharactersRegex.some(el => validation.data.name.includes(el))) {
            this.fileSelectError(Constant.FILE_ERROR_START + `${this.acortarTexto(validation.data.name, 25, 20)}` + Constant.INVALID_CHARACTER_NAME);
            validation.result = false;
        }
    }

    private fileSelectError = (errorMessage) => {
        this.notifierService.notify(Constant.ERROR, errorMessage);
        this.archivoSeleccionado = null;
        this.inputsForm.patchValue({ basicfile: '' });
        this.inputsForm.patchValue({ newFile: '' });
    }

    private validateFunctions = (validations, data) => {
        const validation = new Validation(data);
        validations.forEach(v => v.call(this, validation));
        return validation.result;
    }

    public validateValue = (field) => {
        if (this.inputsForm.get(`${field}`).value == ',' || this.inputsForm.get(`${field}`).value  == '.') this.inputsForm.get(`${field}`).setValue('0,00');
        if (this.inputsForm.get(`${field}`).value) {
            const newValue: string = this.inputsForm.get(`${field}`).value.toString();
            if (newValue.includes('.')) this.inputsForm.get(`${field}`).setValue(newValue.replace('.', ','));
        }
    }
}

export class Validation {
    result: boolean;
    data: any;
    constructor(data) {
        this.result = true;
        this.data = data;
    }
}
