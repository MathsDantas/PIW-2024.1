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

router.post('/', async(req, res) => {  //Criar um Posto de Aluguel de Bikes
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

router.put('/:id', async (req, res) => {   // Atualiza um Posto 
    const { id } = req.params;
    const { nameUnidade, bikesAdu, bikesInf } = req.body;

    const postoRepository = AppDataSource.getRepository(Posto);

    try {
        
        const posto = await postoRepository.findOne({
            where: {
                id: parseInt(id),
            },
        });

        
        if (!posto) {
            return res.status(404).json({
                error: {
                    status: 404,
                    name: 'NotFound',
                    message: 'Posto not found',
                },
            });
        }

        
        posto.nameUnidade = nameUnidade ?? posto.nameUnidade;
        posto.bikesAdu = bikesAdu ?? posto.bikesAdu;
        posto.bikesInf = bikesInf ?? posto.bikesInf;

        
        await postoRepository.save(posto);

        
        res.status(200).json({
            data: posto,
        });
    } catch (error) {
        res.status(500).json({
            error: {
                status: 500,
                name: 'InternalServerError',
                message: 'An error occurred while updating the posto.',
            },
        });
    }
});

router.delete('/:id', async (req, res) => {  //Deleta um Posto

    const { id } = req.params  //recupera o Id que veio pela URL
    const postoRepository = AppDataSource.getRepository(Posto)
    
    const posto = await postoRepository.findOne({
        where: {
            id: parseInt(id)},
        })
    if(!posto) {
        return res.status(404).json({
            error: {
                status: 404,
                name: 'NotFound',
                message: 'User not found'
            }
        })
    }

    postoRepository.remove(posto)
    res.status(200).json({
        data: posto
    })

})

router.get('/:id', async (req, res) => {  //Lista uma Unidade dos Postos

    const { id } = req.params  //recupera o Id que veio pela URL
    const postoRepository = AppDataSource.getRepository(Posto)

    const posto = await postoRepository.findOne({
        where: {
            id: parseInt(id)},
        })

    if(!posto) {
        return res.status(404).json({
            error: {
                status: 404,
                name: 'NotFound',
                message: 'User not found'
            }
        })
    }

    res.json ({
        data: posto
    })
})


export default router