import test, { expect } from "@playwright/test";

const baseURL = process.env.fakeStore_url

test.describe('Fake Store API', () => {
    test('Get all Products', async ({ request }) => {
        const products = await request.get(`${baseURL}/products`)
        console.log(await products.json())
        expect(products.ok()).toBeTruthy()
        expect(products.status()).toEqual(200)        
    });

    test('Get a random product', async ({ request }) => {
        const products = await request.get(`${baseURL}/products`)
        expect(products.ok()).toBeTruthy()

        const response = await products.json()        
        const randomId = Math.floor(Math.random() * response.length)        
        const productId = response[randomId].id        
        
        const product = await request.get(`${baseURL}/products/${productId}`)
        expect(product.ok()).toBeTruthy()
        console.log('Product: ', await product.json())
    });

    test('Add new Product', async ({ request }) => {
        const product = await request.post(`${baseURL}/products`, {data:{
            title: 'test product',
            price: 13.5,
            description: 'lorem ipsum set',
            image: 'https://i.pravatar.cc',
            category: 'electronic'       
        }})
        expect(product.ok()).toBeTruthy()
        console.log(await product.json())
    });

    test('Delete a random product', async ({ request }) => {
        const products = await request.get(`${baseURL}/products`)
        expect(products.ok()).toBeTruthy()

        const response = await products.json()        
        const randomId = Math.floor(Math.random() * response.length)        
        const productId = response[randomId].id 
        
        const product = await request.delete(`${baseURL}/products/${productId}`)
        expect(product.ok()).toBeTruthy()
        console.log('Deleted Product: ', await product.json())
    });

});
