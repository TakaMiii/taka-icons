import { animation, trigger, animateChild, group, transition, animate, style, query, } from '@angular/animations';

export const slideInAnimation =
trigger('routeAnimations', [
  transition('IconsList => IconPage', [
  	style({ position: 'relative' }),
  	query(':enter, :leave', [
  	  style({
  	    position: 'absolute',
  	    top: 0,
  	    left: 0,
  	    width: '100%'
  	  })
  	]),
  	query(':enter', [
  	  style({ left: '100%' })
  	]),
  	query(':leave', animateChild()),
  	group([
  	  query(':leave', [
  	    animate('500ms linear', style({ left: '-100%' }))
  	  ]),
  	  query(':enter', [
  	    animate('500ms linear', style({ left: '0%' }))
  	  ])
  	]),
  	query(':enter', animateChild()),
  ]),
  transition('IconPage => IconsList', [
  	style({ position: 'relative' }),
  	query(':enter, :leave', [
  	  style({
  	    position: 'absolute',
  	    top: 0,
  	    left: 0,
  	    width: '100%'
  	  })
  	]),
  	query(':enter', [
  	  style({ left: '-100%' })
  	]),
  	query(':leave', animateChild()),
  	group([
  	  query(':leave', [
  	    animate('500ms linear', style({ left: '100%' }))
  	  ]),
  	  query(':enter', [
  	    animate('500ms linear', style({ left: '0%' }))
  	  ])
  	]),
  	query(':enter', animateChild()),
  ]),
])




