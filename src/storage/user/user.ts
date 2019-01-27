import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { User } from "../../models/user";

@Injectable()
export class UserStorage {
  constructor(public storage: Storage) {}

  async setUser(user: User) {
    await this.storage.set("User", user);
  }

  async getUser() {
    let user: User = await this.storage.get("User")
    return user
  }
}
