import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setStorage(key: string, value: any) {
    Preferences.set({ key: key, value: JSON.stringify(value) });
  }
  
  async getStorage(key: string) {
    const { value } = await Preferences.get({ key: key });
    return value ? JSON.parse(value) : null;
  }

  removeStorage(key: string) {
    Preferences.remove({ key: key });
  }

  clearStorage() {
    Preferences.clear();
  }
}
