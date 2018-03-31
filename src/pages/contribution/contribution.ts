import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-contribution',
  templateUrl: 'contribution.html'
})
export class ContributionPage {
  selectedItem: any;
  items: Array<{title: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.items = [
      {
        title: 'Automobile',
        icon: 'img/thumbnail-totoro.png'
      },
      {
        title: 'Books & stationery',
        icon: 'img/thumbnail-totoro.png'
      },
      {
        title: 'Clothing & Footwear',
        icon: 'img/thumbnail-totoro.png'
      },
      {
        title: 'Electronics',
        icon: 'img/thumbnail-totoro.png'
      },
      {
        title: 'Food',
        icon: 'img/thumbnail-totoro.png'
      },
      {
        title: 'Home & Furniture',
        icon: 'img/thumbnail-totoro.png'
      },
      {
        title: 'Sport & Outdoor',
        icon: 'img/thumbnail-totoro.png'
      },
      {
        title: 'Vegetables & Grocery',
        icon: 'img/thumbnail-totoro.png'
      }
    ];
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.setRoot(ContributionPage, item);
  }
}
