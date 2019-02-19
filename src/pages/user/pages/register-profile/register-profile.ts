import { Component, OnInit } from "@angular/core";
import { NavController } from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, catchError } from "rxjs/operators";
import { RegisterCarProfilePage } from "../../../car/pages/register-car-profile/register-car-profile";
import { RegisterPage } from "../../../auth/pages/register/register";
import { LoginPage } from "../../../auth/pages/login/login";
import { UserProvider } from "../../../../providers/user/user";
import { AuthProvider } from "../../../../providers/auth/auth";
import { User } from "../../../../models/user";

@Component({
  selector: "register-profile",
  templateUrl: "register-profile.html"
})
export class RegisterProfilePage implements OnInit {
  headerImageUrl = "../../assets/imgs/person.png";
  headerTitle = "اطلاعات شخصی";

  userProfileForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public userProvider: UserProvider,
    public authProvider: AuthProvider
  ) {}

  async ngOnInit() {
    this.userProfileForm = this.formBuilder.group({
      mobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
    // this.userProvider.getUser().subscribe(console.log);
    // this.authProvider.authenticateByToken().subscribe(user => {
    //   console.log(user);
    //   this.navCtrl.push(RegisterCarProfilePage);
    // });
  }

  async registerUser() {

    // ToDo: handle this error
    if(this.userProfileForm.invalid) {
      console.log("error");
    }

    const user = {
      firstName: this.userProfileForm.get("firstName").value,
      lastName: this.userProfileForm.get("lastName").value,
      mobileNumber: this.userProfileForm.get("mobileNumber").value
    } as User;
    const password = this.userProfileForm.get("password").value;

    let userapi$ = await this.userProvider.registerUser(user, password);
    userapi$.subscribe(userapi => {
      console.log(userapi);

      if (!userapi) {
        this.navCtrl.push(RegisterPage);
      } else if (!userapi.success) {
        this.navCtrl.push(LoginPage);
      } else {
        this.authProvider.tokenStorage.setAuthToken(userapi.token);
        this.navCtrl.push(RegisterCarProfilePage);
      }
    });
  }
}
