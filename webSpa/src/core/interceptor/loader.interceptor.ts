import { inject, Injectable } from '@angular/core';
import {
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { AuthGuardService } from '../services/auth-guard.service';
import { SnackBarService } from '../services/snackBar.service';
import { EnumTypeMessage, EnumActionMessage } from '../enums/enums';
import { CONSTANT_HTTP_STATUS_CODE } from '../constants/variables.constant';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];
  private loaderService: LoadingService = inject(LoadingService);
  private authGuardService: AuthGuardService = inject(AuthGuardService);
  private snackBarService: SnackBarService = inject(SnackBarService);
  private messageError: string = '';

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.loaderService.isLoading.next(this.requests.length > 0);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const loading: boolean = this.makeLoading(req);
    this.requests.push(req);
    this.loaderService.isLoading.next(loading);
    return new Observable<HttpEvent<any>>((observer) => {
      const subscription = next.handle(req).subscribe(
        (event) => {
          if (event instanceof HttpResponse) {
            this.removeRequest(req);
            observer.next(event);
          }
        },
        (err) => {
          this.removeRequest(req);
          if (
            err.error.statusCode === CONSTANT_HTTP_STATUS_CODE.BAD_REQUEST ||
            err.error.statusCode === 422
          ) {
            this.messageError = !!err.error.message ? err.error.message : '';
            this.snackBarService.sendSnackBarNotification(
              err.error.message,
              EnumTypeMessage.Personalized,
              EnumActionMessage.Warning,
              false,
            );
          } else if (
            err.error.statusCode === CONSTANT_HTTP_STATUS_CODE.INTERNAL_ERROR ||
            err.error.statusCode ===
              CONSTANT_HTTP_STATUS_CODE.SERVICE_UNAVAILABLE_CODE ||
            err.error.statusCode === CONSTANT_HTTP_STATUS_CODE.BAD_GATEWAY
          ) {
            this.messageError = !!err.error.message ? err.error.message : '';
            this.snackBarService.sendSnackBarNotification(
              err.error.message,
              EnumTypeMessage.Personalized,
              EnumActionMessage.Error,
              false,
            );
          } else if (
            err.error.statusCode === CONSTANT_HTTP_STATUS_CODE.FORBIDDEN ||
            err.error.statusCode === CONSTANT_HTTP_STATUS_CODE.UNAUTHORIZED
          ) {
            this.messageError = !!err.error.message ? err.error.message : '';
            this.snackBarService.sendSnackBarNotification(
              err.error.message,
              EnumTypeMessage.Personalized,
              EnumActionMessage.Info,
              false,
            );
          }
        },
        () => {
          this.removeRequest(req);
          observer.complete();
        },
      );
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    }).pipe(
      finalize(() => {
        this.loaderService.isLoading.next(false);
      }),
    );
  }

  private makeLoading(req: HttpRequest<any>): boolean {
    return !!req &&
      (req.url.indexOf('notify/getAllNotifications') !== -1 ||
        req.url.indexOf('notify/readNotification') !== -1)
      ? false
      : true;
  }
}
