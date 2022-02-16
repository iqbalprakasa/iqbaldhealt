// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { ReplaySubject } from 'rxjs';
// import { tap, timeout } from 'rxjs/operators';
// import { Configuration, MessageService, AuthGuard, InfoService, UserDto } from '../helper';
// // import { AlertService } from '../../helper';


// @Injectable({
//   providedIn: 'root'
// })
// export class ServiceService {
// DataLogin: any;
//   DataCheckLogin: any;
//   authenticationState = new ReplaySubject();
//   token: any;
//   dataLogin: any;
//     authDto: any;
//   superDto: any;


//   API_URL = 'http://localhost:9000/service/';
//   // API_URL = 'http://103.93.237.70:9000/service/';
//   // API_URL = 'http://localhost:9000/service/';
//   // API_URL = 'http://http://localhost:9000/service/';
//   token_yeuh = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbi5pdCJ9.yA2GELoqmY5D9XcBeQxStR2-G_VzTZLw71iQTX_WKTa3cNQ5SwmpjstC6E0NbDZF8IENQFMy_u23ya2vv7lG-g';

//   TOKEN_yeuh = 'token';
//   PASS = 'pass';
//   versi = 'versi';
//   versi_new = 'v.1';
//   constructor(private httpClient: HttpClient,private http: Http, private info: InfoService, private alert: AlertService, ) { }
//  delete_cookie(name: string) {
//     var today = new Date();
//     var expr = new Date(today.getTime() + (-1 * 24 * 60 * 60 * 1000));
//     document.cookie = name + '=;expires=' + (expr.toUTCString());
//   }
//   test():Observable<any> {
//     return this.httpClient.get(
//       "https://www.youtube.com/watch?v=ZqQaEVHYCZY?q=${value}"
//     );
//   }
  
//   private createUserDto(user: any): UserDto {
//     let userDTO: UserDto;

//     let iKdUser = user.kdUser;
//     let iKdPegawai = user.pegawai.id;

//     userDTO = {
//       id: user.kdUser,
//       token: user.token,//user[Configuration.get().headerToken],
//       waktuLogin: new Date(),
//       namaUser: user.namaUser,
//       kdUser: iKdUser,
//       encrypted: user.kataSandi,
//       idPegawai: iKdPegawai,
//       kdPegawai: iKdPegawai,
//       pegawai: user.pegawai,
//       namaPerusahaan: '',
//       kelompokUser: user.kelompokUser,
//       profile: {
//         namaProfile: 'King Banana',
//         alamatProfile: 'Jln. Jakarta No.01, DKI Jakarta'
//       }
//     };
//     return userDTO;
//   }
//   login(id: string, password: string) {
//     window.localStorage.clear();

//     this.delete_cookie('authorization');
//     this.delete_cookie('statusCode');
//     this.delete_cookie('io');

//     if (!Date.now) {
//       Date.now = function now() {
//         return new Date().getTime();
//       };
//     }

//     return this.httpClient.post(this.API_URL + 'auth/sign-in', {
//       namaUser: id.trim(),
//       kataSandi: password.trim()
//     })
//       .map((response: Response) => {
//         debugger;
//         console.log(response);
//         let temp_response = JSON.parse(response["_body"]);

//         if (temp_response.code == 200) {
//           let user = response.json();
//           this.authDto = user;
//           if (user) {
//             let userDTO = this.createUserDto(user);
//             localStorage.setItem('user.data', JSON.stringify(userDTO));
//             return userDTO;
//           }
//           return user;
//         } else {
//           if (temp_response.code == 500) {
//             this.alert.error('Error', 'Login gagal, Username atau Password Salah.');
//           } else {
//             this.alert.error('Error', 'Login gagal, Periksa Koneksi Jaringan.');
//           }
//         }
//       }, error => {
//         this.alert.error('Error', 'Login gagal, Username atau Password Salah.');

//       });
//   }

//   getNorm(x) {
//     //ambil data dari localstorage
//     // let dataStorage=JSON.parse(localStorage.getItem(this.token_yeuh));
//     //  this.token=dataStorage["X-AUTH-TOKEN"];    
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'X-AUTH-TOKEN': this.token_yeuh,
//       'X-URL': '#/reservasi',
//       'X-USER-CREATE': 'transmedic'
//     });
//     return this.httpClient.get(this.API_URL + 'reservasionline/get-pasien/'+x, { headers: headers }).pipe(
//       timeout(9000),
//       tap(Data => {
//         return Data;
//       })
//     );
//   }
// }

import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
// let token = 'eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6W119.i2OVQdxr08dmIqwP7cWOJk5Ye4fySFUqofl-w6FKbm4EwXTStfm0u-sGhDvDVUqNG8Cc7STtUJlawVAP057Jlg'
let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiJ9.QKWR1t8OsaBbi2-lP0oIM2aPcsA3Fer02qbqLe5w_GrjIVphuSipA5W_xXBQ2Hs9tT_hwvHGOf7LOgek3KLyAA';
// debugger;
let authorization = localStorage.getItem('X-AUTH-TOKEN');
if (authorization == null)
  authorization = token

const httpHeaders = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer '+token
    'X-AUTH-TOKEN': authorization
  })
  
};

@Injectable({
  providedIn: 'root'
})

export class AppService {
  dataPasienRajal: any;
  // dataTempatTidurTerpakai: any[];
  // dataSourceInfoKedatangan: any[];
  http: HttpClient;
  urlPrefix: string;
  urlLogin: string;
  // urlLogin2: string;
  urlLogout: string;
  // urlLogout2: string;
  apiTimer: any;
  counter = 10;

  constructor(http: HttpClient, @Inject(Window) private window: Window) {

    this.http = http;
    if (this.window.location.hostname.indexOf('http://localhost') > -1) {
      this.urlPrefix = 'http://localhost:9000/service/';
      this.urlLogin = 'http://localhost:9000/service/login';
      this.urlLogout = 'http://localhost:9000/service/logout';
    } else if (this.window.location.hostname.indexOf('202.51.105.98') > -1) {
      this.urlPrefix = 'http://localhost:9000/service/';
      this.urlLogin = 'http://localhost:9000/service/auth/sign-in';
      this.urlLogout = 'http://localhost:9000/service/auth/sign-out';
    } else if (this.window.location.hostname.indexOf('10.10.20.167') > -1) {
      this.urlPrefix = 'http://10.10.20.167:9000/service/';
      this.urlLogin = 'http://10.10.20.167:9000/service/auth/sign-in';
      this.urlLogout = 'http://10.10.20.167:9000/service/auth/sign-out';
    }  else {
      this.urlPrefix = 'http://localhost:9000/service/';
      this.urlLogin = 'http://localhost:9000/service/login';
      this.urlLogout = 'http://localhost:9000/service/logout';
    }
  }

  getTransaksi(url) {
    return this.http.get(this.urlPrefix + url, httpHeaders);
  }

  postTransaksi(url, data) {
    return this.http.post(this.urlPrefix + url, data, httpHeaders);
  }

  postLogin(data) {
    return this.http.post(this.urlLogin, data);
  }

  posteuy(data) {
    return this.http.post(this.urlPrefix+ 'cheklist', data,httpHeaders);
  }

  logout(datauserlogin, headersPost) {
    return this.http.post(this.urlLogout, datauserlogin, headersPost);
  }

  getColor() {
    return ['#7cb5ec', '#FF0000', '#C71585', '#434348', '#90ed7d', '#f7a35c',
      '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b',
      '#91e8e1', '#CD5C5C', '#FF69B4', '#FF8C00', '#9370DB', '#ADFF2F',
      '#00FF00', '#9ACD32', '#66CDAA', '#00FFFF', '#4682B4', '#678900',
      '#CD853F', '#191970', '#1E90FF', '#00CED1'];
  }
  getColorGiw() {
    return ['#7cb5ec', '#75b2a3', '#9ebfcc', '#acdda8', '#d7f4d2', '#ccf2e8',
      '#468499', '#088da5', '#00ced1', '#3399ff', '#00ff7f',
      '#b4eeb4', '#a0db8e', '#999999', '#6897bb', '#0099cc', '#3b5998',
      '#000080', '#191970', '#8a2be2', '#31698a', '#87ff8a', '#49e334',
      '#13ec30', '#7faf7a', '#408055', '#09790e'];
  }
  getUrlExternal(url) {
    return this.http.get(url);
  }
  goLogout() {
    var urlLogout = 'pages/login'
    var datauserlogin = JSON.parse(window.localStorage.getItem("datauserlogin"))
    var headersPost = {
      headers: {
        "AlamatUrlForm": urlLogout
      }
    }
    this.logout(datauserlogin, headersPost)
    window.localStorage.clear();
  }

}

