import { Component, OnInit, OnDestroy } from '@angular/core';
import { ColorConversionService } from '../../color-conversion.service';
import { ColorInJson } from '../color-in-json';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { useAnimation, transition, trigger, style, animate } from '@angular/animations';
import { slideInAnimation } from '../../animations';

@Component({
  selector: 'app-animation-reader',
  templateUrl: './animation-reader.component.html',
  styleUrls: ['./animation-reader.component.css'],
  animations: [
    trigger('in', [
      transition(':enter', [
        useAnimation(slideInAnimation, {
          params: {
            translateX: 'translateX(-90%)',
            time: '0.6s'
          }
        })
      ])
    ])
  ]
})



export class AnimationReaderComponent implements OnInit, OnDestroy {
  public lottieConfig: any;
  public newlottieConfig: any;
  private anim: any;
  private animationSpeed: number = 1;
  
  constructor(private colorConversion:ColorConversionService ) { 
    this.lottieConfig = {
      path: null,
      renderer: 'svg',
      autoplay: true,
      loop: true
    };

    this.newlottieConfig = {
      path: null,
      renderer: 'svg',
      autoplay: true,
      loop: true
    };
  }

  animationColors:Array<ColorInJson>;

  ngOnInit() {
  }

  ngOnDestroy(){
  	window.URL.revokeObjectURL(this.lottieConfig.path);
    window.URL.revokeObjectURL(this.newlottieConfig.path);
  }

  selectImg(){
  	let uploadingJsonDom = document.querySelector("#uploading-json-input")as HTMLElement;
  	uploadingJsonDom.click();
  }

  getPath(files): void {
  	let file = files[0];
    let jsonReader = new FileReader();
    jsonReader.readAsText(file);
    jsonReader.onload = (event)=>{
      this.getColorArray(jsonReader.result);
    };
    
    this.lottieConfig.path = window.URL.createObjectURL(file);
  }

  getColorArray(file): void {
    let colorFilter=/"k":\[(1|0|0.\d*),(1|0|0.\d*),(1|0|0.\d*),\d\]/g;
    let colorsInJsonFile = file.match(colorFilter);
    this.animationColors = this.organizeColor(colorsInJsonFile);
  }

  organizeColor(arr):Array<ColorInJson>{
  	let objArray=[];
    let colorFilter=/"k":\[(1|0|0.\d*),(1|0|0.\d*),(1|0|0.\d*),\d\]/g;
    let rgbFilter=/(1|0|0.\d*),(1|0|0.\d*),(1|0|0.\d*),\d/g;

  	for(let i=0; i<arr.length; i++){
      if(objArray.indexOf(arr[i]) == -1){
        objArray.push(arr[i]);
      }
  	}

    let colorsData = objArray.map((item)=>{
      let rgbString=item.match(rgbFilter)[0];
      let rgb = this.colorConversion.lottieColorToRgb(rgbString);
      return { jsonMark:item, color:rgb };
    })

  	return colorsData;
  }


  handleAnimation(anim: any) {
    
  }

  stop() {
    this.anim.stop();
  }

  play() {
    this.anim.play();
  }

  pause() {
    this.anim.pause();
  }

  setSpeed(speed: number) {
    this.animationSpeed = speed;
    this.anim.setSpeed(speed);
  }

  updateColors(event){
    // Let Lottie element rerender, and remove the old URL. Important
    if(this.newlottieConfig.path){
      window.URL.revokeObjectURL(this.newlottieConfig.path);
      this.newlottieConfig.path = null;
    }

    let newColors = event.map( item => this.colorConversion.hexTolottieColor(item));
    let reader = new FileReader();

    // Get lottie animation text and replace colors with new colors
    reader.onload = (event)=>{
      let text = reader.result as any;
      
      for(let i=0; i<this.animationColors.length; i++){
        if(newColors[i]){
          text = text.replaceAll(this.animationColors[i].jsonMark, newColors[i]);
        }
      }

      let data = JSON.parse(text);
      let file = new File([JSON.stringify(data)], "lottie.json", {type: "json"});
      
      this.newlottieConfig.path = window.URL.createObjectURL(file);
    };
    
    fetch(this.lottieConfig.path)
      .then(res => res.blob())
      .then(blob=>{
        reader.readAsText(blob);
      })
  }

}
