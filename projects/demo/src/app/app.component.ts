import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, Observer, share } from 'rxjs';
import { TmNgOdometerComponent } from 'tm-ng-odometer';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, TmNgOdometerComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    public number: number = 3000;
    public observable: Observable<boolean>;
    private observer: Observer<boolean>;

    constructor() {
        this.observable = new Observable<boolean>((observer: any) => this.observer = observer).pipe(share());

        // For auto mode
        setTimeout(() => this.number += this.number, 5000); // Update on 5 seconds
    }

    public trigger() {
        this.observer.next(true);
    }
}
