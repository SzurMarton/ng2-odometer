import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewEncapsulation, input, viewChild, effect, computed, Signal } from '@angular/core';
import { CAR_THEME, DEFAULT_THEME, DIGITAL_THEME, MINIMAL_THEME, PLAZA_THEME, SLOT_MACHINE_THEME, TRAIN_STATION_THEME } from './themes';
// @ts-ignore
import Odometer from 'tm-odometer';
import { Observable, Subscription } from 'rxjs';
import { OdometerModel } from './odometer.model';
import { TmNgOdometerConfig, TmNgOdometerConfigModel } from './odometer.config';

@Component({
    selector: 'tm-ng-odometer',
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
export class TmNgOdometerComponent implements OnInit, OnDestroy, AfterViewInit {
    private subscription: Subscription;
    private odometer: OdometerModel;
    container = viewChild<ElementRef>('container');
    number = input.required<number>(); // Required
    config = input<TmNgOdometerConfigModel>({});
    observable = input<Observable<boolean>>();

    // Individual configuration attributes
    animation = input<string>();
    format = input<string>();
    theme = input<string>();
    value = input<number>();
    duration = input<number>();
    auto = input<boolean>();

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

    private configSignal: Signal<TmNgOdometerConfigModel> = computed(() => {
        const config = new TmNgOdometerConfig();
        return {
            ...config,
            ...this.config(),
            animation: this.animation() ?? this.config().animation ?? config.animation,
            format: this.format() ?? this.config().format ?? config.format,
            theme: this.themes.includes(this.theme() ?? '') ? this.theme() : (this.config().theme ?? 'default'),
            value: this.value() ?? this.config().value ?? config.value,
            duration: this.duration() ?? this.config().duration ?? config.duration,
            auto: this.auto() ?? this.config().auto ?? config.auto,
        };
    });

    constructor() {
        effect(() => {
            if (this.odometer && this.configSignal().auto) {
                this.odometer.update(this.number());
            }
        });
    }

    // Start Odometer
    private initOdometer() {
        if (this.container() !== undefined && typeof Odometer !== 'undefined') {
            this.odometer = new Odometer({
                el: this.container().nativeElement,
                ...this.configSignal()
            });

            if (this.number() !== undefined && this.configSignal().auto) {
                this.odometer.update(this.number());
            }
        }
    }
    
    ngOnInit(): void {
        if (this.observable() !== undefined && !this.configSignal().auto) {
            this.subscription = this.observable().subscribe((trigger: boolean) => {
                if (trigger !== undefined && trigger) {
                    this.odometer.update(this.number());
                }
            });
        }
    }

    ngOnDestroy(): void {
        if (this.subscription !== undefined) {
            this.subscription.unsubscribe();
        }
    }

    ngAfterViewInit(): void {
        this.initOdometer();
    }
}
