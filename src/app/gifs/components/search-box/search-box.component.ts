import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {

  constructor(private gifsService: GifsService) { }

  @ViewChild("txtSearchInput")
  public elementRef!: ElementRef<HTMLInputElement>;

  public searchTag(): void {
    let txtSearchInput: string = this.elementRef.nativeElement.value;
    if (txtSearchInput.length === 0) return;
    txtSearchInput = txtSearchInput.toLowerCase();
    this.gifsService.addTagHistory(txtSearchInput);
    this.elementRef.nativeElement.value = "";
  }

}
