import { Component, OnInit, ViewChild } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TakaIconComponent } from '../svg-icons/taka-icon/taka-icon.component';

@Component({
  selector: 'app-icon-detail',
  templateUrl: './icon-detail.component.html',
  styleUrls: ['./icon-detail.component.css']
})
export class IconDetailComponent implements OnInit {
  //  這個data遲早要拆到service裡
  @ViewChild(TakaIconComponent, {static: false}) private iconComponent: TakaIconComponent;

  icon = {
    id: 1,
    name: 'mountain',
    // icon: '../../assets/svg-icons/mountain.svg'
  }
  imgUrl;
  hexValue:string='#000000';
  imgCanvas={
    img: null,
    width: 100,
    height: 100,
    ctx: null
  };

  constructor() { }

  ngOnInit() {
    this.imgCanvas.img = document.querySelector(".js-canvas-upload")as HTMLElement;

  }

  selectImg(){
  	let uploadingImgDom = document.querySelector("#uploading-img-input")as HTMLElement;
  	uploadingImgDom.click();
  }

  preview(files) {
    this.imgCanvas.ctx = this.imgCanvas.img.getContext("2d");
    let uploadImg = new Image();

    if (files.length===0){
      return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = (_event) => {
      this.imgUrl = reader.result;
      uploadImg.src=this.imgUrl;
      uploadImg.crossOrigin = '';

      uploadImg.onload = ()=>{
        this.imgCanvas.width = uploadImg.width;
        this.imgCanvas.height = uploadImg.height;
        setTimeout(()=>{this.imgCanvas.ctx.drawImage(uploadImg, 0, 0);}, 100);
      }
    }
  }

  downloadImg(){
    this.iconComponent.downloadSvg();
  }

  colorStraw(event) {
    let rect = this.imgCanvas.img.getBoundingClientRect();

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

}
