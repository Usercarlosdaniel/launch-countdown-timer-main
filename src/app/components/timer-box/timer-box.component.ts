import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-timer-box',
  imports: [],
  templateUrl: './timer-box.component.html',
  styleUrl: './timer-box.component.scss',
})
export class TimerBoxComponent implements OnChanges, AfterViewInit {
  @Input('texto') text: string = '';
  @Input() value: number = 0;

  @ViewChild('flipCardElement') flipCardElement!: ElementRef;

  time: number = 0;

  private currentValue: string = '';

  ngAfterViewInit(): void {
    this.currentValue = String(this.value).padStart(2, '0');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      setTimeout(() => {
        if (this.flipCardElement) {
          this.flipCard(this.flipCardElement.nativeElement, this.value);
        }
      });
    }
  }

  flipCard(flipCard: HTMLElement, time: number) {
    const formatado = String(time).padStart(2, '0');

    if (formatado == this.currentValue) return;

    const currentValue = this.currentValue;

    const topFlip = document.createElement('div');
    topFlip.id = 'top-flip';
    topFlip.classList.add('timer__flip');
    topFlip.innerText = currentValue;

    const bottomFlip = document.createElement('div');
    bottomFlip.id = 'bottom-flip';
    bottomFlip.classList.add('timer__flip');
    bottomFlip.innerText = formatado;

    const topHalf = flipCard.querySelector('.top') as HTMLElement;
    const bottomHalf = flipCard.querySelector('.bottom') as HTMLElement;

    console.log(topHalf, bottomHalf);

    topFlip.addEventListener('animationstart', () => {
      if (topHalf) topHalf.textContent = formatado;
    });

    topFlip.addEventListener('animationend', () => {
      topFlip.remove();
    });

    bottomFlip.addEventListener('animationend', () => {
      if (bottomHalf) bottomHalf.textContent = formatado;
      bottomFlip.remove();
    });

    flipCard.appendChild(topFlip);
    flipCard.appendChild(bottomFlip);

    this.currentValue = formatado;
  }
}
