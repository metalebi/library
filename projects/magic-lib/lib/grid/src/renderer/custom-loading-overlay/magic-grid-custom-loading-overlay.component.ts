import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ILoadingOverlayParams } from 'ag-grid-community';
import { ILoadingOverlayAngularComp } from 'ag-grid-angular';
import { MagicImageBase64 } from 'projects/magic-lib/lib/other/helper/imageBase64';

@Component({
  selector: 'me-magic-grid-custom-loading-overlay',
  template: `
  <p style="font-size:1rem;">
    در حال بارگذاری
    <img [src]="imageBase64" alt="loading" style="width: 35px;height: 35px;">
  </p>
  `
})
export class MagicGridCustomLoadingOverlayComponent implements ILoadingOverlayAngularComp {
  constructor(private dom: DomSanitizer) { }
  agInit(params: ILoadingOverlayParams<any, any>): void {
  }
  imageBase64: SafeUrl = this.dom.bypassSecurityTrustUrl(MagicImageBase64.loadingGif());
}
