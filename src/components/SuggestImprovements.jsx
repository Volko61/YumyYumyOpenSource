import React from 'react';

const SuggestImprovement = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Envoyer le formulaire par email
    // Vous pouvez utiliser une bibliothèque comme nodemailer ou mailgun
    // Pour cet exemple, nous allons simplement afficher les données du formulaire
    console.log(`Nom : ${name}`);
    console.log(`Email : ${email}`);
    console.log(`Message : ${message}`);
  };

  return (
    <div>
      <h2>Suggérer une amélioration</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nom :
          <input type="text" name="name" required />
        </label>
        <br />
        <label>
          Email :
          <input type="email" name="email" required />
        </label>
        <br />
        <label>
          Message :
          <textarea name="message" required />
        </label>
        <br />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default SuggestImprovement;