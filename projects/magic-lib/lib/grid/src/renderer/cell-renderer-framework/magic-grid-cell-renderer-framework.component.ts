import { Component, Injector } from '@angular/core';
import { InjectorGridShowComponent } from '../inj/injector-grid-show-component.inject';

@Component({
  selector: 'magic-grid-cell-renderer-framework',
  template: `
  <div class="div_render">
    <!-- <ng-container *ngComponentOutlet="injectContractPanel.say;injector:injectContractPanel.injector"></ng-container> -->
  </div>
  `
})
export class MagicGridCellRendererFrameworkComponent {
  injectContractPanel: InjectorGridShowComponent = new InjectorGridShowComponent(this.inj);
  constructor(private inj: Injector) { }
  agInit(params: any): void {
    this.injectContractPanel.show(params.context.componentParent.getComponentTypeCellRenderer(params.colDef),
      params.context.componentParent.getValueCellRenderer(
        params.colDef.params.data.params.rowIndex, params.node?.key, (+params.node.id)));
  }
  refresh(params: any): boolean {
    return false;
  }
}
