import { Injectable } from '@angular/core';
import { ColorConversionService } from '../color-conversion.service';

@Injectable({
  providedIn: 'root'
})
export class ColorStrawService {
  private hexValue:string='#000000';
  constructor(private colorConversion:ColorConversionService) { }

  colorStraw(event, canvasOrColor) {    
    if(typeof(canvasOrColor)==='string'){
      this.hexValue = canvasOrColor;
    }else{
      let rect = canvasOrColor.imgElmn.getBoundingClientRect();
      let x = event.clientX - rect.left;
      let y = event.clientY - rect.top;
      let imgData = canvasOrColor.ctx.getImageData(x, y, 1, 1).data;
      let r = this.colorConversion.rgbToHex(imgData[0]);
      let g = this.colorConversion.rgbToHex(imgData[1]);
      let b = this.colorConversion.rgbToHex(imgData[2]);
      this.hexValue = `#${r}${g}${b}`;
    }
  }
}
