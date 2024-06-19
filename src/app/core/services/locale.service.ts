import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  constructor() { }

  getSystemLocale(): string{
    const locale = navigator.language;
    return locale.split('-')[1].toLowerCase();
  }
}
