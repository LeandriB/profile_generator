const Manager = require('../lib/Manager');

test('creates a manager object', () => {
    const manager = new Manager('Leandri', 83418, 'leandrikuyk@gmail.com', 7);

    expect(manager.officeNumber).toEqual(expect.any(Number));

    expect(manager.getRole()).toBe('Manager');
});