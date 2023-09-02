import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Color } from './interfaces';
import { COLORS } from './constants';

@Component({
  selector: 'hao-lab-web-components-rainbow-block',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rainbow-block.component.html',
  styleUrls: ['./rainbow-block.component.scss'],
})
export class RainbowBlockComponent {
  @Input() text = 'Default';
  @Input() color = COLORS[0];
  @Output() colorChange = new EventEmitter<Color>();

  onChangeColorClick() {
    const max = COLORS.length - 1;
    const min = 0;
    const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;
    const color = COLORS[randomIndex];
    this.colorChange.emit(color);
  }
}
