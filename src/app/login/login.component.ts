import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { NbAuthOAuth2Token, NbAuthResult, NbAuthService, NbAuthToken, NB_AUTH_OPTIONS } from '@nebular/auth';
import { takeUntil, takeWhile } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  token: any;

  user = {};

  private destroy$ = new Subject<void>();

  constructor(private authService: NbAuthService, private router: Router) {
    this.authService.onTokenChange().pipe(takeUntil(this.destroy$)).subscribe((token : NbAuthToken)=>{
      
      console.log('token is : '+token + "\n"+token.getName+"\n"+token.getPayload+"\n"+token.getValue);
      if(token && token.isValid()) {
        this.token = token;
        this.user = token.getPayload;
      }
      console.log('user is : '+this.user);

    });
  }
  login() {
    this.authService.authenticate('google')
      .pipe(takeUntil(this.destroy$))
      .subscribe((authResult: NbAuthResult) => {
        this.user = authResult;
        console.log(this.user);
      });
  }
  logout() {
    this.authService.logout('google')
      .pipe(takeUntil(this.destroy$))
      .subscribe((authResult: NbAuthResult) => {
      });
    this.reloadComponent();
  }
  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
