//Importación de módulos
import fs from "fs";

let pathFile = "./src/data/products.json";

let products = [];

const addProduct = async (product) => {
    const {title, description, price, thumbnail, code, stock} = product;
    await getProducts();

     
    const newProduct = {
        id: products.length + 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status: true
    }

    //Validar que no haya campos vacíos
    if (Object.values(newProduct).includes(undefined)) {
        console.log("Todos los campos son obligatorios. Por favor complete.");
        return;
    }

    //Validar que no haya un producto con el mismo código
    const productExist = products.find(product => product.code === code);
    if (productExist) {
        console.log(`El producto ${title} con el código ${code} ya existe. Ingrese uno distinto.`);
        return;
    }

    //Añadimos el producto al array de productos
    products.push(newProduct);

    await fs.promises.writeFile(pathFile, JSON.stringify(products));

};

//Fn. que muestra los productos. Recibe como parámetro el límite.
async function getProducts(limit) {

    
    const productsJson = await fs.promises.readFile(pathFile, "utf-8");
    console.log(productsJson);

    products = JSON.parse(productsJson) || [];

   
    if (!limit) return products;

  
    return products.slice(0, limit);
}

const getProductsById = async (id) => {

    await getProducts();
    const product = products.find(product => product.id === id);
    if (!product) {
        throw Error(`No se encontró el producto con el id ${id}`);
    };

    return product;
};

const updateProduct = async (id, dataProduct) => {

    await getProducts();

    
    const index = products.findIndex( product => product.id === id );

    
    products[index] = {
        
       
        ...products[index],
        ...dataProduct
    };

   
    await fs.promises.writeFile(pathFile, JSON.stringify(products));

};


const deleteProduct = async (id) => {

    
    await getProducts();

    
    products = products.filter( product => product.id !== id);

 
    await fs.promises.writeFile(pathFile, JSON.stringify(products));
};


export default {
    addProduct,
    getProducts,
    getProductsById,
    updateProduct, 
    deleteProduct
}