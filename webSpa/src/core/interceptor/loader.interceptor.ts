import { inject, Injectable } from '@angular/core';
import {
    HttpResponse,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { AuthGuardService } from '../services/auth-guard.service';
import { SnackBarService } from '../services/snackBar.service';
import { EnumTypeMessage, EnumActionMessage } from '../enums/enums';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    private requests: HttpRequest<any>[] = [];
    private loaderService: LoadingService = inject(LoadingService);
    private authGuardService: AuthGuardService = inject(AuthGuardService);
    private snackBarService: SnackBarService = inject(SnackBarService);

    removeRequest(req: HttpRequest<any>) {
        const i = this.requests.indexOf(req);
        if (i >= 0) {
            this.requests.splice(i, 1);
        }
        this.loaderService.isLoading.next(this.requests.length > 0);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const loading: boolean = this.makeLoading(req);
        this.requests.push(req);
        this.loaderService.isLoading.next(loading);
        return new Observable<HttpEvent<any>>(observer => {
            const subscription = next.handle(req).subscribe(
                event => {
                    if (event instanceof HttpResponse) {
                        this.removeRequest(req);
                        observer.next(event);
                    }
                },
                err => {
                    this.removeRequest(req);
                    if (this.isUserTokenExpired()) {
                        this.snackBarService.sendSnackBarNotification('', EnumTypeMessage.TokenExpired, EnumActionMessage.Info, false);
                        this.authGuardService.logout();
                    } else {
                        observer.error(err);
                    }
                },
                () => {
                    this.removeRequest(req);
                    observer.complete();
                });
            return () => {
                this.removeRequest(req);
                subscription.unsubscribe();
            };
        }).pipe(
            finalize(() => {
                this.loaderService.isLoading.next(false);
            })
        );
    }

    private isUserTokenExpired(): boolean {
        if (this.authGuardService.isAuthenticated() && this.authGuardService.isTokenExpired()) {
            return true;
        }
        return false;
    }

    private makeLoading(req: HttpRequest<any>): boolean {
        return !!req &&
            (req.url.indexOf('notify/getAllNotifications') !== -1 ||
                req.url.indexOf('notify/readNotification') !== -1) ? false : true;
    }
}
