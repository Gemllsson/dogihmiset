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
  document.body.style.visibility = 'visible';
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
