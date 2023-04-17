import express =require('express')
import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
const swaggerJsDoc=require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')

const app = express() 
app.use(express.json())

const option = {
    definition:{
        openapi : '3.0.0',
        info:{
            title:'Nodejs API Project with Swagger',
            version:'2.0.0'
        },
        servers:[
            {
               url:'http://localhost:3001/'
            }
        ]
    },
    apis:['./src/index.ts']
}

const swaggerjsdoc=swaggerJsDoc(option)
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerjsdoc))

/**
 * @swagger
 *  components:
 *      schema:
 *          user:
 *              type: object
 *              properties:
 *                   id:
 *                      type: integer
 *                   firstName:
 *                            type: string
 *                   lastName:
 *                           type: string
 *                   age:
 *                         type: integer
 *                   email:
 *                            type: string
 */


/**
 * @swagger
 *  /users:
 *      get:
 *          summary: This api is used get users
 *          description: This api is used to get all users 
 *          responses:
 *              200:
 *                  description: To test get method
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#components/schema/user'
 */

app.get('/users',async(req:express.Request,res:express.Response)=>{
         const data = await AppDataSource
         .createQueryBuilder()
         .select()
         .from(User,'u')
         .execute()

         res.status(200).json({
            message:"got user",
            data:data
         })
})

/**
 * @swagger
 *  /users/{id}:
 *      get:
 *          summary: This api is used to get the user details with id
 *          description: This api is used to get user details
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                description: numaric ID required
 *                schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: To test get method
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#components/schema/user'
 */


app.get('/users/:id',async(req:express.Request,res:express.Response)=>{
    const id = req.params.id;
    const data = await AppDataSource
    .createQueryBuilder()
    .select()
    .from(User,'u')
    .where("u.id =:id",{id:id})
    .execute()

    res.status(200).json({
        message:"got one user",
        data:data
    })
})


/**
 * @swagger
 *  /users:
 *      post:
 *          summary: It used to insert data into user
 *          description: It used to insert data
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schema/user'
 *          responses:
 *              201:
 *                  description: added sucessfully
 */

app.post('/users',async(req:express.Request,res:express.Response)=>{
    const { firstName,lastName,age,email }:any = req.body;
    // const data=await AppDataSource
    // .createQueryBuilder()
    // .insert()
    // .into(User)
    // .values({firstName:firstName,
    //           lastName:lastName,
    //           age:age,
    //           email:email})
    // .execute()
    const users= await User.save({ firstName,lastName,age,email })

    
     
    

    res.status(201).json({
        message:"added sucessfully",
        data:users
    })

})



/**
 * @swagger
 *  /users/{id}:
 *      put:
 *          summary: It used to update data into user
 *          description: It used to update data
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                description: numaric ID required
 *                schema:
 *                  type: integer
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schema/user'
 *          responses:
 *              200:
 *                  description: updated sucessfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#components/schema/user'
 */

app.put('/users/:id',async(req:express.Request,res:express.Response)=>{
    const id= req.params.id;
    const { firstName,lastName,age,email }:any  = req.body;

    const data = await AppDataSource
    .createQueryBuilder()
    .update(User)
    .set({
        firstName:firstName,
        lastName:lastName,
        age:age,
        email:email
    })
    .where("id=:id",{id:id})
    .execute()


    res.status(200).json({
        message:"user is updated",
        data:data
    })

})


/**
 * @swagger
 *  /users/{id}:
 *      delete:
 *          summary: This api is used to delete
 *          description: This api is used to delete
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                description: numaric ID required
 *                schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: deleted sucessfully
 */


app.delete('/users/:id',async(req:express.Request,res:express.Response)=>{
    const id = req.params.id;
    const data = await AppDataSource
    .createQueryBuilder()
    .delete()
    .from(User)
    .where("id=:id",{id:id})
    .execute()

    res.send('user was deleted')
})






AppDataSource.initialize().then(async () => {
    app.listen(3001,()=>{
            console.log('app is runing at port 3001')
    })


}).catch(error => console.log(error))


