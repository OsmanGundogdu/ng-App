import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from './auth-response.model';
import { BehaviorSubject, catchError, Subject, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api_key = environment.api_key;
  apiUrl = environment.api_url;
  signInUrl = environment.sign_in_url;
  user = new BehaviorSubject<User|null>(null);

  constructor(private http: HttpClient) { }

  register(email: string, password: string) {
    return this.http.post<AuthResponse>(this.apiUrl + this.api_key, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      tap(response => {
        this.handleUser(response.email, response.localId, response.idToken, response.expiresIn);
      }),
      catchError(this.handleError)
    );
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem("user");
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(this.signInUrl + this.api_key, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      tap(response => {
        this.handleUser(response.email, response.localId, response.idToken, response.expiresIn);
      }),
      catchError(this.handleError)
    );
  }

  autoLogin() {
    if (localStorage.getItem("user") == null)
      return;

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const loadedUser = new User(user.email,user.id, user._token, new Date(user._tokenExpirationDate));

    if (loadedUser.token)
      this.user.next(loadedUser);
  }

  private handleError (err: HttpErrorResponse) {
    let message = "Hata Oluştu!";

    // eski paket kullanılıyor o yüzden burada hep "hata oluştu" default değeri gelecek
    if (err.error.error) {
      switch (err.error.error.message) {
        case "EMAIL_EXISTS": 
          message = "E-posta adresi zaten başka bir hesap tarafından kullanılıyor."
          break;
        case "TOO_MANY_ATTEMPTS_TRY_LATER":
          message = "Çok fazla deneme yapıldı. Güvenliğiniz için bu cihazdan yapılacak işlemleri bloke ediyoruz. Lütfen, sonra tekrar deneyin."
          break;
        case "EMAIL_NOT_FOUND":
          message = "Girmeye çalıştığın e-posta adresini tanıyamadık. Kontrol eder misin?"
          break;
        case "INVALID_PASSWORD":
          message = "Parolan yanlış. Lütfen girmiş olduğun parolayı kontrol edip tekrar gir."
          break;
      }
    }

    return throwError(() => message);
  }

  private handleUser(email: string, localId: string, idToken: string, expiresIn: string) {
    // observable, subject => rxjs 
    const expirationDate = new Date(new Date().getTime() + (+expiresIn * 1000));

    const user = new User(
      email,
      localId,
      idToken,
      expirationDate
    );

    this.user.next(user);

    localStorage.setItem("user", JSON.stringify(user));
  }
}
