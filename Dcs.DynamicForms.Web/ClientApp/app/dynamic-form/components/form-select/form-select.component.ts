import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../../model/field-config.interface';
import { Field } from '../../../model/field.interface';


@Component({
    selector: 'form-select',
    styleUrls: ['form-select.component.css'],
    template: `
    <div 
      class="dynamic-field form-select"
      [formGroup]="group">
      <label>{{ config.label }}</label>
      <select [formControlName]="config.name">
        <option value="">{{ config.placeholder }}</option>
        <option *ngFor="let option of config.options">
          {{ option }}
        </option>
      </select>
    </div>
  `
})
export class FormSelectComponent implements Field {
    config: FieldConfig;
    group: FormGroup;
}
