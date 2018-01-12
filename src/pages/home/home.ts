import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { CatalogPage } from '../catalog/catalog';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { SearchPage } from '../search/search';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public userDetails: any;
  public responseStoreData: any;
  public storeDetails: any;
  userPostData = { "user_id": "", "store_id": "", "token": "" };

  constructor(public navCtrl: NavController, public app: App,
    public authService: AuthServiceProvider, private screenOrientation: ScreenOrientation) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.store_id = this.userDetails.store_id_fk;
    this.userPostData.token = this.userDetails.token;

    this.getStore();   
  }


  getStore() {
    this.authService.postData(this.userPostData, "store").then((result) => {
      this.responseStoreData = result;
      if (this.responseStoreData.storeData) {
        this.storeDetails = this.responseStoreData.storeData;
      } else {
        console.log("Error with APIs");
      }
    }, (err) => {
      // Connection failed message
      console.log(err);
    });
  }

  logout() {
    // Api token Logout
    localStorage.clear();
    this.navCtrl.push("WelcomePage");
  }

  catalog() {
    this.navCtrl.push(CatalogPage);
  }
  search() {
    this.navCtrl.push(SearchPage);
  }
}
