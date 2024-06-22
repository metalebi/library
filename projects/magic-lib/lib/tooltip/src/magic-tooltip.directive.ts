import {
  Directive, ElementRef, ApplicationRef, ComponentFactoryResolver,
  Injector, Input, ComponentRef, HostListener, EmbeddedViewRef, OnDestroy
} from '@angular/core';
import { MagicTooltipPosition } from '../../other/helper/type/defult.type';
import { MagicTooltipComponent } from './magic-tooltip.component';

@Directive({
  selector: '[magicTooltip]'
})
export class MagicTooltipDirective implements OnDestroy {

  constructor(private elementRef: ElementRef, private appRef: ApplicationRef, private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector) { }

  ngOnDestroy(): void {
    this.destroy();
  }
  @Input() magicTooltip: string = '';
  @Input() magicTooltipPosition: MagicTooltipPosition = 'below';
  @Input() magicTooltipShowDelay = 100;
  @Input() magicTooltipHideDelay = 100;

  private componentRef: ComponentRef<any> | null = null;
  private showTimeOut?: number;
  private hideTimeOut?: number
  private touchTimeOut?: number

  @HostListener('mouseenter') onMouseEnter() {
    this.initializeTooltip();
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.setHideTooltipTimeout();
  }
  @HostListener('click') onMouseClick() {
    this.setHideTooltipTimeout();
  }
  @HostListener('mousemove', ['$event']) onMouseMove($event: MouseEvent) {
    if (this.componentRef !== null && this.magicTooltipPosition === 'dynamic') {
      this.componentRef.instance.left = $event.clientX;
      this.componentRef.instance.top = $event.clientY;
      this.componentRef.instance.tooltip = this.magicTooltip;
    }
  }
  @HostListener('touchend') onTouchEnd() {
    window.clearTimeout(this.touchTimeOut)
    this.setHideTooltipTimeout();
  }

  private initializeTooltip() {
    if (!this.magicTooltip)
      return;
    if (this.componentRef === null) {
      window.clearInterval(this.magicTooltipHideDelay);
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(MagicTooltipComponent);
      this.componentRef = componentFactory.create(this.injector);
      this.appRef.attachView(this.componentRef.hostView);
      const [tooltipDOMElement] = (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes;
      this.setTooltipComponentProperties();
      document.body.appendChild(tooltipDOMElement);
      this.showTimeOut = window.setTimeout(this.showTooltip.bind(this), this.magicTooltipShowDelay)
    }
  }
  setTooltipComponentProperties() {
    if (this.componentRef !== null) {
      const { left, right, top, bottom } = this.elementRef.nativeElement.getBoundingClientRect();
      const gapConvert = 60;
      if (this.magicTooltipPosition == right && ((right + gapConvert) > window.innerWidth)) {
        this.magicTooltipPosition = 'left';
      } else if (this.magicTooltipPosition == 'above' && top < gapConvert) {

        this.magicTooltipPosition = 'below';
      } else if (this.magicTooltipPosition == 'below' && bottom < gapConvert && top > gapConvert) {
        this.magicTooltipPosition = 'above';
      }
      this.componentRef.instance.position = this.magicTooltipPosition;
      this.componentRef.instance.tooltip = this.magicTooltip;
      switch (this.magicTooltipPosition) {
        case 'below': {
          this.componentRef.instance.left = Math.round((right - left) / 2 + left);
          this.componentRef.instance.top = Math.round(bottom);
          break;
        }
        case 'above': {
          this.componentRef.instance.left = Math.round((right - left) / 2 + left);
          this.componentRef.instance.top = Math.round(top);
          break;
        }
        case 'right': {
          this.componentRef.instance.left = Math.round(right);
          this.componentRef.instance.top = Math.round(top + (bottom - top) / 2);
          break;
        }
        case 'left': {
          this.componentRef.instance.left = Math.round(left);
          this.componentRef.instance.top = Math.round(top + (bottom - top) / 2);
          break;
        }
        default:
          break;
      }
    }
  }
  showTooltip() {
    if (this.componentRef !== null) {
      this.componentRef.instance.visible = true;
    }
  }
  setHideTooltipTimeout() {
    this.hideTimeOut = window.setTimeout(this.destroy.bind(this), this.magicTooltipHideDelay);
  }
  private destroy() {
    if (this.componentRef !== null) {
      window.clearInterval(this.showTimeOut);
      window.clearInterval(this.magicTooltipHideDelay);
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }
}
