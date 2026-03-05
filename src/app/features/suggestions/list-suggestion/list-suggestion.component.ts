import { Component, OnInit } from '@angular/core';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../suggestion.service';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrls: ['./list-suggestion.component.css']
})
export class ListSuggestionComponent implements OnInit {

  suggestions: Suggestion[] = [];
  favorites: Suggestion[] = [];

  loading = false;
  errorMsg = '';

  constructor(private suggestionService: SuggestionService) {}

  ngOnInit(): void {
    this.loadSuggestions();
  }

  private loadSuggestions(): void {
    this.loading = true;
    this.errorMsg = '';

    this.suggestionService.GetAllSUGGESTION().subscribe({
      next: (data) => {
        this.suggestions = data ?? [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur chargement suggestions:', err);
        this.errorMsg = "Impossible de charger les suggestions.";
        this.loading = false;
      }
    });
  }

  addLike(suggestion: Suggestion): void {
    const oldLikes = suggestion.nbLikes ?? 0;
    suggestion.nbLikes = oldLikes + 1;

    this.suggestionService.updateSuggestion(suggestion).subscribe({
      next: (updated) => {
        if (updated) {
          const idx = this.suggestions.findIndex(s => s.id === updated.id);
          if (idx !== -1) this.suggestions[idx] = updated;
        }
      },
      error: (err) => {
        console.error('Erreur update like:', err);
        suggestion.nbLikes = oldLikes; // rollback
        this.errorMsg = "Le Like n'a pas été enregistré (API indisponible ?).";
      }
    });
  }

  addToFavorites(suggestion: Suggestion): void {
    const exists = this.favorites.some(fav => fav.id === suggestion.id);
    if (!exists) {
      this.favorites.push(suggestion);
    }
  }

  deleteSuggestion(suggestion: Suggestion): void {
    if (!suggestion?.id) return;

    const ok = confirm(`Supprimer la suggestion "${suggestion.title}" ?`);
    if (!ok) return;

    this.errorMsg = '';

    this.suggestionService.deleteSuggestion(suggestion.id).subscribe({
      next: () => {
        // retirer de la liste
        this.suggestions = this.suggestions.filter(s => s.id !== suggestion.id);

        // retirer aussi des favoris
        this.favorites = this.favorites.filter(f => f.id !== suggestion.id);
      },
      error: (err) => {
        console.error('Erreur suppression suggestion:', err);
        this.errorMsg = "La suppression n'a pas réussi (API indisponible ?).";
      }
    });
  }
}