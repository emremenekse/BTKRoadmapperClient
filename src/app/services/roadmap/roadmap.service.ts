import { Injectable } from '@angular/core';
import { ErrorHandlingService } from '../errorHandling/error-handling.service';
import { HttpClientService, RequestParameters } from '../httpClient/http-client.service';
import { catchError, map, Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { UserDTO } from '../../interfaces/userDTO';
import { RoadmapDTO } from '../../interfaces/RoadmapDTO';
import { CourseDTO } from '../../interfaces/courseDTO';

@Injectable({
  providedIn: 'root'
})
export class RoadmapService {
  private apiUrl = 'http://localhost';
  private port = 5054;
  constructor(
    private errorHandlingService: ErrorHandlingService,
    private httpClientService: HttpClientService
  ) {}

  getUserInfoByEmail(mail: string): Observable<UserDTO> {
    const requestParameters: RequestParameters = {
      controller: "roadmapper",
      action: "GetUserInfo",
      port: this.port,
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      querystrings: `mail=${mail}`

    };
    return this.httpClientService.get<{ data: UserDTO }>(requestParameters).pipe(
      map((response) => response.body!.data),
      catchError(error => this.errorHandlingService.handleError(error, undefined, undefined, true))
    );
  }

  generateRoadmap(request: RoadmapDTO): Observable<CourseDTO[]> {
    const requestParameters: RequestParameters = {
      controller:`roadmapper`,
      action:`GenerateRoadmap`,
      port:this.port,
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.httpClientService.post<{data:CourseDTO[]}>(requestParameters,request).pipe(
      map(response => response.body?.data! ),
      catchError(error => this.errorHandlingService.handleError(error, undefined, undefined, true))
    );
  }
}
