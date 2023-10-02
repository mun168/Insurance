import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { StorageService } from './storage.service';

@Injectable()


//component that implements CanActivate to check if user is authenticated before showing a page if not it redirects to sign in page 
export class IsAuthenticatedGuard implements CanActivate {
  constructor(private storageService: StorageService) {}

  canActivate(): boolean {
    if (!this.storageService.isAuthenticated()) {
      return false;
    }

    return true;
  }
}