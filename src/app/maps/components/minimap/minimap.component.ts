import { Component, ElementRef, input, signal, viewChild } from '@angular/core';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import { environment } from '../../../../environments/environment';

mapboxgl.accessToken = environment.mapboxKey;

@Component({
  selector: 'app-minimap',
  imports: [],
  templateUrl: './minimap.component.html',
  styles: `
    div {
      width: 100%;
      height: 260px;
    }
  `,
})
export class MinimapComponent {
  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | null>(null);

  lngLat = input<LngLatLike>({ lng: -74.0948, lat: 4.6617 });
  interactive = input<boolean>(true);
  zoom = input<number>(14);

  ngAfterViewInit(): void {
    setTimeout(() => {
      const element = this.divElement()!.nativeElement;

      const map = new mapboxgl.Map({
        container: element, // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: this.lngLat(), // starting position [lng, lat]
        zoom: this.zoom(), // starting zoom
        interactive: this.interactive(),
      });

      map._addMarker(
        new mapboxgl.Marker({
          color: 'black',
        }).setLngLat(map.getCenter())
      );

      const marker = new mapboxgl.Marker({
        color: 'black',
      })
        .setLngLat(map.getCenter())
        .addTo(map);
    }, 80);
  }
}
