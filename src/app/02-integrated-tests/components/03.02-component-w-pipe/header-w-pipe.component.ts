import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header-w-pipe',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header-w-pipe.component.html',
  styleUrls: ['./header-w-pipe.component.css']
})
export class HeaderWPipeComponent {
  title = '';
}
