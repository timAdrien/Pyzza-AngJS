import {Ingredient} from "./ingredient";

export class Pizza {
  _id: any
  nom: string
  prix: number
  description: string
  ingredient_ids: Ingredient[]
  photo: {
    data: string,
    contentType: string
  }

  constructor(pId?, pNom?, pPrix?, pDescription?, pPhoto?) {
    this._id = pId;
    this.nom = pNom;
    this.prix = pPrix;
    this.description = pDescription;
    this.photo = pPhoto;
  }
}
