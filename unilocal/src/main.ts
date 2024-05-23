import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import Mapboxgl from 'mapbox-gl';

Mapboxgl.accessToken = 'pk.eyJ1IjoiaWFtanVhbmVzcyIsImEiOiJjbHNqNXZ2emkyaGdqMmxvMGp6cXF6MDN6In0.YIlLM2pI6yi8FNIUknR7QA';
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
