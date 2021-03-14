import { HttpClient, HttpHeaders } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthResult, NbAuthService, NbAuthToken } from '@nebular/auth';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  token: any;
  user:any=[];
  authentication = 'Bearer ';

  private destroy$ = new Subject<void>();

  constructor(private authService: NbAuthService, private http: HttpClient, private router: Router) {
    this.authService.onTokenChange().pipe(takeUntil(this.destroy$)).subscribe((token : NbAuthToken)=>{
      this.authentication = 'Bearer '+token.getValue();
      this.http.get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json",{headers: new HttpHeaders().set('Authorization', this.authentication)}).subscribe(res => {
        this.user = res;
        console.log(this.user);
      });

      if(token && token.isValid()) {
        this.token = token;
      }

    });
  }

  logout() {
    this.authService.logout('google')
      .pipe(takeUntil(this.destroy$))
      .subscribe((authResult: NbAuthResult) => {
      });
      this.router.navigateByUrl('');
  }
  
  ngOnInit(): void {
    
  }

}
