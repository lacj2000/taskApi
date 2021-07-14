import {NextApiRequest, NextApiResponse} from 'next';

const task = async (req: NextApiRequest, res: NextApiResponse) =>{
    try{
        const { method, query, body } = req
        switch (method) {
            case 'GET':
                
                break;
        
            default:
                res.setHeader('Allow',['GET','PUT','DELETE'])
                res.status(405).json({'detail':`Método ${method} Não suportado`});
                break;
        }

    }catch (err){
        res.status(500).json(err);
    }


}

export default task;