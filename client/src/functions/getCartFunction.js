export function getCart() {
    console.log('getCart function called') // added console.log statement for debugging
    try {
        const cart = JSON.parse(localStorage.getItem('cart')) || []
        console.log('Successfully retrieved cart:', cart) // added console.log statement for debugging
        return cart
    } catch (error) {
        console.error('Error parsing cart:', error) // added console.log statement for debugging
        return [];
    }
}