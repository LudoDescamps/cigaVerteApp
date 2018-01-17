import { Settings } from './../../app/models/Settings';
import { Injectable } from '@angular/core';

/*
  Generated class for the SettingsServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SettingsServiceProvider {
  settings: Settings = {
    language: 'fr'
  }

  constructor() {
    if (localStorage.getItem('settings') != null) {
      this.settings = JSON.parse(localStorage.getItem('settings'));
    }
  }

  getSettings(){
    return this.settings;
  }

  changeSettings(settings: Settings){
    localStorage.setItem('settings', JSON.stringify(settings));
  }
}
