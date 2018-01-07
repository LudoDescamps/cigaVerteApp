import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { HomePage } from './../home/home';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  responseData: any;
  userData = { "username": "", "password": "", "email": "", "name": ""};

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup() {
    if (this.userData.username && this.userData.password && this.userData.email && this.userData.name) {
      // Api connection
      this.authService.postData(this.userData, "signup").then((result) => {
        this.responseData = result;
        console.log((this.responseData));
        localStorage.setItem('userData', JSON.stringify(this.responseData));
        this.navCtrl.push(HomePage);
      }, (err) => {
        // Connection failed message
        console.log(err);
      });
    } else {
      console.log("Give valid information");
    }
  }

  login() {
    this.navCtrl.push(LoginPage);
  }
}
