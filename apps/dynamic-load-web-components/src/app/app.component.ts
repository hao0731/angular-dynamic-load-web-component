import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RainbowBlockComponent } from './rainbow-block';

@Component({
  standalone: true,
  imports: [RainbowBlockComponent, RouterModule],
  selector: 'hao-lab-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'lazy-web-components';
  color = 'red';

  onColorChange(color: string) {
    this.color = color;
  }
}
