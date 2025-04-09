<script setup lang="ts">
import { ref } from 'vue';

const name = ref('');
const email = ref('');
const message = ref('');

const handleSubmit = () => {
  if (name.value && email.value && message.value) {
    alert('Votre message a été envoyé!');
  } else {
    alert('Veuillez remplir tous les champs!');
  }
};
</script>

<template>
  <div class="about-container">
    <div class="about-header">
      <h1>À propos de notre Backlog de Jeux Vidéo</h1>
      <p>Bienvenue sur notre application de suivi de jeux vidéo ! Voici tout ce que vous devez savoir à propos de ce projet.</p>
    </div>

    <div class="about-content">
      <h2>Qu'est-ce que notre Backlog de Jeux Vidéo ?</h2>
      <p>
        Notre plateforme vous permet de suivre vos jeux vidéo préférés, d'ajouter de nouveaux jeux à votre backlog, de marquer ceux que vous avez terminés, et de découvrir de nouveaux jeux en fonction de vos préférences.
      </p>

      <h2>Pourquoi ce projet ?</h2>
      <p>
        Nous avons créé cette application pour aider les joueurs à garder une trace de leurs jeux, organiser leurs sessions de jeu, et partager leurs expériences avec d'autres passionnés de jeux vidéo.
      </p>

      <h2>Nous Contacter</h2>
      <p>
        Si vous avez des questions, des suggestions ou si vous voulez simplement discuter de jeux vidéo, n'hésitez pas à nous contacter via le formulaire ci-dessous :
      </p>

      <div class="contact-form">
        <h3>Formulaire de Contact</h3>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="name">Nom :</label>
            <input type="text" id="name" v-model="name" placeholder="Votre nom" required />
          </div>
          <div class="form-group">
            <label for="email">Email :</label>
            <input type="email" id="email" v-model="email" placeholder="Votre email" required />
          </div>
          <div class="form-group">
            <label for="message">Message :</label>
            <textarea id="message" v-model="message" placeholder="Votre message" required></textarea>
          </div>
          <button type="submit" class="submit-btn">Envoyer</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-container {
  padding: 20px;
  font-family: 'Segoe UI', sans-serif;
  background-color: #1c1c1e;
  color: #fff;
}

.about-header {
  text-align: center;
  margin-bottom: 40px;
}

.about-header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.about-header p {
  font-size: 1.2rem;
  color: #ccc;
}

.about-content {
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
}

.about-content h2 {
  font-size: 2rem;
  color: #8e24aa;
  margin-top: 30px;
}

.about-content p {
  font-size: 1.1rem;
  margin-bottom: 15px;
  color: #ddd;
}

.contact-form {
  background-color: #2c2c2c;
  border-radius: 8px;
  padding: 20px;
  margin-top: 30px;
}

.contact-form h3 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #8e24aa;
}

.contact-form .form-group {
  margin-bottom: 15px;
}

.contact-form label {
  display: block;
  margin-bottom: 8px;
  font-size: 1rem;
  color: #ccc;
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #333;
  background-color: #333;
  color: #fff;
}

.contact-form textarea {
  height: 150px;
  resize: vertical;
}

.contact-form .submit-btn {
  background-color: #8e24aa;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.contact-form .submit-btn:hover {
  background-color: #6a1b9a;
}

@media (max-width: 600px) {
  .about-container {
    padding: 10px;
  }

  .about-header h1 {
    font-size: 2rem;
  }

  .about-content h2 {
    font-size: 1.8rem;
  }

  .about-content p {
    font-size: 1rem;
  }

  .contact-form h3 {
    font-size: 1.6rem;
  }

  .contact-form .form-group label {
    font-size: 0.9rem;
  }

  .contact-form input,
  .contact-form textarea {
    font-size: 1rem;
  }

  .contact-form .submit-btn {
    font-size: 1rem;
  }
}
</style>
