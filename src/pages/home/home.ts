import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { categoryItems, eventItems } from '../../providers/main-config';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  categorys: Array<{ title: string, icon: string }>;
  events: Array<{ title: string, icon: string }>;
  constructor(public navCtrl: NavController) {
    this.categorys = categoryItems
    this.events = eventItems;
  }

}
