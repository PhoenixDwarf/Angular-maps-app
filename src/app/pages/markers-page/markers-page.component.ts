import {
  AfterViewInit,
  Component,
  ElementRef,
  signal,
  viewChild,
} from '@angular/core';
import mapboxgl, { MapMouseEvent } from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import { v4 as UUIDV4 } from 'uuid';

mapboxgl.accessToken = environment.mapboxKey;

interface Marker {
  id: string;
  mapboxMarker: mapboxgl.Marker;
}

@Component({
  selector: 'app-markers-page',
  imports: [],
  templateUrl: './markers-page.component.html',
})
export class MarkersPageComponent implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | null>(null);
  markers = signal<Marker[]>([]);

  ngAfterViewInit(): void {
    setTimeout(() => {
      const element = this.divElement()!.nativeElement;

      const map = new mapboxgl.Map({
        container: element, // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: [-74.0948, 4.6617], // starting position [lng, lat]
        zoom: 14, // starting zoom
      });

      // const marker = new mapboxgl.Marker({
      //   draggable: false,
      //   color: '#000',
      // })
      //   .setLngLat([-74.0948, 4.6617])
      //   .addTo(map);

      // marker.on('dragend', (event) => console.log('Marker dragged', event));

      this.mapListeners(map);
    }, 80);
  }

  mapListeners(map: mapboxgl.Map) {
    map.on('click', (event) => this.mapCLick(event));
    this.map.set(map);
  }

  mapCLick(event: MapMouseEvent) {
    if (!this.map()) return;

    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const marker = new mapboxgl.Marker({
      color: color,
    })
      .setLngLat(event.lngLat)
      .addTo(this.map()!);

    const newMarker: Marker = {
      id: UUIDV4(),
      mapboxMarker: marker,
    };

    // this.markers.set([newMarker, ...this.markers()])
    this.markers.update((markers) => [newMarker, ...markers]);

    console.log(this.markers());
  }
}
