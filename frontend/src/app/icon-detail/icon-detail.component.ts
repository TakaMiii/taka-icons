import { Component, OnInit, ViewChild } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TakaIconComponent } from '../svg-icons/taka-icon/taka-icon.component';

@Component({
  selector: 'app-icon-detail',
  templateUrl: './icon-detail.component.html',
  styleUrls: ['./icon-detail.component.css']
})
export class IconDetailComponent implements OnInit {
  @ViewChild(TakaIconComponent, {static: false}) private iconComponent: TakaIconComponent;

  icon = {
    id: 1,
    name: 'mountain',
  }
  imgUrl;
  hexValue:string='#000000';
  imgCanvas={
    imgElmn: null,
    width: 0,
    height: 0,
    ctx: null,
    uploadImg: null,
  };
  allColorsHex:Array<{color:string, count:number}>=[];

  constructor() { }

  ngOnInit() {
    this.imgCanvas.imgElmn = document.querySelector(".js-canvas-upload")as HTMLElement;
  }

  selectImg(){
  	let uploadingImgDom = document.querySelector("#uploading-img-input")as HTMLElement;
  	uploadingImgDom.click();
  }

  preview(files) {
    this.imgCanvas.ctx = this.imgCanvas.imgElmn.getContext("2d");
    this.imgCanvas.uploadImg = new Image();

    if (files.length===0){
      return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = (_event) => {
      this.imgUrl = reader.result;
      this.imgCanvas.uploadImg.src=this.imgUrl;
      this.imgCanvas.uploadImg.crossOrigin = '';

      this.imgCanvas.uploadImg.onload = (event)=>{
        if( 300 < this.imgCanvas.uploadImg.width){
          let scaleFactor = 300 / this.imgCanvas.uploadImg.width;
          this.imgCanvas.width = 300;
          this.imgCanvas.height = this.imgCanvas.uploadImg.height * scaleFactor;
        }else{
          this.imgCanvas.width = this.imgCanvas.uploadImg.width;
          this.imgCanvas.height = this.imgCanvas.uploadImg.height;
        }
        
        setTimeout(()=>{this.imgCanvas.ctx.drawImage(this.imgCanvas.uploadImg, 0, 0, this.imgCanvas.width, this.imgCanvas.height)}, 10);
      }
    }
  }

  downloadImg(){
    this.iconComponent.downloadSvg();
  }

  colorStraw(event) {
    let rect = this.imgCanvas.imgElmn.getBoundingClientRect();

    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;


    let imgData = this.imgCanvas.ctx.getImageData(x, y, 1, 1).data;

    let r = this.toHex(imgData[0]);
    let g = this.toHex(imgData[1]);
    let b = this.toHex(imgData[2]);
    this.hexValue = "#" + r + g + b;
  }

  toHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

// Make the canvas img be smaller, and translate Image Data be hex color
  getHexColors(){
    let newCanvas = document.createElement('canvas');
    let scaleFactor = 10 / this.imgCanvas.width;
    let height = this.imgCanvas.height * scaleFactor;
    let analysis:Array<{color:string, count:number}>=[];
    
    let ctx = newCanvas.getContext("2d");
    ctx.drawImage(this.imgCanvas.uploadImg, 0, 0, 10, height);

    let rawArray = Array.prototype.slice.call(ctx.getImageData(0, 0, 10, height).data);
    let hexArray = []

    for(let i=0; i<rawArray.length; i+=4){
      let rgb = rawArray.splice(i, 4);
      let hex = "#" + this.toHex(rgb[0])+this.toHex(rgb[1])+this.toHex(rgb[2]);
      hexArray.push(hex);
    }

    for(let i=0; i<hexArray.length; i++){
      let index = analysis.findIndex(element =>  element.color === hexArray[i]);
      
      if(index !== -1){
        analysis[index].count++;
      }else{
        let obj = {
          color: hexArray[i],
          count: 1
        }
        analysis.push(obj);
      }
    }
    this.cutColorsArray(analysis)
  }
  cutColorsArray(arr){
    arr.sort(function (a, b) {
      return b.count - a.count;
    }).length = 6;

    let sum = 0;
    arr.forEach(color => sum += color.count );
     
    arr.map(color=>color.count = Math.round(color.count/sum*100));
    this.allColorsHex = arr;
  }

}
