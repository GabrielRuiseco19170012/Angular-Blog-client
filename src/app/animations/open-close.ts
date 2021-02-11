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
  state('open', style({
    opacity: 1
  })),
  state('close', style({
    opacity: 0
  })),
  transition('close => open', [
    animate('10s')
  ]),
  transition('open => close', [
    animate('0s')
  ]),
]);
