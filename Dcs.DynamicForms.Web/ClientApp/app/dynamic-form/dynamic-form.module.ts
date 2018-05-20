import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FormButtonComponent } from './components/form-button/form-button.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormSelectComponent } from './components/form-select/form-select.component';
import { DynamicFieldDirective } from '../directives/dynamic-field.directive';
import { DynamicFormComponent } from './dynamic-form.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        DynamicFieldDirective,
        DynamicFormComponent,
        FormButtonComponent,
        FormInputComponent,
        FormSelectComponent
    ],
    exports: [
        DynamicFormComponent
    ],
    entryComponents: [
        FormButtonComponent,
        FormInputComponent,
        FormSelectComponent
    ]
})
export class DynamicFormModule { }
