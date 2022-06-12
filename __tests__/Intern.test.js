const Intern = require('../lib/Intern');

test('creates a intern object', () => {
    const intern = new Intern('Leandri', 83418, 'leandrikuyk@gmail.com', 'Harvard');

    expect(intern.school).toEqual(expect.any(String));

    expect(intern.getRole()).toBe('Intern');
});