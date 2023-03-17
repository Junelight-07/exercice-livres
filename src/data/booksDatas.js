import books from "./booksDatas.json";

function getCovert(name) {
  switch (name) {
    case "le-livre-de-la-jungle":
      return "/livreJungle.jpg";
    case "la-reine-des-neiges":
      return "/reineDesNeiges.jpg";
    case "tom-et-jerry":
      return "/tomEtJerry.png";
    case "petit-ours-brun":
      return "/petitOursBrun.jpg";
    case "jaime-lire":
      return "/jAimeLire.jpg";
    case "droopy":
      return "/droopy.jpg";
    default:
      return null;
  }
}

export default books.map((book) => ({
  ...book,
  cover: getCovert(book.name),
}));
