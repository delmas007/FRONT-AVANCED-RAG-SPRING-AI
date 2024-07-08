import { HttpInterceptorFn } from '@angular/common/http';

export const bearerInterceptor: HttpInterceptorFn = (req, next) => {
  // if (req.url.includes('/connexion') || req.url.includes('/inscription/') || req.url.includes('/activation/') || req.url.includes('verification') || req.url.includes('resendMail') ) {
  //   return next(req);
  // }
  const paths = ['/connexion', '/inscription/', '/activation/', 'verification', '/resendMail/','/modifierMotDePasse/','/NouveauMotDePasse/'];

  if (paths.some(path => req.url.includes(path))) {
    return next(req);
  }


  let reqUrl = req.clone({
    headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
  });
  return next(reqUrl);
};
