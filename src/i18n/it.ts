const it = {
  common: {
    name: "Nome utente",
    email: "Indirizzo email",
    password: "Password",
    logout: "Logout",
    editProfile: "Modifica i tuoi dati",
    save: "Salva",
    close: "Chiudi",
    cancel: "Cancella",
  },
  errors: {
    missingName: "Inserire il nome utente",
    existingName: "Il nome utente appartiene ad un utente già esistente",
    missingEmail: "Inserire l'indirizzo email",
    invalidEmail: "Indirizzo email non valido",
    existingEmail: "L'indirizzo email appartiene ad un utente già esistente",
    missingPassword: "Inserire la password",
    weakPassword: "Password troppo debole",
    loginOAuthError: "C'è stato un problema con il login",
    login: "Login fallito",
    loginDescription: "Verifica che le credenziali siano corrette",
    signup: "Registrazione fallita",
    signupDescription:
      "Le credenziali inserite corrispondono ad un utente esistente",
    profilePhotoSet:
      "C'è stato un problema con la modifica dell'immagine del profilo",
    userUpdate: "C'è stato un problema con le modifiche ai dati dell'utente",
    fileTooLarge: "File troppo grande",
    fileTooLargeDescription: "Dimensione massima: 1MB",
    wrongCode: "Il codice inserito non è corretto",
    differentPasswords: "Le password inserite non coincidono",
    email: "C'è stato un problema con l'invio dell'email",
  },
  successes: {
    login: "Accesso eseguito con successo",
    signup: "Registrazione effettuata con successo",
    profilePhotoSet: "Immagine del profilo aggiornata con successo",
    userUpdate: "Dati aggiornati correttamente",
    codeSent: "Il codice è stato inviato alla mail indicata",
    codeVerified: "Il codice inserito è corretto",
  },
  screens: {
    login: {
      login: "Accedi",
      facebookLogin: "Accedi con Facebook",
      twitterLogin: "Accedi con Twitter",
      googleLogin: "Accedi con Google",
      signup: "Registrati",
      noAccount: "Non hai un account?",
      forgotPassword: "Hai dimenticato la tua password?",
      recoverPassword: "Recupera password",
      sendCode: "Invia codice di recupero",
      insertEmail: "Inserire l'indirizzo email dell'account da recuperare",
      insertCode: "Inserire il codice ricevuto all'indirizzo email specificato",
      insertNewPassword: "Inserire la nuova password",
      insertNewPasswordConfirm: "Inserire nuovamente la password",
      verifyCode: "Verifica codice di recupero",
      saveNewPassword: "Cambia password",
    },
    signup: {
      signup: "Registrati",
      login: "Accedi",
      haveAccount: "Hai già un account?",
      facebookSignup: "Registrati con Facebook",
      twitterSignup: "Registrati con Twitter",
      googleSignup: "Registrati con Google",
    },
  },
};

export default it;
