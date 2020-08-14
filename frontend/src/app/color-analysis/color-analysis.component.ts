import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-color-analysis',
  templateUrl: './color-analysis.component.html',
  styleUrls: ['./color-analysis.component.css']
})
export class ColorAnalysisComponent implements OnInit {
  @Input() colors:Array<{color:string, count: number}>

 
  constructor() { }

  ngOnInit() {}
}
