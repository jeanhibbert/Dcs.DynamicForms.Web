import { ComponentFactoryResolver, ComponentRef, Directive, Input, OnChanges, OnInit, Type, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from '../model/field.interface';
import { FieldConfig } from '../model/field-config.interface';

import { FormButtonComponent } from '../dynamic-form/components/form-button/form-button.component';
import { FormInputComponent } from '../dynamic-form/components/form-input/form-input.component';
import { FormSelectComponent } from '../dynamic-form/components/form-select/form-select.component';



const components: { [type: string]: Type<Field> } = {
    button: FormButtonComponent,
    input: FormInputComponent,
    select: FormSelectComponent
};

@Directive({
    selector: '[dynamicField]'
})
export class DynamicFieldDirective implements Field, OnChanges, OnInit {
    @Input()
    config: FieldConfig;

    @Input()
    group: FormGroup;

    component: ComponentRef<Field>;

    constructor(
        private resolver: ComponentFactoryResolver,
        private container: ViewContainerRef
    ) { }

    ngOnChanges() {
        if (this.component) {
            this.component.instance.config = this.config;
            this.component.instance.group = this.group;
        }
    }

    ngOnInit() {
        if (!components[this.config.type]) {
            const supportedTypes = Object.keys(components).join(', ');
            throw new Error(
                `Trying to use an unsupported type (${this.config.type}).
        Supported types: ${supportedTypes}`
            );
        }
        const component = this.resolver.resolveComponentFactory<Field>(components[this.config.type]);
        this.component = this.container.createComponent(component);
        this.component.instance.config = this.config;
        this.component.instance.group = this.group;
    }
}
