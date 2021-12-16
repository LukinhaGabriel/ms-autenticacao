import db from "../db";
import User from "../models/user.model";
import DatabaseError from "../models/errors/database.error.model";


class UseRepository {

    async findAllUsers(): Promise<User[]> {
       
        try{
            const query = `
                SELECT uuid, username FROM application_user
            `;

            const result = await db.query<User>(query);
            const rows = result.rows;

            return rows || [];
        }catch(error){
            throw new DatabaseError('Erro na consultar de todos os usuários');
        }
    };

    async findById(uuid: string): Promise<User> {
        try{
            const query = `
                SELECT uuid, username FROM application_user WHERE uuid = $1
            `;
            const values = [uuid]; 
            
            const { rows } = await db.query<User>(query, values);
            const [ user ] = rows;
            return user;
        
        } catch(error){
            throw new DatabaseError('Erro na consulta por ID', error);
        }
    };
    
    async create(user: User): Promise<string> {
        try{
            const script = `
                INSERT INTO application_user(username, password)
                VALUES ($1, crypt($2, 'my_salt'))
                RETURNING uuid
            `;
            const values = [user.username, user.password]

            const { rows } = await db.query<{ uuid: string }>(script, values);
            const [ newUser ] = rows;

            return newUser.uuid;
        } catch(error){
            throw new DatabaseError('Erro ao criar o Usuário', error);
        }
    };

    async update(user: User): Promise<void>{
        try{
            const script = `
                UPDATE application_user 
                SET 
                    username = $1,
                    password = crypt($2, 'my_salt') 
                
                WHERE uuid = $3   
            `;
            const values = [user.username, user.password, user.uuid];
            await db.query(script, values);
        }catch(error){
            throw new DatabaseError('Erro ao Alterar Usuário', error); 
        }
    };

    async remove(uuid: string): Promise<void>{
        try{
            const script = `
                DELETE  
                FROM application_user
                WHERE uuid = $1   
            `;
            const values = [uuid];
            await db.query(script, values);
        }catch(error){
            throw new DatabaseError('Erro ao Deletar Usuário', error);
        }
    }

}

export default new UseRepository();


