// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"

import firebaseService from "./src/services/firebase"

export const onClientEntry = () => {
  firebaseService.init();
}