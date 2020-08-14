import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SocialLoginModule, AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})

export class FacebookLoginService {
  user: SocialUser;
  loggedIn: boolean;

  constructor(private authService: AuthService) {}

  getLoginStatus(): Observable<any>{
  	return new Observable(
  	  observer=>{
  	  	this.authService.authState.subscribe((user) => {
  	  	  this.user = user;
  	  	  this.loggedIn = (user != null);
  	  	  observer.next(this.loggedIn);
  	  	})
  	  }
  	)
  }

  signIn(): Observable<any> {
    console.log("step2:", FacebookLoginProvider.PROVIDER_ID);
    return new Observable(
      observer=>{
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
      }
    )
  }

  signOut(): Observable<any> {
  	return new Observable(
      observer=>{
        this.authService.signOut();
        observer.next('done');
      }
  	)
  }
}
