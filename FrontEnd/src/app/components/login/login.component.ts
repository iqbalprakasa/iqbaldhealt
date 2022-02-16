import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from '../../service/app.config.service';
import { AppConfig } from '../../api/appconfig';
import { Subscription } from 'rxjs';
import { AppService } from '../../servicesdb/service.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [ConfirmationService, MessageService],
  styles:[`
    :host ::ng-deep .p-password input {
    width: 100%;
    padding:1rem;
    }

    :host ::ng-deep .pi-eye{
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }

    :host ::ng-deep .pi-eye-slash{
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }
  `]
})
export class LoginComponent implements OnInit, OnDestroy {

  valCheck: string[] = ['remember'];

  password: string;

  User : String;
  
  config: AppConfig;
  
  subscription: Subscription;
   user: any;
  checked = false;
  result: any;
  resultAkses: any;
  loading = false;
  showLoading: boolean = false;

  constructor(public configService: ConfigService,public appservice: AppService, private confirmationService: ConfirmationService, private messageService: MessageService,  private router: Router){ }

  ngOnInit(): void {
    this.config = this.configService.config;
    this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
    });
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
   keyDownFunction(event:any) {
    if (event.keyCode == 13) {
      this.login(event);
    }
  }
    confirm2(event: Event) {debugger;
        this.confirmationService.confirm({
            key: 'confirm2',
            target: event.target,
            message: 'Are you sure that you want to proceed?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.messageService.add({severity: 'info', summary: 'Confirmed', detail: 'You have accepted'});
            },
            reject: () => {
                this.messageService.add({severity: 'error', summary: 'Rejected', detail: 'You have rejected'});
            }
        });
    }
  login(event: Event){
     
      this.showLoading = true
      this.loading = true;
      window.localStorage.clear();
      var delete_cookie = function (name:any) {
        var today = new Date();
        var expr = new Date(today.getTime() + (-1 * 24 * 60 * 60 * 1000));
        document.cookie = name + '=;expires=' + (expr.toUTCString());
      }
      delete_cookie('authorization');
      delete_cookie('statusCode');
      delete_cookie('io');
      debugger;
      var obj = {
        'user': this.user,
        'password': this.password
      }
      this.appservice.postLogin(obj).subscribe(data => {
        this.showLoading = false
        this.loading = false;
        this.result = data;
        this.messageService.add({ severity: 'success', summary: 'Sukses', detail: 'Login Sukses' });
        // var cookieStr = "statusCode=" + this.result.data.kelompokUser.kelompokUser + ';';
         var cookieStr = "statusCode=1";
        document.cookie = cookieStr;
        // document.cookie = 'authorization=' + this.result.messages['X-AUTH-TOKEN'] + ";";
        var dataUserLogin = {
          id: this.result.data.id,
          kdUser: this.result.data.namaUser,
          waktuLogin: new Date()
        };
        // window.localStorage.setItem('user-data', String(JSON.stringify(dataUserLogin)));
        // window.localStorage.setItem('pegawai', JSON.stringify(this.result.data.pegawai));
debugger;
        window.localStorage.setItem('pegawai', JSON.stringify(this.result.data.token));

        this.router.navigate(['/pages/resep']);
        this.messageService.add({severity: 'info', summary: 'Confirmed', detail: 'You have accepted'});
      }, error => {
        // this.showLoading = false
        // console.log(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Login Gagal' });
        // this.messageService.add({severity: 'info', summary: 'Confirmed', detail: 'You have accepted'});
      });
      


    }

}
