import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, GifsResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor(private httpClient: HttpClient) {
    this.getFromLocalStorage();
  }

  private apiUrl = "http://api.giphy.com/v1/gifs/search";
  private apiKey = "q1V4bAj4OiItQXjyxNTgpWrZhFF58z6U";
  private tagsHistory: string[] = [];
  public listGifs: Gif[] = [];

  public get getTagsHistory(): string[] {
    return ([...this.tagsHistory]);
  }

  public addTagHistory(newTag: string) {
    if (this.tagsHistory.includes(newTag)) {
      this.tagsHistory = this.tagsHistory.filter(item => item !== newTag);
    }
    this.tagsHistory.unshift(newTag);
    this.tagsHistory = this.tagsHistory.slice(0, 10);
    this.saveInLocalStorage();

    //Invocar servicio Http
    const params = new HttpParams()
      .set("api_key", this.apiKey)
      .set("q", newTag)
      .set("limit", "10");
    this.httpClient.get<GifsResponse>(this.apiUrl, { params }).subscribe(resp => {
      this.listGifs = resp.data;
    });

  }

  private saveInLocalStorage(): void {
    localStorage.setItem("tagsHistory", JSON.stringify(this.tagsHistory));
  }

  private getFromLocalStorage(): void {
    if (!localStorage.getItem("tagsHistory")) return;
    this.tagsHistory = JSON.parse(localStorage.getItem("tagsHistory")!);
    if (this.tagsHistory.length === 0) return;
    this.addTagHistory(this.tagsHistory[0]);
  }

}
