import { HttpClient, HttpHeaders } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthResult, NbAuthService, NbAuthToken } from '@nebular/auth';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
//   template:`
//   <nb-layout-header fixed>
//     <nb-user [name]="user.name" [picture]="user.picture"></nb-user>
// </nb-layout-header>
//   `,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  token: any;
  user = {};
  userInfo ={};
  authentication = 'Bearer ';

  private destroy$ = new Subject<void>();

  constructor(private authService: NbAuthService, private http: HttpClient) {
    this.authService.onTokenChange().pipe(takeUntil(this.destroy$)).subscribe((token : NbAuthToken)=>{
      
      console.log('token is : '+token + "\n"+token.getName()+"\n"+token.getPayload()+"\n"+token.getValue());
      this.authentication = 'Bearer '+token.getValue();
      this.http.get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json",{headers: new HttpHeaders().set('Authorization', this.authentication)}).subscribe(data => {
        this.user = data;
        console.log(data);
      });

      if(token && token.isValid()) {
        this.token = token;
      }
      console.log('user is : '+ this.user);

    });
  }

  logout() {
    this.authService.logout('google')
      .pipe(takeUntil(this.destroy$))
      .subscribe((authResult: NbAuthResult) => {
      });
  }
  
  ngOnInit(): void {
    
  }

}
