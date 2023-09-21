import { Directive, ElementRef, HostListener, Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
@Directive({
  standalone: true,
  selector: '[appCpfFormat]'
})
export class CpfFormatDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInput(): void {
    const input = this.el.nativeElement as HTMLInputElement;
    let value = input.value.replace(/\D/g, '')
    if (value.length > 11) {
      value = value.slice(0, 11)
    }

    let formattedValue = '';

    for (let i = 0; i < value.length; i++) {
      if (i === 3 || i === 6) {
        formattedValue += '.';
      } else if (i === 9) {
        formattedValue += '-';
      }
      formattedValue += value[i];
    }

    input.value = formattedValue;
  }

  cpfValidator(control: FormControl): { [key: string]: any } | null {
    const cpfRegex = /^(\d{3}\.){2}\d{3}-\d{2}$/;
    const valid = cpfRegex.test(control.value);
    return valid ? null : { pattern: true };
  }
}

