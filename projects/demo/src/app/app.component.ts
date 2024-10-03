import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TmNgOdometerComponent } from 'tm-ng-odometer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TmNgOdometerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'demo';
}
