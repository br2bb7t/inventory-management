const express = require('express');
const router = express.Router();
const productController = require('./productController');

/**
 * @swagger
 * /products:
 *   get:
 *     description: Obtiene todos los productos
 *     responses:
 *       200:
 *         description: Lista de productos
 */
router.get('/', productController.getProducts);

/**
 * @swagger
 * /products:
 *   post:
 *     description: Crear un nuevo producto
 *     parameters:
 *       - name: name
 *         in: body
 *         description: Nombre del producto
 *         required: true
 *         type: string
 *       - name: category
 *         in: body
 *         description: Categoría del producto
 *         required: true
 *         type: string
 *       - name: price
 *         in: body
 *         description: Precio del producto
 *         required: true
 *         type: number
 *       - name: stock
 *         in: body
 *         description: Cantidad en stock
 *         required: true
 *         type: number
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 */
router.post('/', productController.createProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     description: Actualizar un producto existente
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del producto a actualizar
 *         required: true
 *         type: string
 *       - name: name
 *         in: body
 *         description: Nombre del producto
 *         required: true
 *         type: string
 *       - name: category
 *         in: body
 *         description: Categoría del producto
 *         required: true
 *         type: string
 *       - name: price
 *         in: body
 *         description: Precio del producto
 *         required: true
 *         type: number
 *       - name: stock
 *         in: body
 *         description: Cantidad en stock
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *       404:
 *         description: Producto no encontrado
 *       400:
 *         description: Datos de entrada inválidos
 */
router.put('/:id', productController.updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     description: Eliminar un producto existente
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del producto a eliminar
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *       404:
 *         description: Producto no encontrado
 */
router.delete('/:id', productController.deleteProduct);

module.exports = router;
