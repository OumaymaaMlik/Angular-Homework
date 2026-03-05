import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Suggestion } from './models/suggestion';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

SUGGESTION_URL = 'http://localhost:3000/suggestions';
  constructor(private http: HttpClient) { }
  GET_SUGGESTIONS() {
    return this.http.get<Suggestion[]>(this.SUGGESTION_URL);
  }
  addSuggestion(suggestion: Suggestion) {
    return this.http.post<Suggestion>(this.SUGGESTION_URL, suggestion);
  }
    //1ere methode pour update suggestion

  updateSuggestion(suggestion: Suggestion) {
    return this.http.put<Suggestion>(`${this.SUGGESTION_URL}/${suggestion.id}`, suggestion);
  }
  //2eme methode pour update suggestion
   updateSuggestions(suggestion: Suggestion, id: number) {
    return this.http.put<Suggestion>(`${this.SUGGESTION_URL}/${id}`, suggestion);
  }
    //3eme methode pour update suggestion

  updateSuggestionss(suggestion: Suggestion, id: number) {
    return this.http.put<Suggestion>(`${this.SUGGESTION_URL}/${id}`, suggestion);
  }
  
  deleteSuggestion(id: number) {
    return this.http.delete(`${this.SUGGESTION_URL}/${id}`);
  }
  GetById(id: number) {
    return this.http.get<any>(`${this.SUGGESTION_URL}/${id}`);
  }
  GetAllSUGGESTION() {
    return this.http.get<Suggestion[]>(this.SUGGESTION_URL);
  }
  
}
