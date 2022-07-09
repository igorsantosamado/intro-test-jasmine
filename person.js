class Person {
  firstName;
  lastName;
  middleName;
  fullNamePieces;

  constructor(data, personService) {
    this.firstName = data.firstName || '';
    this.lastName = data.lastName || '';
    this.middleName = data.middleName || '';
    this.fullNamePieces = [ this.firstName, this.middleName, this.lastName];
    this.id = data.id;
    this.personService = personService;
  }

  async getFullUserData() {
    return this.personService.getUserById(this.id);
  }

  get fullName() {
    if (this.middleName.length > 0) {
      return `${this.firstName} ${this.middleName[0]}. ${this.lastName}`;
    }

    return `${this.firstName} ${this.lastName}`

  }

  sayMyName() {
    window.alert(this.fullName);
  }
  
  getCodeName() {
    const isATestingGod = confirm('Are you a testing god?');

    if (isATestingGod) {
      return 'TESTING GOD';
    } else {
      return `Scrub skipping tests in this best friend's ride!`;
    }
  }
}