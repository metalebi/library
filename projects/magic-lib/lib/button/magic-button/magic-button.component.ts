import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MagicCommonService } from '../../http/magic-common.service';
import { MagicButtonType, MagicColorType, MagicSizeType, MagicStyleType } from '../../other/helper/type/defult.type';

@Component({
  selector: 'magic-button',
  templateUrl: './magic-button.component.html',
  styleUrls: ['./magic-button.component.scss']
})
export class MagicButtonComponent {
  @ViewChild('button') button!: MatButton;
  constructor(private _serviceCommon: MagicCommonService) {
    _serviceCommon.matProgressbar.subscribe(res => {
      this.disabledServer = res;
    });
  }

  @Input() color: MagicColorType = 'primary';
  @Input() disabled: boolean = false;
  @Input() icon: string = '';
  @Input() onlyIcon: boolean = false;
  @Input() tooltip: string = '';
  @Input() fontSize: MagicSizeType = 'sm';
  @Input() style: MagicStyleType = {};
  @Input() type: MagicButtonType = 'icon';
  @Output() onClick = new EventEmitter();
  @Output() onHover = new EventEmitter();

  disabledServer: boolean = false;

  _clickButton() {
    this.onClick.emit();
  }
  _hoverButton() {
    this.onHover.emit();
  }
  _disabledBtn(): boolean {
    if (this.disabled == true) {
      return true;
    } else {
      return this.disabledServer;
    }
  }
  _classBtn(): string {
    let nameClass = this.fontSize + ' ';
    if (this.color != 'white')
      nameClass += 'text-whit ';
    else
      nameClass += 'text-black ';
    const colorDeferent = this.style['background'];
    if (!colorDeferent)
      nameClass += 'bg-' + this.color;
    return nameClass;
  }
  focus(value: boolean) {
    if (value) {
      this.button.focus();
    } else {

    }
  }
}
