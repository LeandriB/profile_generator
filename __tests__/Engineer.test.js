const Engineer = require('../lib/Engineer');

test('creates a engineer object', () => {
    const engineer = new Engineer('Leandri', 83418, 'leandrikuyk@gmail.com', 'LeandriB');

    expect(engineer.github).toEqual(expect.any(String));

    expect(engineer.getRole()).toBe('Engineer');
});