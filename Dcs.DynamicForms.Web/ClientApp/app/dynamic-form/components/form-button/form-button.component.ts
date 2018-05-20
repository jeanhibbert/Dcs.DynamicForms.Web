import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../../model/field-config.interface';
import { Field } from '../../../model/field.interface';

@Component({
    selector: 'form-button',
    styleUrls: ['form-button.component.css'],
    template: `
    <div 
      class="dynamic-field form-button"
      [formGroup]="group">
      <button
        [disabled]="config.disabled"
        type="submit">
        {{ config.label }}
      </button>
    </div>
  `
})
export class FormButtonComponent implements Field {
    config: FieldConfig;
    group: FormGroup;
}
