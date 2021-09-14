import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({ selector: '[appTwoDigitsDecimalNumber]' })
export class TwoDigitsDecimalNumberDirective {

    private regex: RegExp = new RegExp(/^\d{0,13}\,?\d{0,2}$|^\d{0,13}(\.)?\d{0,2}$/g);
    private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', '-', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];

    constructor(private el: ElementRef) {
    }

    @HostListener('keydown', ['$event'])
    onKeyDown(event: any) {
        if (this.specialKeys.indexOf(event.key) !== -1) { return; }
        const current: string = this.el.nativeElement.value;
        const position = this.el.nativeElement.selectionStart;
        const next: string = [current.slice(0, position), event.key == 'Decimal' ? '.' : event.key, current.slice(position)].join('');
        switch(event.path[0].id) {
            case 'importeOtrosImpuestosInput': 
            case 'baseImponibleInput' : 
            case 'importeIVAInput': {
                if (position == 0 && (next === ',' || next === '.')) { event.preventDefault(); }
                if (position >= 11 && !next.includes(',') && !next.includes('.')) { event.preventDefault(); }
                if (next && !String(next).match(this.regex)) { event.preventDefault(); }
                break;
            }
            case 'alicuotaOtrosImpuestosInput': {
                if (position == 0 && (next === ',' || next === '.')) { event.preventDefault(); }
                if (position >= 3 && !next.includes(',') && !next.includes('.')) { event.preventDefault(); }
                if (next && !String(next).match(this.regex)) { event.preventDefault(); }
                break;
            }
            default: {
                if (position == 0 && (next === ',' || next === '.')) { event.preventDefault(); }
                if (position >= 13 && !next.includes(',') && !next.includes('.')) { event.preventDefault(); }
                if (next && !String(next).match(this.regex)) { event.preventDefault(); }
                break;
            }
        }
    }
}
