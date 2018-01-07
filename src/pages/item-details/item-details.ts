import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html',
})
export class ItemDetailsPage {

  public userDetails: any;
  public responseData: any;
  public responseStoreData: any;
  public responseItemsData: any;
  public storeDetails: any;
  public itemsList: any;
  public item: any;
  
  userPostData = { "user_id": "", "store_id": "", "token": "" };

  constructor(public navCtrl: NavController, public app: App,
    public authService: AuthServiceProvider, public navParams: NavParams) {

    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.store_id = this.userDetails.store_id_fk;
    this.userPostData.token = this.userDetails.token;

      this.item = navParams.data.item;
      console.log(this.item);

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

  ViewDetails(item)
  {
    this.navCtrl.push(ItemDetailsPage,{item:item});
    console.log('ViewProduit : '+item);
  }

}