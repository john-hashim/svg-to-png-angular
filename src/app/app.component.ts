import { Component, OnInit } from '@angular/core';
import domtoimage from 'dom-to-image';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'svg-to-png';
  canvas!:any;
  context!:any

  ngOnInit(){
    this.canvas = document.getElementById('viewport'),
    this.context = this.canvas.getContext('2d');
  }

  convert(){

    // element to convert
    let el: HTMLElement = document.getElementById('container')!

    // Method 1, 
    // Directly convert dom element to png using dom-to-image package, 
    // In this method with sometimes inner elements will not inclueded in the final PNG
    domtoimage.toPng(el).then((base64) => {
      console.log(`raw png generated using method 1 ${base64}}`)
    })

    // Method 2
    // step 1 : Convert dom element to svg and then convert svg to PNG 
    domtoimage.toSvg(el).then((rawSvg) => { 

      // step2: draw image on canvas
      let base_image = new Image();
      base_image.src = rawSvg;
      base_image.onload = () => {
        this.context.drawImage(base_image, 0, 0);

        // step3 once image loaded in canvas, extraxt data URL as png 
        let canvas : any = document.getElementById('viewport')
        const img    = canvas.toDataURL('image/png')
        console.log(`raw png generated using method 2 ${img}`)
      }
    })
  }

}
