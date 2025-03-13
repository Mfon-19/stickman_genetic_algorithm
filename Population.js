class Population {
  constructor(size, target) {
    this.population = [];
    this.target = target;
    this.mutationRate = 0.01;

    for (let i = 0; i < size; i++) {
      this.population.push(new DNA());
    }
    this.matingPool = [];
    this.bestFitness = 0;
  }

  calcFitness() {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].calcFitness(this.target);
    }
  }

  naturalSelection() {
    this.matingPool = [];
    this.calcFitness();

    let maxFitness = 0;
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].fitnessValue > maxFitness) {
        maxFitness = this.population[i].fitnessValue;
        this.bestFitness = maxFitness;
      }
    }
    
    for (let i = 0; i < this.population.length; i++) {
      let normalizedFitness = this.population[i].fitnessValue / maxFitness;
      let entries = Math.floor(normalizedFitness * 100);
      for (let j = 0; j < entries; j++) {
        this.matingPool.push(this.population[i]);
      }
    }
  }

  newGeneration() {
    // Add check for empty mating pool
    if (this.matingPool.length === 0) {
      console.error(
        "Mating pool is empty! Make sure naturalSelection() is called first."
      );
      return;
    }

    for (let i = 0; i < this.population.length; i++) {
      let a = Math.floor(Math.random() * this.matingPool.length);
      let b = Math.floor(Math.random() * this.matingPool.length);
      let partnerA = this.matingPool[a];
      let partnerB = this.matingPool[b];
      let child = partnerA.crossover(partnerB);
      // mutation is very important! without mutation there is stagnation
      child.mutate(this.mutationRate);
      this.population[i] = child;
    }
  }

  maxFitness() {
    let best = 0;
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > best) best = this.population[i].fitness;
    }

    return best;
  }
}
