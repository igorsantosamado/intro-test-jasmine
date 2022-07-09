describe(`${Person.name} Class`, () => {
  it('exists', () => {
    // assert
    expect(Person).toBeDefined();
  })

  let model;
  let mockPersonService;

  beforeEach(() => {
    const data = { firstName: 'Igor', middleName: 'dos Santos', lastName: 'Amado', id: 1 };
    mockPersonService = {
      lastId: null,
      user: {},
      getUserById(id) {
        this.lastId = id;
        return this.user;
      }
    }
    model = new Person(data, mockPersonService);
  })

  xdescribe('Default values', () => {
    it('first name defaults to an empty string', () => {
      // assert
      expect(model.firstName).toBe('');
    })

    it('lastName name defaults to an empty string', () => {
      // assert
      expect(model.lastName).toBe('');
    })
    
    it('middle name defaults to an empty string', () => {
      // assert
      expect(model.middleName).toBe('');
    })
  })

  xdescribe('fullname', () => {
    beforeEach(() => {
      model = new Person({
        firstName: 'Igor',
        lastName: 'Amado'
      });
    })
    it('middle initial middle name is defined with first and last', () => {
      // assert
      model.middleName = 'dos Santos'

      // act
      const result = model.fullName;

      // audit
      const { firstName: fn, lastName: ln, middleName: mn } = model;
      
      // assert
      expect(result).toBe(`${fn} ${mn[0]}. ${ln}`)

    })

    it('when NO middle name return just first and last', () => {
      // assert
      model.middleName = '';

      // act
      const result = model.fullName;

      // audit
      const { firstName: fn, lastName: ln, middleName: mn } = model;
      
      // assert
      expect(result).toBe(`${fn} ${ln}`)

    })
  })

  xdescribe('get code name', () => {
    it('when confirmed is a coding / testing god', () => {
      // arrange
      spyOn(window, 'confirm').and.returnValue(true);

      // act
      const result = model.getCodeName();

      // assert
      expect(result).toBe('TESTING GOD')
    })

    it('when not confirmed is just another scrub', () => {
      // arrange
      spyOn(window, 'confirm').and.returnValue(false);

      // act
      const result = model.getCodeName();

      // assert
      expect(result).toBe(`Scrub skipping tests in this best friend's ride!`)

    })
  })

  describe('getMyFullUserData', () => {
    it('gets user data by id', async () => {
      // arrange
      mockPersonService.lastId = null;
      mockPersonService.user = {
        firstName: 'Igor',
        middleName: 'dos Santos',
        lastName: 'Amado',
        id: 1
      }


      // act
      const result = await model.getFullUserData()

      // assert
      expect(mockPersonService.lastId).toBe(1)
    })
  })

  describe('additional matchers examples', () => {
    it('gets full name pieces', () => {
      // arrange
      const firstName = 'Igor';
      const middleName = 'dos Santos';
      const lastName = 'Amado';

      // act
      model = new Person({ firstName, middleName, lastName });

      // assert
      expect(model.fullNamePieces).toEqual([firstName, middleName, lastName]);


    })
    
  })

  describe('additional matchers testing area', () => {
    it('Fullname has my first name', () => {
      // arrange
      const firstName = 'Igor';
      const lastName = 'Amado';

      // act
      model = new Person({ firstName, lastName });

      // assert
      expect(model.fullName).toMatch(/Igor/);
    })
  })
  
})