import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
  HttpHeaderResponse,
  HttpSentEvent,
  HttpProgressEvent,
  HttpUserEvent,
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { map, catchError, filter, take, switchMap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { Events, LoadingController } from '@ionic/angular';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private isLoading = false;
  private isRefreshingToken = false;
  private tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private injector: Injector,
              private router: Router,
              public events: Events,
              public loadingCtrl: LoadingController) { }

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ setHeaders: { Authorization: 'Bearer ' + token } });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isRefreshingToken) {
      req = this.addToken(req, localStorage.getItem('RefreshToken'));
    } else {
      req = this.addToken(req, localStorage.getItem('AccessToken'));
    }

    if (!req.headers.has('Content-Type')) {
      req = req.clone({
        setHeaders: {
          'content-type': 'application/json'
        }
      });
    }

    req = req.clone({
      headers: req.headers.set('Accept', 'application/json')
    });

    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.handle401Error(req, next);
        } else {
          return throwError(error);
        }
      }));
  }

  handle401Error(req: HttpRequest<any>, next: HttpHandler) {

    /*Intentamos resincronizar un nuevo token de acceso........*/
    if (!this.isRefreshingToken) {
      // Immediately set isRefreshingToken to true so no more calls come
      // in and call refreshToken again – which we don’t want of course
      this.isRefreshingToken = true;

      // Reset here so that the following requests wait until the token
      // comes back from the refreshToken call.
      this.tokenSubject.next(null);

      const http = this.injector.get(HttpClient);
      const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' });
      return http.get<any>(environment.apiUrl + 'api/auth/refresh', { headers: reqHeader }).subscribe(data => {
        if (data.accesstoken) {

          localStorage.setItem('AccessToken', data.accesstoken.token);
          this.tokenSubject.next(data.accesstoken.token);

          return next.handle(this.addToken(req, data.accesstoken.token));
        } else {
          return this.logoutUser();
        }
      }, error => {
        return this.logoutUser();
      }, () => {
        this.isRefreshingToken = false;
      });
    } else {
      return this.tokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(token => {
          return next.handle(this.addToken(req, localStorage.getItem('AccessToken')));
        }));
    }
  }

  logoutUser() {

    // ACCEDEMOS A LA PAGINA PRINCIPAL
    const queryParams = {
      entidad: '',
      usuario: '',
      logo: '',
      logged: false
    };

    // Lanzamos el evento para actualizar la imagen, la entidad y el usuario
    this.events.publish('login:singin', queryParams);

    // Volvemos a la pantalla de login
    this.router.navigate(['/']);
  }
}
