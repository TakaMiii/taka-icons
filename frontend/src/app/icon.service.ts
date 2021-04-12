import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})

export class IconService {
  public currentSvg: Object;

  strokeMarks = /stroke="#000000"/gi;
  fillMarks = /fill="#000000"/gi;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  replaceTemplate(icon):string{
    return icon.replace(`<?xml version="1.0" encoding="UTF-8"?>`,"").replace(/\n/g, "").replace(`width="450px" height="450px"`,"").replace(this.strokeMarks, `stroke="#000000" class="js-icon-path"`).replace(this.fillMarks, `fill="#000000" class="js-icon-shape"`);
  }

  getIcons() {
  	return this.http.get('/api/taka-icons/icon').pipe(
      map(icons => {
      	icons['map'](icon => {
          icon.file = this.replaceTemplate(icon.file);
          icon.file = this.sanitizer.bypassSecurityTrustHtml(icon.file);
      	});
        return icons;
      }),
      catchError(err => {
        console.log(err)
        return [];
      })
    )
  };

  getIcon(id) {
    return this.http.get(`/api/taka-icons/icon?icon=${id}`).pipe(
      map(icon => {
        let iconTemplate = this.replaceTemplate(icon['file']);
        let svg = this.sanitizer.bypassSecurityTrustHtml(iconTemplate);
        this.currentSvg = svg;
    })
  )}
}