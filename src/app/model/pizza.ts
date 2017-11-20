export class Pizza {
  _id: any
  nom: string
  prix: number
  description: string
  photo: string

  constructor(pId?, pNom?, pPrix?, pDescription?, pPhoto?) {
    this._id = pId;
    this.nom = pNom;
    this.prix = pPrix;
    this.description = pDescription;
    this.photo = pPhoto;
  }
}
