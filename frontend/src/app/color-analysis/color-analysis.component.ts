import { Component, OnInit, Input } from '@angular/core';
import { ColorStrawService } from '../icon-detail/color-straw.service';

@Component({
  selector: 'app-color-analysis',
  templateUrl: './color-analysis.component.html',
  styleUrls: ['./color-analysis.component.css']
})
export class ColorAnalysisComponent implements OnInit {
  @Input() colors:Array<{color:string, count: number}>

 
  constructor(private colorStrawService:ColorStrawService) { }

  ngOnInit() {}

  strawColor(e, color:string){
  	this.colorStrawService.colorStraw(e, color);
  }
}
