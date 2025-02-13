import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

export function authInterceptor(req: HttpRequest<any>, next: HttpHandlerFn) {
//   console.log(req);
  let modifiesReq = req;
  if (req.method =='POST') {
    modifiesReq = req.clone({
        headers: req.headers.append("content-type", "application/json")
    })
  }
  return next(modifiesReq);
}
