class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  };

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  };

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }
    return numberOfVampires;
  };

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if(this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal){
      return true 
    } else {
      return false
    }
  };
  
  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (name === this.name){
       return this;
    }
    for (let vampire of this.offspring) {
     let vampName = vampire.vampireWithName(name);
     if(vampName){
       return vampName;
     }
    }
    return null; 
  };

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let vampireSum = 0;
    for (let vampire of this.offspring) {
      vampireSum += vampire.totalDescendents + 1;
    }
    return vampireSum;
  };

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millennialsVamps = [];
    if (this.yearConverted > 1980) {
      millennialsVamps.push(this);
    }
    for (const vamp of this.offspring) {
      const millennialVampires = vamp.allMillennialVampires;
      millennialsVamps = millennialsVamps.concat(millennialVampires);
    }
  return millennialsVamps;
  }
}

module.exports = Vampire;

