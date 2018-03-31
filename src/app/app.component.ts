import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { PostContributionPage } from '../pages/post-contribution/post-contribution';
// import { ContributionPage } from '../pages/contribution/contribution';
import { categoryItems, eventItems } from '../providers/main-config';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  toggleCategory: boolean = false;
  toggleEvent: boolean = false;
  categorys: Array<{ title: string, icon: string }> = categoryItems;
  events: Array<{ title: string, icon: string }> = eventItems;

  pages: Array<{title: string, display: boolean, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', display: true, component: HomePage },
      { title: 'Login', display: true, component: LoginPage },
      { title: 'My Account', display: false, component: LoginPage },
      { title: 'Post Your Contribution', display: true, component: PostContributionPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page): void {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  togglecategoryMenu(): void {
    // Show and hide the sub menu
    this.toggleCategory = !this.toggleCategory;
  }
  toggleEventMenu(): void {
    this.toggleEvent = !this.toggleEvent;
  }
}
