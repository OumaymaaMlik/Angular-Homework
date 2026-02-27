import { Component } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import {Suggestion} from '../../../models/suggestion'


@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrl: './suggestion-details.component.css'
})
export class SuggestionDetailsComponent {
  id!: number;
  suggestion: Suggestion | undefined;

  // On utilise la même liste (Idéalement, ceci devrait être dans un Service)
  suggestions: Suggestion[] = [
    { id: 1, title: 'Organiser une journée team building', description: "Suggestion pour organiser une journée de team building...", category: 'Événements', date: new Date('2025-01-20'), status: 'acceptee', nbLikes: 10 },
    { id: 2, title: 'Améliorer le système de réservation', description: "Proposition pour améliorer la gestion des réservations...", category: 'Technologie', date: new Date('2025-01-15'), status: 'refusee', nbLikes: 0 },
    { id: 3, title: 'Créer un système de récompenses', description: "Mise en place d'un programme de récompenses...", category: 'Ressources Humaines', date: new Date('2025-01-25'), status: 'refusee', nbLikes: 0 },
    { id: 4, title: "Moderniser l'interface utilisateur", description: "Refonte complète de l'interface utilisateur...", category: 'Technologie', date: new Date('2025-01-30'), status: 'en_attente', nbLikes: 0 }
  ];

  constructor(private route: ActivatedRoute , private router: Router) {} //injection de dependance

  ngOnInit(): void {
    // Récupération de l'ID depuis l'URL
    const idParam = this.route.snapshot.params['id'];

    // on peut aussi utiliser this.route.params.subscribe avec subscribe est un ecouteur
    
    if (idParam) {
      this.id = Number(idParam);
      
      // 2. Utiliser la variable convertie pour la recherche
      this.suggestion = this.suggestions.find(s => s.id === this.id);
    }

    if (!this.suggestion) {
      alert("Suggestion introuvable !");
      this.router.navigate(['/suggestions']);
    }
  }


}
