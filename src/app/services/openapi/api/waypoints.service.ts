/**
 * Tour Guide API
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

import { Waypoint } from '../model/waypoint';
import { WaypointGeo } from '../model/waypointGeo';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable({
  providedIn: 'root'
})
export class WaypointsApiClient {

    protected basePath = 'http://webs-5.herokuapp.com';
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
     * @param tourname 
     * @param waypoint 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public toursTournameWaypointsPost(tourname: string, waypoint: Waypoint, observe?: 'body', reportProgress?: boolean): Observable<Waypoint>;
    public toursTournameWaypointsPost(tourname: string, waypoint: Waypoint, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Waypoint>>;
    public toursTournameWaypointsPost(tourname: string, waypoint: Waypoint, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Waypoint>>;
    public toursTournameWaypointsPost(tourname: string, waypoint: Waypoint, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (tourname === null || tourname === undefined) {
            throw new Error('Required parameter tourname was null or undefined when calling toursTournameWaypointsPost.');
        }
        if (waypoint === null || waypoint === undefined) {
            throw new Error('Required parameter waypoint was null or undefined when calling toursTournameWaypointsPost.');
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
            'application/xml',
            'application/json'
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

        return this.httpClient.post<Waypoint>(`${this.configuration.basePath}/tours/${encodeURIComponent(String(tourname))}/waypoints`,
            waypoint,
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
     * @param waypointname 
     * @param tourname 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public toursTournameWaypointsWaypointnameDelete(waypointname: string, tourname: string, observe?: 'body', reportProgress?: boolean): Observable<Waypoint>;
    public toursTournameWaypointsWaypointnameDelete(waypointname: string, tourname: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Waypoint>>;
    public toursTournameWaypointsWaypointnameDelete(waypointname: string, tourname: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Waypoint>>;
    public toursTournameWaypointsWaypointnameDelete(waypointname: string, tourname: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (waypointname === null || waypointname === undefined) {
            throw new Error('Required parameter waypointname was null or undefined when calling toursTournameWaypointsWaypointnameDelete.');
        }
        if (tourname === null || tourname === undefined) {
            throw new Error('Required parameter tourname was null or undefined when calling toursTournameWaypointsWaypointnameDelete.');
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
            'application/xml',
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.delete<Waypoint>(`${this.configuration.basePath}/tours/${encodeURIComponent(String(tourname))}/waypoints/${encodeURIComponent(String(waypointname))}`,
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
     * @param waypointname 
     * @param tourname 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public toursTournameWaypointsWaypointnameGet(waypointname: string, tourname: string, observe?: 'body', reportProgress?: boolean): Observable<WaypointGeo>;
    public toursTournameWaypointsWaypointnameGet(waypointname: string, tourname: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<WaypointGeo>>;
    public toursTournameWaypointsWaypointnameGet(waypointname: string, tourname: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<WaypointGeo>>;
    public toursTournameWaypointsWaypointnameGet(waypointname: string, tourname: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (waypointname === null || waypointname === undefined) {
            throw new Error('Required parameter waypointname was null or undefined when calling toursTournameWaypointsWaypointnameGet.');
        }
        if (tourname === null || tourname === undefined) {
            throw new Error('Required parameter tourname was null or undefined when calling toursTournameWaypointsWaypointnameGet.');
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
            'application/xml',
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<WaypointGeo>(`${this.configuration.basePath}/tours/${encodeURIComponent(String(tourname))}/waypoints/${encodeURIComponent(String(waypointname))}`,
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
     * @param waypointname 
     * @param tourname 
     * @param waypoint 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public toursTournameWaypointsWaypointnamePut(waypointname: string, tourname: string, waypoint: Waypoint, observe?: 'body', reportProgress?: boolean): Observable<Waypoint>;
    public toursTournameWaypointsWaypointnamePut(waypointname: string, tourname: string, waypoint: Waypoint, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Waypoint>>;
    public toursTournameWaypointsWaypointnamePut(waypointname: string, tourname: string, waypoint: Waypoint, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Waypoint>>;
    public toursTournameWaypointsWaypointnamePut(waypointname: string, tourname: string, waypoint: Waypoint, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (waypointname === null || waypointname === undefined) {
            throw new Error('Required parameter waypointname was null or undefined when calling toursTournameWaypointsWaypointnamePut.');
        }
        if (tourname === null || tourname === undefined) {
            throw new Error('Required parameter tourname was null or undefined when calling toursTournameWaypointsWaypointnamePut.');
        }
        if (waypoint === null || waypoint === undefined) {
            throw new Error('Required parameter waypoint was null or undefined when calling toursTournameWaypointsWaypointnamePut.');
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
            'application/xml',
            'application/json'
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

        return this.httpClient.put<Waypoint>(`${this.configuration.basePath}/tours/${encodeURIComponent(String(tourname))}/waypoints/${encodeURIComponent(String(waypointname))}`,
            waypoint,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
