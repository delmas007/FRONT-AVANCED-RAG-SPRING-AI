import { HttpInterceptorFn } from '@angular/common/http';

export const bearerInterceptor: HttpInterceptorFn = (req, next) => {

  let reqUrl = req.clone({
    // headers : req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    headers : req.headers.set('Authorization', 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJjZWRyaWNrIiwic2NvcGUiOiJBRE1JTiIsImlzcyI6InNlY3VyaXR5LXNlcnZpY2UiLCJleHAiOjE3MTU0NDUzNDYsImlhdCI6MTcxNTQ0NDc0Niwibm9tIjoiYW5nYW1hbiIsInByZW5vbSI6ImNlZHJpY2sifQ.dWh_-NIr40N528otkyd-eVQ_b9NmV1mrnbd6q2TB0Ay1uKajCj04Vq1gldSmXjeGLajReasN-OopDK02f5Y5esiqVTJOierfEi4fJSO_8qY_-OxbNdSkl4sP9ZC_0dqEBwkmd5OFh3lEtriEBnHMWGIbptsX83Lib-Xsu4yAAZUOaHxFJXlN3Y1lEBQGi3sC3OdlYjTihmJskxRSy4bWe2YP7ip4DrConuSvroaTL7g0EQIjseYemAp6BL8dV6836xJNYNyxZ0FxnMgLLl2SbQeuH938eBn7SnQ-1sHDljpZl3UP4hW4XRbLQKb49gvPEUnKPQ785MD5SWhHJEn4XbV2hzM7WAtvgJ9NUM_cV13-l98YagLV4d_TljJWj4SxqkwNH-G9AAe-TzwjaTId_Ib8UtmusNjUsRs1y50hp0p9Tl4stjbYbbBR1ZxcxulhGCV3IisI-_T2ioVrX1RgoSWwZNAXIjmGvYSKS98x70jOOuQh0T1wPkK_6UVyC4Nz')

  })
  console.log('Requête avec en-tête Authorization :', reqUrl);
  return next(reqUrl)
};
