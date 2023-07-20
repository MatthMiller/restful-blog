/**
 * @swagger
 * post/create:
 *  post:
 *    summary: Create a new post (needs auth)
 *    tags: [Posts]
 *    security:
 *      - ApiKeyAuth: []
 *    parameters:
 *      - in: body
 *        schema:
 *          type: object
 *          required:
 *            - title
 *            - content
 *          properties:
 *            title:
 *              type: string
 *              example: Title of the post, max. 120 characters.
 *            content:
 *              type: string
 *              example: Content of the post, unlimited characters.
 */
