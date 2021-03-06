﻿import { Component, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from '../../../model/field.interface';
import { FieldConfig } from '../../../model/field-config.interface';


@Component({
    selector: 'form-input',
    styleUrls: ['form-input.component.css'],
    template: `
    <div 
      class="dynamic-field form-input" 
      [formGroup]="group">
      <label>{{ config.label }}</label>
      <input
        type="text"
        [attr.placeholder]="config.placeholder"
        [formControlName]="config.name">
    </div>
  `
})
export class FormInputComponent implements Field {
    config: FieldConfig;
    group: FormGroup;
}