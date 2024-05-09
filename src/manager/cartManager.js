//También trabajamos con el file system, lo importamos
import fs from "fs";

//Acá se van a crear los carritos
const pathFile = "../data/carts.json";

//Arreglo de carritos
let carts = [];

const getCarts = async () => {

    //Para que lea el archivo
    const cartsJson = await fs.promises.readFile(pathFile, "utf-8");
    carts = JSON.parse(cartsJson) || [];

    //Muestra todo lo que hay en el archivo Json
    //console.log(carts);

    return (carts);
};

//Creamos un método para crear un carrito 
const createCart = async () => {
    await getCarts();

    const newCart = {
        id: carts.length + 1,
        products: []
    };

    
    carts.push(newCart);

    await fs.promises.writeFile(pathFile, JSON.stringify(carts));

    return newCart;

};

//Método que recupera un carrito por ID
const getCartById = async (cid) => {
    await getCarts();

    //Busca el carrito con el ID = al carrito que se recibe
    const cart = carts.find(c => c.id === cid);

    //Si no encuentra el carrito con ese ID retorna un mensaje
    if(!cart) return `No se encuentra el carrito con el ID ${cid}`

    //Si lo encuentra retorna todos los productos de ese carrito
    return cart.products;
}

//Fn. para agregar un producto al carrito. Recibe el ID del carrito y el ID del producto
const addProductToCart = async (cid, pid) => {

    //Primero se recuperan todos los productos
    await getProducts();

    //Primero se busca carrito que coincide con el cid que se está recibiendo
    const index = carts.findIndex ( c => c.id === cid);

    //Si no encuentra el carrito con ese ID retorna un mensaje
    if(index === -1) return `No se encontró el carrito con el ID ${cid}`;

    // Se busca si el producto ya está en el carrito
    const productIndex = carts[index].products.findIndex(p => p.product === pid);

    //Si encuentra el producto en el carrito, se incrementa la cantidad en 1
    if (productIndex !== -1) {
        carts[index].products[productIndex].quantity++;
    } else {
      //Si no encuentra el producto en el carrito, se crea un nuevo objeto con el producto y la cantidad 1
        carts[index].products.push({
            product: pid,
            quantity: 1
        });
    }

 //Se guarda el carrito modificado
    return carts[index]
};


export default {
    getCarts,
    getCartById,
    createCart,
    addProductToCart
}