import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorConversionService {
  constructor() { }

  rgbToHex(c){
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  hexTolottieColor(c){
    let r, g, b;
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(c);
    r = parseInt(result[1], 16)/255;
    g = parseInt(result[2], 16)/255;
    b = parseInt(result[3], 16)/255;
    
    return `"k":[${r},${g},${b},1]`;
  }

  lottieColorToRgb(rgb){
  	let rgbArray = rgb.split(",");
  	let r = Math.floor(Number(rgbArray[0])*255);
  	let g = Math.floor(Number(rgbArray[1])*255);
  	let b = Math.floor(Number(rgbArray[2])*255);

    return `rgb(${r},${g},${b})`;
  }
}