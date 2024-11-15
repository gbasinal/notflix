import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; 

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  constructor(@Inject(PLATFORM_ID) private platformId : Object) { }

  getSystemLocale(): string{
    if(isPlatformBrowser(this.platformId)){
      const locale = navigator.language;
      return locale.split('-')[1].toLowerCase();
    }
    return 'us';
  }
}
