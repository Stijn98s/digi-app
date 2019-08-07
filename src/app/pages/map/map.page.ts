import {Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit} from '@angular/core';
import leaflet from 'leaflet';
import 'leaflet-rotatedmarker';
import { Store, Select} from '@ngxs/store';
import { CatchZone, Area } from 'src/app/services/openapi';
import '@stijn98s/leaflet.tilelayer.pouchdbcached';
import {Observable, Subscription} from 'rxjs';
import { DeviceOrientation} from '@ionic-native/device-orientation/ngx';
import { CatchZoneState } from 'src/app/store/CatchzoneStore';
import { ScoreState } from 'src/app/store/ScoreStore';
import {MapOpened} from '../../store/ApplicationEvents';
import {LocationService} from '../../services/location.service';
import { stringify } from 'querystring';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { AreaState } from 'src/app/store/AreaStore';
import { SettingsState } from 'src/app/store/SettingsStore';
import {filter, tap} from 'rxjs/operators';


@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit , OnDestroy, AfterViewInit{
  private degreesToDestination$: Observable<string>;
  @Select(AreaState.currentArea)
  public area$: Observable<Area>;
  private deviceDegrees$: Observable<number>;
  @ViewChild('map') mapContainer: ElementRef;
  map: any;
  playerMarker: any;
  accuracyCircle: any;
  catchZoneCircles: any;
  catchImages: any[];

  @Select(SettingsState.profilepic)
  public profilePic$: Observable<string>;

  @Select(CatchZoneState.catchZones)
  public catchzones$: Observable<CatchZone[]>;

  @Select(CatchZoneState.currentCatchzone)
  public currentCatchzone$: Observable<CatchZone>;

  @Select(ScoreState.score)
  public score$: Observable<number>;
  
  private catchzoneSubscription: Subscription;

  constructor(
    private store: Store,
    private locationService: LocationService,
    private toastService: ToastService,
    private router: Router
    ) {
     this.degreesToDestination$ = locationService.directionToClosestWaypoint$.pipe(filter(value => window.location.pathname === "/map"))
     ;
  }

  ionViewDidEnter(){
    this.map.invalidateSize();
  }

  ngAfterViewInit(): void {
    this.loadmap();
  }

  ngOnInit() {
    this.store.dispatch(new MapOpened(this.store.selectSnapshot(AreaState.currentArea)));
    this.catchImages = [];
    // this.router.navigate(['/friend/', "gekkenhuis2"]);
  }

  loadmap() {

    if (this.map) {
      this.map.remove();
      this.catchImages = [];
      this.catchZoneCircles = null;
    }

    this.map = leaflet.map('map', {zoomControl: false }).setView([51.6978162, 5.3036748], 13);
    const layer = leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      keepInView: true,
      useCache: true,
      crossOrigin: true
    }).addTo(this.map);
    this.map.dragging.disable();
    this.map.touchZoom.disable();
    this.map.doubleClickZoom.disable();
    this.map.scrollWheelZoom.disable();
    this.map.boxZoom.disable();
    this.map.keyboard.disable();


    const greenIcon = leaflet.icon({
      iconUrl: '/assets/img/playerpos.png',
      iconSize:     [40, 40], // size of the icon
      iconAnchor:   [20, 20], // point of the icon which will correspond to marker's location
     });

    const circleOptionsRadius = {
      fillOpacity: 0.07,
      opacity: 0.15
    };

    const area = this.store.selectSnapshot(AreaState.currentArea);
    // console.log(area);
    // @ts-ignore
    const bbox = leaflet.latLngBounds(leaflet.latLng(area.lat1, area.lon1), leaflet.latLng(area.lat2, area.lon2));
    layer.seed( bbox, 16, 16);

    this.playerMarker = leaflet.marker([51.6978162, 5.3036748], {icon: greenIcon});
    this.accuracyCircle = leaflet.circle([51.6978162, 5.3036748], 10, circleOptionsRadius).addTo(this.map);
    this.playerMarker.addTo(this.map);

    this.locationService.location$.pipe(        filter(value => window.location.pathname === "/map")
    ).subscribe((location) =>  this.onLocationFound(location));
    this.catchzoneSubscription = this.catchzones$.subscribe(data => this.drawCatchZones(data));
    //might seem double work but. as locationservice is a dependency of this. it get's inited firts
    this.onLocationFound(this.locationService.location$.getValue());
    this.locationService.deviceDegrees$.pipe(
        filter(value => window.location.pathname === "/map")
    ).subscribe(heading => this.playerMarker.setRotationAngle(heading));
  }


  onLocationFound({latitude, longitude, accuracy}: Coordinates) {
    const radius = accuracy / 2;
    const latLng = new leaflet.LatLng(latitude, longitude);
    this.playerMarker.setLatLng(latLng);
    this.accuracyCircle.setLatLng(latLng);
    this.accuracyCircle.setRadius(radius);
    this.map.panTo(latLng, {animate: false});
    this.map.setZoom(17);
  }


  drawCatchZones(catchZones: CatchZone[]) {
    const circleOptionsCatchRadius = {
      fillOpacity: 0.15,
      opacity: 0.35,
      fillColor: 'green',
      color: 'green'
    };

    // add layergroup or clear all layers
    if (this.catchZoneCircles == null) {
      this.catchZoneCircles = leaflet.layerGroup().addTo(this.map);
    } else {
      this.catchZoneCircles.clearLayers();
    }

    // Loop through all catchzones and add them to the layer.
    if (catchZones !== undefined) {
      for (const catchZone of catchZones) {
        // add image
        const imageBounds = [[catchZone.lat - 0.000136, catchZone.lon - 0.00021], [catchZone.lat + 0.000136, catchZone.lon + 0.00021]];
        this.catchImages.push(leaflet.imageOverlay('/assets/img/catch_zone_small.png', imageBounds).addTo(this.map));
        // add circles
        this.catchZoneCircles.addLayer(leaflet.circle([catchZone.lat, catchZone.lon], catchZone.radius, circleOptionsCatchRadius));
      }
    }
  }

  ngOnDestroy(): void {
    this.catchzoneSubscription.unsubscribe();
  }


}
