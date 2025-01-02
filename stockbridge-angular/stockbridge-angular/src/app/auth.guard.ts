import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token'); // Replace this with your actual auth check logic

  if (token) {
    return true; // Allow access if token exists
  } else {
    router.navigate(['/login']); // Redirect to login if not logged in
    return false;
  }
};
