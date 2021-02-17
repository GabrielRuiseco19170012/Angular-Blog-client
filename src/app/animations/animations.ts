import {animate, state, style, transition, trigger} from '@angular/animations';

export const openClose = trigger('openClose', [
  state('open', style({
    opacity: 1
  })),
  state('close', style({
    height: '0px',
    opacity: 0
  })),
  transition('close => open', [
    animate('0.7s')
  ]),
  transition('open => close', [
    animate('0.7s')
  ]),
]);

export const showHide = trigger('showHide', [
  state('void', style({
    opacity: 0
  })),
  transition(':enter', [
    animate('1.5s', style({opacity: 1}))
  ])
]);

export const enterLeave = trigger('enterLeave', [
  state('void', style({
    transform: 'translateX(-100%)',
    opacity: 0
  })),
  transition(':enter', [
    animate('1s', style({transform: 'translateX(0)', opacity: 1}))
  ])
]);
