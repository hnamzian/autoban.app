import { HttpClient } from '@angular/common/http';

export class LoginService {
  constructor(public http: HttpClient) {}

  getData() {
    let url = "https://jsonplaceholder.typicode.com/todos/1";
    // this.http.get(url).subscribe(d => console.log(d))
    console.log("Clicked");
  }
}
