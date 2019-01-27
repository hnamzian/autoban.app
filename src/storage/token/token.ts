import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

@Injectable()
export class TokenStorage {
  constructor(public storage: Storage) {}

  async setSMSToken(token) {
    await this.storage.ready();
    const result = await this.storage.set("SMSToken", token)
    return result
  }

  async getSMSToken() {
    await this.storage.ready();
    const token = await this.storage.get("SMSToken")
    return token
  }

  async setAuthToken(token) {
    await this.storage.ready();
    const result = await this.storage.set("AuthToken", token)
    return result
  }

  async getAuthToken() {
    await this.storage.ready();
    const token = await this.storage.get("AuthToken")
    return token
  }
}
