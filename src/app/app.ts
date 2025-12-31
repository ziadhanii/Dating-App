import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  protected members = signal<any[]>([]);

  private http = inject(HttpClient);
  protected title = 'Dating App';


  async ngOnInit() {
    this.members.set(await this.getMembers());
  }


  async getMembers() {
    try {
      return lastValueFrom(this.http.get<any[]>('https://localhost:5001/api/members'));
    } catch (error) {
      console.error('Error fetching members:', error);
      throw error;
    }

  }
}
