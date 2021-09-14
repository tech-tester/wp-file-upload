import { Component } from '@angular/core';
import { MatDialog, MatTableDataSource, MatPaginator, MatDialogConfig } from '@angular/material';
import { NotifierService } from 'angular-notifier';
import { Constant } from 'src/app/constants/general.constant';

@Component({ selector: 'app-base', templateUrl: './base.component.html' })

export class BaseComponent {

    public invalidCharactersRegex = ['\\', '/', ':', '*', '?', '"', '<', '>', '|', '´', '°', 'ª', '¡', '·', '¬', '½', '¼', '¾', '±', '←', '↓', '→',
    '↑', 'ø', 'þ', '€', '¢', 'µ', 'ł', '¶', 'ŧ', 'æ', 'α', 'ß', 'ð', 'đ', 'ŋ', 'ħ', 'ł', '↔', '%', '×', '“', '”'];

    public numbersOnlyRegex = new RegExp('^[0-9]*$');
    constructor(protected dialog: MatDialog,
                public notifierService: NotifierService,
                ) {}

    public acortarTexto = (texto, a, b) => {
        if (texto && texto.length > a) {
            return texto.substring(0, b) + '...';
        } else {
            return texto;
        }
    }

    public normalizeName = (fileName) => {
        const twoPeriodsRegex = ['..'];
        let normalizedName = fileName;
        while (twoPeriodsRegex.some(el => normalizedName.includes(el))) { normalizedName = normalizedName.replace('..', '.'); }
        normalizedName = normalizedName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        return normalizedName;
    }
}
