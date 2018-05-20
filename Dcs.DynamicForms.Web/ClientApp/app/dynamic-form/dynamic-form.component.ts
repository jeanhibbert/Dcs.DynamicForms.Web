﻿import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FieldConfig } from '../model/field-config.interface';

@Component({
    exportAs: 'dynamicForm',
    selector: 'dynamic-form',
    styleUrls: ['dynamic-form.component.css'],
    template: `
    <form
      class="dynamic-form"
      [formGroup]="form"
      (submit)="handleSubmit($event)">
      <ng-container
        *ngFor="let field of config;"
        dynamicField
        [config]="field"
        [group]="form">
      </ng-container>
    </form>
  `
})
export class DynamicFormComponent implements OnChanges, OnInit {
    @Input()
    config: FieldConfig[] = [];

    @Output()
    submit: EventEmitter<any> = new EventEmitter<any>();

    form: FormGroup;

    get controls() { return this.config.filter(({ type }) => type !== 'button'); }
    get changes() { return this.form.valueChanges; }
    get valid() { return this.form.valid; }
    get value() { return this.form.value; }

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.form = this.createGroup();
    }

    ngOnChanges() {
        if (this.form) {
            const controls = Object.keys(this.form.controls);
            const configControls = this.controls.map((item) => item.name);

            controls
                .filter((control) => !this.listContains(configControls, control))
                .forEach((control) => this.form.removeControl(control));

            configControls
                .filter((control) => !this.listContains(controls,control))
                .forEach((name) => {
                    const config = this.config.find((control) => control.name === name);
                    if (config) {
                        this.form.addControl(name, this.createControl(config));
                    }
                });

        }
    }

    listContains(list: any[], item : any) :boolean
    {
        if (list) {
            list.forEach(x => {
                if(x === item) {
                    return true;
                        } 
                });
        }

        return false;
    }


    createGroup() {
        const group = this.fb.group({});
        this.controls.forEach(control => group.addControl(control.name, this.createControl(control)));
        return group;
    }

    createControl(config: FieldConfig) {
        const { disabled, validation, value } = config;
        return this.fb.control({ disabled, value }, validation);
    }

    handleSubmit(event: Event) {
        event.preventDefault();
        event.stopPropagation();
        this.submit.emit(this.value);
    }

    setDisabled(name: string, disable: boolean) {
        if (this.form.controls[name]) {
            const method = disable ? 'disable' : 'enable';
            this.form.controls[name][method]();
            return;
        }

        this.config = this.config.map((item) => {
            if (item.name === name) {
                item.disabled = disable;
            }
            return item;
        });
    }

    setValue(name: string, value: any) {
        this.form.controls[name].setValue(value, { emitEvent: true });
    }
}