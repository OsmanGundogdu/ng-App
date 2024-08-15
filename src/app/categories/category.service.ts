import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Category } from './category.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class CategoryService {

  private url = environment.database_url;

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url + "categories.json")
        .pipe(
          map(data => {
            const categories: Category[] = [];

            for ( const key in data ) {
              categories.push({ ...data[key], id: key });
            }

            return categories;
          })
        )
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.url + "categories.json", category)
  }
}
