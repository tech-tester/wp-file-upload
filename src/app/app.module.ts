// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material-module';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { NotifierModule } from 'angular-notifier';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { NgxMaskModule } from 'ngx-mask';
import { TwoDigitsDecimalNumberDirective } from './directives/two-digits-decimal-number.directive';

// Routes
import { ROUTES } from './app.routes';
// Components
import { AppComponent } from './app.component';
import { BaseComponent } from './components/base/base.component';
import { InputsAutomationComponent } from './components/inputsAutomation/inputsAutomation.component';


@NgModule({
    declarations: [
        AppComponent,
        BaseComponent,
        TwoDigitsDecimalNumberDirective,
        InputsAutomationComponent
        ],
    imports: [
        CommonModule,
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        RouterModule.forRoot(ROUTES, {useHash: true}),
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule,
        NotifierModule.withConfig({
            position: { horizontal: { position: 'right', distance: 12 }, vertical: { position: 'top', distance: 80, gap: 10 } },
            theme: 'material',
            behaviour: { autoHide: 5000, onClick: false, onMouseover: 'pauseAutoHide', showDismissButton: true, stacking: 5 },
            animations: {
                enabled: true,
                show: { preset: 'slide', speed: 300, easing: 'ease' },
                hide: { preset: 'fade', speed: 300, easing: 'ease', offset: 50 },
                shift: { speed: 300, easing: 'ease' },
                overlap: 150
            }
        }),
        NgxPaginationModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFileUploadModule,
        MaterialFileInputModule,
        NgxMaskModule.forRoot()
    ],
    bootstrap: [ AppComponent ],
    entryComponents: [ ]
})


export class AppModule { }
