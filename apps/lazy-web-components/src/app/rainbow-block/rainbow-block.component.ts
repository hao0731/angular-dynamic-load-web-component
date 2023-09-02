import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  DestroyRef,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'hao-lab-rainbow-block',
  standalone: true,
  template: `<rainbow-block #rainbowBlock [color]="color" [text]="text"></rainbow-block>`,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RainbowBlockComponent implements OnInit {
  @Input() text: string | undefined;
  @Input() color = 'red';
  @Output() colorChange = new EventEmitter<string>();

  @ViewChild('rainbowBlock', { static: true })
  rainbowBlock!: ElementRef<HTMLElement>;

  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.registerColorChangeListener();
  }

  private registerColorChangeListener() {
    fromEvent<CustomEvent<string>>(
      this.rainbowBlock.nativeElement,
      'colorChange'
    )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (event) => {
          this.colorChange.next(event.detail);
        },
      });
  }
}
