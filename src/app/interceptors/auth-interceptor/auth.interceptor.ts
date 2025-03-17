import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let user: any = localStorage.getItem('user');
  if (user) user = JSON.parse(user);
  if (user && user.accessToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${user.accessToken}`
      }
    });
    return next(req);
  }
  return next(req);
};
