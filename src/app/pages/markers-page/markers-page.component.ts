import {
  AfterViewInit,
  Component,
  ElementRef,
  signal,
  viewChild,
} from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';

mapboxgl.accessToken = environment.mapboxKey;

@Component({
  selector: 'app-markers-page',
  imports: [],
  templateUrl: './markers-page.component.html',
})
export class MarkersPageComponent implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | null>(null);

  ngAfterViewInit(): void {
    setTimeout(() => {
      const element = this.divElement()!.nativeElement;

      const map = new mapboxgl.Map({
        container: element, // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: [-74.0948, 4.6617], // starting position [lng, lat]
        zoom: 14, // starting zoom
      });

      const marker = new mapboxgl.Marker({
        draggable: false,
        color: '#000',
      })
        .setLngLat([-74.0948, 4.6617])
        .addTo(map);

      marker.on('dragend', (event) => console.log('Marker dragged', event));

      this.mapListeners(map);
    }, 80);
  }

  mapListeners(map: mapboxgl.Map) {
    console.log('object');
  }
}
