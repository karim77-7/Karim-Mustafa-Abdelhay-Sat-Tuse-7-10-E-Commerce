import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router)
  let toastr = inject(ToastrService)
  let platformId = inject(PLATFORM_ID)
  if (isPlatformBrowser(platformId)) {
    if (localStorage.getItem('token')!= undefined) {
      return true
    }
    else{
      toastr.error('you need to be logged in to access this page' , 'Fresh Cart')
      return router.parseUrl('/login')
    }
  }
  return true;
};
