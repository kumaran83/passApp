import { Component, EventEmitter, Output } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { GlobalProvider } from '../../providers/global/global';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  // Show login or sign up 
  loginChoice: String;
  // Store http response
  private response: any;
  // Error message for login status
  errorMsg: string = "";
  // Model for Login and Signup form 
  logModel: FormGroup;
  sigModel: FormGroup;
  // Emit event for login success
  @Output() loginStatus = new EventEmitter<boolean>();
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
    private globalService: GlobalProvider, public loader: LoadingController, private alert: AlertController,
    private storage: Storage) {
    // Login form group 
    this.logModel = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(5)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(7)])
    });
    // Signup form Group 
    this.sigModel = this.formBuilder.group({
      firstName: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
      lastName: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
      phone: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(15)]),
      email: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(5)]),
      passwords: this.formBuilder.group({
        password: new FormControl(null, [Validators.required, Validators.minLength(7)]),
        confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(7)])
      }, { validator: this.passwordConfirming }),
    });
  }

  ionViewDidLoad() {
    this.loginChoice = 'login';
  }
  // Login form submit event
  logForm(): void {
    console.log(this.logModel.value);
    if (this.logModel.value) {
      let loading = this.loader.create({ content: "Please Wait." });
      loading.present();
      this.globalService.getData("app_login.html?email=" + this.logModel.value.email.trim() + "&password=" + this.logModel.value.password.trim())
        .subscribe(
        response => {
          console.log(response);
          this.response = response
        },
        err => {
          // Log errors if any
          this.errorMsg = undefined;
          this.presentAlert('Check the Data/Network Connectivity');
          loading.dismiss();
        },
        () => {
          //Parse response and Bind to view
          this.errorMsg = undefined;
          loading.dismiss();
          if (this.response[0] && this.response[0].status) {
            if (this.response[0].status === 'success' && this.response[0].token) {
              // Store User token in storage
              this.storage.set('token', this.response[0].token).then(() => {
                // Show my account option in menu
                this.loginStatus.emit(true);
                this.navCtrl.setRoot(HomePage);
              }).catch((ex) => {
                console.error('Error in stroring token');
              });
            } else if (this.response[0].status == 'failed') {
              this.errorMsg = "We don't recognize this Email or password";
            }
          } else {
            this.errorMsg = "We don't recognize this Email or password";
          }
        });
    } else {
      this.errorMsg = "Please check the Email or password information";
    }

  }
  // Sign up form submit event
  sigForm(): void {
    console.log(this.sigModel.value);
  }
  // Validation for password and confirm password
  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirmPassword').value) {
      return { invalid: true };
    }
  }
  // Present alert box 
  presentAlert(info) {
    let alert = this.alert.create({
      title: 'Information',
      subTitle: info,
      buttons: ['Dismiss']
    });
    alert.present();
  }


}
