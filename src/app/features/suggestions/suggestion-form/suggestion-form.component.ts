import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrl: './suggestion-form.component.css'
})
export class SuggestionFormComponent {

  suggestionForm!: FormGroup;
  
  categories: string[] = [
    'Infrastructure et bâtiments', 'Technologie et services numériques',
    'Restauration et cafétéria', 'Hygiène et environnement',
    'Transport et mobilité', 'Activités et événements',
    'Sécurité', 'Communication interne', 'Accessibilité', 'Autre'
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.suggestionForm = this.fb.group({
      title: ['', [
        Validators.required, 
        Validators.minLength(5), 
        Validators.pattern('^[A-Z][a-zA-Z ]*$')
      ]],
      
      description: ['', [Validators.required, Validators.minLength(30)]],
      
      category: ['', Validators.required],
      
      date: [{ value: new Date().toLocaleDateString(), disabled: false }, Validators.required],
      status: [{ value: 'en attente', disabled: false }, Validators.required]
    });
  }

  onSubmit() {
    if (this.suggestionForm.valid) {
      const newSuggestion = {
        ...this.suggestionForm.value,
        id: Math.floor(Math.random() * 1000), 
        nbLikes: 0, 
        date: new Date() 
      };
      
      console.log('Suggestion ajoutée:', newSuggestion);
      this.router.navigate(['/suggestions']); 
    }
  }

}
