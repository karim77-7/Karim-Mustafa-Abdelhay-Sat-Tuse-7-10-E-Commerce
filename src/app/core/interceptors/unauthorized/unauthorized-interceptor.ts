import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { inject, PLATFORM_ID } from '@angular/core';
import { Router } from "@angular/router";
import { isPlatformBrowser } from '@angular/common';

export const unauthorizedInterceptor: HttpInterceptorFn = (req, next) => {

  let router = inject(Router)
  let platformId = inject(PLATFORM_ID)
  let toastr = inject(ToastrService)
  return next(req).pipe(catchError( (err)=>{

    if (isPlatformBrowser(platformId)) {
      if (err.status == 401 && err.statusText == 'Unauthorized') {
        toastr.error(err.error.message , 'Fresh Cart')
        router.parseUrl('/login')
      }
    }
    return throwError(()=>err)
  } ));
};
