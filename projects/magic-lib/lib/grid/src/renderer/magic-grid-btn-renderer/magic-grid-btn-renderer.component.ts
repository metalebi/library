import { Component, HostListener } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
import { MagicGridValueGetterParamsHelper } from '../../magic-grid-value-getter-params-helper';
import { IMagicGridButton, IMagicGridButtonConfig, IValueGetterParams } from 'projects/magic-lib/lib/other/model/interface/magicGrid.interface';
import { MagicColorType, MagicSizeType } from 'projects/magic-lib/lib/other/helper/type/defult.type';

@Component({
  selector: 'me-magic-grid-btn-renderer',
  templateUrl: './magic-grid-btn-renderer.component.html',
  styleUrls: ['./magic-grid-btn-renderer.component.scss',
    '../../../../button/magic-button/magic-button.component.scss',
  ]
})
export class MagicGridBtnRendererComponent {
  params!: ICellRendererParams;
  dataRow: IValueGetterParams<any> = { data: '', rowIndex: -1, id: -1 };
  sizeIcon?: MagicSizeType;
  buttonList: IMagicGridButtonConfigForRenderer[] = [];
  leftChildBtn: number = 0;
  childButtons: IMagicGridButtonConfig[] = [];
  @HostListener('window:click', ['$event'])
  onClick() {
    this.childButtons = [];
  }
  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.buttonList = (<IMagicGridButton>(params.context.componentParent.gridButtons)).buttons;
    this.dataRow = MagicGridValueGetterParamsHelper.getCellRendererParams(params);
  }
  getColor(data?: MagicColorType | ((params: IValueGetterParams<any>) => MagicColorType)): MagicColorType {
    return (this.getCallFunction(data) as any);
  }
  getCallFunction(model?: string | ((params: IValueGetterParams<any>) => string)): string {
    if ((model as any)?.name) {
      const valueGetterParams = MagicGridValueGetterParamsHelper.getCellRendererParams(this.params);
      return (model as any).call((model as any), valueGetterParams);
    }
    return (model as any);
  }
  showButton(model?: ((params: IValueGetterParams<any>) => boolean)) {
    if ((model as any)?.name) {
      return (model as any).call(model, MagicGridValueGetterParamsHelper.getCellRendererParams(this.params))
    }
    return true;
  }
  style(item: IMagicGridButtonConfig, isChild: boolean = false) {
    if (!item?.icon && item?.image) {
      let img: any = item.image;
      if ((item?.image as any)?.name) {
        img = (img.image as any).call((item.image as any), this.dataRow);
      }
      if (isChild) {
        return {
          'background-image': `url(${img})`, 'background-size': '85%',
          'background-repeat': 'no-repeat', 'background-position': 'top 7px center',
        }
      } else {
        return {
          'background-image': `url(${img})`, 'background-size': '85%',
          'line-height': '0', 'border-radius': '0', 'padding': '0', 'width': '25px', 'height': '22px',
          'background-repeat': 'no-repeat', 'background-position': 'center',
        }
      }
    }
    if (isChild)
      return {};
    return { 'width': '30px', 'height': '25px', 'line-height': '0' }
  }
  classBtn(item: IMagicGridButtonConfig): string {
    return (item?.disabled && item?.disabled(this.dataRow)) ?
      ' disabled_icon text-secondary' : ' text-' + this.getColor(item.color) + (item?.image ? ' image_btn_grid' : '')
  }
  clickButton(item: IMagicGridButtonConfig, index: number) {
    this.dataRow.rowIndex = this.params?.node?.childIndex;
    item.click(this.dataRow);
    if (item?.children?.length) {
      switch ((this.buttonList.length - index)) {
        case 1:
          this.leftChildBtn = 10;
          break;
        case 2:
          this.leftChildBtn = 45;
          break;
        case 3:
          this.leftChildBtn = 82;
          break;
        case 3:
          this.leftChildBtn = 82;
          break;
        case 4:
          this.leftChildBtn = 116;
          break;
        default:
          this.leftChildBtn = (this.buttonList.length - index) * 32;
          break;
      }
      setTimeout(() => {
        this.childButtons = item?.children ?? [];
      });
    }
  }
  getBadge(model?: string | ((params: IValueGetterParams<any>) => string)): string | null {
    if (!model)
      return null;
    if ((model as any)?.name)
      return this.getCallFunction(model);
    if (!model?.length)
      return null;
    const list = (model as any).split('.');
    let res = this.params.data;
    for (let i = 0; i < list.length; i++) {
      res = res[list[i]];
    }
    return res;
  }
  isDisableItem(item: IMagicGridButtonConfig) {
    if (item.disabled)
      return item.disabled(this.dataRow);
    return false;
  }
}
interface IMagicGridButtonConfigForRenderer extends IMagicGridButtonConfig {

}