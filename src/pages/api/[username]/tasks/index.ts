import { NextApiRequest, NextApiResponse } from 'next'

import { connectToDB } from '../../../../utils/services/mongoDB'
import { Task } from '../../../../interfaces/Task';


import Cors from 'cors'

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'POST'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}


const handler = async (req:NextApiRequest, res:NextApiResponse) =>{
    try{
        await runMiddleware(req, res, cors);
        const { method, query, body } = req;
        const { db } = await connectToDB();
        const { username } = query;
        switch (method) {
            case 'GET':
                const tasks = await db.collection('tasks').find({user:`${username}`}).toArray();
                res.status(200).json(tasks);    
                break;
            case 'POST':
                const {name, description, status ,date} = body;
                if (name!==undefined && description!==undefined && status!==undefined && date!==undefined){
                    console.log('okay')
                    const task =  await db.collection('tasks').insertOne({user:username, name,description,status,date});
                    res.status(201).json(task);
                }else{
                    res.status(400).json({'detail':'Documento incompleto', 'body':body});
                }
                break;
            default:
                res.status(405).json({'detail':`Método ${method} Não suportado`});
                break;
            }

    }catch (err){
        res.status(500).json(err);
    }

}

export default handler;