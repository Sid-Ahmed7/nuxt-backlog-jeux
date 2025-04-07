<template>
  <footer class="footer">
    <div class="footer-container">


      <ul class="footer-menu">
        <li>
          <nuxt-link to="/">Accueil</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/catalogue-de-jeu">Jeux</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/a-propos">À propos</nuxt-link>
        </li>
      </ul>

      <div class="footer-info">
        <p>&copy; 2025 BacklogTrack. Tous droits réservés.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #292729;
  color: #eee;
  padding: 2rem 0;
}

.footer-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#footer-logo {
  max-height: 80px;
}

.footer-menu {
  list-style-type: none;
  margin: 1rem 0;
  padding: 0;
  display: flex;
  gap: 1rem;
}

.footer-menu a {
  color: #eee;
  text-decoration: none;
}

.footer-menu a:hover {
  color: var(--main-color);
}

.footer-info {
  margin-top: 1rem;
  font-size: 0.9rem;
  text-align: center;
}

@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
  }

  .footer-menu {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
