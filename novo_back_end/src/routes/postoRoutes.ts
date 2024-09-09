import { Router } from "express";
import bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken';
import { AppDataSource } from "../DataSource";
import { Posto } from "../entity/Postos";

const router = Router()

router.get('/', async (req, res) => {   // Lista todos os Postos de Aluguel
    const postoRepository = AppDataSource.getRepository(Posto);
    
    try {
        const postos = await postoRepository.find();  // Obtém todos os postos do banco de dados

        res.json({
            data: postos
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar postos de aluguel' });
    }
});


router.post('/', async(req, res) => {  //Criar Usuário
    const {nameUnidade, bikesAdu, bikesInf} = req.body

    if(!nameUnidade || !bikesAdu || !bikesInf) {  //Caso esteja faltando algum elemento
        return res.status(400).json ({
            error: {
                status: 400,
                name: 'Validation Error',
                message: 'You missed a required field'
            }
        })
    }

    const postoRepository = AppDataSource.getRepository(Posto)

    const newPosto: Posto = postoRepository.create( {
        nameUnidade,
        bikesAdu,
        bikesInf,
    })

    await postoRepository.save(newPosto)
    res.status(200).json({
        data: newPosto
    })
} )


export default router