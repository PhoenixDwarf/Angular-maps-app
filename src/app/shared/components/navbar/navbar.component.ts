import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { routes } from '../../../app.routes';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  router = inject(Router);

  routes = routes
    .map((route) => ({
      path: route.path,
      title: `${route.title ?? 'Maps in Angular'}`,
    }))
    .filter((route) => route.path !== '**');

  pageTitle = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => event.url),
      map(
        (url) =>
          routes.find((route) => `/${route.path}` === url)?.title ||
          'Maps in Angular'
      )
    )
  );
}
