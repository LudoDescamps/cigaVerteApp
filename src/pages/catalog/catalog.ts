import { ItemDetailsPage } from './../item-details/item-details';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

/**
 * Generated class for the CatalogPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-catalog',
  templateUrl: 'catalog.html',
})
export class CatalogPage {

  public userDetails: any;
  public responseData: any;
  public responseStoreData: any;
  public responseItemsData: any;
  public storeDetails: any;
  public itemsList: any;
  public articles: string[];
  searchQuery: string = '';

  userPostData = { "user_id": "", "store_id": "", "token": "" };

  constructor(public navCtrl: NavController, public app: App,
    public authService: AuthServiceProvider) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.store_id = this.userDetails.store_id_fk;
    this.userPostData.token = this.userDetails.token;

    this.initializeItems;
    this.getStore();
    this.getItems();
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

  getItems() {
    this.authService.postData(this.userPostData, "itemsList").then((result) => {
      this.responseItemsData = result;
      if (this.responseItemsData.itemsData) {
        this.itemsList = this.responseItemsData.itemsData;
      } else {
        console.log("Error with APIs");
      }
    }, (err) => {
      // Connection failed message
      console.log(err);
    });
  }

  ViewDetails(item) {
    this.navCtrl.push(ItemDetailsPage, { item: item });
    console.log('ViewProduit : ' + item.name);
  }

  initializeItems() {
    this.articles = [this.itemsList[0]];
    console.log(this.articles[0]);
  }

  getItemsSearch(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();
    //this.articles = this.itemsList.name;
    console.log('getItemsSearch');
    //console.log(this.articles);

    // set val to the value of the ev target
    var val = ev.target.value;
    console.log(val);

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.articles = this.articles.filter((article) => {
       // return (article.indexOf(val) > -1);
      })
    }
  }
}
