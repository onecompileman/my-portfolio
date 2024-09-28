import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthResponse } from "../../shared/models/auth-response.model";
import { User } from "../../shared/models/user.model";

@Injectable({
    providedIn: 'root'
})
export class AuthDataService {
    constructor(private http: HttpClient) {}

    login(username: string, password: string): Observable<AuthResponse> {
        return this.http.post<AuthResponse>('user/login', {username, password});
    }

    getActiveUser() {
        return this.http.get<User>('user/profile');
    }
}