import { Router } from "express";
import { User } from "../entity/User";
import { AppDataSource } from "../DataSource";
import { Role } from "../entity/Role";
import bcrypt from 'bcryptjs'
import { authenticateJWT } from "../middleware/authMiddleware";

const router = Router()

//router.use(authenticateJWT) //bloqueia/desbloqueia todas as rotas

router.post('/', async (req, res) => {  // Criar Usuário
    const { name, username, email, password, role } = req.body;

    if (!name || !username || !email || !password || !role) {  // Verifica campos obrigatórios
        return res.status(400).json({
            error: {
                status: 400,
                name: 'Validation Error',
                message: 'You missed a required field'
            }
        });
    }

    const userRepository = AppDataSource.getRepository(User);
    const roleRepository = AppDataSource.getRepository(Role);

    let roleInDB = await roleRepository.findOne({ where: { name: role } });

    if (!roleInDB) {
        roleInDB = roleRepository.create({ name: role });
        await roleRepository.save(roleInDB);
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser: User = userRepository.create({
        name,
        username,
        email,
        password: hashedPassword,
        role: roleInDB,
        BikesAdu: 0, 
        BikesInf: 0  
    });

    await userRepository.save(newUser);
    res.status(200).json({
        data: newUser
    });
});

router.get('/', async (req, res) => {   //Lista todos os Usuários
    const userRepository = AppDataSource.getRepository(User)
    const users = await userRepository.find({relations: ['role']})

    res.json({
        data: users
    })
})

router.get('/:id', async (req, res) => {  //Lista um Usuário
    const { id } = req.params  //recupera o Id que veio pela URL
    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOne({
        where: {
            id: parseInt(id)},
            relations: ['role']
        })

    if(!user) {
        return res.status(404).json({
            error: {
                status: 404,
                name: 'NotFound',
                message: 'User not found'
            }
        })
    }

    res.json ({
        data: user
    })
})

router.delete('/:id', async (req, res) => {  //Deleta um usuário
    const { id } = req.params  //recupera o Id que veio pela URL
    const userRepository = AppDataSource.getRepository(User)
    const roleRepository = AppDataSource.getRepository(Role)
    
    const user = await userRepository.findOne({
        where: {
            id: parseInt(id)},
            relations: ['role']
        })
    if(!user) {
        return res.status(404).json({
            error: {
                status: 404,
                name: 'NotFound',
                message: 'User not found'
            }
        })
    }

    userRepository.remove(user)
    res.status(200).json({
        data: user
    })

})

router.put('/:id', async (req, res) => {   // Atualiza um usuário
    const { id } = req.params;
    const { name, username, email, password, role, BikesAdu, BikesInf } = req.body;

    const userRepository = AppDataSource.getRepository(User);
    const roleRepository = AppDataSource.getRepository(Role);

    const user = await userRepository.findOne({
        where: { id: parseInt(id) },
        relations: ['role'],
    });

    if (!user) {
        return res.status(404).json({
            error: {
                status: 404,
                name: 'NotFound',
                message: 'User not found',
            },
        });
    }

    // Verifica se o número de bikes excede o limite permitido
    if (BikesAdu > 2 || BikesInf > 2) {
        return res.status(400).json({
            error: {
                status: 400,
                name: 'ValidationError',
                message: 'O número de "bikes" não pode ser maior do que 2!',
            },
        });
    }

    let roleInDB = await roleRepository.findOne({ where: { name: role } });

    if (!roleInDB) {
        roleInDB = roleRepository.create({ name: role });
        await roleRepository.save(roleInDB);
    }

    user.name = name || user.name;
    user.username = username || user.username;
    user.email = email || user.email;
    user.password = password || user.password;
    user.role = roleInDB;
    user.BikesAdu = BikesAdu ?? user.BikesAdu;
    user.BikesInf = BikesInf ?? user.BikesInf;

    await userRepository.save(user);
    res.status(200).json({
        data: user,
    });
});


router.get('/', (req, res) => {   //HomePage
    res.json({
        membros: [
            {
                nome: "Antônio Mateus",
                curso: "DD"
            },
            {
                nome: "João Victor",
                curso: "DD"
            },
            {
                nome: "Matheus Dantas",
                curso: "DD"
            },
            {
                nome: "Thais Lara",
                curso: "DD"
            },
        ],
        descricao: "Postos de aluguel de Bicicletas"
    })

    // res.send(`       //Retorno em HTML
    //     <html>
    //         <body>
    //             membros: <br>
            
    //             nome: "Antônio Mateus",
    //             curso: "DD"<br>
            
           
    //             nome: "João Victor",
    //             curso: "DD"<br>
            
            
    //             nome: "Matheus Dantas",
    //             curso: "DD"<br>
            
            
    //             nome: "Thais Lara",
    //             curso: "DD"<br>
            
         
    //             descrição: "Postos de aluguel de Bicicletas"
    //         </body>
    //     </html>`)
})

export default router