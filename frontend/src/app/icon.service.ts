import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class IconService {
  public currentSvg: any = "";

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  getIcons() {
  	return this.http.get('/api/taka-icons/icon').pipe(
      map(icons=> {
      	let data:any[]=[];
      	icons.map(icon => {
      		icon.file = icon.file.replace(`<?xml version="1.0" encoding="UTF-8"?>`,"").replace(/\n/g, "").replace(`width="450px" height="450px"`,"");
      		data.push(icon);
      	});

        return data;
      }
    )
  )}

  getIcon(id) {
    return this.http.get(`/api/taka-icons/icon?icon=${id}`).pipe(
      map(icon => {
        let strokeMarks = /stroke="#000000"/gi;
        let svg = this.sanitizer.bypassSecurityTrustHtml(icon.file.replace(`<?xml version="1.0" encoding="UTF-8"?>`,"").replace(/\n/g, "").replace(`width="450px" height="450px"`,"").replace(strokeMarks, `stroke="#000000" class="js-icon-path"`));
        this.currentSvg = svg;
    })
  )}

  // getIcon() {
  //   this.http.get('/api/taka-icons/icon?icon=4').subscribe((data:Object)=>{
  //     let strokeMarks = /stroke="#000000"/gi;
  //     let filePath = data.file.replace(`<?xml version="1.0" encoding="UTF-8"?>`,"").replace(/\n/g, "").replace(`width="450px" height="450px"`).replace(strokeMarks, `stroke="#000000" class="js-icon-path"`);
  //     console.log(filePath);
  //     this.currentSvg = String(this.sanitizer.bypassSecurityTrustHtml(filePath));
  //     return "get icon";
  //   })
  // }
}