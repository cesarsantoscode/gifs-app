import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private gifsService: GifsService) { }

  public gifsHistory(): string[] {
    return this.gifsService.getTagsHistory;
  }

  public searchTag(tag: string): void {
    this.gifsService.addTagHistory(tag);
  }

}
