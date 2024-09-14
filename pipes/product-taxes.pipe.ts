import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs/operators';
import { ICart } from '../models/so.interface';

@Pipe({
    name: 'productTaxes'
})
export class ProductTaxesPipe implements PipeTransform {
    transform(items: any[], filter: ICart):any {
        if(!items || !filter)
            return items;
        return items.filter(item => item.cartDtlSrNo == filter.cartDtlSrNo);
    }
}