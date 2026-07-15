// Kirjautumisvahti. Ladataan JOKAISELLA suojatulla sivulla,
// config.js:n jälkeen. login.html EI lataa tätä (ettei tule silmukkaa).
//
// Sivun <body> pitää olla oletuksena piilossa (style="visibility:hidden"),
// tämä tiedosto näyttää sen vasta kun kirjautuminen on varmistettu.

(async function () {
  const { data: { session }, error } = await supabaseClient.auth.getSession();

  if (error || !session) {
    window.location.href = 'login.html';
    return;
  }

  window.currentUser = session.user;

  // Sessio saattaa selvitä niin nopeasti (selaimen muistista), että <body>
  // ei ole vielä olemassa tässä vaiheessa — odotetaan tarvittaessa.
  const showBody = () => { document.body.style.visibility = 'visible'; };
  if (document.body) {
    showBody();
  } else {
    document.addEventListener('DOMContentLoaded', showBody);
  }
})();

// Jos sessio katkeaa kesken kaiken (esim. uloskirjautuminen toisessa
// välilehdessä), potkaistaan takaisin kirjautumissivulle.
supabaseClient.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT' || !session) {
    window.location.href = 'login.html';
  }
});

// Kutsu tätä mistä tahansa sivulta uloskirjautumisnapista.
async function logout() {
  await supabaseClient.auth.signOut();
  window.location.href = 'login.html';
}
