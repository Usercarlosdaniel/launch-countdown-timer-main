import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TimerBoxComponent } from './components/timer-box/timer-box.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TimerBoxComponent, NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'launch-countdown-timer';

  dia: any = 14;
  hora: any = 0;
  min: any = 0;
  seg: any = 0;
  ngOnInit() {
    this.contagemRegressiva();
  }

  contagemRegressiva() {
    setInterval(() => {
      if (this.seg > 0) {
        this.seg--;
      } else if (this.min > 0) {
        this.min--;
        this.seg = 59;
      } else if (this.hora > 0) {
        this.hora--;
        this.min = 59;
        this.seg = 59;
      } else if (this.dia > 0) {
        this.dia--;
        this.hora = 23;
        this.min = 59;
        this.seg = 59;
      }
    }, 1000);
  }
}
