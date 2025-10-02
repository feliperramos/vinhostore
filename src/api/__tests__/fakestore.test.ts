import { fetchProducts as get } from '../fakestore.service';

globalThis.fetch = jest.fn(async () => ({
  ok: true,
  json: async () => [
    { id: 1, title: 'A', price: 1, image: '', description: '', category: '' },
  ],
})) as any;

test('fetch products ok', async () => {
  const data = await get();
  expect(data[0].id).toBe(1);
});
