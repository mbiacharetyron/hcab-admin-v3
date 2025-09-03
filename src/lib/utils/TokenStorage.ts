import { User } from '../types/auth';

export class TokenStorage {
  private static readonly TOKEN_KEY = 'hcab_admin_token';
  private static readonly USER_KEY = 'hcab_admin_user';
  private static readonly REMEMBER_ME_KEY = 'hcab_remember_me';

  static saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  static saveUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  static getUser(): User | null {
    const userData = localStorage.getItem(this.USER_KEY);
    if (!userData) return null;
    
    try {
      return JSON.parse(userData);
    } catch {
      return null;
    }
  }

  static removeUser(): void {
    localStorage.removeItem(this.USER_KEY);
  }

  static setRememberMe(remember: boolean): void {
    localStorage.setItem(this.REMEMBER_ME_KEY, remember.toString());
  }

  static getRememberMe(): boolean {
    return localStorage.getItem(this.REMEMBER_ME_KEY) === 'true';
  }

  static clearAll(): void {
    this.removeToken();
    this.removeUser();
    localStorage.removeItem(this.REMEMBER_ME_KEY);
  }

  static isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch {
      return true;
    }
  }
}

