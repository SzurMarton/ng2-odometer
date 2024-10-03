import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { CAR_THEME, DEFAULT_THEME, DIGITAL_THEME, MINIMAL_THEME, PLAZA_THEME, SLOT_MACHINE_THEME, TRAIN_STATION_THEME } from './themes';
// @ts-ignore
import Odometer from 'tm-odometer';
import { Observable, Subscription } from 'rxjs';
import { OdometerModel } from './odometer.model';
import { TmNgOdometerConfig, TmNgOdometerConfigModel } from './odometer.config';

@Component({
    selector: 'lib-tm-ng-odometer',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [],
    template: `<div #container></div>`,
    styles: [
        CAR_THEME,
        DEFAULT_THEME,
        DIGITAL_THEME,
        MINIMAL_THEME,
        PLAZA_THEME,
        SLOT_MACHINE_THEME,
        TRAIN_STATION_THEME,
        `
        .odometer,
        .odometer-inside,
        .odometer-digit,
        .odometer-digit-spacer,
        .odometer-digit-inner,
        .odometer-ribbon,
        .odometer-ribbon-inner,
        .odometer-value,
        .odometer-formatting-mark {
            color: inherit;
            font-size: inherit;
            font-family: inherit;
        }
    `,
    ],
})
export class TmNgOdometerComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
    private subscription: Subscription;
    private odometer: OdometerModel;
    @ViewChild('container', { read: ElementRef, static: true }) container: ElementRef;
    @Input() number: number; // Required
    @Input() config: TmNgOdometerConfigModel = {};
    @Input() observable: Observable<boolean> = undefined;

    // Individual configuration attributes
    @Input() animation: string = undefined;
    @Input() format: string = undefined;
    @Input() theme: string = undefined;
    @Input() value: number = undefined;
    @Input() duration: number = undefined;
    @Input() auto: boolean = undefined;

    // Available themes
    private themes: Array<string> = [
        'car',
        'default',
        'digital',
        'minimal',
        'plaza',
        'slot-machine',
        'train-station'
    ];

    // Start Odometer
    private initOdometer() {
        if (this.container !== undefined && typeof Odometer !== 'undefined') {
            this.odometer = new Odometer({
                el: this.container.nativeElement,
                animation: this.config.animation,
                value: this.config.value,
                duration: this.config.duration,
                format: this.config.format,
                theme: this.config.theme,
            });

            if (this.number !== undefined && this.config.auto) {
                this.odometer.update(this.number);
            }
        }
    }

    private initConfig() {
        this.config = { ...new TmNgOdometerConfig(), ...this.config };

        // Animation
        if (this.animation !== undefined) {
            this.config.animation = this.animation;
        }

        // Format
        if (this.format !== undefined) {
            this.config.format = this.format;
        }

        // Theme
        if (this.theme !== undefined) {
            this.config.theme = this.themes.includes(this.theme) ? this.theme : 'default';
        }

        // Value
        if (this.value !== undefined) {
            this.config.value = this.value;
        }

        // Duration
        if (this.duration !== undefined) {
            this.config.duration = this.duration;
        }

        // Auto
        if (this.auto !== undefined) {
            this.config.auto = this.auto;
        }

        // Validate theme. If not part of the
        // available themes array, use the default
        if (!this.themes.includes(this.config.theme)) {
            this.config.theme = 'default';
        }
    }
    
    ngOnInit(): void {
        if (this.observable !== undefined && !this.config.auto) {
            this.subscription = this.observable.subscribe((trigger: boolean) => {
                if (trigger !== undefined && trigger) {
                    this.odometer.update(this.number);
                }
            });
        }

        this.initConfig();
    }

    ngOnDestroy(): void {
        if (this.subscription !== undefined) {
            this.subscription.unsubscribe();
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.number !== undefined && this.odometer !== undefined && this.config.auto) {
            this.odometer.update(this.number);
        }
    }

    ngAfterViewInit(): void {
        this.initOdometer();
    }

}
