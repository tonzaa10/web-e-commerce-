
export const generateOrderNumber =  () => {
const prefix ="ORD"; // Prefix for the order number
const timestamp = new Date().getTime().toString().substring(3,10); // Current timestamp in milliseconds
const radndom = Math.floor(Math.random() * 1000).toString().padStart(3, '0'); // Random 3-digit number

return `${prefix}${timestamp}${radndom}`;
}