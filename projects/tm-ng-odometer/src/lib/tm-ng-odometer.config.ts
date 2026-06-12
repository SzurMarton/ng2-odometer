import { TmOdometerConfig } from 'tm-odometer';

export interface TmNgOdometerConfigModel extends TmOdometerConfig {
    auto?: boolean;
}

export class TmNgOdometerConfig implements TmNgOdometerConfigModel {
    animation?: 'count' | 'slide' = 'slide';
    format?: string = '(,ddd)';
    theme?: string = 'default';
    value?: number = 0;
    duration?: number = 2000;
    auto?: boolean = true;
}
