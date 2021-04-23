import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructionsComponent } from './pages/instructions/instructions.component';
import { WordLengthComponent } from './pages/word-length/word-length.component';
import { GameComponent } from './pages/game/game.component';

const routes: Routes = [
  { path: '', component: InstructionsComponent },
  { path: 'instructions', component: InstructionsComponent },
  { path: 'word-length', component: WordLengthComponent },
  { path: 'game', component: GameComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
