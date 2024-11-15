import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimalToPercentage',
  standalone: true
})
export class DecimalToPercentagePipe implements PipeTransform {

  transform(value: number, fractionDigits: number = 0): string {
    if (value == null) {
      return '';
    }
    // Convert the value to a percentage by multiplying by 10
    const percentage = value * 10;
    // Format the percentage
    const formatted = percentage.toFixed(fractionDigits);
    // Remove trailing .00 if present
    const finalValue = formatted.endsWith('.00') ? parseInt(formatted, 10) : parseFloat(formatted);
    
    return `${finalValue}%`;
  }

}
