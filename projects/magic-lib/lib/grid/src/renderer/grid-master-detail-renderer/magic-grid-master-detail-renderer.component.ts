import { Component, Injector } from '@angular/core';
import { InjectorGridShowComponent } from '../inj/injector-grid-show-component.inject';
import { IMagicGridConfig } from 'projects/magic-lib/lib/other/model/interface/magicGrid.interface';

@Component({
  selector: 'me-magic-grid-master-detail-renderer',
  template: `
  <div class="div_render">
    <!-- <ng-container *ngComponentOutlet="injectContractPanel.say;injector:injectContractPanel.injector"></ng-container> -->
  </div>
  `,
  styleUrls: ['./magic-grid-master-detail-renderer.component.scss'],
})
export class MagicGridMasterDetailRendererComponent {
  injectContractPanel: InjectorGridShowComponent = new InjectorGridShowComponent(this.inj);
  height: number = 200;
  constructor(private inj: Injector) { }
  agInit(params: any): void {
    const master: IMagicGridConfig = params.context.componentParent.gridConfig;
    if (master.masterDetail?.component) {
      this.height = master.masterDetail.height;
      this.injectContractPanel.show(master.masterDetail?.component, params.context.componentParent.showExpanded);
    }
  }
  refresh(params: any): boolean {
    return false;
  }
}
