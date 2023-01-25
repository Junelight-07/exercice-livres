import books from "./booksDatas.json";
import livreJungle from "../assets/livreJungle.jpg";
import reineDesNeiges from "../assets/reineDesNeiges.jpg";
import tomEtJerry from "../assets/tomEtJerry.png";
import petitOursBrun from "../assets/petitOursBrun.jpg";
import jAimeLire from "../assets/jAimeLire.jpg";
import droopy from "../assets/droopy.jpg";

function getCovert(name) {
  switch (name) {
    case "le-livre-de-la-jungle":
      return livreJungle;
    case "la-reine-des-neiges":
      return reineDesNeiges;
    case "tom-et-jerry":
      return tomEtJerry;
    case "petit-ours-brun":
      return petitOursBrun;
    case "jaime-lire":
      return jAimeLire;
    case "droopy":
      return droopy;
    default:
      return null;
  }
}

export default books.map((book) => ({
  ...book,
  cover: getCovert(book.name),
}));
