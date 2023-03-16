class UserPerformance {

  constructor(performances) {

    // Retrieve the data of the performance

    this.kind = performances.kind;

    this._performance = performances.data.map((performance) => {
 
      return {
        ...performance,
        kind: this.kind[performance.kind],
      };
    });
  }

  get performance() {
    return this._performance;
  }
}

export default UserPerformance;
