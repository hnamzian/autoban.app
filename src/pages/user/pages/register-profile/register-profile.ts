import { Component, OnInit } from "@angular/core";
import { NavController, ToastController, Toast } from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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

  toast: Toast;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public formBuilder: FormBuilder, public userProvider: UserProvider, public authProvider: AuthProvider) {}

  async ngOnInit() {
    this.userProfileForm = this.formBuilder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(5)]]
    });
    // this.userProvider.getUser().subscribe(console.log);
    // this.authProvider.authenticateByToken().subscribe(user => {
    //   console.log(user);
    //   this.navCtrl.push(RegisterCarProfilePage);
    // });
  }

  async registerUser() {
    if (this.userProfileForm.invalid) {
      const errorMessage = this.formErrorCheck();
      return this.showToast(errorMessage);
    }

    const user = {
      firstName: this.userProfileForm.get("firstName").value,
      lastName: this.userProfileForm.get("lastName").value,
      email: this.userProfileForm.get("email").value
    } as User;
    const password = this.userProfileForm.get("password").value;

    let userapi$ = await this.userProvider.registerUser(user, password);
    userapi$.subscribe(
      userapi => {
        if (userapi && userapi.success) {
          this.authProvider.tokenStorage.setAuthToken(userapi.token);
          this.navCtrl.push(RegisterCarProfilePage);
          return this.showToast(userapi.message);
        } else if (userapi && !userapi.success) {
          this.navCtrl.push(LoginPage);
          return this.showToast(userapi.message);
        }
      },
      error => {
        this.navCtrl.push(RegisterPage);
        this.showToast("خطا در برقراری ارتباط با سرور");
      }
    );
  }

  formErrorCheck() {
    console.log(this.userProfileForm.get("password"));

    const message = this.userProfileForm.get("firstName").hasError("required")
      ? " نام الزامی است"
      : this.userProfileForm.get("lastName").hasError("required")
      ? "نام خانوادگی  نامعتبر است"
      : this.userProfileForm.get("email").hasError("required")
      ? "پست الکترونیک  نامعتبر است"
      : this.userProfileForm.get("email").hasError("email")
      ? "پست الکترونیک نامعتبر است"
      : this.userProfileForm.get("password").hasError("required")
      ? "رمز ورود الزامی است"
      : this.userProfileForm.get("password").hasError("minlength")
      ? `رمز عبور باید حداقل شامل ${this.userProfileForm.get("password").errors.minlength.requiredLength} حرف باشد`
      : "خطا";
    return message;
  }

  showToast(message) {
    this.toast = this.toastCtrl.create({
      message: message,
      position: "bottom",
      duration: 2000,
      cssClass: "toast"
    });
    this.toast.present();
  }

  dismissToast() {
    this.toast.dismiss();
  }
}
