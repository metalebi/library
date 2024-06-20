import { Injector } from "@angular/core";
import { DataInjectorGrid } from "./data-injector-grid-inject";
import { ComponentType } from "ag-grid-community";


export class InjectorGridShowComponent {
    constructor(private inj: Injector) { }
    say!: ComponentType;
    injector!: Injector;
    show(component: ComponentType, data: any) {
        this.say = component;
        this.injector = Injector.create([
            { provide: DataInjectorGrid, useValue: { data: data } }
        ], this.inj);
    }
    hide() {
        const injectSay: any = null;
        this.say = injectSay;
    }
}