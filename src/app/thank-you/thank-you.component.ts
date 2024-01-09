import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css'],
  animations: [
    trigger('tickAnimation', [
      state('hidden', style({ 
        opacity: 0,
        transform: 'scale(0)',
       })),
      state('visible', style({ 
        opacity: 1, 
        transform: 'scale(1)'
      })),
      transition('hidden => visible', [animate('120s')]),
      // transition('visible=> hidden', [animate('0.5s')]),
    ]),
  ],
})
export class ThankYouComponent implements OnInit{
  animationState = 'hidden';
  ngOnInit() {
    this.animationState= 'visible';
  }



  
}
