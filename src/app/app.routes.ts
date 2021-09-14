import { Routes } from '@angular/router';
import { InputsAutomationComponent } from './components/inputsAutomation/inputsAutomation.component';

export const ROUTES: Routes = [
    { path: 'inputs-automation', component: InputsAutomationComponent},

    { path: '**', redirectTo: '/inputs-automation' }
];

