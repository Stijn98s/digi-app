/**
 * Digicatch
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { Organism } from '../model/organism';
import { OrganismPageDto } from '../model/organismPageDto';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable({
  providedIn: 'root'
})
export class OrganismsApiClient {

    protected basePath = 'http://localhost';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {

        if (configuration) {
            this.configuration = configuration;
            this.configuration.basePath = configuration.basePath || basePath || this.basePath;

        } else {
            this.configuration.basePath = basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * 
     * 
     * @param page 
     * @param pageSize 
     * @param filter pass in field:value field is a field on the model, value is string contained in the property of the model
     * @param include 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public organismsGet(page?: number, pageSize?: number, filter?: Array<string>, include?: Array<string>, observe?: 'body', reportProgress?: boolean): Observable<OrganismPageDto>;
    public organismsGet(page?: number, pageSize?: number, filter?: Array<string>, include?: Array<string>, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<OrganismPageDto>>;
    public organismsGet(page?: number, pageSize?: number, filter?: Array<string>, include?: Array<string>, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<OrganismPageDto>>;
    public organismsGet(page?: number, pageSize?: number, filter?: Array<string>, include?: Array<string>, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', <any>page);
        }
        if (pageSize !== undefined && pageSize !== null) {
            queryParameters = queryParameters.set('pageSize', <any>pageSize);
        }
        if (filter) {
            queryParameters = queryParameters.set('filter', filter.join(COLLECTION_FORMATS['csv']));
        }
        if (include) {
            queryParameters = queryParameters.set('include', include.join(COLLECTION_FORMATS['csv']));
        }

        let headers = this.defaultHeaders;

        // authentication (bearer) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            const header = this.configuration.apiKeys["Authorization"];
            const headerString = typeof header  === 'function'
                ? header() : header;
            headers = headers.set('Authorization', headerString);
        }
        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<OrganismPageDto>(`${this.configuration.basePath}/organisms`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public organismsIdDelete(id: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public organismsIdDelete(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public organismsIdDelete(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public organismsIdDelete(id: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling organismsIdDelete.');
        }

        let headers = this.defaultHeaders;

        // authentication (bearer) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            const header = this.configuration.apiKeys["Authorization"];
            const headerString = typeof header  === 'function'
                ? header() : header;
            headers = headers.set('Authorization', headerString);
        }
        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.delete<any>(`${this.configuration.basePath}/organisms/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public organismsIdGet(id: string, observe?: 'body', reportProgress?: boolean): Observable<Organism>;
    public organismsIdGet(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Organism>>;
    public organismsIdGet(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Organism>>;
    public organismsIdGet(id: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling organismsIdGet.');
        }

        let headers = this.defaultHeaders;

        // authentication (bearer) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            const header = this.configuration.apiKeys["Authorization"];
            const headerString = typeof header  === 'function'
                ? header() : header;
            headers = headers.set('Authorization', headerString);
        }
        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<Organism>(`${this.configuration.basePath}/organisms/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param id 
     * @param organism 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public organismsIdPut(id: string, organism: Organism, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public organismsIdPut(id: string, organism: Organism, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public organismsIdPut(id: string, organism: Organism, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public organismsIdPut(id: string, organism: Organism, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling organismsIdPut.');
        }
        if (organism === null || organism === undefined) {
            throw new Error('Required parameter organism was null or undefined when calling organismsIdPut.');
        }

        let headers = this.defaultHeaders;

        // authentication (bearer) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            const header = this.configuration.apiKeys["Authorization"];
            const headerString = typeof header  === 'function'
                ? header() : header;
            headers = headers.set('Authorization', headerString);
        }
        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.put<any>(`${this.configuration.basePath}/organisms/${encodeURIComponent(String(id))}`,
            organism,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param organism 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public organismsPost(organism: Organism, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public organismsPost(organism: Organism, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public organismsPost(organism: Organism, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public organismsPost(organism: Organism, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (organism === null || organism === undefined) {
            throw new Error('Required parameter organism was null or undefined when calling organismsPost.');
        }

        let headers = this.defaultHeaders;

        // authentication (bearer) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            const header = this.configuration.apiKeys["Authorization"];
            const headerString = typeof header  === 'function'
                ? header() : header;
            headers = headers.set('Authorization', headerString);
        }
        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<any>(`${this.configuration.basePath}/organisms`,
            organism,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}