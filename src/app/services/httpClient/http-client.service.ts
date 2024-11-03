import { Injectable } from '@angular/core';
import { ErrorHandlingService } from '../errorHandling/error-handling.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  private baseUrl: string = 'http://localhost';
  private baseUrlProd: string = 'https://btkakademiroadmapper.com.tr';
  private baseApi: string = 'api';
  private basePort: string = "5054";
  private unPopularIPAddress: string = "http://34.163.142.183"
  constructor(private httpClient: HttpClient, private errorHandlingService: ErrorHandlingService) { }

  //dev
  // private url(requestParameters: Partial<RequestParameters>): string {
  //   return `${this.baseUrl}:${this.basePort}/${this.baseApi}/${requestParameters.controller}${requestParameters.action ? `/${requestParameters.action}` : ''}`;
  // }

  //staging
  // private url(requestParameters: Partial<RequestParameters>): string {
  //   return `${this.unPopularIPAddress}/${this.baseApi}/${requestParameters.controller}${requestParameters.action ? `/${requestParameters.action}` : ''}`;
  // }


  //prod-KUBE
  private url(requestParameters: Partial<RequestParameters>): string {
    return `${this.baseUrlProd}/${this.baseApi}/${requestParameters.controller}${requestParameters.action ? `/${requestParameters.action}` : ''}`;
  }

  get<T>(requestParameters: Partial<RequestParameters>, id?: string): Observable<HttpResponse<T>> {
    let url: string = "";
    if (requestParameters.fullEndpoint) {
      requestParameters.fullEndpoint = requestParameters.fullEndpoint.replace('http://localhost:30000', 'https://btkakademiroadmapper.com.tr');
      //requestParameters.fullEndpoint = requestParameters.fullEndpoint.replace('http://localhost:30000', 'http://34.163.142.183');
      //requestParameters.fullEndpoint = requestParameters.fullEndpoint.replace('http://localhost:30000', 'http://localhost');

      url = requestParameters.fullEndpoint;
    } else {
      url = this.url(requestParameters);

      if (requestParameters.queryStringList && requestParameters.queryStringList.length > 0) {
        const queryString = requestParameters.queryStringList.join('&');
        url = `${url}?${queryString}`;
      } else if (requestParameters.querystrings) {
        url = `${url}?${requestParameters.querystrings}`;
      }
    }
    url = url.replace(/\s/g, '');
    return this.httpClient.get<T>(url, { headers: requestParameters.headers, observe: 'response' });
  }

  post<T>(requestParameters: Partial<RequestParameters>, body: any | null): Observable<HttpResponse<T>> {
    let url: string = "";
    if (requestParameters.fullEndpoint) {
      requestParameters.fullEndpoint = requestParameters.fullEndpoint.replace('http://localhost:30000', 'https://api.btkakademiroadmapper.com.tr');
      //requestParameters.fullEndpoint = requestParameters.fullEndpoint.replace('http://localhost:30000', 'http://34.163.142.183');
      //requestParameters.fullEndpoint = requestParameters.fullEndpoint.replace('http://localhost:30000', 'http://localhost');
      url = requestParameters.fullEndpoint;
    } else {
      url = this.url(requestParameters);

      if (requestParameters.queryStringList && requestParameters.queryStringList.length > 0) {
        const queryString = requestParameters.queryStringList.join('&');
        url = `${url}?${queryString}`;
      } else if (requestParameters.querystrings) {
        url = `${url}?${requestParameters.querystrings}`;
      }
    }
    url = url.replace(/\s/g, '');
    return this.httpClient.post<T>(url, body, { headers: requestParameters.headers, observe: 'response' });
  }

  put<T>(requestParameters: Partial<RequestParameters>, body: Partial<T>): Observable<HttpResponse<T>> {
    let url: string = "";
    if (requestParameters.fullEndpoint) {
      url = requestParameters.fullEndpoint;
    } else {
      url = `${this.url(requestParameters)}${requestParameters.querystrings ? `?${requestParameters.querystrings}` : ""}`;
    }
    url = url.replace(/\s/g, '');
    return this.httpClient.put<T>(url, body, { headers: requestParameters.headers, observe: 'response' }).pipe(
      catchError(error => this.errorHandlingService.handleError(error))
    );
  }

  delete<T>(requestParameters: Partial<RequestParameters>, id?: string): Observable<HttpResponse<T>> {
    let url: string = "";
    if (requestParameters.fullEndpoint) {
      url = requestParameters.fullEndpoint;
    } else {
      url = `${this.url(requestParameters)}/${id}${requestParameters.querystrings ? `?${requestParameters.querystrings}` : ""}`;
    }
    url = url.replace(/\s/g, '');
    return this.httpClient.delete<T>(url, { headers: requestParameters.headers, observe: 'response' }).pipe(
      catchError(error => this.errorHandlingService.handleError(error))
    );
  }
}

export class RequestParameters {
  controller?: string;
  action?: string;
  querystrings?: string;
  queryStringList?: string[];
  headers?: HttpHeaders;
  fullEndpoint?: string;
  port?: number; 
}