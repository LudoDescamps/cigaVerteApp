import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Headers } from '@angular/http';

let apiUrl = "http://localhost/PHP-Slim-Restful/api/";

@Injectable()
export class AuthServiceProvider {

  constructor(public http: Http) {
    console.log('Hello AuthServiceProvider Provider');
  }

  postData(credentials, type) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(apiUrl + type, JSON.stringify(credentials), {headers: headers }).subscribe(
        res => {
          resolve(res.json());
        },
        (err) => {
          reject(err);
        });
    });
  }
}